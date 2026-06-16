import { useState } from "react";
import { Send, MapPin, Phone, Mail, CheckCircle } from "lucide-react";

const WHATSAPP_NUMBER = "5492923419285";

export function Contact() {
  const [form, setForm] = useState({ nombre: "", email: "", telefono: "", mensaje: "", fechas: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = encodeURIComponent(
      `Hola! Me llamo ${form.nombre} y quiero consultar sobre disponibilidad en Refugio de Puan.${
        form.fechas ? ` Fechas: ${form.fechas}.` : ""
      }${form.mensaje ? ` ${form.mensaje}` : ""} Mi email: ${form.email}. Tel: ${form.telefono || "no indicado"}.`
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, "_blank");
    setSubmitted(true);
  };

  return (
    <section id="contacto" className="py-20 bg-[#f0e8d8]">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-[#c9a96e] tracking-[0.25em] uppercase text-xs mb-2">Hablemos</p>
          <h2 className="text-3xl md:text-4xl text-[#3d2410]" style={{ fontFamily: "Georgia, serif" }}>
            Contacto y reservas
          </h2>
          <div className="w-16 h-0.5 bg-[#c9a96e] mx-auto mt-4" />
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          <div className="space-y-6">
            <p className="text-[#5a3e28] leading-relaxed">
              ¿Te interesa reservar o querés consultar disponibilidad? Escribinos por WhatsApp y te respondemos a la brevedad.
            </p>

            <div className="space-y-4">
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 bg-white rounded-xl p-4 border border-[#e8d5be] hover:border-[#25D366] transition-colors group"
              >
                <div className="w-11 h-11 rounded-full bg-[#25D366]/10 flex items-center justify-center group-hover:bg-[#25D366]/20 transition-colors">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-[#25D366]">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-[#a08060]">WhatsApp principal</p>
                  <p className="text-[#3d2410] text-sm font-medium">2923 419285</p>
                </div>
              </a>

              <a
                href="https://wa.me/5492923581996"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 bg-white rounded-xl p-4 border border-[#e8d5be] hover:border-[#25D366] transition-colors group"
              >
                <div className="w-11 h-11 rounded-full bg-[#25D366]/10 flex items-center justify-center group-hover:bg-[#25D366]/20 transition-colors">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-[#25D366]">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-[#a08060]">WhatsApp alternativo</p>
                  <p className="text-[#3d2410] text-sm font-medium">2923 581996</p>
                </div>
              </a>

              <div className="flex items-center gap-4 bg-white rounded-xl p-4 border border-[#e8d5be]">
                <div className="w-11 h-11 rounded-full bg-[#c9a96e]/10 flex items-center justify-center">
                  <MapPin size={18} className="text-[#8b5e3c]" />
                </div>
                <div>
                  <p className="text-xs text-[#a08060]">Ubicación</p>
                  <p className="text-[#3d2410] text-sm">Puan, Buenos Aires, Argentina</p>
                  <p className="text-xs text-[#a08060]">A 1 cuadra de la Laguna · Frente al camping municipal</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-7 shadow-sm border border-[#e8d5be]">
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-10 gap-4">
                <CheckCircle size={48} className="text-green-500" />
                <h3 className="text-[#3d2410]">¡Mensaje enviado!</h3>
                <p className="text-[#7a6050] text-sm">Se abrió WhatsApp con tu consulta. ¡Te respondemos pronto!</p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-2 text-[#c9a96e] text-sm underline"
                >
                  Enviar otra consulta
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-[#7a6050] mb-1">Nombre *</label>
                    <input
                      name="nombre"
                      required
                      value={form.nombre}
                      onChange={handleChange}
                      placeholder="Tu nombre"
                      className="w-full border border-[#e8d5be] rounded-lg px-3 py-2.5 text-sm text-[#3d2410] bg-[#fdf8f3] focus:outline-none focus:border-[#c9a96e] transition-colors placeholder-[#c0a888]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-[#7a6050] mb-1">Teléfono</label>
                    <input
                      name="telefono"
                      value={form.telefono}
                      onChange={handleChange}
                      placeholder="+54 9 ..."
                      className="w-full border border-[#e8d5be] rounded-lg px-3 py-2.5 text-sm text-[#3d2410] bg-[#fdf8f3] focus:outline-none focus:border-[#c9a96e] transition-colors placeholder-[#c0a888]"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-[#7a6050] mb-1">Email *</label>
                  <input
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="tu@email.com"
                    className="w-full border border-[#e8d5be] rounded-lg px-3 py-2.5 text-sm text-[#3d2410] bg-[#fdf8f3] focus:outline-none focus:border-[#c9a96e] transition-colors placeholder-[#c0a888]"
                  />
                </div>
                <div>
                  <label className="block text-xs text-[#7a6050] mb-1">Fechas deseadas</label>
                  <input
                    name="fechas"
                    value={form.fechas}
                    onChange={handleChange}
                    placeholder="Ej: 15 al 17 de julio"
                    className="w-full border border-[#e8d5be] rounded-lg px-3 py-2.5 text-sm text-[#3d2410] bg-[#fdf8f3] focus:outline-none focus:border-[#c9a96e] transition-colors placeholder-[#c0a888]"
                  />
                </div>
                <div>
                  <label className="block text-xs text-[#7a6050] mb-1">Mensaje</label>
                  <textarea
                    name="mensaje"
                    rows={3}
                    value={form.mensaje}
                    onChange={handleChange}
                    placeholder="Contanos algo más sobre tu estadía..."
                    className="w-full border border-[#e8d5be] rounded-lg px-3 py-2.5 text-sm text-[#3d2410] bg-[#fdf8f3] focus:outline-none focus:border-[#c9a96e] transition-colors placeholder-[#c0a888] resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#8b5e3c] hover:bg-[#a06d47] text-white py-3 rounded-xl text-sm flex items-center justify-center gap-2 transition-colors"
                >
                  <Send size={16} />
                  Enviar consulta por WhatsApp
                </button>
                <p className="text-center text-xs text-[#a08060]">
                  Al enviar, se abrirá WhatsApp con tu mensaje.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
