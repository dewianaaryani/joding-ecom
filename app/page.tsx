import Image from "next/image";
import Hero from "./components/Hero";
export default function Home() {
  return (
    <main className="relative flex flex-col min-h-screen w-full overflow-x-hidden">
      <Hero />
    </main>
  );
}
