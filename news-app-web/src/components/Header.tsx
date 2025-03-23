"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { usePathname } from "next/navigation";
import { Categories } from "@/types/categories";
import NavLink from "./NavLink";

function Header() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Memoize the categories to avoid unnecessary recalculation
  const categories = useMemo(() => Object.values(Categories), []);

  // Throttle function to limit scroll event calls
  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;

    // Only trigger updates when the scroll direction changes
    if (currentScrollY > lastScrollY) {
      if (isVisible) setIsVisible(false); // Scrolling down
    } else {
      if (!isVisible) setIsVisible(true); // Scrolling up
    }

    setLastScrollY(currentScrollY);
  }, [lastScrollY, isVisible]);

  useEffect(() => {
    const throttleScroll = () => {
      handleScroll();
    };

    // Set up scroll event listener with throttling
    window.addEventListener("scroll", throttleScroll);
    return () => {
      window.removeEventListener("scroll", throttleScroll);
    };
  }, [handleScroll]);

  return (
    <nav
      className={`flex md:justify-center overflow-x-scroll items-center bg-slate-300 gap-6 p-3 fixed top-0 w-full transition-all duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      } z-50`}
    >
      <NavLink href={"/"} name={"home"} pathname={pathname} />
      {categories.map((c) => {
        const currentHref = `/category/${c}`;
        return (
          <NavLink href={currentHref} key={c} name={c} pathname={pathname} />
        );
      })}
    </nav>
  );
}

export default Header;
