import Image from "next/image";
import Hero from "./components/Hero";
import About from "./components/About";
import Navbar from "./components/Navbar";
import Catalog from "./components/Catalog";
import Ads from "./components/Ads";
import Pricing from "./components/Pricing";
import Footer from "./components/Footer";
export default function Home() {
  return (
    <main className="relative flex flex-col min-h-screen w-full overflow-x-hidden">
      <Navbar />
      <Hero />
      <About />
      <Catalog />
      <Pricing />
      <Ads />
      <Footer />
    </main>
  );
}
