import { useState, useEffect } from "react";

function Hero() {
  const images = [
    "/home1.avif",
    "/home2.avif",
    "/home3.jpg",
    "/home4.jpg",
    "/home5.jpg"
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-[80vh] overflow-hidden">
      <img
        src={images[current]}
        className="w-full h-full object-cover brightness-95"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex flex-col justify-center items-center text-white text-center">
        <h1 className="text-4xl font-bold mb-4">
          Find Your Perfect Home
        </h1>

        <p className="mb-6">
          Buy, Rent, or Sell properties easily with HomeLink
        </p>

        <button className="bg-blue-600 px-6 py-3 rounded-lg">
          Explore Now
        </button>
      </div>
    </div>
  );
}

export default Hero;