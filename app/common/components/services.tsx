import { Card } from "@/components/ui/card";
import { Bot, Code2, Workflow, Zap } from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: Bot,
      title: "Multi-Agent APIs",
      description:
        "Ready-made Agentic AI agents that connect to your systems instantly. Start automating complex workflows today—no lengthy development cycles.",
      features: [
        "Pre-built intelligent workflows",
        "Connect in minutes, not months",
        "Grows with your business",
      ],
    },
    {
      icon: Code2,
      title: "Custom Development",
      description:
        "We build AI-powered apps that solve your specific challenges. From web to mobile, our solutions scale as you grow.",
      features: [
        "Web applications",
        "Mobile apps",
        "Cloud-ready infrastructure",
      ],
    },
    {
      icon: Workflow,
      title: "AI Transformation",
      description:
        "We help you identify where Agentic AI can make the biggest impact—then we implement it. Transform how your team works, not just your tech stack.",
      features: [
        "Identify high-impact opportunities",
        "Custom AI strategy",
        "End-to-end implementation",
      ],
    },
    {
      icon: Zap,
      title: "FDE Support",
      description:
        "We provide FDE like support to our customers. We are available to discuss and analyze fundamental problems and provide solutions.",
      features: [
        "Always-on support",
        "Fundamental problem analysis",
        "Solution implementation",
      ],
    },
  ];

  return (
    <section id="services" className="relative py-20 md:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold">
            Our{" "}
            <span className="bg-gradient-primary bg-clip-text ">Solutions</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Everything you need to deploy Agentic AI agents that work
            autonomously and deliver real results
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <Card
              key={index}
              className="group relative bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 transition-all duration-300 p-8 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Glow effect on hover */}
              <div className="absolute inset-0 bg-gradient-radial opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg"></div>

              <div className="relative space-y-6">
                {/* Icon */}
                <div className="inline-flex p-3 rounded-xl bg-gradient-primary/10 group-hover:bg-gradient-primary/20 transition-colors">
                  <service.icon className="w-8 h-8 text-primary" />
                </div>

                {/* Content */}
                <div className="space-y-3">
                  <h3 className="text-2xl font-display font-bold">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Features */}
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-center gap-2 text-sm text-muted-foreground"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
