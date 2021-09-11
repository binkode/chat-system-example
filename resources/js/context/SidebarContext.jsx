import { useState, useMemo, createContext, memo, useEffect } from "react";
import { initPusher } from "../func/Pusher";

// create context
export const SidebarContext = createContext();

export const SidebarProvider = memo(({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  useEffect(() => {
    initPusher();
  }, []);

  function toggleSidebar() {
    setIsSidebarOpen(!isSidebarOpen);
  }

  function closeSidebar() {
    setIsSidebarOpen(false);
  }

  const value = useMemo(
    () => ({
      isSidebarOpen,
      toggleSidebar,
      closeSidebar,
    }),
    [isSidebarOpen]
  );

  return (
    <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
  );
});
