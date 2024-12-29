// ./kernel.js
export const kernelFunction = function (width, height, hue) {
  const i = this.thread.x;
  const y = Math.floor(i / (width * 4));
  const x = Math.floor((i / 4) - y * width);
  const channel = i % 4;

  // coordinates 
  const normalizedX = x / width;
  const normalizedY = y / height;

  //  color calculations (RGB)
  let red = 0, green = 0, blue = 0;

  if (hue < 1 / 3) {
    red = 1 - 3 * hue;
    green = 3 * hue;
    blue = 0;
  } else if (hue < 2 / 3) {
    red = 0;
    green = 2 - 3 * hue;
    blue = 3 * hue - 1;
  } else {
    red = 3 * hue - 2;
    green = 0;
    blue = 3 - 3 * hue;
  }

  // Apply gradients
  red = red * normalizedX * (1 - normalizedY) + normalizedY;
  green = green * normalizedX * (1 - normalizedY) + normalizedY;
  blue = blue * normalizedX * (1 - normalizedY) + normalizedY;

  // Return the correct channel (R, G, B, A)
  if (channel === 0) return red * 255;
  if (channel === 1) return green * 255;
  if (channel === 2) return blue * 255;
  if (channel === 3) return 255; 
};
