// src/components/GlobalLayout.ssr.tsx
import Header from "./Header";
import Footer from "./Footer";
import Notification from "./Notification";
import { useEffect } from "react";
import { useItemStore } from "../store/useItemStore";
import { useAuthStore } from "../store/useAuthStore";

type Props = {
  children: React.ReactNode;
};

export default function GlobalLayoutSSR({ children }: Props) {
  const isClient = typeof window !== "undefined";

  const { fetchAllItems } = useItemStore();
  const { user, loadUser } = useAuthStore();

  useEffect(() => {
    loadUser();
  }, []);

  useEffect(() => {
    if (user) fetchAllItems();
  }, [user]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-gray-200">
      <Header />
      <Notification />
      <div className="flex flex-1 container mx-auto">
        {/* SSR-safe: Sidebar 제거 또는 placeholder */}
        {isClient ? (
          <div className="w-64 mr-4">
            {/* CSR 진입 후 컴포넌트 따로 붙일 수 있음 */}
          </div>
        ) : (
          <div className="w-64 mr-4" /> // SSR placeholder
        )}
        <main className="flex-1 p-6 bg-gray-800 rounded-lg shadow-lg">
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
}
