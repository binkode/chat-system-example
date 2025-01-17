import { useState } from "react";

import { InertiaLink } from "@inertiajs/inertia-react";
import { usePage } from "@inertiajs/inertia-react";

export default function Navbar(props) {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const {
    props: { auth },
  } = usePage();

  const btnValue = auth && auth.user ? "Logout" : "Login";

  return (
    <nav
      className={
        (props.transparent
          ? "top-0 absolute z-50 w-full"
          : "relative shadow-lg bg-white shadow-lg") +
        " flex flex-wrap items-center justify-between px-2 py-3 "
      }
    >
      <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
        <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
          <InertiaLink
            href={route("home")}
            className={
              (props.transparent ? "text-white" : "text-gray-800") +
              " text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase"
            }
          >
            Home
          </InertiaLink>
          <button
            className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
            type="button"
            onClick={() => setNavbarOpen(!navbarOpen)}
          >
            <i
              className={
                (props.transparent ? "text-white" : "text-gray-800") +
                " fas fa-bars"
              }
            >
              iii
            </i>
          </button>
        </div>
        <div
          className={
            "lg:flex flex-grow items-center bg-white lg:bg-transparent lg:shadow-none" +
            (navbarOpen ? " block rounded shadow-lg" : " hidden")
          }
          id="example-navbar-warning"
        >
          <ul className="flex flex-col lg:flex-row list-none mr-auto">
            <li className="flex items-center">
              <a
                className={
                  (props.transparent
                    ? "lg:text-white lg:hover:text-gray-300 text-gray-800"
                    : "text-gray-800 hover:text-gray-600") +
                  " px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                }
                rel="noreferrer"
                target="_blank"
                href="https://binkode.github.io/laravel-chat-system"
              >
                <i
                  className={
                    (props.transparent
                      ? "lg:text-gray-300 text-gray-500"
                      : "text-gray-500") +
                    " far fa-file-alt text-lg leading-lg mr-2"
                  }
                />
                Docs
              </a>
            </li>
            <li className="flex items-center">
              <a
                className={
                  (props.transparent
                    ? "lg:text-white lg:hover:text-gray-300 text-gray-800"
                    : "text-gray-800 hover:text-gray-600") +
                  " px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                }
                rel="noreferrer"
                target="_blank"
                href="https://github.com/binkode/laravel-chat-system"
              >
                <i
                  className={
                    (props.transparent
                      ? "lg:text-gray-300 text-gray-500"
                      : "text-gray-500") +
                    " far fa-file-alt text-lg leading-lg mr-2"
                  }
                />
                Github
              </a>
            </li>
            {auth.user && !route().current("chat") && (
              <li className="flex items-center">
                <a
                  className={
                    (props.transparent
                      ? "lg:text-white lg:hover:text-gray-300 text-gray-800"
                      : "text-gray-800 hover:text-gray-600") +
                    " px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                  }
                  href={route("chat")}
                >
                  <i
                    className={
                      (props.transparent
                        ? "lg:text-gray-300 text-gray-500"
                        : "text-gray-500") +
                      " far fa-file-alt text-lg leading-lg mr-2"
                    }
                  />{" "}
                  Chat
                </a>
              </li>
            )}
          </ul>
          <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
            {(!!auth.user || !route().current("login")) && (
              <li className="flex items-center">
                <InertiaLink
                  as="button"
                  type="button"
                  method={auth.user ? "post" : undefined}
                  href={route(auth.user ? "logout" : "login")}
                  className={
                    (props.transparent
                      ? "bg-white text-gray-800 active:bg-gray-100"
                      : "bg-pink-500 text-white active:bg-pink-600") +
                    " text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3"
                  }
                >
                  <i className="fas fa-arrow-alt-circle-down"></i> {btnValue}
                </InertiaLink>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
