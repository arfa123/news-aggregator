import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "News Aggregator",
    short_name: "News Aggregator",
    description: "Stay informed with the latest news from multiple sources",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#000000",
    icons: [
      {
        src: "/logo-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/logo-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
