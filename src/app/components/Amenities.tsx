import {
  Wifi,
  Tv,
  UtensilsCrossed,
  Wind,
  Waves,
  Bed,
  Car,
  Coffee,
  Flame,
  ShowerHead,
  WashingMachine,
  Camera,
  Microwave,
  PawPrint,
  Trees,
  Fence,
} from "lucide-react";

const features = [
  { icon: Bed, label: "Cama king matrimonial" },
  { icon: Car, label: "Cochera cubierta" },
  { icon: Wifi, label: "Wi-Fi incluido" },
  { icon: Tv, label: "Google TV" },
  { icon: Flame, label: "Calefacción" },
  { icon: UtensilsCrossed, label: "Cocina equipada" },
  { icon: Coffee, label: "Cafetera y tostador" },
  { icon: Microwave, label: "Microondas" },
  { icon: WashingMachine, label: "Lavarropas" },
  { icon: ShowerHead, label: "Baño completo" },
  { icon: Fence, label: "Patio cercado" },
  { icon: Camera, label: "Cámaras de seguridad" },
  { icon: Trees, label: "Rodeado de parque" },
  { icon: Waves, label: "Vista a la laguna" },
  { icon: PawPrint, label: "Se aceptan mascotas" },
];

export function Amenities() {
  return (
    <section className="py-20 bg-[#fdf8f3]">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-14">
          <p className="text-[#c9a96e] tracking-[0.25em] uppercase text-xs mb-2">Lo que incluye</p>
          <h2 className="text-3xl md:text-4xl text-[#3d2410]" style={{ fontFamily: "Georgia, serif" }}>
            Todo para tu escapada perfecta
          </h2>
          <div className="w-16 h-0.5 bg-[#c9a96e] mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4 mb-16">
          {features.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex flex-col items-center gap-3 p-4 rounded-xl bg-[#f5ece0] hover:bg-[#ede0cc] transition-colors group"
            >
              <div className="w-11 h-11 rounded-full bg-[#c9a96e]/20 flex items-center justify-center group-hover:bg-[#c9a96e]/40 transition-colors">
                <Icon size={20} className="text-[#8b5e3c]" />
              </div>
              <span className="text-[#5a3e28] text-xs text-center leading-snug">{label}</span>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white border border-[#e8d5be] rounded-2xl p-7 shadow-sm">
            <div className="w-8 h-0.5 bg-[#c9a96e] mb-4" />
            <h3 className="text-[#3d2410] mb-2">Ubicación privilegiada</h3>
            <p className="text-[#7a6050] text-sm leading-relaxed">
              A una cuadra de la Laguna de Puan, frente al camping municipal y rodeado de parque. Galería semi cubierta de 60 m² para disfrutar el paisaje.
            </p>
          </div>
          <div className="bg-white border border-[#e8d5be] rounded-2xl p-7 shadow-sm">
            <div className="w-8 h-0.5 bg-[#c9a96e] mb-4" />
            <h3 className="text-[#3d2410] mb-2">Escapadas en pareja</h3>
            <p className="text-[#7a6050] text-sm leading-relaxed">
              Depto de 50 m² diseñado para dos, con cama king, cocina completa y todo el confort. Paz, silencio y naturaleza a metros de la laguna.
            </p>
          </div>
          <div className="bg-white border border-[#e8d5be] rounded-2xl p-7 shadow-sm">
            <div className="w-8 h-0.5 bg-[#c9a96e] mb-4" />
            <h3 className="text-[#3d2410] mb-2">Mascotas bienvenidas</h3>
            <p className="text-[#7a6050] text-sm leading-relaxed">
              Viajá con tu mascota. Patio cercado y espacios verdes para que disfruten juntos. A pocos km de Bahía Blanca, Pigüé y la región.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
