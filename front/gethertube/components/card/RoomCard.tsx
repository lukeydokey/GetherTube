"use client";
import { TypeUserRooms } from "@/api/types";
import { getYoutubeApi } from "@/api/api";
import { useState, useEffect } from "react";
import Image from "next/image";

interface RoomCardProps {
  room: TypeUserRooms;
}

const RoomCard = ({ room }: RoomCardProps) => {
  const [loading, setLoading] = useState(false);
  const [thumbnail, setThumbnail] = useState("");
  const { roomId, roomMembers, roomPlaylist } = room;

  const getYoutubeThumbnail = async (url: string) => {
    try {
      const youtubeKey = url.split("?v=");
      const res = await getYoutubeApi(youtubeKey[1]);
      if (res.items) {
        setThumbnail(res.items[0].snippet.thumbnails.standard.url as string);
        setLoading(false);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const roomPlaylist = room.roomPlaylist.filter((d) => d);
    if (roomPlaylist.length > 0) {
      setLoading(true);
      getYoutubeThumbnail(roomPlaylist[0]);
    }
  }, []);

  return (
    <div className="w-full h-[120px] p-2 rounded-md bg-neutral-700 flex">
      {loading ? (
        <>Loading...</>
      ) : (
        <>
          <div className="">
            {thumbnail ? (
              <Image
                src={thumbnail as string}
                alt="thumbnail"
                width={150}
                height={100}
                className="w-[200px] h-[104px] rounded-sm"
                style={{ objectFit: "cover" }}
              />
            ) : (
              <div className="w-[200px] h-[104px] bg-neutral-800 rounded-sm flex items-center justify-center">
                없음
              </div>
            )}
          </div>
          room: {roomId} roomMember:{" "}
          {roomMembers.map((d) => d.nickName).join(",")}
        </>
      )}
    </div>
  );
};

export default RoomCard;
