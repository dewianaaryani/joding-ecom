import Image from "next/image";
import Hero from "./components/Hero";
import About from "./components/About";
import Navbar from "./components/Navbar";
export default function Home() {
  return (
    <main className="relative flex flex-col min-h-screen w-full overflow-x-hidden">
      <Navbar />
      <Hero />
      <About />
    </main>
  );
}
