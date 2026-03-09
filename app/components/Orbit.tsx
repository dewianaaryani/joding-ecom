"use client";
import { useEffect, useRef } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface IconData {
  src: string;
  shadowColor: string; // RGB triple, e.g. "59,130,246"
  label: string;
}

interface RingConfig {
  icons: IconData[];
  radius: number; // px from center
  duration: number; // seconds for one full revolution
  clockwise: boolean;
}

interface OrbitRingProps extends RingConfig {}

interface IconBubbleProps {
  icon: IconData;
  /** live counter-rotation angle in degrees (keeps icon upright) */
  getAngle: () => number;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const ALL_ICONS: IconData[] = [
  { src: "/icons/reactjs.png", shadowColor: "59,130,246", label: "React" },
  { src: "/icons/figma.png", shadowColor: "168,85,247", label: "Figma" },
  { src: "/icons/xd.png", shadowColor: "236,72,153", label: "XD" },
  {
    src: "/icons/bootstrap.png",
    shadowColor: "99,102,241",
    label: "Bootstrap",
  },
  { src: "/icons/tailwind.png", shadowColor: "20,184,166", label: "Tailwind" },
  { src: "/icons/nextjs.png", shadowColor: "156,163,175", label: "Next.js" },
  { src: "/icons/vercel.png", shadowColor: "234,179,8", label: "Vercel" },
  { src: "/icons/supabase.png", shadowColor: "34,197,94", label: "Supabase" },
  { src: "/icons/laravel.png", shadowColor: "239,68,68", label: "Laravel" },
  { src: "/icons/prisma.png", shadowColor: "249,115,22", label: "Prisma" },
  { src: "/icons/three.png", shadowColor: "6,182,212", label: "Three.js" },
  { src: "/icons/gsap.png", shadowColor: "168,85,247", label: "GSAP" },
];

const RINGS: RingConfig[] = [
  { icons: ALL_ICONS.slice(0, 3), radius: 90, duration: 18, clockwise: true },
  { icons: ALL_ICONS.slice(3, 7), radius: 155, duration: 28, clockwise: false },
  { icons: ALL_ICONS.slice(7, 12), radius: 220, duration: 40, clockwise: true },
];

const TRACK_COLORS = ["120,80,255", "60,150,255", "30,220,200"] as const;

// ─── Icon Bubble ──────────────────────────────────────────────────────────────

function IconBubble({ icon, getAngle }: IconBubbleProps) {
  const bubbleRef = useRef<HTMLDivElement>(null);

  // Counter-rotate on every frame so the icon always faces up
  useEffect(() => {
    let raf: number;
    const tick = () => {
      if (bubbleRef.current) {
        bubbleRef.current.style.transform = `rotate(${-getAngle()}deg)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [getAngle]);

  return (
    <div
      ref={bubbleRef}
      title={icon.label}
      style={{
        width: 44,
        height: 44,
        borderRadius: "50%",
        background: `radial-gradient(circle at 35% 35%, rgba(255,255,255,0.18), rgba(${icon.shadowColor},0.18))`,
        backdropFilter: "blur(10px)",
        border: `1.5px solid rgba(${icon.shadowColor},0.55)`,
        boxShadow: [
          `0 0 14px 4px  rgba(${icon.shadowColor},0.65)`,
          `0 0 32px 10px rgba(${icon.shadowColor},0.28)`,
          `inset 0 1px 0  rgba(255,255,255,0.25)`,
        ].join(", "),
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        transition: "box-shadow 0.25s ease",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = [
          `0 0 22px 8px  rgba(${icon.shadowColor},0.9)`,
          `0 0 55px 16px rgba(${icon.shadowColor},0.45)`,
          `inset 0 1px 0  rgba(255,255,255,0.3)`,
        ].join(", ");
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = [
          `0 0 14px 4px  rgba(${icon.shadowColor},0.65)`,
          `0 0 32px 10px rgba(${icon.shadowColor},0.28)`,
          `inset 0 1px 0  rgba(255,255,255,0.25)`,
        ].join(", ");
      }}
    >
      <img
        src={icon.src}
        alt={icon.label}
        draggable={false}
        style={{
          width: 26,
          height: 26,
          objectFit: "contain",
          borderRadius: 4,
          pointerEvents: "none",
        }}
        onError={(e) => {
          // Fallback to 2-letter initials when the image 404s
          const el = e.currentTarget as HTMLImageElement;
          const span = document.createElement("span");
          span.textContent = icon.label.slice(0, 2).toUpperCase();
          span.style.cssText = `
            color: rgb(${icon.shadowColor});
            font-size: 11px;
            font-weight: 800;
            font-family: 'Courier New', monospace;
            pointer-events: none;
          `;
          el.replaceWith(span);
        }}
      />
    </div>
  );
}

// ─── Orbit Ring ───────────────────────────────────────────────────────────────

function OrbitRing({ icons, radius, duration, clockwise }: OrbitRingProps) {
  const ringRef = useRef<HTMLDivElement>(null);
  const angleRef = useRef<number>(0); // shared mutable angle, no re-renders

  useEffect(() => {
    const dir = clockwise ? 1 : -1;
    const speed = 360 / (duration * 60); // degrees per frame at 60 fps
    let raf: number;

    const tick = () => {
      angleRef.current = (angleRef.current + speed * dir) % 360;
      if (ringRef.current) {
        ringRef.current.style.transform = `rotate(${angleRef.current}deg)`;
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [duration, clockwise]);

  return (
    /**
     * The ring wrapper is a circle (width = height = diameter) centred on the
     * parent's centre via negative margins.  It rotates around its own centre.
     * Each icon is placed on the circumference using absolute pixel offsets
     * from the wrapper's top-left corner:
     *
     *   left = radius + radius·cos(θ) - iconHalfSize
     *   top  = radius + radius·sin(θ) - iconHalfSize
     *
     * That puts the icon centre exactly on the circle at angle θ.
     */
    <div
      ref={ringRef}
      style={{
        position: "absolute",
        // Centre the square wrapper on the parent's centre point
        left: "50%",
        top: "50%",
        marginLeft: -radius,
        marginTop: -radius,
        width: radius * 2,
        height: radius * 2,
        transformOrigin: "center center",
      }}
    >
      {icons.map((icon, i) => {
        const ICON_HALF = 22; // half of 44 px bubble
        const theta = (2 * Math.PI * i) / icons.length; // evenly spaced, radians
        const left = radius + radius * Math.cos(theta) - ICON_HALF;
        const top = radius + radius * Math.sin(theta) - ICON_HALF;

        return (
          <div key={icon.label} style={{ position: "absolute", left, top }}>
            <IconBubble
              icon={icon}
              // Stable callback — reads the ring's current angle ref
              getAngle={() => angleRef.current}
            />
          </div>
        );
      })}
    </div>
  );
}

// ─── Root Component ───────────────────────────────────────────────────────────

export default function OrbitSystem() {
  return (
    <div
      style={{
        minHeight: "100vh",
        // background:
        //   "radial-gradient(ellipse at 50% 60%, #0d0520 0%, #060010 50%, #020008 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {/* Soft ambient glow behind the whole system */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          width: 340,
          height: 340,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(100,50,255,0.2) 0%, rgba(50,100,255,0.07) 50%, transparent 75%)",
          filter: "blur(32px)",
          pointerEvents: "none",
        }}
      />

      {/* ── Orbit stage ── */}
      <div style={{ position: "relative", width: 500, height: 500 }}>
        {/* Static ring tracks */}
        {RINGS.map((ring, i) => (
          <div
            key={i}
            aria-hidden
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              width: ring.radius * 2,
              height: ring.radius * 2,
              marginLeft: -ring.radius,
              marginTop: -ring.radius,
              borderRadius: "50%",
              border: `1px solid rgba(${TRACK_COLORS[i]},0.30)`,
              boxShadow: `0 0 8px 1px rgba(${TRACK_COLORS[i]},0.12), inset 0 0 8px 1px rgba(${TRACK_COLORS[i]},0.06)`,
              pointerEvents: "none",
            }}
          />
        ))}

        {/* Centre orb — the "light source" */}
        {/* <div
          aria-hidden
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            width: 52,
            height: 52,
            marginLeft: -26,
            marginTop: -26,
            borderRadius: "50%",
            // background:
            //   "radial-gradient(circle at 35% 30%, rgba(180,120,255,0.95), rgba(80,40,200,0.85) 55%, rgba(20,5,60,0.95))",
            boxShadow: [
              "0 0 20px  6px rgba(140,80,255,0.75)",
              "0 0 50px 15px rgba(100,50,255,0.40)",
              "0 0 100px 30px rgba(80,30,200,0.18)",
              "inset 0 2px 0 rgba(255,255,255,0.45)",
            ].join(", "),
            zIndex: 20,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: 22,
              height: 22,
              borderRadius: "50%",
              background:
                "radial-gradient(circle at 38% 32%, rgba(255,255,255,0.95), rgba(200,160,255,0.4))",
              boxShadow: "0 0 10px rgba(255,255,255,0.6)",
            }}
          />
        </div> */}

        {/* Animated orbit rings */}
        {RINGS.map((ring, i) => (
          <OrbitRing key={i} {...ring} />
        ))}
      </div>
    </div>
  );
}
