import Header from "@/components/Header";
import React from "react";

function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentYear = new Date().getFullYear();

  return (
    <div className="w-screen h-screen flex flex-col">
      <div className="mb-8">
        <Header />
      </div>
      <div className="flex-1">{children}</div>
      <footer className="bg-slate-500/20 p-3 text-center">
        <p>&copy; {currentYear} Bantai Company. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default layout;
