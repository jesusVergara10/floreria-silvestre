interface NavLink {
  label: string;
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  href: string;
  highlight?: boolean;
  highlightColor?: string;
  highlightTextColor?: string;
  preserveCase?: boolean;
}

interface CornerNavigationProps {
  links: NavLink[];
}

const positionClasses: Record<NavLink["position"], string> = {
  "top-left": "top-8 left-10",
  "top-right": "top-8 right-10",
  "bottom-left": "bottom-8 left-10",
  "bottom-right": "bottom-8 right-10",
};

export default function CornerNavigation({ links }: CornerNavigationProps) {
  return (
    <nav className="hidden md:block absolute inset-0 z-10 pointer-events-none">
      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          {...(link.href.startsWith("http") && { target: "_blank", rel: "noopener noreferrer" })}
          className={[
            `absolute pointer-events-auto text-[1.3rem] ${link.preserveCase ? "" : "uppercase"}`,
            "transition-opacity duration-200 hover:opacity-50",
            positionClasses[link.position],
            link.highlight ? "flex items-center justify-center rounded-full h-[43px] px-5" : "text-navy",
            link.highlight && !link.highlightColor ? "bg-blush text-navy" : "",
          ]
            .filter(Boolean)
            .join(" ")}
          style={{
            ...(link.highlightColor ? { backgroundColor: link.highlightColor } : {}),
            ...(link.highlight ? { color: link.highlightTextColor ?? "#ffffff" } : {}),
          }}
        >
          {link.label}
        </a>
      ))}
    </nav>
  );
}
