import Hero from "@/components/home-page/hero-new";
import Projects from "@/components/home-page/projects";
import News from "@/components/home-page/news";
import BookPromotion from "@/components/home-page/book-promotion";
import Contact from "@/components/home-page/contact";
import { Suspense } from "react";
import { Spinner } from "@/components/ui/spinner";

export default function Home() {
  return (
    <>
      <Hero />
      <Suspense fallback={<Spinner />}>
        <Projects />
      </Suspense>
      <Suspense fallback={<Spinner />}>
        <News />
      </Suspense>
      <BookPromotion />
      <Contact />
    </>
  );
}
