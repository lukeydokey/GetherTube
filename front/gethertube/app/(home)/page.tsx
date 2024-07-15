import Link from "next/link";

const Page = () => {
  return (
    <div className="flex flex-col justify-center h-full">
      <div className="basis-1/2">메인페이지</div>
      <div className="basis-1/2">
        <Link href="/room">방생성하기</Link>
      </div>
    </div>
  );
};

export default Page;
