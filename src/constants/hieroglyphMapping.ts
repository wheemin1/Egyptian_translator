export const HIEROGLYPH_MAP: Record<string, string> = {
  A: "𓄿", // Egyptian Vulture
  B: "𓃀", // Foot
  C: "𓎡", // Basket (Sound K)
  D: "𓂧", // Hand
  E: "𓇋", // Reed
  F: "𓆑", // Horned Viper
  G: "𓎼", // Jar Stand
  H: "𓉔", // Twisted Flax
  I: "𓇋", // Reed (Same as E)
  J: "𓆓", // Cobra
  K: "𓎡", // Basket
  L: "𓃭", // Lion
  M: "𓅓", // Owl
  N: "𓈖", // Water Ripple
  O: "𓍯", // Lasso
  P: "𓊪", // Stool
  Q: "𓈎", // Hill
  R: "𓂋", // Mouth
  S: "𓋴", // Folded Cloth
  T: "𓏏", // Bread Loaf
  U: "𓍯", // Lasso (Same as O)
  V: "𓆑", // Horned Viper (Same as F)
  W: "𓍯", // Lasso (Alt: Quail Chick 𓅱)
  X: "𓎡𓋴", // K+S
  Y: "𓇋𓇋", // Two Reeds
  Z: "𓊃", // Door Bolt
  " ": " ",
  "-": " ",
};

export function romanizedToHieroglyphText(romanizedName: string): string {
  return romanizedName
    .toUpperCase()
    .split("")
    .map((char) => HIEROGLYPH_MAP[char] ?? (/[A-Z]/.test(char) ? char : ""))
    .join("")
    .trim();
}
