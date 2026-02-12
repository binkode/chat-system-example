import { memo } from "react";
import Conversations from "../Conversation/index.jsx";
import { Link } from "@inertiajs/react";

const SidebarContent = memo(({ closeSidebar }) => {
  return (
    <div className="flex h-full flex-col text-slate-200">
      <div className="mb-4 border-b border-white/10 px-2 pb-4">
        <Link
          className="inline-block bg-gradient-to-r from-cyan-300 via-sky-300 to-indigo-300 bg-clip-text text-lg font-bold text-transparent"
          href="/"
          onClick={closeSidebar}
        >
          ChatSystem
        </Link>
        <p className="mt-2 text-xs uppercase tracking-[0.18em] text-slate-400">
          Conversations
        </p>
      </div>

      <div className="chat-scrollbar min-h-0 flex-1 overflow-y-auto pr-1">
        <Conversations closeSidebar={closeSidebar} />
      </div>
    </div>
  );
});

export default SidebarContent;
