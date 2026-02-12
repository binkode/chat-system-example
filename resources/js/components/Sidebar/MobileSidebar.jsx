import { memo, useContext } from "react";
import SidebarContent from "./SidebarContent.jsx";
import { SidebarContext } from "../../context/SidebarContext.jsx";
import { Transition } from "@headlessui/react";

function MobileSidebar() {
  const { isSidebarOpen, closeSidebar } = useContext(SidebarContext);

  return (
    <Transition show={isSidebarOpen}>
      <>
        <Transition
          enter="transition ease-in-out duration-150"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition ease-in-out duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <button
            type="button"
            className="fixed inset-0 z-40 bg-slate-950/70 backdrop-blur-sm lg:hidden"
            onClick={closeSidebar}
            aria-label="Close sidebar"
          />
        </Transition>

        <Transition
          enter="transition ease-in-out duration-200"
          enterFrom="opacity-0 -translate-x-6"
          enterTo="opacity-100 translate-x-0"
          leave="transition ease-in-out duration-150"
          leaveFrom="opacity-100 translate-x-0"
          leaveTo="opacity-0 -translate-x-6"
        >
          <aside className="fixed inset-y-0 left-0 z-50 w-80 max-w-[90vw] p-3 pt-5 lg:hidden">
            <div className="landing-card h-full border-white/10 bg-white/5 p-3">
              <SidebarContent closeSidebar={closeSidebar} />
            </div>
          </aside>
        </Transition>
      </>
    </Transition>
  );
}

export default memo(MobileSidebar);
