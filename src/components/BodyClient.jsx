"use client";
import { useEffect } from "react";

export default function BodyClient({ children }) {
  useEffect(() => {
    const pathName = window.location.pathname;
    const body = document.querySelector("body");

    if (pathName === "/") {
      body.classList.add("inicio");
      body.classList.remove("fondo");
    } else {
      body.classList.remove("inicio");
      body.classList.add("fondo");
    }
  }, []);
  return <body>{children}</body>;
}
