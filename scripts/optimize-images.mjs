// Готовит исходники для next/image из снимка старого сайта (ветка import/wp-snapshot).
// Запуск: node scripts/optimize-images.mjs <путь к import/uploads/2026>
import sharp from "sharp";
import path from "node:path";

const src = process.argv[2];
if (!src) throw new Error("Укажите папку import/uploads/2026");
const out = path.resolve("public/images");

const jobs = [
  ["03/training.avif", "hero.jpg", 2400],
  ["02/urban_area_image.avif", "zal.jpg", 1920],
  ["02/urban_area_image3.avif", "cardio.jpg", 1600],
  ["02/urban_area_image_1.avif", "free-weights.jpg", 1600],
  ["02/urban_area_image_2.avif", "machines.jpg", 1600],
  ["02/urban_group_3.avif", "group.jpg", 1600],
  ["02/urban_group_4.avif", "functional.jpg", 1600],
  ["02/group_img_1.avif", "group-strength.jpg", 1600],
  ["03/group_img3.avif", "stretching.jpg", 1600],
  ["03/1773370448_thumb_3_.webp", "reception.jpg", 1600],
  ["03/trainer-1-ava.avif", "trainers/parfenova.jpg", 900],
  ["03/trainer-2-ava.avif", "trainers/shuvaev.jpg", 900],
  ["03/trainer-3-ava.avif", "trainers/lazko.jpg", 900],
  ["03/za_1_ruble.avif", "promo/1-rubl.jpg", 1200],
  ["03/trade_in_urban_2.avif", "promo/trade-in.jpg", 1200],
  ["03/1_1_vigodno.avif", "promo/1-plus-1.jpg", 1200],
  ...["2", "3", "6", "9", "11", "12", "13", "15"].map((n) => [`02/review_img_${n}.avif`, `community/${n}.jpg`, 600]),
];

for (const [from, to, width] of jobs) {
  await sharp(path.join(src, from)).rotate().resize({ width, withoutEnlargement: true }).jpeg({ quality: 82, mozjpeg: true, progressive: true }).toFile(path.join(out, to));
  console.log("→", to);
}

// OG-картинка 1200×630 и иконки
await sharp(path.join(src, "04/promo_bg_3.jpg")).resize(1200, 630, { fit: "cover" }).jpeg({ quality: 85, mozjpeg: true }).toFile(path.resolve("public/og.jpg"));
await sharp(path.join(src, "04/favicon.webp")).resize(512, 512).png().toFile(path.resolve("src/app/icon.png"));
await sharp(path.join(src, "04/favicon.webp")).resize(180, 180).png().toFile(path.resolve("src/app/apple-icon.png"));
console.log("→ og.jpg, icon.png, apple-icon.png");
