import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function AppLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col pb-[70px]">
      <Header />

      <main className="flex-1">
        {children}
      </main>

      <Footer />
    </div>
  );
}
