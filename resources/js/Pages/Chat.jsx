import React from "react";
import Helmet from "react-helmet";

import Navbar from "../Layout/Navbar.jsx";
import Sidebar from "../Layout/Sidebar.jsx";

const messages = [
  {
    id: 1,
    text: "this is a basic mobile chat layout, build with tailwind css"
  },
  {
    id: 2,
    text:
      "It will be used for a full tutorial about building a chat app with vue, tailwind and firebase."
  },
  {
    id: 3,
    right: true,
    text: "check my twitter to see when it will be released."
  },
  {
    id: 4,
    right: true,
    text: "check my twitter to see when it will be released."
  },
  {
    id: 5,
    right: true,
    text: "check my twitter to see when it will be released."
  },
];

export default function Dashboard() {
  return (
    <>
      <Helmet titleTemplate="%s | ChatSystem" title="Chat" />
      <Sidebar />
      <div className="md:ml-64 bg-blue-100">
        <Navbar />
        {/* Header */}
        <div className="relative bg-red-200 h-full">
          <div className="relative top-0 overscroll-none w-full bg-green-400 h-16 pt-2 text-white flex justify-between shadow-md">
            <div className="ml-3 my-3 text-green-100 font-bold text-lg tracking-wide">
              @rallipi
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="icon-dots-vertical w-8 h-8 mt-2 mr-2"
            >
              <path
                className="text-green-100 fill-current"
                fillRule="evenodd"
                d="M12 7a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 7a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 7a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"
              />
            </svg>
          </div>
          {/* conversation */}
          <div className="overscroll-none">
            <div className="mt-20 mb-16">
              {messages.map(({ id, ...p }) => (
                <Message key={"" + id} {...p} />
              ))}
            </div>
          </div>
          {/* input */}
          <div className="relative bottom-0 w-full flex justify-between bg-green-100">
            <textarea
              className="flex-grow m-2 py-2 px-4 mr-1 rounded-full border border-gray-300 bg-gray-200 resize-none"
              rows="1"
              placeholder="Message..."
            ></textarea>
            <button className="m-2">
              <svg
                className="svg-inline--fa text-green-400 fa-paper-plane fa-w-16 w-12 h-12 py-2 mr-2"
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="paper-plane"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path
                  fill="currentColor"
                  d="M476 3.2L12.5 270.6c-18.1 10.4-15.8 35.6 2.2 43.2L121 358.4l287.3-253.2c5.5-4.9 13.3 2.6 8.6 8.3L176 407v80.5c0 23.6 28.5 32.9 42.5 15.8L282 426l124.6 52.2c14.2 6 30.4-2.9 33-18.2l72-432C515 7.8 493.3-6.8 476 3.2z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

const Message = ({ right, text }) => (
  <div className="clearfix">
    <div
      className={` w-3/4 ${
        right ? "float-right bg-green-300" : "bg-gray-300"
      } mx-4 my-2 p-2 rounded-lg`}
    >
      {text}
    </div>
  </div>
);
