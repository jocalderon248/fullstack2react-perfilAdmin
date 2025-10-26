import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";

export default function MainLayout({ children }) {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname === "/" ? "home" : location.pathname.replace(/^\//, "").replace(/\//g, "-");
    const className = `route-${path || "home"}`;

    const toRemove = Array.from(document.body.classList).filter((c) => c.startsWith("route-"));
    toRemove.forEach((c) => document.body.classList.remove(c));

    document.body.classList.add(className);

    return () => {
      document.body.classList.remove(className);
    };
  }, [location.pathname]);

  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}

