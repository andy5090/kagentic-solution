import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 md:pt-20">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-card">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_110%)] opacity-20"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float"></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "3s" }}
        ></div>
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-5xl mx-auto space-y-8 animate-fade-in-up">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/50 backdrop-blur-sm border border-border">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-muted-foreground">
              Agentic AI Solutions
            </span>
          </div>

          {/* Main headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-black leading-tight">
            Your business, powered by Agentic AI
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Move beyond digital transformation to agentic AI. Build autonomous
            systems that think, act, and adapt—so you can focus on what matters
            most.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button
              size="lg"
              className="bg-gradient-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity group min-w-[200px]"
            >
              Get started
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-border hover:bg-card/50 min-w-[200px]"
            >
              Learn more
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 pt-12 max-w-3xl mx-auto">
            <div className="space-y-2">
              <div className="text-3xl md:text-4xl font-display font-bold text-primary">
                100+
              </div>
              <div className="text-sm text-muted-foreground">
                Ready-to-use agents
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl md:text-4xl font-display font-bold text-secondary">
                24/7
              </div>
              <div className="text-sm text-muted-foreground">
                FDE like Expert support
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl md:text-4xl font-display font-bold text-primary">
                50+
              </div>
              <div className="text-sm text-muted-foreground">
                Easy integration
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
