"use client";

import { useState, useEffect } from "react";

type ContentRecord = Record<string, string>;

const CONTENT_SECTIONS = [
  {
    label: "Hero",
    fields: [
      { key: "hero_title", label: "Título", multiline: true },
      { key: "hero_body", label: "Descripción", multiline: true },
    ],
  },
  {
    label: "Carrusel",
    fields: [
      { key: "carousel_title", label: "Título", multiline: false },
      { key: "carousel_body", label: "Descripción", multiline: true },
    ],
  },
  {
    label: "Eventos",
    fields: [
      { key: "events_title", label: "Título", multiline: true },
      { key: "events_body", label: "Descripción", multiline: true },
      { key: "events_tagline", label: "Tagline", multiline: false },
    ],
  },
  {
    label: "Footer",
    fields: [
      { key: "footer_tagline1", label: "Tagline línea 1", multiline: false },
      { key: "footer_tagline2", label: "Tagline línea 2", multiline: false },
      { key: "footer_address", label: "Dirección", multiline: false },
      { key: "footer_email", label: "Email", multiline: false },
      { key: "footer_social", label: "Redes sociales", multiline: false },
    ],
  },
];

export default function ContenidoPage() {
  const [content, setContent] = useState<ContentRecord>({});
  const [original, setOriginal] = useState<ContentRecord>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/admin/content")
      .then((res) => res.json())
      .then((data: ContentRecord) => {
        setContent(data);
        setOriginal(data);
        setLoading(false);
      })
      .catch(() => {
        setMessage("Error al cargar el contenido");
        setLoading(false);
      });
  }, []);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMessage("");

    try {
      const changed = Object.entries(content).filter(
        ([key, value]) => original[key] !== value
      );

      for (const [key, value] of changed) {
        const res = await fetch("/api/admin/content", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ key, value }),
        });
        if (!res.ok) throw new Error(`Failed to update ${key}`);
      }

      setOriginal({ ...content });
      setMessage(changed.length === 0 ? "Sin cambios." : "Contenido guardado correctamente.");
    } catch {
      setMessage("Error al guardar los cambios.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div style={{ color: "#C2E1A3" }} className="opacity-60 text-sm">
        Cargando contenido...
      </div>
    );
  }

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-medium mb-8" style={{ color: "#C2E1A3" }}>
        Editar Contenido
      </h1>

      <form onSubmit={handleSave} className="flex flex-col gap-10">
        {CONTENT_SECTIONS.map((section) => (
          <div key={section.label}>
            <h2
              className="text-xs uppercase tracking-widest mb-4 pb-2 border-b"
              style={{ color: "#C2E1A3", borderColor: "#2a4012", opacity: 0.7 }}
            >
              {section.label}
            </h2>
            <div className="flex flex-col gap-4">
              {section.fields.map((field) => (
                <div key={field.key}>
                  <label className="block text-sm mb-1" style={{ color: "#C2E1A3" }}>
                    {field.label}
                  </label>
                  {field.multiline ? (
                    <textarea
                      value={content[field.key] ?? ""}
                      onChange={(e) =>
                        setContent((prev) => ({ ...prev, [field.key]: e.target.value }))
                      }
                      rows={3}
                      className="w-full px-3 py-2 rounded-lg bg-white text-gray-900 text-sm outline-none focus:ring-2 focus:ring-[#1FA961] resize-y"
                    />
                  ) : (
                    <input
                      type="text"
                      value={content[field.key] ?? ""}
                      onChange={(e) =>
                        setContent((prev) => ({ ...prev, [field.key]: e.target.value }))
                      }
                      className="w-full px-3 py-2 rounded-lg bg-white text-gray-900 text-sm outline-none focus:ring-2 focus:ring-[#1FA961]"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

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
          {saving ? "Guardando..." : "Guardar Cambios"}
        </button>
      </form>
    </div>
  );
}
