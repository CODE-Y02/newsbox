"use client";
import React, { useState, useEffect } from "react";

const GoToTopButton = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      className={`fixed bottom-10 right-10 p-4 bg-white-600 hover:bg-gray-500/30 rounded-full shadow-xl ring-1 ring-purple-400 ${
        !showButton && "hidden"
      }`}
      onClick={scrollToTop}
    >
      ↑
    </button>
  );
};

export default GoToTopButton;
