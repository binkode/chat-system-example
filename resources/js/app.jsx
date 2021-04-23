import React from "react";
import "vite/dynamic-import-polyfill";
import "../css/app.css";
import "./bootstrap";

import { render } from "react-dom";
import { App } from "@inertiajs/inertia-react";
import { InertiaProgress } from '@inertiajs/progress'

const el = document.getElementById("app");

InertiaProgress.init()

render(
  <App
    initialPage={JSON.parse(el.dataset.page)}
    resolveComponent={async (name) => {
      return (await import(`./Pages/${name}.jsx`)).default;
    }}
  />,
  el
);
