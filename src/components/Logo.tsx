import Link from "next/link";
import BrandLogo from "./BrandLogo";

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`group inline-flex items-center ${className}`}
      aria-label="Lanigan Builds home"
    >
      <BrandLogo className="h-11 w-auto text-brand transition-opacity duration-300 group-hover:opacity-70" />
    </Link>
  );
}
