"use client";
import { TypeUserRooms, ResponseFormat } from "@/api/types";
import { getYoutubeApi, deleteRoomApi } from "@/api/api";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Icon } from "@/components/";
import { useRouter } from "next/navigation";
import { useToast } from "@/hook/useToast";

interface RoomCardProps {
  room: TypeUserRooms;
}

const RoomCard = ({ room }: RoomCardProps) => {
  const [loading, setLoading] = useState(false);
  const [thumbnail, setThumbnail] = useState("");
  const { roomId, roomMembers, roomPlaylist } = room;
  const { showToast } = useToast();
  const router = useRouter();

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

  const handleDelete = async () => {
    try {
      const response: ResponseFormat<string> = await deleteRoomApi(roomId);
      if (response.status === 200) {
        showToast(`${roomId} Room을 삭제하였습니다.`, "success");
        router.refresh();
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
  }, [roomId]);

  return (
    <div className="w-full h-[120px] p-2 rounded-md bg-neutral-700 flex gap-2 group">
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
                <Icon.PlayCircle />
              </div>
            )}
          </div>
          <div className="flex flex-col justify-between flex-1">
            <div className="text-slate-100">{roomId}</div>
            <div className="flex gap-2 text-slate-100">
              {roomMembers.length || 0}
              <Icon.Users />
            </div>
          </div>
          <div className="flex flex-col justify-between opacity-0 group-hover:opacity-100">
            <Icon.Share />
            <div onClick={handleDelete}>
              <Icon.Trash />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default RoomCard;
