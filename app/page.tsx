import Hero from "./components/Hero";
import Tagline from "./components/Tagline";
import About from "./components/About";
import FullBleed from "./components/FullBleed";

export default function Home() {
  return (
    <main>
      <Hero />
      <Tagline />
      <About />
      <FullBleed />
    </main>
  );
}
