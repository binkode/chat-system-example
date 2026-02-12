import { useContext } from "react";
import { SidebarContext } from "../context/SidebarContext";
import { MenuIcon } from "../icons";
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

  return (
    <header className="z-40 py-4 bg-white shadow-bottom dark:bg-gray-800">
      <div className="container flex items-center justify-between h-full px-6 mx-auto text-purple-600 dark:text-purple-300">
        {/* <!-- Mobile hamburger --> */}
        <button
          className="p-1 mr-5 -ml-1 rounded-md lg:hidden focus:outline-none focus:shadow-outline-purple"
          onClick={toggleSidebar}
          aria-label="Menu"
        >
          <MenuIcon className="w-6 h-6" aria-hidden="true" />
        </button>
        <ul className="flex ml-auto items-center flex-shrink-0 space-x-6">
          {/* <!-- Profile menu --> */}
          <li className="relative">
            <button
              className="rounded-full flex focus:shadow-outline-purple focus:outline-none items-center"
              onClick={logout}
              aria-label="Account"
              aria-haspopup="true"
            >
              <p>{auth?.user?.name}</p>
              <img
                className="align-middle rounded-full w-12 h-12 mx-2"
                src="https://images.unsplash.com/photo-1502378735452-bc7d86632805?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&s=aa3a807e1bbdfd4364d1f449eaa96d82"
                alt=""
              />
              <span>Log out</span>
            </button>
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Header;
