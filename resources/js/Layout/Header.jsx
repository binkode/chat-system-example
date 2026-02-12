import { useContext } from "react";
import { SidebarContext } from "../context/SidebarContext";
import { MenuIcon, SearchIcon, OutlineLogoutIcon } from "../icons";
import { usePage, useForm } from "@inertiajs/react";
import { logOut } from "../redux/app";
import { useDispatch } from "react-redux";

function Header() {
  const { toggleSidebar } = useContext(SidebarContext);

  const {
    props: { auth },
  } = usePage();

  const dispatch = useDispatch();
  const { post } = useForm();

  const logout = async () => {
    await post(route("logout"));
    dispatch(logOut());
  };

  const userName = auth?.user?.name || "Guest";
  const initials = userName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");

  return (
    <header className="z-40 px-3 pt-3 sm:px-5 sm:pt-5">
      <div className="mx-auto flex h-16 items-center justify-between gap-3 rounded-2xl border border-white/10 bg-slate-950/60 px-3 shadow-[0_20px_60px_rgba(2,6,23,0.35)] backdrop-blur-xl sm:px-5">
        <div className="flex items-center gap-3">
          <button
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-200 transition hover:bg-white/10 focus:outline-none lg:hidden"
            onClick={toggleSidebar}
            aria-label="Open menu"
          >
            <MenuIcon className="h-5 w-5" aria-hidden="true" />
          </button>

          <div className="hidden sm:block">
            <p className="text-xs uppercase tracking-[0.22em] text-slate-400">
              Chat dashboard
            </p>
            <p className="text-sm font-medium text-slate-100">
              Realtime workspace
            </p>
          </div>
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <div className="flex h-10 items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3">
            <SearchIcon className="h-4 w-4 text-slate-400" />
            <span className="text-xs text-slate-400">Search conversations</span>
          </div>
        </div>

        <button
          className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-2 py-1.5 text-left transition hover:bg-white/10 focus:outline-none"
          onClick={logout}
          aria-label="Log out"
          aria-haspopup="true"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-indigo-500 text-sm font-semibold text-slate-950">
            {initials || "U"}
          </div>
          <div className="hidden sm:block">
            <p className="max-w-[140px] truncate text-sm font-semibold text-slate-100">
              {userName}
            </p>
            <p className="text-xs uppercase tracking-[0.16em] text-slate-400">
              Sign out
            </p>
          </div>
          <OutlineLogoutIcon className="mr-1 h-4 w-4 text-slate-300" />
        </button>
      </div>
    </header>
  );
}

export default Header;
