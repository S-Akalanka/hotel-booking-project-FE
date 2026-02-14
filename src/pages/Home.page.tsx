import { useRef, useEffect, useState } from "react";
import Hero from "@/components/Hero";
import HotelView from "@/components/HotelsView";
import { useSelector } from "react-redux";

export default function HomePage() {
  const resultRef = useRef<HTMLDivElement | null>(null);
  const [shouldScroll, setShouldScroll] = useState(false);

  const filter = useSelector((state: any) => state.filter);
  const query = useSelector((state: any) => state.aiSearch.query);

  const scrollToResults = () => {
    setShouldScroll(true);
  };

  useEffect(() => {
    if (shouldScroll && resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: "smooth" });
      setShouldScroll(false);
    }
  }, [shouldScroll, filter, query]);

  return (
    <main>
      <Hero onSearch={scrollToResults} />
      <HotelView resultRef={resultRef} />
    </main>
  );
}
