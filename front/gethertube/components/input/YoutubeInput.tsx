"use client";

import Image from "next/image";
import { Input } from "../";
import { TypeInputProps } from "./Input";
import { getYoutubeApi } from "@/api/api";
import { useState } from "react";

const YoutubeInput = (props: TypeInputProps) => {
  const [title, setTitle] = useState("");
  const [channel, setChannel] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const { value } = e.target as HTMLInputElement;

      const data = value.split("?v=");
      if (data.length === 2) {
        const response = await getYoutubeApi(data[1]);
        const { channelTitle, thumbnails, title } = response.items[0].snippet;
        setTitle(title);
        setChannel(channelTitle);
        setThumbnail(thumbnails.standard);
      }
    }
  };
  return (
    <div className="relative flex w-full">
      <Input {...props} onKeyDown={handleKeyDown} />
      <div
        className="absolute top-10 bg-white"
        style={{ backgroundColor: "blue" }}
      >
        {title} {channel}
        <Image {...thumbnail} src={thumbnail.url} />
      </div>
    </div>
  );
};

export default YoutubeInput;
