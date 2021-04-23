import React from "react";

import Navbar from "./Navbar";
import Footer from "./Footer";

export default ({children}) => {
  return (
    <>
      <Navbar transparent />
      <main>
        {children}
      </main>
      <Footer/>
    </>
  );
};
