"use client";

import { createContext, useContext } from "react";
import { DEFAULT_CONTENT, type SiteContent } from "@/lib/content";

const ContentCtx = createContext<SiteContent>(DEFAULT_CONTENT);

export function ContentProvider({
  content,
  children,
}: {
  content: SiteContent;
  children: React.ReactNode;
}) {
  return <ContentCtx.Provider value={content}>{children}</ContentCtx.Provider>;
}

/** Returns live site content (falls back to defaults if no provider). */
export const useContent = () => useContext(ContentCtx);
