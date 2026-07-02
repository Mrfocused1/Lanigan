import data from "@/data/portfolio.json";

export type MediaItem = {
  src: string;
  type: "image" | "video";
  poster?: string | null;
};

export type Project = {
  shortcode: string;
  title: string;
  caption: string;
  category: string;
  date: string;
  type: "image" | "video" | "carousel";
  cover: string;
  media: MediaItem[];
  tags: string[];
};

export const projects = data as Project[];

export const categories = Array.from(
  new Set(projects.map((p) => p.category))
).sort((a, b) => {
  const order = ["Roofing", "Kitchens", "Bathrooms", "Carpentry", "Flooring", "Renovations"];
  return order.indexOf(a) - order.indexOf(b);
});

export function getProject(shortcode: string) {
  return projects.find((p) => p.shortcode === shortcode);
}

export function byCategory(category: string | null) {
  if (!category || category === "All") return projects;
  return projects.filter((p) => p.category === category);
}

export function formatDate(d: string) {
  if (!d) return "";
  const date = new Date(d + "T00:00:00");
  return date.toLocaleDateString("en-GB", { month: "short", year: "numeric" });
}
