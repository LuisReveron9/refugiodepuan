import { useState } from "react";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

import img9 from "../../imports/9.jpg";
import img10 from "../../imports/10.jpg";
import img11 from "../../imports/11.jpg";
import img12 from "../../imports/12.jpg";
import img13 from "../../imports/13.jpg";
import img14 from "../../imports/14.jpg";
import img15 from "../../imports/15.jpg";
import img16 from "../../imports/16.jpg";
import imgTecho1 from "../../imports/Horno_laguna_desde_techo__2_.jpeg";
import imgTecho2 from "../../imports/Horno_desde_techo_a_laguna__2_.jpg";

const photos = [
  { src: imgTecho1, alt: "Vista a la laguna desde el techo" },
  { src: imgTecho2, alt: "Laguna de Puan a una cuadra" },
  { src: img12, alt: "Living con vista al parque" },
  { src: img15, alt: "Cocina completa" },
  { src: img10, alt: "Dormitorio king" },
  { src: img11, alt: "Habitación con vista" },
  { src: img16, alt: "Comedor y cocina" },
  { src: img9, alt: "Pasillo y baño" },
  { src: img13, alt: "Detalle interior" },
  { src: img14, alt: "Detalle decoración" },
];

export function Gallery() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (i: number) => setLightboxIndex(i);
  const closeLightbox = () => setLightboxIndex(null);

  const prev = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + photos.length) % photos.length);
  };

  const next = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % photos.length);
  };

  return (
    <section id="galeria" className="py-20 bg-[#f0e8d8]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-[#c9a96e] tracking-[0.25em] uppercase text-xs mb-2">El espacio</p>
          <h2 className="text-3xl md:text-4xl text-[#3d2410]" style={{ fontFamily: "Georgia, serif" }}>
            Galería de fotos
          </h2>
          <div className="w-16 h-0.5 bg-[#c9a96e] mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {photos.map((photo, i) => (
            <button
              key={i}
              onClick={() => openLightbox(i)}
              className={`relative overflow-hidden rounded-xl group cursor-pointer focus:outline-none ${
                i === 0 ? "md:col-span-2 md:row-span-2" : ""
              }`}
              style={{ aspectRatio: i === 0 ? undefined : "4/3" }}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                style={{ minHeight: i === 0 ? "400px" : "160px" }}
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                <ZoomIn size={32} className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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
            onClick={closeLightbox}
            aria-label="Cerrar"
          >
            <X size={24} />
          </button>
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white bg-white/10 rounded-full p-3 z-10"
            onClick={(e) => { e.stopPropagation(); prev(); }}
            aria-label="Anterior"
          >
            <ChevronLeft size={28} />
          </button>
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white bg-white/10 rounded-full p-3 z-10"
            onClick={(e) => { e.stopPropagation(); next(); }}
            aria-label="Siguiente"
          >
            <ChevronRight size={28} />
          </button>

          <img
            src={photos[lightboxIndex].src}
            alt={photos[lightboxIndex].alt}
            className="max-h-[88vh] max-w-[90vw] object-contain rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/60 text-sm">
            {lightboxIndex + 1} / {photos.length} — {photos[lightboxIndex].alt}
          </div>
        </div>
      )}
    </section>
  );
}
