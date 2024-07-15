import Link from "next/link";

const Navigator = () => {
  return (
    <div className="flex justify-between">
      <div>
        <Link href="/">Home</Link>
      </div>
      <div className="flex gap-2">
        <button>
          <Link href="/user/rooms">유저페이지</Link>
        </button>
        <button>
          <Link href="/login">로그인</Link>
        </button>
        <Link href="assign">
          <button>회원가입</button>
        </Link>
      </div>
    </div>
  );
};

export default Navigator;
