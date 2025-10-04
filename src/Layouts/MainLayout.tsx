import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Loading from "../Components/Loading";

interface MainLayoutProps {
  showHeader?: boolean;
  showFooter?: boolean;
  timer?: number; // optional timer in ms
}

export default function MainLayout({
  showHeader = true,
  showFooter = true,
  timer = 1000, // default "normal" loading
}: MainLayoutProps) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), timer);
    return () => clearTimeout(timeout);
  }, [timer]);

  return (
    <div className="flex flex-col min-h-screen">
      {showHeader && <Header />}
      <main className="flex-grow">
        {loading ? <Loading /> : <Outlet />}
      </main>
      {showFooter && <Footer />}
    </div>
  );
}