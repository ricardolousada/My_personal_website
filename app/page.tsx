import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Credentials } from "@/components/Credentials";
import { Hero } from "@/components/Hero";
import { Impact } from "@/components/Impact";
import { Journey } from "@/components/Journey";
import { Portfolio } from "@/components/Portfolio";

export default function HomePage() {
  return (
    <main id="top">
      <Hero />
      <About />
      <Journey />
      <Impact />
      <Portfolio />
      <Credentials />
      <Contact />
    </main>
  );
}
