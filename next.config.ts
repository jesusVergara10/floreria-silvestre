import type { NextConfig } from "next";

const securityHeaders = [
  {
    // Evita que el browser adivine el tipo de archivo (MIME sniffing)
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    // Bloquea que el sitio se incruste en iframes externos (clickjacking)
    key: "X-Frame-Options",
    value: "DENY",
  },
  {
    // Controla qué info se envía al navegar a links externos
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    // Deshabilita APIs del browser que no se usan
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=()",
  },
  {
    // Fuerza HTTPS en browsers que ya visitaron el sitio (1 año)
    key: "Strict-Transport-Security",
    value: "max-age=31536000; includeSubDomains",
  },
  {
    // Content Security Policy: controla qué recursos puede cargar la página
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      // Scripts: propio sitio + inline para Next.js
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
      // Estilos: propio sitio + inline para Tailwind
      "style-src 'self' 'unsafe-inline'",
      // Imágenes: propio sitio + Vercel Blob + data/blob URIs
      "img-src 'self' data: blob: *.public.blob.vercel-storage.com",
      // Fuentes: propio sitio
      "font-src 'self' data:",
      // Conexiones: propio sitio + HTTPS (Next.js RSC + Three.js pueden necesitar conexiones externas)
      "connect-src 'self' https: wss:",
      // Workers: blob y self (necesario para Three.js / WebGL shaders)
      "worker-src 'self' blob:",
      // Frames: ninguno
      "frame-src 'none'",
      // Objetos (Flash, etc.): ninguno
      "object-src 'none'",
      // Base URI: solo el propio sitio
      "base-uri 'self'",
      // Formularios: solo al propio sitio
      "form-action 'self' https://forms.gle https://wa.me",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  devIndicators: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.public.blob.vercel-storage.com",
      },
    ],
  },
  async headers() {
    return [
      {
        // Aplica a todas las rutas
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
