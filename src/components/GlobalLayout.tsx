import useExpiringItems from "../hooks/useExpiringItems";
import Footer from "./Footer";
import Header from "./Header";
import Notification from "./Notification";
import { useEffect } from "react";
import { useItemStore } from "../store/useItemStore";
import { useAuthStore } from "../store/useAuthStore";

import type { ReactNode } from "react";

// ✅ 직접 import
import SidebarWrapper from "./SidebarWrapper";

export default function GlobalLayout({
  children,
}: {
  children: ReactNode;
}) {
  const isClient = typeof window !== "undefined";

  const { fetchAllItems } = useItemStore();
  const { user, loadUser } = useAuthStore();

  const hideSidebarRoutes = ["/settings", "/login"];
  const currentPath = isClient ? window.location.pathname : "/";
  const showSidebar = isClient
    ? !hideSidebarRoutes.includes(currentPath)
    : true; // SSR 시 Sidebar는 무조건 보여줌 (또는 빈 공간)

  useExpiringItems();

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
        {isClient && showSidebar && <SidebarWrapper />}
        <main
          className={`flex-1 p-6 ${
            isClient && showSidebar ? "ml-4" : ""
          } bg-gray-800 rounded-lg shadow-lg`}
        >
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
}
