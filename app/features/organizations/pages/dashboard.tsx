import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Copy,
  Key,
  TrendingUp,
  Activity,
  Clock,
  CheckCircle2,
} from "lucide-react";
import Navigation from "~/common/components/navigation";
import Footer from "~/common/components/footer";

const Dashboard = () => {
  //   const { toast } = useToast();
  const [apiKeys, setApiKeys] = useState([
    {
      id: "1",
      name: "Production API",
      key: "kg_prod_••••••••••••3a8f",
      created: "2025-01-15",
      calls: 15420,
    },
    {
      id: "2",
      name: "Development API",
      key: "kg_dev_••••••••••••7b2c",
      created: "2025-01-20",
      calls: 8934,
    },
  ]);
  const [showNewKeyDialog, setShowNewKeyDialog] = useState(false);
  const [newKeyName, setNewKeyName] = useState("");

  const usageStats = [
    {
      label: "Total API Calls",
      value: "24,354",
      change: "+12.5%",
      icon: Activity,
    },
    {
      label: "Active Keys",
      value: apiKeys.length.toString(),
      change: "stable",
      icon: Key,
    },
    {
      label: "Avg Response Time",
      value: "142ms",
      change: "-8.2%",
      icon: Clock,
    },
    {
      label: "Success Rate",
      value: "99.8%",
      change: "+0.3%",
      icon: CheckCircle2,
    },
  ];

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // toast({
    //   title: "Copied to clipboard",
    //   description: "API key has been copied to your clipboard.",
    // });
  };

  const generateApiKey = () => {
    if (!newKeyName.trim()) {
      //   toast({
      //     title: "Error",
      //     description: "Please enter a name for your API key.",
      //     variant: "destructive",
      //   });
      return;
    }

    const newKey = {
      id: Date.now().toString(),
      name: newKeyName,
      key: `kg_${newKeyName.toLowerCase().replace(/\s+/g, "_")}_${Math.random().toString(36).substring(2, 15)}`,
      created: new Date().toISOString().split("T")[0],
      calls: 0,
    };

    setApiKeys([...apiKeys, newKey]);
    setNewKeyName("");
    setShowNewKeyDialog(false);

    // toast({
    //   title: "API Key Generated",
    //   description: "Your new API key has been created successfully.",
    // });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
              Dashboard
            </h1>
            <p className="text-lg text-muted-foreground">
              Monitor your API usage and manage your keys
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
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
          </div>

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

          {/* API Keys Management */}
          <Card className="p-6 bg-card/50 backdrop-blur-sm border-border">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">API Keys</h2>
              <Button
                onClick={() => setShowNewKeyDialog(!showNewKeyDialog)}
                className="bg-gradient-primary text-primary-foreground hover:opacity-90"
              >
                <Key className="mr-2 h-4 w-4" />
                Generate New Key
              </Button>
            </div>

            {/* New Key Form */}
            {showNewKeyDialog && (
              <div className="mb-6 p-4 bg-muted/20 rounded-lg border border-border animate-fade-in">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="keyName">API Key Name</Label>
                    <Input
                      id="keyName"
                      placeholder="e.g., Production API, Mobile App"
                      value={newKeyName}
                      onChange={(e) => setNewKeyName(e.target.value)}
                      className="mt-2"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={generateApiKey} className="bg-primary">
                      Generate
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setShowNewKeyDialog(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Keys List */}
            <div className="space-y-4">
              {apiKeys.map((apiKey) => (
                <div
                  key={apiKey.id}
                  className="p-4 bg-muted/10 rounded-lg border border-border hover:border-primary/50 transition-all"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-1">
                        {apiKey.name}
                      </h3>
                      <div className="flex items-center gap-2 mb-2">
                        <code className="text-sm bg-muted px-2 py-1 rounded font-mono">
                          {apiKey.key}
                        </code>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => copyToClipboard(apiKey.key)}
                          className="h-8 w-8 p-0"
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="flex gap-4 text-sm text-muted-foreground">
                        <span>Created: {apiKey.created}</span>
                        <span>•</span>
                        <span>{apiKey.calls.toLocaleString()} calls</span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Revoke
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
