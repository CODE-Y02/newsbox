import { cn } from "@/lib/utils";
import Link from "next/link";
import { useMemo } from "react";

const isActiveRoute = (pathname: string, href: string) => pathname === href;

const NavLink = ({
  href,
  pathname,
  name,
}: {
  href: string;
  pathname: string;
  name: string;
}) => {
  const isActive = useMemo(
    () => isActiveRoute(pathname, href),
    [pathname, href]
  );

  return (
    <Link
      href={{ pathname: href }}
      className={cn(
        "px-2 py-0.5 rounded-xl ring-2 ring-purple-500 bg-white font-semibold",
        isActive && "bg-black text-white"
      )}
    >
      {name}
    </Link>
  );
};

export default NavLink;
