import { MapPin, Mail, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Contact() {
  return (
    <section className="section-divider light-section relative">
      <div className="section-divider::before top-0"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl opacity-50"></div>

      <div className="container relative z-10">
        <h2 className="text-3xl font-bold tracking-tight mb-12 gradient-text text-center">
          Contact Us
        </h2>

        <div className="glass-card rounded-2xl overflow-hidden shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center glass-card shrink-0">
                    <MapPin className="h-5 w-5 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">Visit Us</h3>
                    <p className="text-foreground/70">
                      Artificial Intelligence in Transportation Lab,
                      <br />
                      Roy F Mitte Building, Room #5246,
                      <br />
                      Texas State University, San Marcos, TX 78666
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center glass-card shrink-0">
                    <Mail className="h-5 w-5 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">Email Us</h3>
                    <Link
                      href="mailto:subasish@txstate.edu"
                      className="text-blue-500 hover:underline"
                    >
                      subasish@txstate.edu
                    </Link>
                  </div>
                </div>
                {/* 
                <Button className="glass-button text-foreground rounded-full group w-full mt-4">
                  <span>Schedule a Meeting</span>
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button> */}
              </div>
            </div>

            <div className="h-64 md:h-auto bg-muted relative overflow-hidden">
              {/* Google Maps embed */}
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3464.4861074493563!2d-97.94362972426395!3d29.889040027750343!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x865ca89fb8aae97d%3A0xbd648f203ba65841!2sRoy%20F.%20Mitte%20Building%2C%20San%20Marcos%2C%20TX%2078666!5e0!3m2!1sen!2sus!4v1699142889165!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0, filter: "blur(1.5px)" }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0"
                title="AIT Lab Location"
              />
              {/* Subtle overlay for better button visibility */}
              <div className="absolute inset-0 bg-blue-500/5 backdrop-blur-[2px]"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Link
                  href="https://maps.app.goo.gl/pqQ6GK7BrV91L3pSA"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="glass-button text-foreground rounded-full group">
                    <span>View on Google Maps</span>
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="section-divider::before bottom-0"></div>
    </section>
  );
}
