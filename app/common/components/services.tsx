import { Card } from "@/components/ui/card";
import { Bot, Code2, Workflow, Zap } from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: Bot,
      title: "Multi-Agent APIs",
      description:
        "Pre-defined, ready-made agentic AI APIs that seamlessly integrate into your existing infrastructure. Deploy sophisticated AI workflows in minutes, not months.",
      features: [
        "Pre-built Workflows",
        "Quick Integration",
        "Scalable Architecture",
      ],
    },
    {
      icon: Code2,
      title: "Custom Development",
      description:
        "Full-stack web and mobile app development powered by AI. We build modern, scalable applications tailored to your unique business needs.",
      features: ["Web Applications", "Mobile Apps", "Cloud Solutions"],
    },
    {
      icon: Workflow,
      title: "AI Transformation",
      description:
        "Strategic consulting and implementation to transform your business processes with agentic AI. Move beyond digital to AI-first operations.",
      features: ["Process Automation", "AI Strategy", "Implementation Support"],
    },
    {
      icon: Zap,
      title: "Enterprise Solutions",
      description:
        "Enterprise-grade AI solutions designed for scale, security, and compliance. Built for organizations ready to lead in the AI era.",
      features: ["High Performance", "Secure & Compliant", "24/7 Support"],
    },
  ];

  return (
    <section id="services" className="relative py-20 md:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold">
            Our{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Solutions
            </span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Comprehensive AI services designed to accelerate your transformation
            journey
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
