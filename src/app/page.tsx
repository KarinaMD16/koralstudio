import { AppsStack } from "@/components/AppsStack";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { Contact, Footer, Principles, Studio } from "@/components/Sections";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Marquee />
        <Studio />
        <AppsStack />
        <Principles />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
