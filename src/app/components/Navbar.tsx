import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { href: "#inicio", label: "Inicio" },
  { href: "#galeria", label: "Galería" },
  { href: "#videos", label: "Videos" },
  { href: "#disponibilidad", label: "Disponibilidad" },
  { href: "#contacto", label: "Contacto" },
];

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-[#1a0f08]/95 shadow-lg backdrop-blur-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#inicio" className="flex flex-col leading-none">
          <span className="text-[#c9a96e] tracking-widest uppercase text-xs">Alquiler temporario</span>
          <span className="text-white tracking-wide text-lg">Refugio de Puan</span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-white/80 hover:text-[#c9a96e] transition-colors text-sm tracking-wide"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contacto"
            className="bg-[#c9a96e] text-[#1a0f08] px-5 py-2 rounded text-sm hover:bg-[#e0be88] transition-colors"
          >
            Reservar
          </a>
        </div>

        <button
          className="md:hidden text-white p-1"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menú"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-[#1a0f08] border-t border-white/10 px-6 pb-5 pt-2 flex flex-col gap-4">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="text-white/80 hover:text-[#c9a96e] transition-colors py-1 border-b border-white/10"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contacto"
            onClick={() => setMenuOpen(false)}
            className="bg-[#c9a96e] text-[#1a0f08] text-center px-5 py-2 rounded text-sm mt-1"
          >
            Reservar
          </a>
        </div>
      )}
    </nav>
  );
}
