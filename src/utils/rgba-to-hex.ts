export const rgbaStringToHex = (rgba: string): string => {
  // Match the rgba format and extract the components
  const rgbaRegex =
    /^rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d*\.?\d+)\s*\)$/;
  const match = rgba.match(rgbaRegex);

  if (!match) {
    throw new Error("Invalid RGBA string format");
  }

  // Extract the RGBA values from the match
  const r = parseInt(match[1], 10);
  const g = parseInt(match[2], 10);
  const b = parseInt(match[3], 10);
  const a = parseFloat(match[4]);

  // Ensure the RGB values are within the range 0-255 and alpha is within 0-1
  if (
    r < 0 ||
    r > 255 ||
    g < 0 ||
    g > 255 ||
    b < 0 ||
    b > 255 ||
    a < 0 ||
    a > 1
  ) {
    throw new Error("Invalid color values");
  }

  // Convert each component to a two-digit hex string
  const rHex = r.toString(16).padStart(2, "0");
  const gHex = g.toString(16).padStart(2, "0");
  const bHex = b.toString(16).padStart(2, "0");
  const aHex = Math.round(a * 255)
    .toString(16)
    .padStart(2, "0");

  // Concatenate the hex values
  return `#${rHex}${gHex}${bHex}${aHex}`;
};
