"use client";
import { TypeUserRooms, ResponseFormat } from "@/api/types";
import { getYoutubeApi, deleteRoomApi, getRoomInfoApi } from "@/api/api";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Icon } from "@/components/";
import { useRouter } from "next/navigation";
import { useToast } from "@/hook/useToast";
import { userStore } from "@/store/userStore";

interface RoomCardProps {
  room: TypeUserRooms;
}

const RoomCard = ({ room }: RoomCardProps) => {
  const [loading, setLoading] = useState(false);
  const [thumbnail, setThumbnail] = useState("");
  const { roomId, roomMembers, roomPlaylist } = room;
  const { showToast } = useToast();
  const router = useRouter();

  const { userId } = userStore();

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

  const handleCardClick = async () => {
    try {
      const res: ResponseFormat<TypeUserRooms> = await getRoomInfoApi(roomId);
      if (res && res.status === 200 && res.data) {
        const { roomMembers } = res.data;
        const isRoomMember = roomMembers.filter(
          (member) => member.userId === userId
        );
        if (isRoomMember.length > 0) {
          showToast("방으로 이동합니다.", "success");
          router.replace(`/room/${roomId}`);
        } else {
          showToast("알수 없는 이유로 방에 입장할 수 없습니다.", "error");
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleMembersClick = async (e: React.MouseEvent<HTMLDivElement>) => {
    try {
      e.stopPropagation();
      alert("인원수 몇명");
    } catch (e) {
      console.error(e);
    }
  };

  const handleDelete = async (e: React.MouseEvent<HTMLDivElement>) => {
    try {
      e.stopPropagation();
      const response: ResponseFormat<string> = await deleteRoomApi(roomId);
      if (response.status === 200) {
        showToast(`${roomId} Room을 삭제하였습니다.`, "success");
        router.refresh();
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (!roomId) return;
    const roomPlaylist = room.roomPlaylist?.filter((d) => d);
    if (roomPlaylist?.length > 0) {
      setLoading(true);
      getYoutubeThumbnail(roomPlaylist[0]);
    }
  }, [roomId]);

  return (
    <div
      className="w-full h-[120px] p-2 rounded-md cursor-pointer bg-neutral-700 flex gap-2 group transition-transform duration-300 hover:scale-105"
      onClick={handleCardClick}
    >
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
            <div
              className="flex gap-2 text-slate-100"
              onClick={handleMembersClick}
            >
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
