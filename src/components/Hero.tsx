import { heroImages } from "@/data";
import { useEffect, useState } from "react";
import HeroFilters from "./HeroFilters";
import { Skeleton } from "./ui/skeleton";

type HeroProps = {
  onSearch: () => void;
};

function Hero({ onSearch }: HeroProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState<boolean[]>(
    new Array(heroImages.length).fill(false),
  );

  useEffect(() => {
    heroImages.forEach((imageUrl, index) => {
      const img = new Image();
      img.onload = () => {
        setImagesLoaded((prev) => {
          const newState = [...prev];
          newState[index] = true;
          return newState;
        });
      };
      img.src = imageUrl;
    });
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const allImagesLoaded = imagesLoaded.every((loaded) => loaded);

  return (
    <div className="relative w-full h-screen">
      <div className="relative w-full h-screen bg-black overflow-hidden z-0">
        {!allImagesLoaded ? (
          <div className="bg-black z-10">
            <Skeleton className="absolute inset-0 w-full h-full z-20 bg-gradient-to-br from-gray-800 via-gray-900 to-black" />
          </div>
        ) : (
          heroImages.map((image, index) => {
            return (
              <div
                key={index}
                className={`bg-black inset-0 absolute bg-cover bg-center transition-opacity duration-[10000ms] ease-in-out ${
                  index === currentSlide ? "opacity-100" : "opacity-0"
                } ${!imagesLoaded[index] ? "opacity-0" : ""}`}
                style={{ backgroundImage: `url(${image})` }}
              >
                <div className="absolute inset-0 bg-[var(--hero-background)]"></div>
              </div>
            );
          })
        )}
      </div>

      <div className="hero-title absolute top-1/5 left-1/9 mr-[40px] text-white flex flex-col text-8xl gap-4">
        <span>Discover</span>
        <span>Your Perfect</span>
        <span>Luxury Escape</span>
      </div>

      <div className="absolute inset-0 flex flex-col items-center justify-end mb-[5%] gap-5">
        <HeroFilters onSearch={onSearch} />
      </div>
    </div>
  );
}

export default Hero;
