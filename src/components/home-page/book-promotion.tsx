import Image from "next/image";
import { Button } from "@/components/ui/button";
import { BookOpen, ShoppingCart } from "lucide-react";
import Link from "next/link";

export default function BookPromotion() {
  return (
    <section className="section-divider dark-section relative overflow-hidden">
      <div className="section-divider::before top-0"></div>
      <div className="absolute inset-0 bg-dots"></div>
      <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl opacity-50"></div>

      <div className="container relative z-10">
        <div className="glass-card rounded-2xl p-8 md:p-12 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="inline-flex items-center gap-2 glass-card px-4 py-2 rounded-full mb-6">
                <BookOpen className="h-4 w-4 text-blue-500" />
                <span className="text-sm font-medium">New Book</span>
              </div>
              <h2 className="text-3xl font-bold tracking-tight mb-4 gradient-text">
                Artificial Intelligence in Highway Safety
              </h2>
              <h3 className="text-xl font-semibold mb-2">
                by Dr. Subasish Das
              </h3>
              <p className="text-foreground/70 mb-6">
                Artificial Intelligence in Highway Safety provides cutting-edge
                advances in highway safety using AI. The author is a highway
                safety expert, drawing attention to the predictive powers of AI
                techniques in solving complex problems for safety improvement.
              </p>
              <Link
                href={
                  "https://www.routledge.com/Artificial-Intelligence-in-Highway-Safety/Das/p/book/9780367436704"
                }
                target="_blank"
              >
                <Button className="glass-button text-foreground px-6 py-2 rounded-full group">
                  <span>Order Here</span>
                  <ShoppingCart className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
            <div className="flex justify-center">
              <div className="relative aspect-[2/1.4] h-full w-full glow glow-primary">
                <div className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl transform rotate-3 transition-transform hover:rotate-0">
                  <Image
                    src="/images/books/aihs1.png"
                    alt="Artificial Intelligence in Highway Safety book cover"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl transform -rotate-3 transition-transform hover:rotate-0">
                  <Image
                    src="/images/books/aihs1.png"
                    alt="Artificial Intelligence in Highway Safety book cover"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="section-divider::before bottom-0"></div>
    </section>
  );
}
