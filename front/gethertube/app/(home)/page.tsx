"use client";
import { Button } from "@/components";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { addRoomApi } from "@/api/api";
import { ResponseFormat, TypeResAddRoom } from "@/api/types";

const Page = () => {
  const router = useRouter();
  const getRandomChar = () => {
    const chars =
      "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const randomIndex = Math.floor(Math.random() * chars.length);
    return chars[randomIndex];
  };

  const fetchAddRoom = async () => {
    const response: ResponseFormat<TypeResAddRoom> = await addRoomApi();
    if (response.status === 200) {
      router.push(`/room/${response?.data?.roomId}`);
    }
  };

  const getRandomString = () => {
    const minLength = 5;
    const maxLength = 10;
    const length =
      Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
    let randomString = "";

    for (let i = 0; i < length; i++) {
      randomString += getRandomChar();
    }

    return randomString;
  };

  const handleRoomClick = () => {
    fetchAddRoom();
    // const randomRoom = getRandomString();
    // if (randomRoom) router.push(`/room/${randomRoom}`);
  };

  return (
    <div className="flex flex-col justify-center h-full">
      <div className="flex flex-col justify-center items-center gap-10">
        <div>
          <Image
            src="/images/player.png"
            alt="player image"
            width={240}
            height={240}
          />
        </div>
        <span className="text-xl-normal text-content-white">
          친구와 함께 유튜브를 시청하세요 !
        </span>
        <Button
          className="px-20 py-6 flex items-center justify-center rounded-3xl text-2xl-normal"
          onClick={handleRoomClick}
        >
          방 생성하기
        </Button>
      </div>
    </div>
  );
};

export default Page;
