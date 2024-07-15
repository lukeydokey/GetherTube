import Link from "next/link";

const Page = () => {
  return (
    <div>
      <div>방 페이지</div>
      <Link href="/room/1">1번방으로 가기</Link>
    </div>
  );
};

export default Page;
