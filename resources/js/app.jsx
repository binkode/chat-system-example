import React from "react";
import "vite/dynamic-import-polyfill";
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
    // resolveComponent={(name) =>
    //   import(`./Pages/${name}.jsx`).then(({ default: page }) => {
    //     if (page.layout === undefined) {
    //       page.layout = page => <Layout children={page} />;
    //     }
    //     return page;
    //   })
    // }
    resolveComponent={async (name) =>
      (await import(`./Pages/${name}.jsx`)).default
    }
  />,
  el
);
