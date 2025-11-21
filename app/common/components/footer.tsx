import { Github, Linkedin } from "lucide-react";
import threadsIcon from "~/../public/assets/threads-logo-white.svg";

const Footer = () => {
  const footerLinks = {
    Product: ["Features", "Solutions", "Pricing", "API Docs"],
    Company: ["About", "Blog", "Careers", "Contact"],
    Resources: ["Documentation", "Guides", "Support", "Status"],
    Legal: ["Privacy", "Terms", "Security", "Compliance"],
  };

  return (
    <footer className="relative border-t border-border bg-card/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-1 space-y-4 text-left">
            <h3 className="text-xl font-display font-bold bg-gradient-primary bg-clip-text ">
              Andineering
            </h3>
            <p className="text-sm text-muted-foreground">
              Agentic AI 솔루션으로
              <br />
              DX를 넘어 AX를 탁월하게!
            </p>
            <div className="flex items-center gap-3">
              <a
                href="#"
                className="p-2 rounded-lg bg-card hover:bg-card/80 border border-border hover:border-primary/50 transition-colors"
                aria-label="Twitter"
              >
                <img src={threadsIcon} className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="p-2 rounded-lg bg-card hover:bg-card/80 border border-border hover:border-primary/50 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              {/* <a
                href="#"
                className="p-2 rounded-lg bg-card hover:bg-card/80 border border-border hover:border-primary/50 transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a> */}
            </div>
          </div>

          {/* Links Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="space-y-4">
              <h4 className="text-sm font-semibold">{category}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © 2025 Andineering. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
