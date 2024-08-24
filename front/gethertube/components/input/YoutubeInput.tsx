"use client";

import Image from "next/image";
import { Input } from "../";
import { TypeInputProps } from "./Input";
import { getYoutubeApi, addRoomPlaylistApi } from "@/api/api";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { ResponseFormat, TypeResAddRoomPlaylist } from "@/api/types";
import { useToast } from "@/hook/useToast";

const YoutubeInput = (props: TypeInputProps) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [channel, setChannel] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [playlistUrl, setPlaylistUrl] = useState("");

  const path = usePathname();
  const { showToast } = useToast();
  // const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
  //   if (e.key === "Enter") {
  //     const { value } = e.target as HTMLInputElement;

  //     const data = value.split("?v=");
  //     if (data.length === 2) {
  //       const response = await getYoutubeApi(data[1]);
  //       const { channelTitle, thumbnails, title } = response.items[0].snippet;
  //       setTitle(title);
  //       setChannel(channelTitle);
  //       setThumbnail(thumbnails.standard.url as string);
  //     }
  //   }
  // };

  const handleAddPlaylist = async () => {
    try {
      const response: ResponseFormat<TypeResAddRoomPlaylist> =
        await addRoomPlaylistApi(path.split("room/")[1], {
          playlistUrl,
        });
      if (response.status === 200) {
        showToast("플레이리스트에 추가되었습니다.", "success");
        setPlaylistUrl("");
      }
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  };

  const handleInputChange = async (d: string) => {
    if (d.includes("https://www.youtube.com/watch?v=")) {
      const data = d.split("?v=");
      if (data.length === 2) {
        const response = await getYoutubeApi(data[1]);
        if (response.items.length > 0) {
          const { channelTitle, thumbnails, title } = response.items[0].snippet;
          setTitle(title);
          setChannel(channelTitle);
          setThumbnail(thumbnails.standard.url as string);
          setPlaylistUrl(d);
        } else {
          setTitle("");
          setChannel("");
          setThumbnail("");
          setPlaylistUrl("");
        }
      }
    } else {
      setTitle("");
      setChannel("");
      setThumbnail("");
      setPlaylistUrl("");
    }
  };

  const handleYoutubeClick = () => {
    window.open("https://www.youtube.com/", "_blank");
    setOpen(false);
  };

  return (
    <div className="relative flex w-full">
      <Input
        {...props}
        value={playlistUrl}
        onChange={handleInputChange}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
      />
      {open && (
        <div className="absolute top-10 bg-stone-900 w-full rounded-md">
          {title && channel && thumbnail ? (
            <div className="relative rounded-md">
              {title} {channel}
              <Image
                src={thumbnail as string}
                alt="thumbnail"
                width={300}
                height={300}
              />
              <div
                className="bg-slate-900 w-full h-full absolute top-0 left-0 opacity-0 hover:opacity-90 flex justify-center items-center hover:cursor-pointer"
                onMouseDown={handleAddPlaylist}
              >
                재생하기
              </div>
            </div>
          ) : (
            <div
              className="flex justify-center transform transition-transform duration-300 hover:scale-125 cursor-pointer"
              onMouseDown={handleYoutubeClick}
            >
              <Image
                src="/images/logo_youtube.png" // 이미지 경로를 올바르게 설정하세요
                alt="YouTube Logo"
                width={200}
                height={60}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default YoutubeInput;
