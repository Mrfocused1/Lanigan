"use client";

import { useContent } from "./ContentProvider";

export default function WhatsAppButton() {
  const { settings } = useContent();
  return (
    <a
      href={`https://wa.me/${settings.whatsapp.replace(/\D/g, "")}`}
      target="_blank"
      rel="noreferrer"
      aria-label="Message Lanigan Builds on WhatsApp"
      className="fixed bottom-24 right-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_18px_50px_-18px_rgba(0,0,0,0.45)] transition hover:scale-105"
    >
      <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12.02 2C6.5 2 2 6.48 2 12c0 1.85.5 3.58 1.36 5.07L2 22l5.06-1.33A9.94 9.94 0 0012.02 22C17.5 22 22 17.52 22 12S17.5 2 12.02 2zm0 18.06c-1.6 0-3.11-.43-4.42-1.19l-.32-.19-3.01.79.8-2.94-.2-.3A8.06 8.06 0 013.96 12c0-4.44 3.62-8.06 8.06-8.06 4.44 0 8.06 3.62 8.06 8.06 0 4.44-3.62 8.06-8.06 8.06zm4.42-6.04c-.24-.12-1.43-.7-1.65-.79-.22-.08-.38-.12-.55.12-.16.24-.63.79-.77.95-.14.16-.28.18-.52.06-.24-.12-1.02-.38-1.94-1.2-.72-.64-1.2-1.43-1.35-1.67-.14-.24-.02-.37.11-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.55-1.33-.76-1.82-.2-.48-.4-.42-.55-.42-.14 0-.3-.02-.46-.02s-.42.06-.64.3c-.22.24-.85.83-.85 2.02 0 1.19.87 2.34.99 2.5.12.16 1.71 2.61 4.14 3.66.58.25 1.03.4 1.38.51.58.18 1.11.16 1.53.1.47-.07 1.43-.58 1.63-1.15.2-.56.2-1.04.14-1.15-.06-.1-.22-.16-.46-.28z" />
      </svg>
    </a>
  );
}
