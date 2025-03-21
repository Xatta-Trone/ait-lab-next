import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="py-40 md:py-48 relative overflow-hidden min-h-[100vh]">
      {/* Background elements */}
      <div className="absolute inset-0 -z-50 bg-[url('/hero_vid.gif')] bg-cover bg-center"></div>
      <div className="absolute inset-0 bg-black/30 dark:bg-black/30"></div>
      <div className="absolute inset-0 bg-gradient-mesh"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl dark:opacity-50 -z-40"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl dark:opacity-50 -z-40"></div>
      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 gradient-text">
            Artificial Intelligence <br className="hidden sm:block" />
            in Transportation Lab
          </h1>
          <div className="space-y-6 text-lg">
            <p className="font-medium text-xl dark:text-foreground/80 text-white">
              Advancing transportation through cutting-edge AI research
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <div className="glass-card-hero text-black dark:text-blue-200 px-6 py-3 rounded-full shadow-sm text-base">
                Causal Artificial Intelligence
              </div>
              <div className="glass-card-hero text-black dark:text-blue-200 px-6 py-3 rounded-full shadow-sm text-base">
                Transportation Safety and Operations
              </div>
              <div className="glass-card-hero text-black dark:text-blue-200 px-6 py-3 rounded-full shadow-sm text-base">
                Infrastructure readiness for disruptive technologies
              </div>
            </div>

            <div className="pt-8 flex flex-wrap justify-center gap-4">
              <Link href="/projects">
                <Button className="text-white px-8 py-6 rounded-full group shadow-md hover:shadow-lg">
                  <span>Explore Our Research</span>
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/publications">
                <Button className="glass-button-hero text-foreground hover:text-white px-8 py-6 rounded-full group shadow-md hover:shadow-lg">
                  <span>View Publications</span>
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
