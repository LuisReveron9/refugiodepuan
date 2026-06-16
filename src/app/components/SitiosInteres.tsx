import { MapPin } from "lucide-react";
import imgLaguna from "../../imports/lagunaislapuan.jpg";
import imgMilenio from "../../imports/milenio__2_.jpg";
import imgMonasterio from "../../imports/monasterio05.jpg";
import imgMuseo from "../../imports/museo.jpg";

const lugares = [
  {
    nombre: "Laguna e Isla de Puan",
    descripcion:
      "Gran espejo de agua de 700 hectáreas ideal para la pesca de pejerrey y deportes náuticos. En su centro se encuentra la Isla de Puan, una reserva natural y cultural con más de 100 especies de flora autóctona y senderos para caminatas guiadas.",
    imagen: imgLaguna,
    tag: "Naturaleza · Pesca · Náutica",
  },
  {
    nombre: "Templo Mirador Milenium",
    descripcion:
      "Inaugurado en 2010, este mirador único con rampa helicoidal ofrece vistas panorámicas de 360 grados de toda la ciudad y sus alrededores. Una parada imperdible en cualquier visita a Puan.",
    imagen: imgMilenio,
    tag: "Mirador · Vistas 360°",
  },
  {
    nombre: "Monasterio Santa Clara de Asís",
    descripcion:
      "Un punto clave del turismo religioso que invita a la reflexión y la tranquilidad. Ubicado en un entorno de paz absoluta, es uno de los destinos más visitados de la región sudoeste bonaerense.",
    imagen: imgMonasterio,
    tag: "Turismo religioso · Historia",
  },
  {
    nombre: "Museo Ignacio Balvidares",
    descripcion:
      "Primer Museo Municipal del distrito de Puan, inaugurado el 8 de diciembre de 1973. Alberga una importante colección patrimonial donada por Don Ignacio Balvidares, con objetos de valor histórico para Puan y toda la región.",
    imagen: imgMuseo,
    tag: "Patrimonio · Cultura local",
  },
];

export function SitiosInteres() {
  return (
    <section className="py-20 bg-[#f0e8d8]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <p className="text-[#c9a96e] tracking-[0.25em] uppercase text-xs mb-2">Explorá la región</p>
          <h2 className="text-3xl md:text-4xl text-[#3d2410]" style={{ fontFamily: "Georgia, serif" }}>
            Sitios de interés en Puan
          </h2>
          <div className="w-16 h-0.5 bg-[#c9a96e] mx-auto mt-4" />
          <p className="text-[#7a6050] text-sm mt-4 max-w-2xl mx-auto leading-relaxed">
            Puan, ubicado en el sudoeste de la provincia de Buenos Aires, es un destino ideal para el descanso y el ecoturismo, reconocido por su impresionante laguna, su isla natural y su rico patrimonio histórico.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {lugares.map((lugar) => (
            <div
              key={lugar.nombre}
              className="bg-white rounded-2xl overflow-hidden shadow-sm border border-[#e8d5be] flex flex-col group hover:shadow-md transition-shadow"
            >
              <div className="relative overflow-hidden h-48">
                <img
                  src={lugar.imagen}
                  alt={lugar.nombre}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <span className="absolute bottom-3 left-3 bg-[#c9a96e] text-[#1a0f08] text-[10px] font-medium px-2.5 py-1 rounded-full">
                  {lugar.tag}
                </span>
              </div>
              <div className="p-5 flex flex-col flex-1">
                <div className="flex items-start gap-2 mb-2">
                  <MapPin size={14} className="text-[#c9a96e] mt-0.5 shrink-0" />
                  <h3 className="text-[#3d2410] text-base leading-snug">{lugar.nombre}</h3>
                </div>
                <p className="text-[#7a6050] text-xs leading-relaxed flex-1">{lugar.descripcion}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 bg-white rounded-2xl p-6 border border-[#e8d5be] flex flex-col sm:flex-row items-center gap-4">
          <div className="text-[#8b5e3c] shrink-0">
            <MapPin size={32} />
          </div>
          <div className="flex-1 text-center sm:text-left">
            <p className="text-[#3d2410] text-sm">
              <strong>Refugio de Puan</strong> es el punto de partida ideal para descubrir todos estos atractivos. A una cuadra de la laguna y con acceso a toda la ciudad.
            </p>
          </div>
          <a
            href="#contacto"
            className="shrink-0 bg-[#8b5e3c] hover:bg-[#a06d47] text-white px-6 py-2.5 rounded-xl text-sm transition-colors whitespace-nowrap"
          >
            Reservar ahora
          </a>
        </div>
      </div>
    </section>
  );
}
