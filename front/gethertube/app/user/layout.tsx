"use client";
import { Avatar } from "@/components";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  return (
    <section className="flex flex-col items-center">
      <div className="w-full flex gap-4 justify-center items-center h-40">
        <Avatar />
        <span className="text-slate-50">{pathname}</span>
      </div>
      <div className="w-full h-12 flex justify-center">
        <Link href="/user/rooms">
          <div
            className={`px-10 h-full text-slate-50 cursor-pointer flex items-center rounded-tl-md rounded-tr-md ${
              pathname.includes("rooms") && "bg-slate-700"
            }`}
          >
            My Rooms
          </div>
        </Link>
        <Link href="/user/settings">
          <div
            className={`px-10 h-full text-slate-50 flex items-center rounded-tl-md rounded-tr-md cursor-pointer ${
              pathname.includes("settings") && "bg-slate-700"
            }`}
          >
            Settings
          </div>
        </Link>
        <Link href="/user/account">
          <div
            className={`px-10 h-full text-slate-50 flex items-center rounded-tl-md rounded-tr-md cursor-pointer ${
              pathname.includes("account") && "bg-slate-700"
            }`}
          >
            Account
          </div>
        </Link>
      </div>
      <div className="bg-slate-700 w-full h-lvh">{children}</div>
    </section>
  );
};

export default Layout;
