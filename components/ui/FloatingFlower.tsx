export default function FloatingFlower() {
  return (
    <div
      className="fixed bottom-8 right-8 z-50 pointer-events-none select-none"
      style={{
        filter:
          "drop-shadow(0 0 8px rgba(255,255,255,0.4)) drop-shadow(0 0 2px rgba(0,0,0,0.12))",
      }}
    >
      <svg
        width="92"
        height="92"
        viewBox="0 0 100 100"
        className="animate-[spin_16s_linear_infinite]"
        style={{ willChange: "transform" }}
      >
        <defs>
          {/*
           * Diagonal gradient that sweeps across petals as the flower rotates,
           * creating a glass-like light reflection effect.
           */}
          <linearGradient id="flr-shimmer" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%"   stopColor="white" stopOpacity="0.01" />
            <stop offset="42%"  stopColor="white" stopOpacity="0.07" />
            <stop offset="52%"  stopColor="white" stopOpacity="0.26" />
            <stop offset="62%"  stopColor="white" stopOpacity="0.07" />
            <stop offset="100%" stopColor="white" stopOpacity="0.01" />
          </linearGradient>

          <linearGradient id="flr-shimmer-2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%"   stopColor="white" stopOpacity="0" />
            <stop offset="50%"  stopColor="white" stopOpacity="0.1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* 6 petals — each an ellipse rotated around the center */}
        {[0, 60, 120, 180, 240, 300].map((deg) => (
          <g key={deg} transform={`rotate(${deg}, 50, 50)`}>
            <ellipse
              cx="50" cy="25" rx="13" ry="26"
              fill="url(#flr-shimmer)"
              stroke="rgba(200,200,200,0.55)"
              strokeWidth="0.85"
            />
            <ellipse
              cx="50" cy="25" rx="13" ry="26"
              fill="url(#flr-shimmer-2)"
              stroke="none"
            />
          </g>
        ))}

        {/* Center circle */}
        <circle
          cx="50" cy="50" r="7"
          fill="url(#flr-shimmer)"
          stroke="rgba(200,200,200,0.55)"
          strokeWidth="0.85"
        />
      </svg>
    </div>
  );
}
