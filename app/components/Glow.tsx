/**
 * Glow Component
 *
 * Decorative radial glow used for background effects in sections.
 * This component is designed to be reusable and configurable using
 * color, size, and opacity variants.
 *
 * Props:
 * - color: determines the glow gradient color
 * - size: controls the responsive size using predefined glow-size classes
 * - opacity: controls glow intensity
 * - className: allows custom positioning (top, left, etc.)
 */

type GlowProps = {
  /** Color variant for the glow gradient */
  color?: "blue" | "purple";

  /** Predefined responsive glow sizes */
  size?: "xs" | "sm" | "md" | "lg" | "xl";

  /** Intensity level of the glow */
  opacity?: "low" | "medium" | "high";

  /** Additional classes (usually for positioning like -top-20 left-0) */
  className?: string;
};

/**
 * Mapping for glow size classes
 * These classes control width/height using clamp()
 * to keep the glow responsive.
 */
const sizeClasses = {
  xs: "glow-size-xs",
  sm: "glow-size-sm",
  md: "glow-size-md",
  lg: "glow-size-lg",
  xl: "glow-size-xl",
};

/**
 * Mapping for glow color styles
 * Each class contains a radial-gradient definition.
 */
const colorClasses = {
  blue: "radial-blue-glow",
  purple: "radial-purple-glow",
};

/**
 * Opacity variants to control glow strength
 */
const opacityClasses = {
  low: "opacity-30",
  medium: "opacity-50",
  high: "opacity-80",
};

export default function Glow({
  color = "blue",
  size = "md",
  opacity = "low",
  className = "",
}: GlowProps) {
  return (
    <div
      className={`
        pointer-events-none absolute rounded-full blur-3xl
        ${colorClasses[color]}
        ${sizeClasses[size]}
        ${opacityClasses[opacity]}
        ${className}
      `}
    />
  );
}
