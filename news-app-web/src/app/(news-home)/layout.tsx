import Header from "@/components/Header";

function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen flex flex-col gap-6 bg-gray-100">
      <Header />

      <main className="flex-1 ">{children}</main>
      <footer className="bg-slate-500/20 p-3 text-center">
        <p>© {currentYear} Bantai Company. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Layout;
