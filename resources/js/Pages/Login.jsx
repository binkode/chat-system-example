import React, { useState, Fragment, useEffect } from "react";
import FooterSmall from "../Layout/FooterSmall.jsx";
import Navbar from "../Layout/Navbar.jsx";
import { InertiaLink } from "@inertiajs/inertia-react";
import { useForm, usePage } from "@inertiajs/inertia-react";
import { Listbox, Transition } from "@headlessui/react";
import { useUsers } from "../func/async/user";

const Login = props => {
  const { url } = usePage();

  const { setData, post } = useForm({
    password: "password",
    email: ""
  });

  const onSuccess = ({ data }) => {
    setData("email", data?.[0]?.email);
    setSelected(data?.[0]);
  };

  const { state } = useUsers({ onSuccess }, []);

  const [selected, setSelected] = useState(state?.data?.data?.[0]);

  function onChangeList(value) {
    setData("email", value);
    setSelected(value);
  }

  useEffect(() => {
    setData("password", "password");
  }, []);

  function submit(e) {
    e.preventDefault();
    post("/api" + url);
  }

  return (
    <>
      <Navbar transparent />
      <main>
        <section className="absolute w-full h-full">
          <div
            className="absolute top-0 w-full h-full bg-gray-900"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80')",
              // "url(" + require("assets/img/register_bg_2.png").default + ")",
              backgroundSize: "100%",
              backgroundRepeat: "no-repeat"
            }}
          ></div>
          <div className="container mx-auto px-4 h-full">
            <div className="flex content-center items-center justify-center h-full">
              <div className="w-full lg:w-4/12 px-4">
                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300 border-0">
                  <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                    <div className="text-gray-500 text-center mb-3 font-bold">
                      <small>sign in with seeded users</small>
                    </div>
                    <form onSubmit={submit}>
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-gray-700 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          User
                        </label>
                        <Listbox value={selected} onChange={onChangeList}>
                          {({ open }) => (
                            <>
                              <div className="relative mt-1">
                                <Listbox.Button className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full">
                                  <span className="block truncate">
                                    {selected?.name}
                                  </span>
                                  <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                    <span
                                      className="w-5 h-5 text-gray-400"
                                      aria-hidden="true"
                                    />
                                  </span>
                                </Listbox.Button>
                                <Transition
                                  show={open}
                                  as={Fragment}
                                  leave="transition ease-in duration-100"
                                  leaveFrom="opacity-100"
                                  leaveTo="opacity-0"
                                >
                                  <Listbox.Options
                                    static
                                    style={{
                                      zIndex: 2,
                                      transition: "all .15s ease"
                                    }}
                                    name="email"
                                    className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                                  >
                                    {state.data?.data.map(
                                      (person, personIdx) => (
                                        <Listbox.Option
                                          key={personIdx}
                                          className={({ active }) =>
                                            `${
                                              active
                                                ? "text-amber-900 bg-amber-100"
                                                : "text-gray-900"
                                            }
                          cursor-default select-none relative py-2 pl-10 pr-4`
                                          }
                                          value={person}
                                        >
                                          {({ selected, active }) => (
                                            <>
                                              <span
                                                className={`${
                                                  selected
                                                    ? "font-medium"
                                                    : "font-normal"
                                                } block truncate`}
                                              >
                                                {person.name}
                                              </span>
                                              {selected ? (
                                                <span
                                                  className={`${
                                                    active
                                                      ? "text-amber-600"
                                                      : "text-amber-600"
                                                  }
                                absolute inset-y-0 left-0 flex items-center pl-3`}
                                                >
                                                  <span
                                                    className="w-5 h-5"
                                                    aria-hidden="true"
                                                  />
                                                </span>
                                              ) : null}
                                            </>
                                          )}
                                        </Listbox.Option>
                                      )
                                    )}
                                  </Listbox.Options>
                                </Transition>
                              </div>
                            </>
                          )}
                        </Listbox>
                      </div>

                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-gray-700 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Password
                        </label>
                        <input
                          type="password"
                          name="password"
                          className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                          placeholder="Password"
                          style={{ transition: "all .15s ease" }}
                        />
                      </div>
                      <div>
                        <label className="inline-flex items-center cursor-pointer">
                          <input
                            id="customCheckLogin"
                            type="checkbox"
                            className="form-checkbox border-0 rounded text-gray-800 ml-1 w-5 h-5"
                            style={{ transition: "all .15s ease" }}
                          />
                          <span className="ml-2 text-sm font-semibold text-gray-700">
                            Remember me
                          </span>
                        </label>
                      </div>

                      <div className="text-center mt-6">
                        <button
                          className="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                          type="submit"
                          style={{ transition: "all .15s ease" }}
                        >
                          Sign In
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <FooterSmall absolute />
        </section>
      </main>
    </>
  );
};

export default Login;
