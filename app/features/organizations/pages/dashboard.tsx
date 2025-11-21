import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Copy, Key, TrendingUp, Activity } from "lucide-react";
import Footer from "~/common/components/footer";
import type { Route } from "./+types/dashboard";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "~/common/components/ui/dialog";
import db from "~/lib/db";
import { apiKeys, organizations, orgsToUsers } from "../schema";
import { eq } from "drizzle-orm";
import { auth } from "~/lib/auth/server";
import { Form, redirect, useRevalidator } from "react-router";
import z from "zod";
import InputPair from "~/common/components/input-pair";
import { randomUUID } from "crypto";
import { useTRPC } from "~/lib/trpc/react";
import { useMutation } from "@tanstack/react-query";
import { useForm, type SubmitHandler } from "react-hook-form";
import resend from "~/lib/resend";
import { WelcomeEmail } from "react-email-starter/emails/welcome";

const baseUrl = "https://kagentic-solution.vercel.app";

export const loader = async ({ request }) => {
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  if (!session?.user.id) {
    return redirect("/");
  }

  const userOrg = await db.query.orgsToUsers.findFirst({
    where: eq(orgsToUsers.userId, session?.user.id ?? ""),
  });

  if (!userOrg) {
    return { organization: null };
  }

  const organization = await db.query.organizations.findFirst({
    where: eq(organizations.id, userOrg.organizationId!),
  });

  const apiKeyList = await db.query.apiKeys.findMany({
    where: eq(apiKeys.organizationId, organization?.id!),
  });

  return { organization, apiKeys: apiKeyList };
};

const orgFormSchema = z.object({
  name: z.string("Name is required").min(1).max(255),
  description: z.string().optional(),
});

const apiKeyFormSchema = z.object({
  name: z.string("Name is required").min(1).max(255),
});

export const action = async ({ request }: Route.ActionArgs) => {
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  if (!session?.user.id) {
    return redirect("/");
  }

  const formData = await request.formData();
  const { success, error, data } = orgFormSchema.safeParse(
    Object.fromEntries(formData)
  );

  if (!success) {
    return { fieldErrors: error.flatten().fieldErrors };
  }

  const { name, description } = data;

  const [organization] = await db
    .insert(organizations)
    .values({
      name,
      description: description ?? "",
    })
    .returning();

  await Promise.all([
    db.insert(orgsToUsers).values({
      organizationId: organization.id,
      userId: session.user.id,
    }),
    db.insert(apiKeys).values({
      name: "default",
      organizationId: organization.id,
      apiKey: `kg_${organization.id}_${randomUUID()}`,
    }),
    resend.emails.send({
      from: "noreply@andineering.com",
      to: session.user.email,
      subject: "Welcome to Andineering",
      react: (
        <WelcomeEmail
          username={session.user.name}
          buttonLink={`${baseUrl}/agentic`}
        />
      ),
    }),
  ]);

  return {
    success: true,
  };
};

const Dashboard = ({ loaderData, actionData }: Route.ComponentProps) => {
  const { revalidate } = useRevalidator();

  const { organization } = loaderData;

  const [selectedApiKeyId, setSelectedApiKeyId] = useState<number | null>(null);
  const [showNewKeyDialog, setShowNewKeyDialog] = useState(false);
  const [openOrgDetailsDialog, setOpenOrgDetailsDialog] =
    useState(!organization);

  useEffect(() => {
    if (actionData?.success) {
      setOpenOrgDetailsDialog(false);
    }
  }, [actionData]);

  const trpc = useTRPC();
  const generateApiKey = useMutation(
    trpc.organizations.generateApiKey.mutationOptions({
      onSuccess: () => {
        setShowNewKeyDialog(false);
        revalidate();
      },
    })
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof apiKeyFormSchema>>();

  const onSubmitNewAPIKey: SubmitHandler<z.infer<typeof apiKeyFormSchema>> = (
    data
  ) => {
    generateApiKey.mutate({
      name: data.name,
      organizationId: organization?.id!,
    });
  };

  const revokeApiKey = useMutation(
    trpc.organizations.revokeApiKey.mutationOptions({
      onSuccess: () => {
        setSelectedApiKeyId(null);
        revalidate();
      },
    })
  );

  const onClickRevokeAPIKey = (apiKeyId: number) => {
    revokeApiKey.mutate({
      apiKeyId,
      organizationId: organization?.id!,
    });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="min-h-screen bg-background">
      <Dialog open={openOrgDetailsDialog}>
        <DialogContent>
          <DialogTitle>Organization Details</DialogTitle>
          <Form className="space-y-4" method="post">
            <InputPair
              name="name"
              label="Org Name"
              description="The name of the organization"
              required
              defaultValue={organization?.name}
            />
            {actionData && "fieldErrors" in actionData && (
              <p className="text-red-500">
                {actionData.fieldErrors?.name?.join(", ")}
              </p>
            )}
            <InputPair
              name="description"
              label="Description"
              description="The description of the organization"
              textArea
              defaultValue={organization?.description}
            />
            <Button type="submit">Save</Button>
          </Form>
        </DialogContent>
      </Dialog>
      <main className="pt-32 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
              {loaderData.organization?.name}
            </h1>
            <p className="text-lg text-muted-foreground">
              {loaderData.organization?.description}
            </p>
          </div>

          {/* API Keys Management */}
          <Card className="p-6 bg-card/50 backdrop-blur-sm border-border mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">API Keys</h2>
              <Button onClick={() => setShowNewKeyDialog(!showNewKeyDialog)}>
                <Key className="mr-2 h-4 w-4" />
                Generate New Key
              </Button>
            </div>

            <div className="space-y-4">
              {loaderData.apiKeys?.map((apiKey) => (
                <div
                  key={apiKey.apiKey}
                  className="p-4 bg-muted/10 rounded-lg border border-border hover:border-primary/50 transition-all"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-1 text-left">
                        {apiKey.name}
                      </h3>
                      <div className="flex items-center gap-2 mb-2">
                        <code className="text-sm bg-muted px-2 py-1 rounded font-mono">
                          {apiKey.apiKey}
                        </code>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => copyToClipboard(apiKey.apiKey)}
                          className="h-8 w-8 p-0"
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="flex gap-4 text-sm text-muted-foreground">
                        <span>
                          Created: {apiKey.created_at.toLocaleDateString()}
                        </span>
                        {/* <span>•</span> */}
                        {/* <span>{apiKey.calls.toLocaleString()} calls</span> */}
                      </div>
                    </div>
                    {apiKey.name !== "default" && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedApiKeyId(apiKey.id)}
                      >
                        Revoke
                      </Button>
                    )}
                    <Dialog
                      open={selectedApiKeyId === apiKey.id}
                      onOpenChange={(open) =>
                        open
                          ? setSelectedApiKeyId(apiKey.id)
                          : setSelectedApiKeyId(null)
                      }
                    >
                      <DialogContent>
                        <DialogTitle>Revoke API Key</DialogTitle>
                        <DialogDescription className="mb-4">
                          Are you sure you want to revoke this API key?
                        </DialogDescription>
                        <h3 className="font-semibold text-lg text-center">
                          {apiKey.name}
                        </h3>
                        <code className="text-sm bg-muted px-2 py-1 rounded font-mono mb-4">
                          {apiKey.apiKey}
                        </code>
                        <Button onClick={() => onClickRevokeAPIKey(apiKey.id)}>
                          Revoke
                        </Button>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Dialog open={showNewKeyDialog} onOpenChange={setShowNewKeyDialog}>
            <DialogContent>
              <DialogTitle>Add API Key</DialogTitle>
              <Form
                className="space-y-4"
                onSubmit={handleSubmit(onSubmitNewAPIKey)}
              >
                <InputPair
                  label="Name"
                  description="The name of the API key"
                  required
                  {...register("name", { required: true })}
                />
                {errors.name && (
                  <p className="text-red-500">{errors.name.message}</p>
                )}
                <Button type="submit">Add</Button>
              </Form>
            </DialogContent>
          </Dialog>

          {/* Stats Grid */}
          {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {usageStats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card
                  key={index}
                  className="p-6 bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 transition-all"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 rounded-lg bg-primary/10">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <span
                      className={`text-sm font-medium ${stat.change.startsWith("+") ? "text-green-500" : stat.change.startsWith("-") ? "text-red-500" : "text-muted-foreground"}`}
                    >
                      {stat.change}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      {stat.label}
                    </p>
                    <p className="text-3xl font-bold">{stat.value}</p>
                  </div>
                </Card>
              );
            })}
          </div> */}

          {/* Usage Chart Placeholder */}
          <Card className="p-6 mb-12 bg-card/50 backdrop-blur-sm border-border">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">API Usage Overview</h2>
              <TrendingUp className="h-5 w-5 text-primary" />
            </div>
            <div className="h-64 flex items-center justify-center bg-muted/20 rounded-lg border border-border">
              <div className="text-center">
                <Activity className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  Usage chart visualization
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  API calls tracked in real-time
                </p>
              </div>
            </div>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
