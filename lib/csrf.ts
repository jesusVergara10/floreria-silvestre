/**
 * Protección CSRF basada en validación del header Origin.
 * Verifica que las peticiones mutantes (POST, DELETE, PUT) vengan
 * del propio sitio y no de una página externa maliciosa.
 */

function getAllowedOrigins(): string[] {
  const origins = ["http://localhost:3000", "http://localhost:3003"];

  // URL única del deploy actual (ej. floreria-silvestre-xyz.vercel.app)
  if (process.env.VERCEL_URL) {
    origins.push(`https://${process.env.VERCEL_URL}`);
  }

  // URL de producción canónica (ej. floreria-silvestre.vercel.app)
  // Vercel la expone como VERCEL_PROJECT_PRODUCTION_URL
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    origins.push(`https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`);
  }

  // Dominio personalizado (si se configura en el futuro)
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    origins.push(process.env.NEXT_PUBLIC_SITE_URL);
  }

  return origins;
}

export function validateCsrf(request: Request): { valid: boolean; error: string } {
  const method = request.method.toUpperCase();

  // Solo validar peticiones mutantes
  if (!["POST", "DELETE", "PUT", "PATCH"].includes(method)) {
    return { valid: true, error: "" };
  }

  const origin = request.headers.get("origin");
  const referer = request.headers.get("referer");
  const allowed = getAllowedOrigins();

  // Verificar Origin primero, luego Referer como fallback
  const source = origin ?? (referer ? new URL(referer).origin : null);

  if (!source) {
    return { valid: false, error: "Origin no presente en la petición." };
  }

  if (!allowed.includes(source)) {
    return { valid: false, error: "Origen no autorizado." };
  }

  return { valid: true, error: "" };
}
