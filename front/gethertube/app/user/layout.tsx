"use client";
import { Avatar } from "@/components";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { userStore } from "@/store/userStore";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const { nickName } = userStore();

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    // 서버 사이드에서 렌더링될 때는 아무것도 렌더링하지 않음
    return null;
  }
  return (
    <section className="flex flex-col items-center">
      <div className="w-full flex gap-4 justify-center items-center h-32">
        <div className="w-[600px] flex items-center gap-4">
          {nickName && (
            <>
              <Avatar value={nickName} />
              <span className="text-slate-50 text-lg">{nickName}</span>
            </>
          )}
        </div>
      </div>
      <div className="w-full h-12 flex justify-center overflow-y-auto">
        <div className="w-[600px] flex">
          <Link href="/user/rooms">
            <div
              className={`px-10 h-full text-slate-50 cursor-pointer flex items-center rounded-tl-md rounded-tr-md ${
                pathname.includes("rooms") && "bg-neutral-800"
              }`}
            >
              My Rooms
            </div>
          </Link>
          <Link href="/user/settings">
            <div
              className={`px-10 h-full text-slate-50 flex items-center rounded-tl-md rounded-tr-md cursor-pointer ${
                pathname.includes("settings") && "bg-neutral-800"
              }`}
            >
              Settings
            </div>
          </Link>
          <Link href="/user/account">
            <div
              className={`px-10 h-full text-slate-50 flex items-center rounded-tl-md rounded-tr-md cursor-pointer ${
                pathname.includes("account") && "bg-neutral-800"
              }`}
            >
              Account
            </div>
          </Link>
        </div>
      </div>
      <div className="bg-neutral-800 w-full h-lvh flex justify-center">
        <div className="w-[600px]">{children}</div>
      </div>
    </section>
  );
};

export default Layout;
