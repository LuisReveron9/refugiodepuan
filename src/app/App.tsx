import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Amenities } from "./components/Amenities";
import { Gallery } from "./components/Gallery";
import { VideoSection } from "./components/VideoSection";
import { SitiosInteres } from "./components/SitiosInteres";
import { AvailabilityCalendar } from "./components/AvailabilityCalendar";
import { LocationMap } from "./components/LocationMap";
import { Contact } from "./components/Contact";
import { WhatsAppButton } from "./components/WhatsAppButton";

export default function App() {
  return (
    <div className="min-h-screen bg-[#fdf8f3]">
      <Navbar />
      <Hero />
      <Amenities />
      <Gallery />
      <VideoSection />
      <SitiosInteres />
      <AvailabilityCalendar />
      <LocationMap />
      <Contact />

      <footer className="bg-[#1a0f08] text-white/50 py-8 text-center">
        <p className="text-[#c9a96e] mb-1" style={{ fontFamily: "Georgia, serif" }}>
          Refugio de Puan
        </p>
        <p className="text-xs">Puan, Buenos Aires · Depto 50 m² + galería 60 m² · A 1 cuadra de la laguna · Mascotas bienvenidas</p>
        <p className="text-xs mt-3 opacity-50">© {new Date().getFullYear()} — Todos los derechos reservados</p>
      </footer>

      <WhatsAppButton />
    </div>
  );
}
