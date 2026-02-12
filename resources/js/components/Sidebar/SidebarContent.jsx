import { memo } from "react";
import Conversations from "../Conversation/index.jsx";
import { Link } from "@inertiajs/react";

const SidebarContent = memo(() => {
  return (
    <div className="py-4 text-gray-500 dark:text-gray-400">
      <Link
        className="ml-6 text-lg font-bold text-gray-800 dark:text-gray-200"
        href="/"
      >
        Chat System
      </Link>
      <Conversations />
    </div>
  );
});

export default SidebarContent;
