import { useEffect, useState } from "react";
import { DayPicker, DateRange } from "react-day-picker";
import { es } from "date-fns/locale";
import { addDays, isSameDay, parseISO } from "date-fns";
import "react-day-picker/dist/style.css";
import { Info, CheckCircle, XCircle } from "lucide-react";
import { supabase } from "../../lib/supabaseClient";

type BookedRange = {
  from: Date;
  to: Date;
};

type ReservationRow = {
  check_in: string;
  check_out: string;
};

export function AvailabilityCalendar() {
  const [range, setRange] = useState<DateRange | undefined>();
  const [month, setMonth] = useState<Date>(new Date());
  const [bookedRanges, setBookedRanges] = useState<BookedRange[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchReservations() {
      setLoading(true);

      const { data, error } = await supabase
        .from("reservations")
        .select("check_in, check_out");

      if (error) {
        console.error("Error cargando reservas:", error.message);
        setLoading(false);
        return;
      }

      const ranges =
        (data as ReservationRow[])?.map((reservation) => ({
          from: parseISO(reservation.check_in),
          to: parseISO(reservation.check_out),
        })) || [];

      setBookedRanges(ranges);
      setLoading(false);
    }

    fetchReservations();
  }, []);

  function isBooked(date: Date) {
    return bookedRanges.some((r) => date >= r.from && date <= r.to);
  }

  const disabledDays = [
    { before: new Date() },
    ...bookedRanges.map((r) => ({ from: r.from, to: r.to })),
  ];

  const hasConflict =
    range?.from && range?.to
      ? Array.from(
          {
            length:
              Math.ceil(
                (range.to.getTime() - range.from.getTime()) / 86400000
              ) + 1,
          },
          (_, i) => addDays(range.from!, i)
        ).some(isBooked)
      : false;

  const nights =
    range?.from && range?.to
      ? Math.round((range.to.getTime() - range.from.getTime()) / 86400000)
      : 0;

  const hasValidRange =
    range?.from && range?.to && !isSameDay(range.from, range.to) && nights >= 2;

  return (
    <section id="disponibilidad" className="py-20 bg-[#fdf8f3]">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-[#c9a96e] tracking-[0.25em] uppercase text-xs mb-2">
            Planificá tu visita
          </p>
          <h2
            className="text-3xl md:text-4xl text-[#3d2410]"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Disponibilidad
          </h2>
          <div className="w-16 h-0.5 bg-[#c9a96e] mx-auto mt-4" />
        </div>

        <div className="grid md:grid-cols-2 gap-10 items-start">
          <div>
            <div className="bg-white rounded-2xl shadow-sm border border-[#e8d5be] p-6 flex justify-center">
              <style>{`
                .rdp {
                  --rdp-accent-color: #c9a96e;
                  --rdp-background-color: #f5ece0;
                  --rdp-accent-color-dark: #8b5e3c;
                  --rdp-background-color-dark: #3d2410;
                  margin: 0;
                }
                .rdp-day_selected, .rdp-day_range_start, .rdp-day_range_end {
                  background-color: #8b5e3c !important;
                  color: white !important;
                }
                .rdp-day_range_middle {
                  background-color: #f5ece0 !important;
                  color: #3d2410 !important;
                }
                .rdp-day_disabled {
                  color: #d0b8a0 !important;
                  text-decoration: line-through;
                }
                .rdp-button:hover:not([disabled]):not(.rdp-day_selected) {
                  background-color: #f5ece0;
                }
                .rdp-caption_label {
                  color: #3d2410;
                }
                .rdp-head_cell {
                  color: #8b5e3c;
                }
              `}</style>

              {loading ? (
                <p className="text-sm text-[#7a6050] py-8">
                  Cargando disponibilidad...
                </p>
              ) : (
                <DayPicker
                  mode="range"
                  selected={range}
                  onSelect={setRange}
                  month={month}
                  onMonthChange={setMonth}
                  locale={es}
                  disabled={disabledDays}
                  numberOfMonths={1}
                  showOutsideDays
                />
              )}
            </div>

            <div className="flex gap-4 mt-4 justify-center text-xs text-[#7a6050]">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-sm bg-[#fde8e8] border border-red-200" />
                Reservado
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-sm bg-[#8b5e3c]" />
                Seleccionado
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-sm bg-white border border-[#e8d5be]" />
                Disponible
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <div className="bg-[#f5ece0] rounded-2xl p-6 border border-[#e8d5be]">
              <h3 className="text-[#3d2410] mb-1">Tu selección</h3>

              {range?.from ? (
                <div className="space-y-2 text-sm text-[#5a3e28]">
                  <p>
                    <strong>Entrada:</strong>{" "}
                    {range.from.toLocaleDateString("es-AR", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>

                  {range.to && !isSameDay(range.from, range.to) && (
                    <>
                      <p>
                        <strong>Salida:</strong>{" "}
                        {range.to.toLocaleDateString("es-AR", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                      <p>
                        <strong>Noches:</strong> {nights}
                      </p>
                    </>
                  )}

                  {nights > 0 && nights < 2 && (
                    <div className="flex items-center gap-2 text-amber-700 mt-2 bg-amber-50 rounded-lg p-2">
                      <Info size={16} />
                      <span>Estadía mínima: 2 noches.</span>
                    </div>
                  )}

                  {hasConflict ? (
                    <div className="flex items-center gap-2 text-red-600 mt-2 bg-red-50 rounded-lg p-2">
                      <XCircle size={16} />
                      <span>El período incluye fechas reservadas.</span>
                    </div>
                  ) : hasValidRange ? (
                    <div className="flex items-center gap-2 text-green-700 mt-2 bg-green-50 rounded-lg p-2">
                      <CheckCircle size={16} />
                      <span>¡Esas fechas están disponibles!</span>
                    </div>
                  ) : null}
                </div>
              ) : (
                <p className="text-sm text-[#a08060]">
                  Seleccioná una fecha de entrada en el calendario.
                </p>
              )}
            </div>

            {hasValidRange && !hasConflict && (
              <a
                href="#contacto"
                className="block bg-[#8b5e3c] hover:bg-[#a06d47] text-white text-center py-3.5 rounded-xl transition-colors text-sm tracking-wide"
              >
                Consultar disponibilidad por estas fechas
              </a>
            )}

            <div className="bg-white rounded-2xl p-6 border border-[#e8d5be]">
              <div className="flex items-start gap-3">
                <Info size={18} className="text-[#c9a96e] mt-0.5 shrink-0" />
                <div className="text-sm text-[#7a6050] space-y-1">
                  <p>Estadía mínima: 2 noches.</p>
                  <p>Check-in a partir de las 14 hs.</p>
                  <p>Check-out hasta las 11 hs.</p>
                  <p>Para reservas con más de 7 noches, consultar precio especial.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
