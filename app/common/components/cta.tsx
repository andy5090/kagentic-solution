import { Button } from "@/components/ui/button";
import { ArrowRight, Mail } from "lucide-react";

const CTA = () => {
  return (
    <section className="relative py-20 md:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative max-w-5xl mx-auto">
          {/* Background glow */}
          <div className="absolute inset-0 bg-gradient-primary opacity-10 blur-3xl rounded-3xl"></div>

          {/* Content */}
          <div className="relative bg-card/50 backdrop-blur-sm border border-border rounded-3xl p-8 md:p-16 text-center space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold">
                Ready to transform with{" "}
                <span className="bg-gradient-primary bg-clip-text ">
                  Agentic AI?
                </span>
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                Join companies using agentic AI to automate workflows, reduce
                costs, and unlock new possibilities. Let's make it happen
                together.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="min-w-[200px]">
                <Mail className="mr-2 h-5 w-5" />
                Contact Us
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button size="lg" variant="outline" className="min-w-[200px]">
                Schedule Demo
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="pt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                No credit card required
              </div>
              <div className="flex items-center gap-2">
                <div
                  className="w-2 h-2 rounded-full bg-primary animate-pulse"
                  style={{ animationDelay: "1s" }}
                ></div>
                Free consultation
              </div>
              <div className="flex items-center gap-2">
                <div
                  className="w-2 h-2 rounded-full bg-primary animate-pulse"
                  style={{ animationDelay: "2s" }}
                ></div>
                Get started in minutes
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
