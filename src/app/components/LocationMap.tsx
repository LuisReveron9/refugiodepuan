import { MapPin, ExternalLink } from "lucide-react";

const MAPS_SHARE_URL = "https://maps.app.goo.gl/ZNcVPD4nV4fd1m548";

export function LocationMap() {
  return (
    <section className="py-20 bg-[#1a0f08]">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-[#c9a96e] tracking-[0.25em] uppercase text-xs mb-2">Cómo llegar</p>
          <h2 className="text-3xl md:text-4xl text-white" style={{ fontFamily: "Georgia, serif" }}>
            Ubicación
          </h2>
          <div className="w-16 h-0.5 bg-[#c9a96e] mx-auto mt-4" />
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {[
            { label: "Dirección", value: "Puan, Pcia. de Buenos Aires", sub: "A 1 cuadra de la Laguna" },
            { label: "Referencia", value: "Frente al camping municipal", sub: "Rodeado de parque" },
            { label: "Acceso", value: "Desde Bahía Blanca", sub: "Aprox. 100 km por Ruta 35" },
          ].map((item) => (
            <div key={item.label} className="bg-[#2d1f14] rounded-xl p-5 border border-[#c9a96e]/15">
              <div className="flex items-center gap-2 mb-2">
                <MapPin size={15} className="text-[#c9a96e]" />
                <span className="text-[#c9a96e] text-xs uppercase tracking-widest">{item.label}</span>
              </div>
              <p className="text-white text-sm">{item.value}</p>
              <p className="text-white/50 text-xs mt-1">{item.sub}</p>
            </div>
          ))}
        </div>

        <div className="rounded-2xl overflow-hidden border border-[#c9a96e]/20 shadow-2xl">
          <iframe
            title="Ubicación Refugio de Puan"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d664.9927067834426!2d-62.774896240703306!3d-37.54902646345091!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95ebd9015a15c4c3%3A0xc17006314fa00316!2sJuanena%20769%2C%20B8180%20Puan%2C%20Provincia%20de%20Buenos%20Aires!5e0!3m2!1ses!2sar!4v1781615885997!5m2!1ses!2sar"
            width="100%"
            height="420"
            style={{ border: 0, display: "block" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        <div className="text-center mt-5">
          <a
            href={MAPS_SHARE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[#c9a96e] hover:text-[#e0be88] text-sm transition-colors"
          >
            <ExternalLink size={15} />
            Ver ubicación exacta en Google Maps
          </a>
        </div>
      </div>
    </section>
  );
}
