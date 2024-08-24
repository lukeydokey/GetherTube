import { RoomCard } from "@/components";
import { userDetailApi } from "@/api/api";

const Page = async () => {
  // const res = await userDetailApi();
  // const data = await res.json();
  // console.log(data);

  return (
    <div>
      <RoomCard />
    </div>
  );
};

export default Page;
