import { useContext, Suspense, useEffect } from "react";

import Sidebar from "../components/Sidebar/index.jsx";
import Header from "./Header.jsx";
import Main from "./Main.jsx";
import ThemedSuspense from "../components/ThemedSuspense.jsx";
import FooterSmall from "./FooterSmall.jsx";
import Head from "../components/Head.jsx";
import { SidebarContext } from "../context/SidebarContext.jsx";
import { usePage } from "@inertiajs/inertia-react";

function Layout({ children, title }) {
  const { isSidebarOpen, closeSidebar } = useContext(SidebarContext);
  const { url } = usePage();

  useEffect(() => {
    closeSidebar();
  }, [url]);

  return (
    <div
      className={`flex h-screen bg-gray-50 dark:bg-gray-900 ${
        isSidebarOpen && "overflow-hidden"
      }`}
    >
      <Sidebar />

      <div className="flex flex-col flex-1 w-full">
        <Head title={title} />
        <Header />
        <Main>
          <Suspense fallback={<ThemedSuspense />}>{children}</Suspense>
        </Main>
        <FooterSmall />
      </div>
    </div>
  );
}

export default Layout;
