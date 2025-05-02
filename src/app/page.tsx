import Hero from "@/components/home-page/hero-new";
import Projects from "@/components/home-page/projects";
import News from "@/components/home-page/news";
import BookPromotion from "@/components/home-page/book-promotion";
import Contact from "@/components/home-page/contact";
import { Suspense } from "react";
import { Spinner } from "@/components/ui/spinner";

export default function Home() {
  const books = [
    {
      title:
        "Urban Human Mobility: Practices, Analytics, and Strategies for Smart Cities",
      author: "X. Huang, X. Ye, K. Stewart, S. Das",
      description:
        "This comprehensive handbook explores human mobility in urban contexts, covering fundamental concepts, methods, and models. It presents insights into predictive analytics, AI, Machine Learning, and smart city innovations, offering both theoretical frameworks and practical applications for urban planning and development.",
      link: "https://www.routledge.com/Urban-Human-Mobility-Practices-Analytics-and-Strategies-for-Smart-Cities/Huang-Ye-Stewart-Das/p/book/9781032821627",
      image: "/images/books/urban_book.jpg",
    },
  ];
  return (
    <>
      <Hero />
      <Suspense fallback={<Spinner />}>
        <Projects />
      </Suspense>
      <Suspense fallback={<Spinner />}>
        <News />
      </Suspense>
      <BookPromotion books={books} />
      <Contact />
    </>
  );
}
