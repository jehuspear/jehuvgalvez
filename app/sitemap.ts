import type { MetadataRoute } from "next";
import { site } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  // Chapters are anchors on this page, not separate case-study routes.
  return [{ url: `${site.origin}/`, priority: 1 }];
}
