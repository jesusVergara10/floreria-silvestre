"use client";

import { useState } from "react";

export default function CredencialesPage() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setMessage("");
    setIsError(false);

    if (newPassword && newPassword !== confirmPassword) {
      setMessage("Las contraseñas nuevas no coinciden.");
      setIsError(true);
      return;
    }

    if (!currentPassword) {
      setMessage("La contraseña actual es requerida.");
      setIsError(true);
      return;
    }

    setSaving(true);

    try {
      const body: Record<string, string> = { currentPassword };
      if (newUsername.trim()) body.username = newUsername.trim();
      if (newPassword) body.newPassword = newPassword;

      const res = await fetch("/api/admin/credentials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.error || "Error al actualizar las credenciales.");
        setIsError(true);
      } else {
        setMessage("Credenciales actualizadas correctamente.");
        setCurrentPassword("");
        setNewUsername("");
        setNewPassword("");
        setConfirmPassword("");
      }
    } catch {
      setMessage("Error de conexión.");
      setIsError(true);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="max-w-md">
      <h1 className="text-2xl font-medium mb-2" style={{ color: "#C2E1A3" }}>
        Cambiar Credenciales
      </h1>
      <p className="text-sm mb-8 opacity-60" style={{ color: "#C2E1A3" }}>
        Deja en blanco los campos que no quieras cambiar.
      </p>

      <form onSubmit={handleSave} className="flex flex-col gap-5">
        <div>
          <label className="block text-sm mb-1" style={{ color: "#C2E1A3" }}>
            Contraseña actual <span style={{ color: "#f87171" }}>*</span>
          </label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
            autoComplete="current-password"
            className="w-full px-3 py-2 rounded-lg bg-white text-gray-900 text-sm outline-none focus:ring-2 focus:ring-[#1FA961]"
          />
        </div>

        <div
          className="border-t pt-4"
          style={{ borderColor: "#2a4012" }}
        >
          <p className="text-xs uppercase tracking-widest mb-4 opacity-60" style={{ color: "#C2E1A3" }}>
            Nuevos datos (opcionales)
          </p>

          <div className="flex flex-col gap-4">
            <div>
              <label className="block text-sm mb-1" style={{ color: "#C2E1A3" }}>
                Nuevo usuario
              </label>
              <input
                type="text"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
                autoComplete="username"
                className="w-full px-3 py-2 rounded-lg bg-white text-gray-900 text-sm outline-none focus:ring-2 focus:ring-[#1FA961]"
              />
            </div>

            <div>
              <label className="block text-sm mb-1" style={{ color: "#C2E1A3" }}>
                Nueva contraseña
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                autoComplete="new-password"
                className="w-full px-3 py-2 rounded-lg bg-white text-gray-900 text-sm outline-none focus:ring-2 focus:ring-[#1FA961]"
              />
            </div>

            <div>
              <label className="block text-sm mb-1" style={{ color: "#C2E1A3" }}>
                Confirmar nueva contraseña
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                autoComplete="new-password"
                className="w-full px-3 py-2 rounded-lg bg-white text-gray-900 text-sm outline-none focus:ring-2 focus:ring-[#1FA961]"
              />
            </div>
          </div>
        </div>

        {message && (
          <p
            className="text-sm"
            style={{ color: isError ? "#f87171" : "#86efac" }}
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
          {saving ? "Guardando..." : "Actualizar Credenciales"}
        </button>
      </form>
    </div>
  );
}
