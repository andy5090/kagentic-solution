import Navigation from "~/common/components/navigation";
import Footer from "~/common/components/footer";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Bot,
  Brain,
  FileText,
  ShoppingCart,
  LineChart,
  Mail,
  Database,
  Shield,
} from "lucide-react";

const agentsData = [
  {
    icon: Brain,
    name: "Cognitive Assistant",
    category: "AI Reasoning",
    description:
      "Advanced reasoning agent for complex decision-making and problem-solving tasks.",
    capabilities: [
      "Multi-step reasoning",
      "Context awareness",
      "Decision trees",
      "Logic processing",
    ],
    pricing: "Enterprise",
  },
  {
    icon: FileText,
    name: "Document Processor",
    category: "Data Processing",
    description:
      "Intelligent document analysis, extraction, and summarization agent.",
    capabilities: [
      "OCR & extraction",
      "Smart summarization",
      "Multi-format support",
      "Data validation",
    ],
    pricing: "Pro",
  },
  {
    icon: ShoppingCart,
    name: "E-commerce Agent",
    category: "Business",
    description:
      "Automated product recommendations, inventory management, and customer insights.",
    capabilities: [
      "Product matching",
      "Inventory tracking",
      "Price optimization",
      "Customer analytics",
    ],
    pricing: "Pro",
  },
  {
    icon: LineChart,
    name: "Analytics Agent",
    category: "Data Science",
    description:
      "Real-time data analysis, predictive modeling, and business intelligence.",
    capabilities: [
      "Pattern detection",
      "Forecasting",
      "Anomaly detection",
      "Custom metrics",
    ],
    pricing: "Enterprise",
  },
  {
    icon: Mail,
    name: "Communication Agent",
    category: "Automation",
    description:
      "Smart email handling, response generation, and communication workflows.",
    capabilities: [
      "Email classification",
      "Auto-responses",
      "Sentiment analysis",
      "Priority routing",
    ],
    pricing: "Starter",
  },
  {
    icon: Database,
    name: "Data Integration Agent",
    category: "Infrastructure",
    description:
      "Seamless data synchronization across multiple platforms and databases.",
    capabilities: [
      "Real-time sync",
      "Data transformation",
      "API orchestration",
      "Error handling",
    ],
    pricing: "Pro",
  },
  {
    icon: Shield,
    name: "Security Agent",
    category: "Security",
    description:
      "Threat detection, compliance monitoring, and automated security responses.",
    capabilities: [
      "Threat detection",
      "Compliance checks",
      "Incident response",
      "Access control",
    ],
    pricing: "Enterprise",
  },
  {
    icon: Bot,
    name: "Custom Agent Builder",
    category: "Custom",
    description:
      "Build and deploy your own specialized agents tailored to your specific needs.",
    capabilities: [
      "No-code builder",
      "Custom workflows",
      "Integration ready",
      "Scalable deployment",
    ],
    pricing: "Contact",
  },
];

const AgentsAPI = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="pt-24 pb-16">
        {/* Header Section */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="text-center max-w-4xl mx-auto animate-fade-in-up">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              Multi-Agent API Suite
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 bg-gradient-primary bg-clip-text">
              Pre-Built AI Agents
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              Deploy production-ready AI agents in minutes. Choose from our
              curated collection of specialized agents or build your own.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-primary text-primary-foreground"
              >
                View Documentation
              </Button>
              <Button size="lg" variant="outline">
                Request Demo
              </Button>
            </div>
          </div>
        </section>

        {/* Agents Grid */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {agentsData.map((agent, index) => {
              const Icon = agent.icon;
              return (
                <Card
                  key={agent.name}
                  className="group hover:border-primary/50 transition-all duration-300 hover:shadow-glow animate-fade-in-up bg-card/50 backdrop-blur-sm"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between mb-4">
                      <div className="p-3 rounded-lg bg-primary/10 text-primary group-hover:scale-110 transition-transform duration-300">
                        <Icon className="w-6 h-6" />
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {agent.category}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl font-display">
                      {agent.name}
                    </CardTitle>
                    <CardDescription className="text-sm">
                      {agent.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-semibold mb-2 text-foreground">
                          Key Capabilities
                        </h4>
                        <ul className="space-y-1">
                          {agent.capabilities.map((capability) => (
                            <li
                              key={capability}
                              className="text-sm text-muted-foreground flex items-center"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-primary mr-2" />
                              {capability}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="pt-4 border-t border-border flex items-center justify-between">
                        <span className="text-sm font-semibold text-primary">
                          {agent.pricing}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="group-hover:text-primary"
                        >
                          Learn More →
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 mt-20">
          <Card className="bg-gradient-primary text-primary-foreground border-0 overflow-hidden relative">
            <div className="absolute inset-0 bg-grid-pattern opacity-10" />
            <CardContent className="p-8 md:p-12 relative z-10">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                  Need a Custom Agent?
                </h2>
                <p className="text-lg mb-8 text-primary-foreground/90">
                  Our team can build specialized agents tailored to your unique
                  business requirements.
                </p>
                <Button
                  size="lg"
                  variant="secondary"
                  className="bg-background text-foreground hover:bg-background/90"
                >
                  Contact Our Team
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AgentsAPI;
