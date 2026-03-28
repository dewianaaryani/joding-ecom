"use client";
import { useEffect, useRef } from "react";
import Glow from "./Glow";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface IconData {
  src: string;
  shadowColor: string; // RGB triple, e.g. "59,130,246"
  label: string;
}

export interface RingConfig {
  icons: IconData[];
  radius: number; // px from center
  duration: number; // seconds per full revolution
  clockwise?: boolean;
}

interface IconBubbleProps {
  icon: IconData;
  size?: number; // bubble diameter in px, default 44
  getAngle: () => number;
}

interface OrbitRingProps extends RingConfig {
  iconSize?: number;
}

export interface OrbitSystemProps {
  /** Ring configurations. Defaults to the built-in 3-ring layout. */
  rings?: RingConfig[];
  /**
   * Icon diameter in px.
   * @default 44
   */
  iconSize?: number;
  /** Stage size in px (square). Outer rings must fit within this.
   * @default 500
   */
  stageSize?: number;
}

// ─── Default data ─────────────────────────────────────────────────────────────

const DEFAULT_ICONS: IconData[] = [
  { src: "/icons/reactjs.png", shadowColor: "59,130,246", label: "React" },
  { src: "/icons/figma.png", shadowColor: "168,85,247", label: "Figma" },
  { src: "/icons/xd.png", shadowColor: "236,72,153", label: "XD" },
  {
    src: "/icons/bootsrap.png",
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

const DEFAULT_RINGS: RingConfig[] = [
  {
    icons: DEFAULT_ICONS.slice(0, 3),
    radius: 90,
    duration: 18,
    clockwise: true,
  },
  {
    icons: DEFAULT_ICONS.slice(3, 7),
    radius: 155,
    duration: 28,
    clockwise: false,
  },
  {
    icons: DEFAULT_ICONS.slice(7, 12),
    radius: 220,
    duration: 40,
    clockwise: true,
  },
];

// Track glow colours cycle if there are more than 3 rings
const TRACK_PALETTE = [
  "120,80,255",
  "60,150,255",
  "30,220,200",
  "255,100,180",
  "255,180,40",
] as const;

// ─── Icon Bubble ──────────────────────────────────────────────────────────────

function IconBubble({ icon, size = 44, getAngle }: IconBubbleProps) {
  const bubbleRef = useRef<HTMLDivElement>(null);
  const imgSize = Math.round(size * 0.59); // ~26 px at default size

  // Counter-rotate every frame so the icon always faces up
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

  const baseShadow = [
    `0 0 14px 4px  rgba(${icon.shadowColor},0.65)`,
    `0 0 32px 10px rgba(${icon.shadowColor},0.28)`,
    `inset 0 1px 0  rgba(255,255,255,0.25)`,
  ].join(", ");

  const hoverShadow = [
    `0 0 22px 8px  rgba(${icon.shadowColor},0.9)`,
    `0 0 55px 16px rgba(${icon.shadowColor},0.45)`,
    `inset 0 1px 0  rgba(255,255,255,0.3)`,
  ].join(", ");

  return (
    <div
      ref={bubbleRef}
      title={icon.label}
      className="flex items-center justify-center rounded-full cursor-pointer backdrop-blur-sm transition-shadow duration-300"
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle at 35% 35%, rgba(255,255,255,0.18), rgba(${icon.shadowColor},0.18))`,
        border: `1.5px solid rgba(${icon.shadowColor},0.55)`,
        boxShadow: baseShadow,
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = hoverShadow;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = baseShadow;
      }}
    >
      <img
        src={icon.src}
        alt={icon.label}
        draggable={false}
        className="object-contain rounded-[4px] pointer-events-none select-none"
        style={{ width: imgSize, height: imgSize }}
        onError={(e) => {
          const el = e.currentTarget as HTMLImageElement;
          const span = document.createElement("span");
          span.textContent = icon.label.slice(0, 2).toUpperCase();
          span.style.cssText = `
            color: rgb(${icon.shadowColor});
            font-size: ${Math.round(size * 0.25)}px;
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

function OrbitRing({
  icons,
  radius,
  duration,
  clockwise = true,
  iconSize = 44,
}: OrbitRingProps) {
  const ringRef = useRef<HTMLDivElement>(null);
  const angleRef = useRef<number>(0);

  useEffect(() => {
    const dir = clockwise ? 1 : -1;
    const speed = 360 / (duration * 60); // degrees per frame @ ~60 fps
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

  const iconHalf = iconSize / 2;

  return (
    /*
     * Square wrapper centred on the stage via negative margins.
     * Icon positions from the wrapper's top-left:
     *   left = radius + radius·cos(θ) − iconHalf
     *   top  = radius + radius·sin(θ) − iconHalf
     */
    <div
      ref={ringRef}
      className="absolute"
      style={{
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
        const theta = (2 * Math.PI * i) / icons.length;
        const left = radius + radius * Math.cos(theta) - iconHalf;
        const top = radius + radius * Math.sin(theta) - iconHalf;

        return (
          <div
            key={icon.label}
            className="absolute"
            style={{
              left: `${left.toFixed(2)}px`,
              top: `${top.toFixed(2)}px`,
            }}
          >
            <IconBubble
              icon={icon}
              size={iconSize}
              getAngle={() => angleRef.current}
            />
          </div>
        );
      })}
    </div>
  );
}

// ─── Root Component ───────────────────────────────────────────────────────────

export default function OrbitSystem({
  rings = DEFAULT_RINGS,
  iconSize = 44,
  stageSize = 500,
}: OrbitSystemProps) {
  return (
    <div className="relative flex w-full h-full items-center justify-center overflow-hidden">
      {/* Ambient glow */}
      <div
        aria-hidden
        className="absolute size-96 rounded-full blur-3xl pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(100,50,255,0.2) 0%, rgba(50,100,255,0.07) 50%, transparent 75%)",
        }}
      />

      {/* Stage */}
      <div
        className="relative shrink-0"
        style={{ width: stageSize, height: stageSize }}
      >
        {/* Static ring tracks */}
        {rings.map((ring, i) => {
          const color = TRACK_PALETTE[i % TRACK_PALETTE.length];
          return (
            <div
              key={i}
              aria-hidden
              className="absolute rounded-full pointer-events-none"
              style={{
                left: "50%",
                top: "50%",
                width: ring.radius * 2,
                height: ring.radius * 2,
                marginLeft: -ring.radius,
                marginTop: -ring.radius,
                border: `1px solid rgba(${color},0.30)`,
                boxShadow: `0 0 8px 1px rgba(${color},0.12), inset 0 0 8px 1px rgba(${color},0.06)`,
              }}
            />
          );
        })}

        {/* Centre light-source orb */}
        <div
          aria-hidden
          className="absolute rounded-full flex items-center justify-center z-20"
          style={{
            left: "50%",
            top: "50%",
            width: 52,
            height: 52,
            marginLeft: -26,
            marginTop: -26,
            background:
              "radial-gradient(circle at 35% 30%, rgba(180,120,255,0.95), rgba(80,40,200,0.85) 55%, rgba(20,5,60,0.95))",
            boxShadow: [
              "0 0 20px  6px rgba(140,80,255,0.75)",
              "0 0 50px 15px rgba(100,50,255,0.40)",
              "0 0 100px 30px rgba(80,30,200,0.18)",
              "inset 0 2px 0 rgba(255,255,255,0.45)",
            ].join(", "),
          }}
        >
          <div
            className="rounded-full"
            style={{
              width: 22,
              height: 22,
              background:
                "radial-gradient(circle at 38% 32%, rgba(255,255,255,0.95), rgba(200,160,255,0.4))",
              boxShadow: "0 0 10px rgba(255,255,255,0.6)",
            }}
          />
        </div>

        <Glow
          color="purple"
          size="md"
          opacity="low"
          className="-translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2"
        />

        {/* Orbit rings */}
        {rings.map((ring, i) => (
          <OrbitRing
            key={i}
            {...ring}
            clockwise={ring.clockwise ?? true}
            iconSize={iconSize}
          />
        ))}
      </div>
    </div>
  );
}
