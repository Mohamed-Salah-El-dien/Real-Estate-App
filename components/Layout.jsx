import React from "react";
import Head from "next/head";

import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <title>Real Estate</title>
      </Head>

      <div>
        <header>
          <Navbar />
        </header>

        <main>{children}</main>
      </div>
    </>
  );
};

export default Layout;
