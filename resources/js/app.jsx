import "vite/dynamic-import-polyfill";
import "../css/app.css";
import "./bootstrap";

import { render } from "react-dom";
import { createInertiaApp } from "@inertiajs/inertia-react";
import { InertiaProgress } from "@inertiajs/progress";
import { SidebarProvider } from "./context/SidebarContext";
import { Windmill } from "@windmill/react-ui";
import { PersistGate } from "redux-persist/integration/react";
import Loader from "./components/Loader.jsx";
import { Provider } from "react-redux";
import store, { persistor } from "./redux/store";
import "./func/Echo";

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
      <Provider store={store}>
        <PersistGate loading={<Loader />} persistor={persistor}>
          <SidebarProvider>
            <Windmill>
              <App {...props} />
            </Windmill>
          </SidebarProvider>
        </PersistGate>
      </Provider>,
      el
    );
  },
});
