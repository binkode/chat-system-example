// import { InertiaLink } from "@inertiajs/inertia-react";
import {trunc} from '../../func'

const conversations = [
  { name: "Cup of water", Image: "💧", time: "6:00 AM", last_message: "this is a basic mobile chat layout, build with tailwind css" },
  { name: "Training", Image: "⚽️", time: "10:00 AM", last_message: "22H" },
  { name: "Study", Image: "📖", time: "1:00 PM", last_message: "22H" },
  { name: "Cup of water", Image: "💧", time: "6:00 AM", last_message: "22H" },
  { name: "Training", Image: "⚽️", time: "10:00 AM", last_message: "22H" },
  { name: "Study", Image: "📖", time: "1:00 PM", last_message: "22H" },
  { name: "Cup of water", Image: "💧", time: "6:00 AM", last_message: "22H" },
  { name: "Training", Image: "⚽️", time: "10:00 AM", last_message: "22H" },
  { name: "Study", Image: "📖", time: "1:00 PM", last_message: "22H" },
  { name: "Cup of water", Image: "💧", time: "6:00 AM", last_message: "22H" },
  { name: "Training", Image: "⚽️", time: "10:00 AM", last_message: "22H" },
  { name: "Study", Image: "📖", time: "1:00 PM", last_message: "22H" },
];

export default function () {
  return (
    <ul className="flex flex-col p-1">
      {conversations.map((p, i) => (
        <Conversation key={"" + i} {...p} />
      ))}
    </ul>
  );
}

const Conversation = ({ name, Image, time, last_message }) => (
  <li className="border-gray-400 flex flex-row mb-2">
    <div className="select-none cursor-pointer bg-gray-200 rounded-md flex flex-1 items-center p-2 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
      <div className="flex flex-shrink-0 rounded-md w-10 h-10 bg-gray-300 justify-center items-center mr-4">
        {Image}
      </div>
      <div className="flex-grow">
        <div className="font-medium text-sm">{name}</div>
        <div className="text-gray-600 text-xs">{trunc(last_message, 20)}</div>
      </div>
      <div className="text-gray-600 text-xs">{time}</div>
    </div>
  </li>
);
