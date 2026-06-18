import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { LogOut, Trash2, CalendarPlus } from "lucide-react";

type BlockedDate = {
  id: string;
  title: string | null;
  check_in: string;
  check_out: string;
  status: string;
  created_at: string;
};

export function AdminReservations() {
  const [session, setSession] = useState<any>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [title, setTitle] = useState("Reserva");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");

  const [blockedDates, setBlockedDates] = useState<BlockedDate[]>([]);
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    async function loadSession() {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
      setLoading(false);
    }

    loadSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, currentSession) => {
      setSession(currentSession);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (session) {
      fetchBlockedDates();
    }
  }, [session]);

  async function fetchBlockedDates() {
    const { data, error } = await supabase
      .from("blocked_dates")
      .select("*")
      .eq("status", "blocked")
      .order("check_in", { ascending: true });

    if (error) {
      console.error(error.message);
      setFeedback("No se pudieron cargar las fechas bloqueadas.");
      return;
    }

    setBlockedDates((data as BlockedDate[]) || []);
  }

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFeedback("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setFeedback("Email o contraseña incorrectos.");
      return;
    }

    setEmail("");
    setPassword("");
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    setSession(null);
  }

  async function handleAddBlockedDate(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFeedback("");

    if (!checkIn || !checkOut) {
      setFeedback("Completá fecha de entrada y salida.");
      return;
    }

    if (checkOut <= checkIn) {
      setFeedback("La fecha de salida debe ser posterior a la entrada.");
      return;
    }

    const { error } = await supabase.from("blocked_dates").insert([
      {
        title: title.trim() || "Reserva",
        check_in: checkIn,
        check_out: checkOut,
        status: "blocked",
      },
    ]);

    if (error) {
      console.error(error.message);
      setFeedback("No se pudo bloquear la fecha.");
      return;
    }

    setFeedback("Fechas bloqueadas correctamente.");
    setTitle("Reserva");
    setCheckIn("");
    setCheckOut("");
    fetchBlockedDates();
  }

  async function handleDeleteBlockedDate(id: string) {
    const confirmDelete = window.confirm(
      "¿Seguro querés liberar estas fechas?"
    );

    if (!confirmDelete) return;

    const { error } = await supabase
      .from("blocked_dates")
      .delete()
      .eq("id", id);

    if (error) {
      console.error(error.message);
      setFeedback("No se pudo eliminar la reserva.");
      return;
    }

    setFeedback("Fechas liberadas correctamente.");
    fetchBlockedDates();
  }

  function formatDate(value: string) {
    return new Date(`${value}T00:00:00`).toLocaleDateString("es-AR", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-[#fdf8f3] flex items-center justify-center">
        <p className="text-[#7a6050]">Cargando panel...</p>
      </main>
    );
  }

  if (!session) {
    return (
      <main className="min-h-screen bg-[#1a0f08] flex items-center justify-center px-6">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-md bg-white rounded-2xl p-8 shadow-xl border border-[#e8d5be]"
        >
          <p className="text-[#c9a96e] tracking-[0.2em] uppercase text-xs mb-2">
            Panel privado
          </p>

          <h1
            className="text-3xl text-[#3d2410] mb-2"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Refugio de Puan
          </h1>

          <p className="text-sm text-[#7a6050] mb-6">
            Ingresá para bloquear fechas reservadas.
          </p>

          <label className="block text-sm text-[#5a3e28] mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="w-full rounded-xl border border-[#e8d5be] px-4 py-3 text-sm mb-4 outline-none focus:border-[#8b5e3c]"
            placeholder="email"
          />

          <label className="block text-sm text-[#5a3e28] mb-1">
            Contraseña
          </label>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="w-full rounded-xl border border-[#e8d5be] px-4 py-3 text-sm mb-5 outline-none focus:border-[#8b5e3c]"
            placeholder="contraseña"
          />

          <button
            type="submit"
            className="w-full bg-[#8b5e3c] hover:bg-[#a06d47] text-white py-3 rounded-xl text-sm transition-colors"
          >
            Ingresar
          </button>

          {feedback && (
            <p className="text-sm text-center text-red-600 mt-4">{feedback}</p>
          )}
        </form>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#fdf8f3] py-10 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <p className="text-[#c9a96e] tracking-[0.2em] uppercase text-xs mb-2">
              Panel privado
            </p>

            <h1
              className="text-3xl md:text-4xl text-[#3d2410]"
              style={{ fontFamily: "Georgia, serif" }}
            >
              Gestión de reservas
            </h1>

            <p className="text-sm text-[#7a6050] mt-2">
              Bloqueá fechas alquiladas para que no aparezcan disponibles.
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="inline-flex items-center justify-center gap-2 bg-[#1a0f08] text-white px-4 py-2 rounded-xl text-sm"
            type="button"
          >
            <LogOut size={16} />
            Salir
          </button>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <form
            onSubmit={handleAddBlockedDate}
            className="bg-white rounded-2xl border border-[#e8d5be] p-6 shadow-sm"
          >
            <div className="flex items-center gap-2 mb-5">
              <CalendarPlus size={20} className="text-[#8b5e3c]" />
              <h2 className="text-xl text-[#3d2410]">Bloquear fechas</h2>
            </div>

            <label className="block text-sm text-[#5a3e28] mb-1">
              Nombre o referencia
            </label>
            <input
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              className="w-full rounded-xl border border-[#e8d5be] px-4 py-3 text-sm mb-4 outline-none focus:border-[#8b5e3c]"
              placeholder="Ej: Reserva Juan"
            />

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-[#5a3e28] mb-1">
                  Entrada
                </label>
                <input
                  type="date"
                  value={checkIn}
                  onChange={(event) => setCheckIn(event.target.value)}
                  className="w-full rounded-xl border border-[#e8d5be] px-4 py-3 text-sm outline-none focus:border-[#8b5e3c]"
                />
              </div>

              <div>
                <label className="block text-sm text-[#5a3e28] mb-1">
                  Salida
                </label>
                <input
                  type="date"
                  value={checkOut}
                  onChange={(event) => setCheckOut(event.target.value)}
                  className="w-full rounded-xl border border-[#e8d5be] px-4 py-3 text-sm outline-none focus:border-[#8b5e3c]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#8b5e3c] hover:bg-[#a06d47] text-white py-3.5 rounded-xl text-sm mt-5 transition-colors"
            >
              Bloquear fechas
            </button>

            {feedback && (
              <p className="text-sm text-center text-[#5a3e28] bg-[#fdf8f3] border border-[#e8d5be] rounded-xl p-3 mt-4">
                {feedback}
              </p>
            )}
          </form>

          <div className="bg-white rounded-2xl border border-[#e8d5be] p-6 shadow-sm">
            <h2 className="text-xl text-[#3d2410] mb-5">
              Fechas bloqueadas
            </h2>

            {blockedDates.length === 0 ? (
              <p className="text-sm text-[#7a6050]">
                Todavía no hay fechas bloqueadas.
              </p>
            ) : (
              <div className="space-y-3">
                {blockedDates.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between gap-3 border border-[#e8d5be] rounded-xl p-4"
                  >
                    <div>
                      <p className="text-sm font-medium text-[#3d2410]">
                        {item.title || "Reserva"}
                      </p>

                      <p className="text-xs text-[#7a6050] mt-1">
                        {formatDate(item.check_in)} →{" "}
                        {formatDate(item.check_out)}
                      </p>
                    </div>

                    <button
                      onClick={() => handleDeleteBlockedDate(item.id)}
                      className="text-red-500 hover:text-red-700 p-2"
                      aria-label="Eliminar reserva"
                      type="button"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 text-center">
          <a
            href="/"
            className="text-sm text-[#8b5e3c] hover:text-[#3d2410] underline"
          >
            Volver al sitio público
          </a>
        </div>
      </div>
    </main>
  );
}
