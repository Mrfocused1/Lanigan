import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyCTA from "@/components/StickyCTA";
import ScrollManager from "@/components/ScrollManager";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ScrollManager />
      <Header />
      <main>{children}</main>
      <Footer />
      <StickyCTA />
    </>
  );
}
