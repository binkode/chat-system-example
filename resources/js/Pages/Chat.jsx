import { memo } from "react";
import Navbar from "../Layout/Navbar.jsx";
// import Sidebar from "../Layout/Sidebar.jsx";
import {
  Button,
  Label,
  Textarea,
  Dropdown,
  DropdownItem,
  Badge,
} from "@windmill/react-ui";
import { SearchIcon, MenuDotX, Send } from "../icons";
import Layout from "../Layout/Dashboard.jsx";
import { useRef, useState } from "react";
import { useProps } from "../func/hooks";

const Dashboard = memo(() => {
  const { messages: { data: messages } = { data: [] } } = useProps();

  const input = useRef();

  const send = () => {
    const text = input.current.value;
    if (text?.length) {
      input.current.value = "";
      // setState(({ messages, ...s }) => {
      //   return {
      //     ...s,
      //     messages: [
      //       ...messages,
      //       {
      //         id: (messages.pop()?.id || 0) + 1,
      //         text,
      //         right: true,
      //       },
      //     ],
      //   };
      // });
    }
  };

  return (
    <div className="flex-1 bg-gray-200">
      {/* Header */}
      <div className="flex-shrink-0 w-full bg-purple-600 h-16 pt-2 text-white flex justify-between shadow-md">
        <div className="ml-3 my-3 text-purple-100 font-bold text-lg tracking-wide">
          @rallipi
        </div>
        <Menu />
      </div>
      {/* conversation */}
      <div
        style={{
          // transform: "scaleY(-1)",
          height: "calc(100vh - 155px - 4rem)",
        }}
        className="overflow-y-auto"
      >
        {messages.map(({ id, ...p }) => (
          <Message key={"" + id} {...p} />
        ))}
      </div>
      {/* input */}
      <div className="flex-shrink-0 w-full flex align-center justify-between bg-green-100">
        <Textarea
          ref={input}
          className="flex-grow m-2 py-2 px-4 mr-1 rounded-full border border-gray-300 bg-gray-200 resize-none"
          rows="2"
          placeholder="Enter some long form content."
        />
        <Button onClick={() => send()} className="m-2">
          <Send />
        </Button>
      </div>
    </div>
  );
});

Dashboard.layout = (page) => <Layout title="Chat" children={page} />;

export default Dashboard;

const Message = ({ isSender, message }) => (
  <div className="clearfix">
    <div
      // style={{ transform: "scaleY(-1)" }}
      className={` w-3/4 ${
        isSender ? "float-right bg-green-300" : "bg-gray-300"
      } mx-4 my-2 p-2 rounded-lg`}
    >
      {message}
    </div>
  </div>
);

const Menu = () => {
  const [isNotificationsMenuOpen, setIsNotificationsMenuOpen] = useState(false);

  function handleNotificationsClick() {
    setIsNotificationsMenuOpen(!isNotificationsMenuOpen);
  }
  return (
    <div className="relative">
      <button
        className="relative align-middle rounded-md focus:outline-none focus:shadow-outline-purple mt-2 mr-2"
        onClick={handleNotificationsClick}
        aria-label="Notifications"
        aria-haspopup="true"
      >
        <MenuDotX aria-hidden="true" className="icon-dots-vertical w-5 h-5" />
      </button>

      <Dropdown
        align="right"
        isOpen={isNotificationsMenuOpen}
        onClose={() => setIsNotificationsMenuOpen(false)}
      >
        <DropdownItem tag="a" href="#" className="justify-between">
          <span>Messages</span>
          <Badge type="danger">13</Badge>
        </DropdownItem>
        <DropdownItem tag="a" href="#" className="justify-between">
          <span>Sales</span>
          <Badge type="danger">2</Badge>
        </DropdownItem>
        <DropdownItem onClick={() => alert("Alerts!")}>
          <span>Alerts</span>
        </DropdownItem>
      </Dropdown>
    </div>
  );
};
