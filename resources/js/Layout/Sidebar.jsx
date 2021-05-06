import React from "react";
import { InertiaLink } from "@inertiajs/inertia-react";

import NotificationDropdown from "./NotificationDropdown.jsx";
import UserDropdown from "./UserDropdown.jsx";

const conversations = [
  { name: "Cup of water", Image: "💧", time: "6:00 AM", last_message: "22H" },
  { name: "Training", Image: "⚽️", time: "10:00 AM", last_message: "22H" },
  { name: "Study", Image: "📖", time: "1:00 PM", last_message: "22H" }
];

export default function Sidebar() {
  const [collapseShow, setCollapseShow] = React.useState("hidden");
  return (
    <>
      <nav className="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6">
        <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap w-full mx-auto">
          {/* Toggler */}
          <button
            className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
            type="button"
            onClick={() => setCollapseShow("bg-white m-2 py-3 px-6")}
          >
            <i className="fas fa-bars">iiii</i>
          </button>
          <div className="mx-auto text-center w-full">Conversations</div>
          <div className="container flex mx-auto w-full items-center justify-center">
            <ul className="flex flex-col p-4">
              {conversations.map((p, i) => (
                <Conversation key={"" + i} {...p} />
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

const Conversation = ({ name, Image, time, last_message }) => (
  <li className="border-gray-400 flex flex-row mb-2">
    <div className="select-none cursor-pointer bg-gray-200 rounded-md flex flex-1 items-center p-4  transition duration-500 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
      <div className="flex flex-col rounded-md w-10 h-10 bg-gray-300 justify-center items-center mr-4">
        {Image}
      </div>
      <div className="flex-grow pl-1 mr-16">
        <div className="font-medium">{name}</div>
        <div className="text-gray-600 text-sm">{last_message}</div>
      </div>
      <div className="text-gray-600 text-xs">{time}</div>
    </div>
  </li>
);
