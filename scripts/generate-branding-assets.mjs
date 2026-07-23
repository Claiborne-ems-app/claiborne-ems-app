import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const source = path.join(root, "public/branding/covenant-health-air-logo.png");
const brandingDirectory = path.join(root, "public/branding");
const iconDirectory = path.join(root, "public/icons");
const appDirectory = path.join(root, "app");

const crop = { left: 45, top: 1170, width: 1120, height: 560 };

async function createTransparentLogo() {
  const { data, info } = await sharp(source)
    .extract(crop)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  for (let index = 0; index < data.length; index += info.channels) {
    const [red, green, blue] = data.subarray(index, index + 3);
    if (red > 245 && green > 245 && blue > 245) data[index + 3] = 0;
  }

  return sharp(data, {
    raw: { width: info.width, height: info.height, channels: info.channels },
  }).png();
}

const logo = await createTransparentLogo();
await fs.mkdir(iconDirectory, { recursive: true });
await logo.toFile(path.join(brandingDirectory, "covenant-health-air-logo-cropped.png"));

for (const size of [180, 192, 512]) {
  const output = size === 180
    ? path.join(iconDirectory, "covenant-health-air-apple-touch.png")
    : path.join(iconDirectory, `covenant-health-air-${size}.png`);

  await sharp({
    create: { width: size, height: size, channels: 4, background: "#ffffff" },
  })
    .composite([
      {
        input: await logo.clone().resize({ width: Math.round(size * 0.86), height: Math.round(size * 0.43), fit: "contain" }).png().toBuffer(),
        gravity: "centre",
      },
    ])
    .png()
    .toFile(output);
}

await fs.copyFile(
  path.join(iconDirectory, "covenant-health-air-512.png"),
  path.join(appDirectory, "icon.png")
);
await fs.copyFile(
  path.join(iconDirectory, "covenant-health-air-apple-touch.png"),
  path.join(appDirectory, "apple-icon.png")
);

const faviconPng = await logo.clone().resize({ width: 32, height: 32, fit: "contain", background: { r: 255, g: 255, b: 255, alpha: 0 } }).png().toBuffer();
const icoHeader = Buffer.alloc(22);
icoHeader.writeUInt16LE(0, 0);
icoHeader.writeUInt16LE(1, 2);
icoHeader.writeUInt16LE(1, 4);
icoHeader.writeUInt8(32, 6);
icoHeader.writeUInt8(32, 7);
icoHeader.writeUInt16LE(1, 10);
icoHeader.writeUInt16LE(32, 12);
icoHeader.writeUInt32LE(faviconPng.length, 14);
icoHeader.writeUInt32LE(22, 18);
await fs.writeFile(path.join(appDirectory, "favicon.ico"), Buffer.concat([icoHeader, faviconPng]));
