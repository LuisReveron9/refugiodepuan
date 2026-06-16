import { useEffect, useRef, useState } from "react";

interface VideoEntry {
  id: string;
  url: string;
  title: string;
}

function getEmbedUrl(url: string): string | null {
  try {
    const u = new URL(url);

    if (u.hostname.includes("youtube.com") && u.searchParams.get("v")) {
      return `https://www.youtube.com/embed/${u.searchParams.get("v")}`;
    }

    if (u.hostname === "youtu.be") {
      return `https://www.youtube.com/embed${u.pathname}`;
    }

    return null;
  } catch {
    return null;
  }
}

const videos: VideoEntry[] = [
  {
    id: "1",
    url: "https://www.youtube.com/watch?v=y3aK5GliroA",
    title: "Conocé Refugio de Puán",
  },
];

export function VideoSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting && entry.intersectionRatio > 0.35;

        setIsVisible(visible);

        if (!visible) {
          setIframeKey((current) => current + 1);
        }
      },
      {
        threshold: [0, 0.35, 0.6],
      }
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section
      id="videos"
      ref={sectionRef}
      className="py-20 bg-[#1a0f08]"
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-[#c9a96e] tracking-[0.25em] uppercase text-xs mb-2">
            Conocé más
          </p>

          <h2
            className="text-3xl md:text-4xl text-white"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Videos del alojamiento
          </h2>

          <div className="w-16 h-0.5 bg-[#c9a96e] mx-auto mt-4" />
        </div>

        <div className="grid sm:grid-cols-1 max-w-3xl mx-auto gap-6">
          {videos.map((video) => {
            const embed = getEmbedUrl(video.url);

            return (
              <div
                key={video.id}
                className="rounded-2xl overflow-hidden bg-[#2d1f14] border border-[#c9a96e]/20 shadow-xl"
              >
                <div className="relative" style={{ paddingBottom: "56.25%" }}>
                  {embed && isVisible && (
                    <iframe
                      key={`${video.id}-${iframeKey}`}
                      src={embed}
                      title={video.title}
                      className="absolute inset-0 w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  )}

                  {!isVisible && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                      <p className="text-white/70 text-sm">
                        Video pausado
                      </p>
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <p className="text-white/80 text-sm text-center">
                    {video.title}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}