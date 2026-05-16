/**
 * Rate limiter en memoria.
 * Permite MAX_ATTEMPTS intentos por IP en una ventana de WINDOW_MS milisegundos.
 * Nota: se resetea en cold starts de Vercel, lo cual es aceptable para un admin de bajo tráfico.
 */

const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000; // 15 minutos

interface AttemptRecord {
  count: number;
  firstAttempt: number;
}

const attempts = new Map<string, AttemptRecord>();

export function checkRateLimit(ip: string): { allowed: boolean; retryAfterSeconds: number } {
  const now = Date.now();
  const record = attempts.get(ip);

  if (!record) {
    attempts.set(ip, { count: 1, firstAttempt: now });
    return { allowed: true, retryAfterSeconds: 0 };
  }

  const windowElapsed = now - record.firstAttempt;

  // La ventana expiró — resetear
  if (windowElapsed > WINDOW_MS) {
    attempts.set(ip, { count: 1, firstAttempt: now });
    return { allowed: true, retryAfterSeconds: 0 };
  }

  // Dentro de la ventana y aún hay intentos disponibles
  if (record.count < MAX_ATTEMPTS) {
    record.count++;
    return { allowed: true, retryAfterSeconds: 0 };
  }

  // Límite alcanzado
  const retryAfterSeconds = Math.ceil((WINDOW_MS - windowElapsed) / 1000);
  return { allowed: false, retryAfterSeconds };
}

export function resetRateLimit(ip: string) {
  attempts.delete(ip);
}
