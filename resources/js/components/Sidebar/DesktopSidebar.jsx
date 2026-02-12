import { memo } from "react";
import SidebarContent from "./SidebarContent.jsx";

function DesktopSidebar() {
  return (
    <aside className="z-30 hidden w-80 flex-shrink-0 p-3 pb-5 pl-5 lg:block">
      <div className="landing-card h-full border-white/10 bg-white/5 p-3">
        <SidebarContent />
      </div>
    </aside>
  );
}

export default memo(DesktopSidebar);
