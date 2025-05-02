import Image from "next/image";
import Link from "next/link";
import { FileText, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionHeading from "@/components/ui/section-heading";
import BookPromotion from "@/components/home-page/book-promotion";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container py-16 md:py-24 space-y-16">
        {/* Heading */}
        <SectionHeading
          title={
            <span className="gradient-text text-4xl font-extrabold">
              About Dr. Das
            </span>
          }
          subtitle="Director of AIT Lab and Assistant Professor at Texas State University"
        />

        {/* About Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col justify-center">
            <p className="text-lg mb-4">
              I am Subasish. I grew up in Chattogram, Bangladesh. I am a
              tenure-track Assistant Professor of Civil Engineering program
              (Ingram School of Engineering) at Texas State University.
              Previously, I worked as an Associate Research Scientist at Texas
              A&M Transportation Institute (TTI) for almost 7 years. I am still
              affiliated with TTI as a part-time employee. I have more than 13
              years of experience related to roadway safety, traffic operation,
              and CAV technologies.
            </p>
            <p className="text-lg mb-4">
              My major areas of expertise include database management,
              statistical analysis, and machine learning with an emphasis on
              safety and transportation operations, spatial analysis with modern
              web GIS tools, computer programming (R, Python, VBA, HTML, and
              JavaScript), interactive data visualization, and deep learning
              tools for CV/AV technologies.
            </p>
            <p className="text-lg mb-4">
              I have published more than 120 technical reports and journal
              articles. I am an active member of ITE and ASCE. I am an Eno
              Fellow. I recently served as vice-president of membership of Young
              Professionals in Transportation Houston chapter.
            </p>
            <Link
              href="https://subasish.github.io/ait_lab/pdfs/Subasish%20Das%20CV%20revised.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="w-fit"
            >
              <Button className="text-white px-8 py-6 rounded-full group shadow-md hover:shadow-lg">
                <span>Resume</span>
                <FileText className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
          <div className="flex justify-center">
            <Image
              src="/images/das.jpg"
              alt="Dr. Subasish Das"
              width={400}
              height={400}
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>

        {/* Interview Section */}
        <section className="section-divider relative overflow-hidden">
          <div className="section-divider::before top-0"></div>
          <div className="absolute inset-0 bg-dots"></div>
          <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl opacity-50"></div>
          <div className="relative z-10">
            <SectionHeading title="Traffic Technology International Interview" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
              <div className="space-y-6">
                <p className="text-lg leading-relaxed">
                  Researchers at Texas A&M Transportation Institute are using AI
                  to predict exactly where and when crashes will occur so that
                  road authorities can prioritize funding for safety
                  improvements in a more targeted fashion than ever before.
                  Traffic Technology International interviewed Subasish Das on
                  this issue. This issue was featured in Texas Transportation
                  International's{" "}
                  <Link
                    href="https://tti.mydigitalpublication.co.uk/publication/?i=672384"
                    target="_blank"
                    rel="noreferrer"
                    className="underline inline-flex items-center text-blue-600 hover:text-blue-800"
                  >
                    September 2020
                    <ExternalLink className="ml-1 h-4 w-4" />
                  </Link>{" "}
                  issue.
                </p>

                <h3 className="text-xl font-bold">
                  Q1. Can AI algorithms deliver more accurate predictions?
                </h3>
                <p className="text-lg leading-relaxed">
                  In the conventional model we just use roadway geometric
                  information and traffic volume. But other data such as
                  operating speed — which is very important in predicting crash
                  severity — and weather conditions are never used in the
                  statistical model. In the AI tools we can import this kind of
                  granular information, which helps us to make it much more
                  accurate. In conventional statistical models, we develop
                  annual crash predictions. So, we can say that on that road,
                  annually, 20 crashes will happen. But in one AI project I
                  recently finished for USDOT for their Safety Data Initiative
                  project, we developed a daily model. And we are now trying to
                  get even more detail, down to daytime crashes versus nighttime
                  crashes.
                </p>

                <h3 className="text-xl font-bold">
                  Q2. Why AI in highway safety analysis?
                </h3>
                <p className="text-lg leading-relaxed">
                  Conventional statistical models cannot process big data and
                  data stream-related problems. We need some advanced AI to get
                  that done and from there we can offer predictions that are
                  daily or even hourly. Once the predictions are delivered, road
                  authorities can view them on a heat map to help decide in
                  which areas they will invest in countermeasures in an attempt
                  to improve safety and cool the accident hot spots.
                </p>
              </div>
              <div className="flex justify-center">
                <Image
                  src="/images/das_fea1.png"
                  alt="Dr. Das Interview"
                  width={500}
                  height={500}
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Book Section */}
      <BookPromotion />

      {/* Sponsors Section */}
      <div className="space-y-8 container pb-16 md:pb-24">
        <div className="flex justify-center aspect-[13/3.8] relative">
          <Image
            src="/images/spon.png"
            alt="AIT Lab Sponsors"
            fill
            className="rounded-lg object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
