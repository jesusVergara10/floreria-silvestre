"use client";

import { useState, useEffect } from "react";

interface SocialField {
  key: string;
  handleKey: string;
  label: string;
  placeholder: string;
  handlePlaceholder: string;
}

const SOCIAL_FIELDS: SocialField[] = [
  {
    key: "link_instagram",
    handleKey: "instagram_handle",
    label: "Instagram",
    placeholder: "https://www.instagram.com/...",
    handlePlaceholder: "@floreria_silvestre",
  },
  {
    key: "link_facebook",
    handleKey: "facebook_handle",
    label: "Facebook",
    placeholder: "https://www.facebook.com/...",
    handlePlaceholder: "@floreriasilvestre",
  },
  {
    key: "link_tiktok",
    handleKey: "tiktok_handle",
    label: "TikTok",
    placeholder: "https://www.tiktok.com/@...",
    handlePlaceholder: "@floreriasilvestre",
  },
  {
    key: "link_youtube",
    handleKey: "youtube_handle",
    label: "YouTube",
    placeholder: "https://www.youtube.com/@...",
    handlePlaceholder: "Florería Silvestre",
  },
];

const INPUT_CLASS =
  "w-full px-3 py-2 rounded-lg bg-white text-gray-900 text-sm outline-none focus:ring-2 focus:ring-[#1FA961]";

export default function EnlacesPage() {
  const [whatsapp, setWhatsapp] = useState("");
  const [cotiza, setCotiza] = useState("");
  const [disena, setDisena] = useState("");
  const [socials, setSocials] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/admin/content")
      .then((res) => res.json())
      .then((data) => {
        setWhatsapp(data.link_whatsapp ?? "");
        setCotiza(data.link_cotiza ?? "");
        setDisena(data.link_disena ?? "");

        const initialSocials: Record<string, string> = {};
        for (const field of SOCIAL_FIELDS) {
          initialSocials[field.key] = data[field.key] ?? "";
          initialSocials[field.handleKey] = data[field.handleKey] ?? "";
        }
        setSocials(initialSocials);
        setLoading(false);
      })
      .catch(() => {
        setMessage("Error al cargar los enlaces.");
        setLoading(false);
      });
  }, []);

  function setSocial(key: string, value: string) {
    setSocials((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMessage("");

    try {
      const res = await fetch("/api/admin/links", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          link_whatsapp: whatsapp,
          link_cotiza: cotiza,
          link_disena: disena,
          ...socials,
        }),
      });

      if (!res.ok) throw new Error();
      setMessage("Enlaces guardados correctamente.");
    } catch {
      setMessage("Error al guardar los enlaces.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <p style={{ color: "#C2E1A3" }} className="text-sm opacity-60">Cargando...</p>;
  }

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-medium mb-2" style={{ color: "#C2E1A3" }}>
        Gestionar Enlaces
      </h1>
      <p className="text-sm mb-8 opacity-60" style={{ color: "#C2E1A3" }}>
        Actualiza los links de los botones del sitio y las redes sociales del footer.
      </p>

      <form onSubmit={handleSave} className="flex flex-col gap-6">

        {/* Botones del sitio */}
        <div className="flex flex-col gap-5">
          <p className="text-xs font-semibold uppercase tracking-widest opacity-50" style={{ color: "#C2E1A3" }}>
            Botones del sitio
          </p>

          <div>
            <label className="block text-sm mb-1" style={{ color: "#C2E1A3" }}>WhatsApp</label>
            <input
              type="text"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              placeholder="https://wa.me/521..."
              className={INPUT_CLASS}
            />
          </div>

          <div>
            <label className="block text-sm mb-1" style={{ color: "#C2E1A3" }}>Cotiza tu Evento</label>
            <input
              type="text"
              value={cotiza}
              onChange={(e) => setCotiza(e.target.value)}
              placeholder="#contact"
              className={INPUT_CLASS}
            />
          </div>

          <div>
            <label className="block text-sm mb-1" style={{ color: "#C2E1A3" }}>Diseña tu Bouquet</label>
            <input
              type="text"
              value={disena}
              onChange={(e) => setDisena(e.target.value)}
              placeholder="#our-work"
              className={INPUT_CLASS}
            />
          </div>
        </div>

        {/* Redes sociales */}
        <div className="flex flex-col gap-5">
          <p className="text-xs font-semibold uppercase tracking-widest opacity-50" style={{ color: "#C2E1A3" }}>
            Redes sociales (footer)
          </p>

          {SOCIAL_FIELDS.map((field) => (
            <div key={field.key}>
              <label className="block text-sm mb-1" style={{ color: "#C2E1A3" }}>{field.label}</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={socials[field.handleKey] ?? ""}
                  onChange={(e) => setSocial(field.handleKey, e.target.value)}
                  placeholder={field.handlePlaceholder}
                  className={INPUT_CLASS}
                />
                <input
                  type="text"
                  value={socials[field.key] ?? ""}
                  onChange={(e) => setSocial(field.key, e.target.value)}
                  placeholder={field.placeholder}
                  className={INPUT_CLASS}
                />
              </div>
              <p className="text-xs mt-1 opacity-40" style={{ color: "#C2E1A3" }}>
                Texto a mostrar · URL
              </p>
            </div>
          ))}
        </div>

        {message && (
          <p className="text-sm" style={{ color: message.startsWith("Error") ? "#f87171" : "#86efac" }}>
            {message}
          </p>
        )}

        <button
          type="submit"
          disabled={saving}
          className="self-start px-8 py-2.5 rounded-lg text-white text-sm font-medium transition-opacity hover:opacity-80 disabled:opacity-50"
          style={{ backgroundColor: "#1FA961" }}
        >
          {saving ? "Guardando..." : "Guardar Enlaces"}
        </button>
      </form>
    </div>
  );
}
