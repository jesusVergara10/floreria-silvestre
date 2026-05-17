// Resets on Vercel cold starts — acceptable for a low-traffic admin panel.
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

  if (windowElapsed > WINDOW_MS) {
    attempts.set(ip, { count: 1, firstAttempt: now });
    return { allowed: true, retryAfterSeconds: 0 };
  }

  if (record.count < MAX_ATTEMPTS) {
    record.count++;
    return { allowed: true, retryAfterSeconds: 0 };
  }

  const retryAfterSeconds = Math.ceil((WINDOW_MS - windowElapsed) / 1000);
  return { allowed: false, retryAfterSeconds };
}

export function resetRateLimit(ip: string) {
  attempts.delete(ip);
}
