export type GlowPattern = {
  color: "purple" | "blue";
  size: "xs" | "sm" | "md" | "lg" | "xl";
  position: string;
    opacity?: "low" | "medium" | "high";
};
export type startProps = {
  start: boolean;
};