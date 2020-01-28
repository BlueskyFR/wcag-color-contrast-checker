// © Copyright 2020 Hugo Cartigny
// This file is under the Apache License 2.0 license.
// Implementation based on the Web Content Accessibility Guidelines (WCAG) 2.0,
// see https://www.w3.org/TR/WCAG20/#contrast-ratiodef for the reference.

/// Returns the relative luminance for a given color
/// Parameters: r, g and b (both Int between 0 and 255)
exports.getLuminance = function(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;

  let red = r <= 0.03928 ? r / 12.92 : ((r + 0.055) / 1.055) ** 2.4;
  let green = g <= 0.03928 ? g / 12.92 : ((g + 0.055) / 1.055) ** 2.4;
  let blue = b <= 0.03928 ? b / 12.92 : ((b + 0.055) / 1.055) ** 2.4;

  // Compute and return luminance
  return 0.2126 * red + 0.7152 * green + 0.0722 * blue;
};

/// c1 and c2 object format: { r: Int, g: Int, b: Int }
/// r, g and b are between 0 and 255
exports.getContrastRatio = function(c1, c2) {
  let l1 = this.getLuminance(c1.r, c1.g, c1.b);
  let l2 = this.getLuminance(c2.r, c2.g, c2.b);

  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
};

/// Returns whether or not the two colors are enough contrasted
/// c1 and c2 object format: { r: Int, g: Int, b: Int }
/// r, g and b are between 0 and 255
exports.minContrastRatio = 7; // 7:1, constant

exports.checkContrast = function(c1, c2) {
  return this.getContrastRatio(c1, c2) >= this.minContrastRatio;
};
