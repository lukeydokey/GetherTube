"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button, Input } from ".";

const Navigator = () => {
  const pathname = usePathname();

  return (
    <div className="flex justify-between bg-header-back-color h-12 text-header-font-color px-3 shadow-xl">
      <div className="flex items-center">
        <Link href="/">Home</Link>
      </div>
      {pathname.includes("/room") && (
        <div className="flex items-center w-1/4">
          <Input
            className="text-sm-normal placeholder:text-sm-normal placeholder:flex placeholder:items-center w-full"
            placeholder="유튜브 url을 입력 해 주세요"
          />
        </div>
      )}
      <div className="flex gap-2 items-center placeholder:text-xs-normal">
        <Link
          className="px-3 py-2 text-xs-normal bg-default rounded-md"
          href="/user/rooms"
        >
          유저페이지
        </Link>
        <Link
          className="px-3 py-2 text-xs-normal bg-primary rounded-md"
          href="/login"
        >
          로그인
        </Link>
        <Link
          className="px-3 py-2 text-xs-normal bg-default rounded-md"
          href="/assign"
        >
          회원가입
        </Link>
      </div>
    </div>
  );
};

export default Navigator;
