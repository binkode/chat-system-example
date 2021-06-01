import Conversations from "../Conversation/index.jsx";
import { InertiaLink } from "@inertiajs/inertia-react";

function SidebarContent() {
  return (
    <div className="py-4 text-gray-500 dark:text-gray-400">
      <InertiaLink
        className="ml-6 text-lg font-bold text-gray-800 dark:text-gray-200"
        href="/"
      >
        Chat System
      </InertiaLink>
      <Conversations />
    </div>
  );
}

export default SidebarContent;
