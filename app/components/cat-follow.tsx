"use client";

import { useEffect } from "react";

export default function CatFollower() {
  useEffect(() => {
    // Create script tag dynamically
    const script = document.createElement("script");
    script.src = "/oneko/oneko.js";
    script.async = true;
    script.dataset.cat = "/oneko/oneko.gif"; // optional: you can change gif path
    document.body.appendChild(script);

    return () => {
      // Cleanup on unmount
      script.remove();
      const neko = document.getElementById("oneko");
      if (neko) neko.remove();
    };
  }, []);

  return null; // nothing to render
}
