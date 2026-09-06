import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyCTA from "@/components/StickyCTA";
import WhatsAppButton from "@/components/WhatsAppButton";
import ScrollManager from "@/components/ScrollManager";
import { ContentProvider } from "@/components/ContentProvider";
import { getContent } from "@/lib/content";

// Refresh public CMS pages once a minute instead of rebuilding for every visitor.
export const revalidate = 60;

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  const content = await getContent();
  return (
    <ContentProvider content={content}>
      <ScrollManager />
      <Header />
      <main>{children}</main>
      <Footer />
      <StickyCTA />
      <WhatsAppButton />
    </ContentProvider>
  );
}
