import { heroImages } from "@/data";
import { useEffect, useState } from "react";

function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-screen" >
      <div className="relative w-full h-screen bg-black overflow-hidden z-0">
        {heroImages.map((image, index) => {
          return (
            <div
              key={index}
              className={`bg-black inset-0 absolute bg-cover bg-center transition-opacity duration-[3000ms] ease-in-out ${
                index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
              style={{ backgroundImage: `url(${image})` }}
            >
              <div className="absolute inset-0 bg-black/30"></div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Hero;
