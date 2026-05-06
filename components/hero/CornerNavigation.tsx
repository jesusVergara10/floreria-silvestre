interface NavLink {
  label: string;
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  href: string;
  highlight?: boolean;
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
          className={[
            "absolute pointer-events-auto text-navy text-[1.62rem] tracking-widest uppercase",
            "transition-opacity duration-200 hover:opacity-50",
            positionClasses[link.position],
            link.highlight
              ? "bg-blush px-5 py-2 rounded-full"
              : "",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {link.label}
        </a>
      ))}
    </nav>
  );
}
