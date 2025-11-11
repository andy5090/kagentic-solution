import { submitInquiry } from "~/features/inquiries/mutations";
import type { Route } from "../../common/pages/+types/landing";
import CTA from "../components/cta";
import Features from "../components/features";
import Footer from "../components/footer";
import Hero from "../components/hero";
import Services from "../components/services";
import z from "zod";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Kagentic Solution" },
    {
      name: "description",
      content:
        "Transform your business with Agentic AI. Move beyond digital transformation to intelligent automation that works for you.",
    },
  ];
}

const formSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  message: z.string().min(1),
});

export const action = async ({ request }: { request: Request }) => {
  const formData = await request.formData();

  const validatedFields = formSchema.safeParse(Object.fromEntries(formData));

  if (!validatedFields.success) {
    return { errors: validatedFields.error.flatten().fieldErrors };
  }

  const { name, email, message } = validatedFields.data;

  await submitInquiry({ name, email, message });

  return { success: true };
};

export default function Landing({ loaderData }: Route.ComponentProps) {
  // const { isLoggedIn } = useOutletContext<{ isLoggedIn: boolean }>();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main>
        <Hero />
        <Services />
        <Features />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
