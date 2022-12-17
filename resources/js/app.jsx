import "../css/app.css";
import "./bootstrap";

import { createRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/inertia-react";
import { InertiaProgress } from "@inertiajs/progress";
import { SidebarProvider } from "./context/SidebarContext";
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
    createRoot(el).render(
      <Provider store={store}>
        <PersistGate loading={<Loader />} persistor={persistor}>
          <SidebarProvider>
            <App {...props} />
          </SidebarProvider>
        </PersistGate>
      </Provider>
    );
  },
});
