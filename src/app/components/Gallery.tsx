import { useState } from "react";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

import img11 from "../../imports/11.jpg";
import img12 from "../../imports/12.jpg";
import img13 from "../../imports/13.jpg";
import img14 from "../../imports/14.jpg";
import img3 from "../../imports/3.jpg";
import img4 from "../../imports/4.jpg";
import img5 from "../../imports/5.jpg";
import img7 from "../../imports/7.jpg";
import img8 from "../../imports/8.jpg";

import bano from "../../imports/bano.jpeg";
import camaKing from "../../imports/camaking.jpeg";
import lavarropas from "../../imports/lavarropas.jpeg";

import imgTecho1 from "../../imports/Horno_laguna_desde_techo__2_.jpeg";
import imgTecho2 from "../../imports/Horno_desde_techo_a_laguna__2_.jpg";

const photos = [
  {
    src: imgTecho1,
    alt: "Vista a la laguna desde el techo",
  },
  {
    src: imgTecho2,
    alt: "Horno y vista hacia la laguna",
  },
  {
    src: img4,
    alt: "Exterior del alojamiento",
  },
  {
    src: img12,
    alt: "Espacio exterior cerca de la laguna",
  },
  {
    src: camaKing,
    alt: "Dormitorio con cama king",
  },
  {
    src: img11,
    alt: "Habitación cálida",
  },
  {
    src: bano,
    alt: "Baño completo con ducha",
  },
  {
    src: lavarropas,
    alt: "Lavadero con lavarropas",
  },
  {
    src: img13,
    alt: "Detalle interior del alojamiento",
  },
  {
    src: img14,
    alt: "Detalle de decoración",
  },
  {
    src: img3,
    alt: "Galería y parque",
  },
  {
    src: img5,
    alt: "Rincón del alojamiento",
  },
  {
    src: img7,
    alt: "Ambiente del refugio",
  },
  {
    src: img8,
    alt: "Espacio exterior del refugio",
  },
];

export function Gallery() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const prev = () => {
    if (lightboxIndex === null) return;

    setLightboxIndex(
      (lightboxIndex - 1 + photos.length) % photos.length
    );
  };

  const next = () => {
    if (lightboxIndex === null) return;

    setLightboxIndex((lightboxIndex + 1) % photos.length);
  };

  return (
    <section id="galeria" className="py-20 bg-[#f0e8d8]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-[#c9a96e] tracking-[0.25em] uppercase text-xs mb-2">
            El espacio
          </p>

          <h2
            className="text-3xl md:text-4xl text-[#3d2410]"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Galería de fotos
          </h2>

          <div className="w-16 h-0.5 bg-[#c9a96e] mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {photos.map((photo, index) => (
            <button
              key={index}
              onClick={() => openLightbox(index)}
              className={`relative overflow-hidden rounded-xl group cursor-pointer focus:outline-none ${
                index === 0 ? "md:col-span-2 md:row-span-2" : ""
              }`}
              style={{ aspectRatio: index === 0 ? undefined : "4/3" }}
              type="button"
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                style={{ minHeight: index === 0 ? "400px" : "160px" }}
              />

              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                <ZoomIn
                  size={32}
                  className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
              </div>
            </button>
          ))}
        </div>
      </div>

      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 bg-black/95 z-[100] flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <button
            className="absolute top-4 right-4 text-white/80 hover:text-white bg-white/10 rounded-full p-2 z-10"
            onClick={(event) => {
              event.stopPropagation();
              closeLightbox();
            }}
            aria-label="Cerrar"
            type="button"
          >
            <X size={24} />
          </button>

          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white bg-white/10 rounded-full p-3 z-10"
            onClick={(event) => {
              event.stopPropagation();
              prev();
            }}
            aria-label="Anterior"
            type="button"
          >
            <ChevronLeft size={28} />
          </button>

          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white bg-white/10 rounded-full p-3 z-10"
            onClick={(event) => {
              event.stopPropagation();
              next();
            }}
            aria-label="Siguiente"
            type="button"
          >
            <ChevronRight size={28} />
          </button>

          <img
            src={photos[lightboxIndex].src}
            alt={photos[lightboxIndex].alt}
            className="max-h-[88vh] max-w-[90vw] object-contain rounded-lg shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          />

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/60 text-sm text-center px-4">
            {lightboxIndex + 1} / {photos.length} —{" "}
            {photos[lightboxIndex].alt}
          </div>
        </div>
      )}
    </section>
  );
}