import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import {
  ChevronLeft,
  ChevronRight,
  MapPin,
  Users,
  Maximize2,
} from "lucide-react";

import img4 from "../../imports/4.jpg";
import img11 from "../../imports/11.jpg";

import camaKing from "../../imports/camaking.jpeg";
import bano from "../../imports/bano.jpeg";

type Slide = {
  src: string;
  caption: string;
  position: string;
};

const slides: Slide[] = [
  {
    src: img4,
    caption: "Espacio exterior del alojamiento",
    position: "center center",
  },
  {
    src: camaKing,
    caption: "Dormitorio con cama king",
    position: "center center",
  },
  {
    src: img11,
    caption: "Habitación cálida",
    position: "center center",
  },
  {
    src: bano,
    caption: "Baño completo con ducha",
    position: "center center",
  },
];

export function Hero() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [current, setCurrent] = useState(0);

  const prev = useCallback(() => {
    emblaApi?.scrollPrev();
  }, [emblaApi]);

  const next = useCallback(() => {
    emblaApi?.scrollNext();
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setCurrent(emblaApi.selectedScrollSnap());
    };

    emblaApi.on("select", onSelect);
    onSelect();

    const timer = window.setInterval(() => {
      emblaApi.scrollNext();
    }, 5000);

    return () => {
      window.clearInterval(timer);
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  return (
    <section
      id="inicio"
      className="relative h-screen min-h-[600px] overflow-hidden"
    >
      <div className="overflow-hidden h-full" ref={emblaRef}>
        <div className="flex h-full">
          {slides.map((slide, index) => (
            <div key={index} className="flex-none w-full h-full relative">
              <img
                src={slide.src}
                alt={slide.caption}
                className="w-full h-full object-cover"
                style={{ objectPosition: slide.position }}
              />

              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/70" />
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/60 text-white p-2 rounded-full transition-all z-20"
        aria-label="Anterior"
        type="button"
      >
        <ChevronLeft size={28} />
      </button>

      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/60 text-white p-2 rounded-full transition-all z-20"
        aria-label="Siguiente"
        type="button"
      >
        <ChevronRight size={28} />
      </button>

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4 z-10 pointer-events-none">
        <p className="text-[#c9a96e] tracking-[0.3em] uppercase text-sm mb-3">
          Alquiler temporario · Puan, Bs As
        </p>

        <h1
          className="text-5xl md:text-7xl mb-4 drop-shadow-lg"
          style={{ fontFamily: "Georgia, serif" }}
        >
          Refugio de Puan
        </h1>

        <p className="text-white/90 text-lg md:text-xl max-w-xl mb-8 drop-shadow">
          A una cuadra de la Laguna · Frente al camping municipal · Rodeado de
          parque
        </p>

        <div className="flex flex-wrap gap-4 justify-center mb-10 pointer-events-auto">
          <div className="flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/30 rounded-full px-4 py-2 text-sm">
            <MapPin size={15} className="text-[#c9a96e]" />
            Puan, Buenos Aires
          </div>

          <div className="flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/30 rounded-full px-4 py-2 text-sm">
            <Users size={15} className="text-[#c9a96e]" />
            Ideal para parejas
          </div>

          <div className="flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/30 rounded-full px-4 py-2 text-sm">
            <Maximize2 size={15} className="text-[#c9a96e]" />
            Depto 50 m² + galería 60 m²
          </div>
        </div>

        <a
          href="#disponibilidad"
          className="pointer-events-auto bg-[#c9a96e] hover:bg-[#e0be88] text-[#1a0f08] px-10 py-4 rounded text-sm tracking-widest uppercase transition-colors"
        >
          Ver disponibilidad
        </a>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => emblaApi?.scrollTo(index)}
            aria-label={`Ir a imagen ${index + 1}`}
            type="button"
            className={`w-2 h-2 rounded-full transition-all ${
              index === current ? "bg-[#c9a96e] w-6" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
}