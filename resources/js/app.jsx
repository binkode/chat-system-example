import "vite/dynamic-import-polyfill";
import React from "react";
import "../css/app.css";
import "./bootstrap";

import { render } from "react-dom";
import { App } from "@inertiajs/inertia-react";
import { InertiaProgress } from "@inertiajs/progress";
// import Layout from "./Layout";

const el = document.getElementById("app");

InertiaProgress.init();

render(
  <App
    initialPage={JSON.parse(el.dataset.page)}
    resolveComponent={async name => {
      const pages = import.meta.glob("./Pages/**/*.jsx");
      const page = Object.keys(pages).find(page =>
        page.endsWith(`${name}.jsx`)
      );

      return (await pages[page]()).default;
    }}
  />,
  el
);
