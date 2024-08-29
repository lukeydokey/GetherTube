import { RoomCard } from "@/components";
import { userDetailApi } from "@/api/api";
import { getCookie } from "@/api/cookies";
import { cookies } from "next/headers";
import { ResponseFormat, TypeResUserDetail } from "@/api/types";

const Page = async () => {
  const res: ResponseFormat<TypeResUserDetail> = await userDetailApi();
  if (res.status !== 200) return null;
  console.log(res);
  return (
    <div className="flex flex-col gap-5">
      <span className="text-white">
        룸 정보 {res?.data?.userRooms.length || 0}
      </span>
      {res.data?.userRooms.map((d, index) => (
        <RoomCard key={index} room={d} />
      ))}
    </div>
  );
};

export default Page;
