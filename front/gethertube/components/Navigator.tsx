"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button, Input, YoutubeInput } from ".";
import { utilStorage } from "@/util/utilStorage";
import { userStore } from "@/store/userStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Navigator = () => {
  const [userDetail, setUserDetail] = useState<{
    userId: string;
    nickName: string;
  }>({ userId: "", nickName: "" });
  const { userId, nickName, setUser } = userStore();
  const pathname = usePathname();
  const router = useRouter();

  const { deleteItem } = utilStorage();

  const handleLogout = () => {
    deleteItem("user");
    deleteItem("accessToken");
    setUser("", "");
    router.replace("/");
  };

  useEffect(() => {
    setUserDetail({ userId, nickName });
  }, [userId, nickName]);

  return (
    <div className="flex justify-between bg-header-back-color h-12 text-header-font-color px-3 shadow-xl">
      <div className="flex items-center">
        <Link href="/">Home</Link>
      </div>
      {pathname.includes("/room/") && (
        <div className="flex items-center w-1/4">
          <YoutubeInput
            name="youtube"
            className="text-sm-normal placeholder:text-sm-normal placeholder:flex placeholder:items-center w-full"
            placeholder="유튜브 url을 입력 해 주세요"
          />
        </div>
      )}
      <div className="flex gap-2 items-center placeholder:text-xs-normal">
        {userDetail.userId && userDetail.nickName ? (
          <>
            <span className="text-white">
              안녕하세요 {userDetail.nickName}님!
            </span>
            <Link
              className="px-3 py-2 text-xs-normal bg-default rounded-md"
              href="/user/rooms"
            >
              마이페이지
            </Link>
            <Link
              className="px-3 py-2 text-xs-normal bg-default rounded-md"
              href="/"
              onClick={handleLogout}
            >
              로그아웃
            </Link>
          </>
        ) : (
          <>
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
          </>
        )}
      </div>
    </div>
  );
};

export default Navigator;
