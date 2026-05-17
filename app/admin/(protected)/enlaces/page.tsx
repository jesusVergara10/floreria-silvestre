"use client";

import { useState, useEffect } from "react";

export default function EnlacesPage() {
  const [whatsapp, setWhatsapp] = useState("");
  const [cotiza, setCotiza] = useState("");
  const [disena, setDisena] = useState("");
  const [instagram, setInstagram] = useState("");
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
        setInstagram(data.link_instagram ?? "");
        setLoading(false);
      })
      .catch(() => {
        setMessage("Error al cargar los enlaces.");
        setLoading(false);
      });
  }, []);

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
          link_instagram: instagram,
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
    <div className="max-w-lg">
      <h1 className="text-2xl font-medium mb-2" style={{ color: "#C2E1A3" }}>
        Gestionar Enlaces
      </h1>
      <p className="text-sm mb-8 opacity-60" style={{ color: "#C2E1A3" }}>
        Actualiza los links de los botones del sitio.
      </p>

      <form onSubmit={handleSave} className="flex flex-col gap-5">
        <div>
          <label className="block text-sm mb-1" style={{ color: "#C2E1A3" }}>
            WhatsApp
          </label>
          <input
            type="text"
            value={whatsapp}
            onChange={(e) => setWhatsapp(e.target.value)}
            placeholder="https://wa.me/521..."
            className="w-full px-3 py-2 rounded-lg bg-white text-gray-900 text-sm outline-none focus:ring-2 focus:ring-[#1FA961]"
          />
        </div>

        <div>
          <label className="block text-sm mb-1" style={{ color: "#C2E1A3" }}>
            Cotiza tu Evento
          </label>
          <input
            type="text"
            value={cotiza}
            onChange={(e) => setCotiza(e.target.value)}
            placeholder="#contact"
            className="w-full px-3 py-2 rounded-lg bg-white text-gray-900 text-sm outline-none focus:ring-2 focus:ring-[#1FA961]"
          />
        </div>

        <div>
          <label className="block text-sm mb-1" style={{ color: "#C2E1A3" }}>
            Diseña tu Bouquet
          </label>
          <input
            type="text"
            value={disena}
            onChange={(e) => setDisena(e.target.value)}
            placeholder="#our-work"
            className="w-full px-3 py-2 rounded-lg bg-white text-gray-900 text-sm outline-none focus:ring-2 focus:ring-[#1FA961]"
          />
        </div>

        <div>
          <label className="block text-sm mb-1" style={{ color: "#C2E1A3" }}>
            Instagram
          </label>
          <input
            type="text"
            value={instagram}
            onChange={(e) => setInstagram(e.target.value)}
            placeholder="https://www.instagram.com/..."
            className="w-full px-3 py-2 rounded-lg bg-white text-gray-900 text-sm outline-none focus:ring-2 focus:ring-[#1FA961]"
          />
        </div>

        {message && (
          <p
            className="text-sm"
            style={{ color: message.startsWith("Error") ? "#f87171" : "#86efac" }}
          >
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
