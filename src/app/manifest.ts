import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Фитнес-клуб Urban210",
    short_name: "Urban210",
    start_url: "/",
    display: "browser",
    background_color: "#0f0e0d",
    theme_color: "#0f0e0d",
    icons: [{ src: "/icon.png", sizes: "512x512", type: "image/png" }],
  };
}
