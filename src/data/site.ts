export const site = {
  name: "Lanigan Builds",
  tagline: "London Builder",
  legalName: "Lanigans Construction",
  phone: "07398 231786",
  email: "lanigansconstruction@gmail.com",
  instagram: "https://instagram.com/laniganbuilds",
  instagramHandle: "@laniganbuilds",
  facebook: "https://www.facebook.com/LanigansConstruction/",
  location: "North London",
  serviceArea: "North London & just beyond the M25",
  hours: "Mon–Sat, 7:30am – 6:00pm",
  blurb:
    "Family-run building & renovations, roofing, carpentry and on-site builds across North London. Real projects, real workmanship.",
} as const;

export const nav = [
  { label: "Home", href: "/" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Services", href: "/services" },
  { label: "Areas", href: "/areas" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/contact" },
] as const;

export type Service = {
  slug: string;
  title: string;
  short: string;
  description: string;
  scope: string[];
  image: string;
};

export const services: Service[] = [
  {
    slug: "roofing",
    title: "Roofing",
    short: "Pitched & flat roofs, zinc, slate and lead.",
    description:
      "Full roof replacements, repairs and weatherproofing. Pitched and flat, slate and tile, zinc capping and leadwork — finished to last.",
    scope: [
      "Roof Repairs",
      "New Roofs",
      "Flat Roofing",
      "Leadwork",
      "Chimneys",
      "Fascias & Soffits",
      "Guttering",
      "Emergency Repairs",
      "Slate Roofing",
      "Tile Roofing",
    ],
    image: "/media/DVy6lxRDcmf_thumb.jpg",
  },
  {
    slug: "kitchens",
    title: "Kitchens",
    short: "Full kitchen installs, levelled and finished.",
    description:
      "Complete kitchen installations from strip-out to final finish. Units, worktops, tiling and flooring, set out with laser-levelled precision.",
    scope: [
      "Full Kitchen Installs",
      "Bespoke & Fitted Units",
      "Worktops",
      "Tiling & Splashbacks",
      "Kitchen Flooring",
      "Plumbing & Electrics",
      "Kitchen Islands",
      "Appliance Installation",
      "Lighting",
      "Kitchen Extensions",
    ],
    image: "/media/C0ecESxouna_slide2.jpg",
  },
  {
    slug: "bathrooms",
    title: "Bathrooms",
    short: "Wet rooms and full bathroom refits.",
    description:
      "Bathroom and wet-room transformations — first fix to final seal. Tanking, tiling, sanitaryware and lighting, watertight and clean.",
    scope: [
      "Full Bathroom Refits",
      "Wet Rooms",
      "Tanking & Waterproofing",
      "Tiling",
      "Sanitaryware",
      "Showers & Enclosures",
      "Underfloor Heating",
      "Lighting",
      "Plumbing & Electrics",
      "En-Suites",
    ],
    image: "/media/DMi3fBRIDul_thumb.jpg",
  },
  {
    slug: "carpentry",
    title: "Carpentry & Joinery",
    short: "Bespoke alcoves, shelving and built-ins.",
    description:
      "Bespoke joinery made and fitted on site — alcove units, shelving, media walls, wardrobes and second-fix throughout.",
    scope: ["Bespoke alcoves", "Shelving & storage", "Media walls", "Wardrobes", "Second fix"],
    image: "/media/DIzVyTwoxa__slide1.jpg",
  },
  {
    slug: "flooring",
    title: "Flooring",
    short: "Herringbone, tile, LVT and timber.",
    description:
      "Floor preparation and laying — herringbone, LVT, timber and tile. Levelled subfloors and tight, clean finishes.",
    scope: ["Herringbone", "LVT & laminate", "Tiled floors", "Timber", "Subfloor prep"],
    image: "/media/C6UG0h-ITg0_thumb.jpg",
  },
  {
    slug: "renovations",
    title: "Renovations & Builds",
    short: "Full refurbishments and on-site builds.",
    description:
      "Whole-property refurbishments, extensions and outbuildings managed end to end — structural work, trades coordination and finishing.",
    scope: ["Full refurbishments", "Extensions", "Outbuildings", "Structural", "Project management"],
    image: "/media/Ck1TTq7oBWK_slide1.jpg",
  },
];

export const stats = [
  { value: "20+", label: "Years Experience" },
  { value: "200+", label: "Projects Completed" },
  { value: "Fully Insured", label: "Public Liability Cover" },
  { value: "★★★★★", label: "Rated 5 Stars by Customers" },
];

export const processSteps = [
  {
    no: "01",
    title: "Consultation",
    body: "We visit the site, understand the brief and talk through what's realistic — honestly.",
  },
  {
    no: "02",
    title: "Quotation",
    body: "A clear, itemised quote. No vague numbers, no surprises halfway through.",
  },
  {
    no: "03",
    title: "On-site build",
    body: "Tidy, methodical work with regular updates. We protect your home and keep it clean.",
  },
  {
    no: "04",
    title: "Handover",
    body: "A snag-free finish, walked through with you, backed by real workmanship.",
  },
];
