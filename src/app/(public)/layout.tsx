import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyCTA from "@/components/StickyCTA";
import ScrollManager from "@/components/ScrollManager";
import { ContentProvider } from "@/components/ContentProvider";
import { getContent } from "@/lib/content";

// Read live CMS content on every request so admin edits show without a redeploy.
export const dynamic = "force-dynamic";

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  const content = await getContent();
  return (
    <ContentProvider content={content}>
      <ScrollManager />
      <Header />
      <main>{children}</main>
      <Footer />
      <StickyCTA />
    </ContentProvider>
  );
}
