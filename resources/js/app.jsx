import "vite/dynamic-import-polyfill";
import "../css/app.css";
import "./bootstrap";

import { render } from "react-dom";
import { App, createInertiaApp } from "@inertiajs/inertia-react";
import { InertiaProgress } from "@inertiajs/progress";
import { SidebarProvider } from "./context/SidebarContext";
import { Windmill } from "@windmill/react-ui";
const el = document.getElementById("app");

InertiaProgress.init();

createInertiaApp({
  resolve: async (name) => {
    const pages = import.meta.glob("./Pages/**/*.jsx");
    const page = Object.keys(pages).find((page) =>
      page.endsWith(`${name}.jsx`)
    );

    return (await pages[page]()).default;
  },
  setup({ el, App, props }) {
    render(
      <SidebarProvider>
        <Windmill>
          <App {...props} />
        </Windmill>
      </SidebarProvider>,
      el
    );
  },
});
