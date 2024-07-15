import Link from "next/link";

const Navigator = () => {
  return (
    <div className="flex justify-between bg-header-back-color h-12 text-header-font-color px-3">
      <div className="flex items-center">
        <Link href="/">Home</Link>
      </div>
      <div className="flex gap-2">
        <Link className="flex items-center" href="/user/rooms">
          유저페이지
        </Link>
        <Link className="flex items-center" href="/login">
          로그인
        </Link>
        <Link className="flex items-center" href="assign">
          회원가입
        </Link>
      </div>
    </div>
  );
};

export default Navigator;
