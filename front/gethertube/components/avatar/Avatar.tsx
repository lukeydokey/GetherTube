"use client";
import { useState, useEffect } from "react";

interface AvatarProps {
  value: string;
}

const Avatar = ({ value }: AvatarProps) => {
  const [title, setTitle] = useState("");

  useEffect(() => {
    setTitle(value ? value.charAt(0) : "A");
  }, []);
  return (
    <div className="rounded-full flex justify-center items-center w-10 h-10 bg-slate-50">
      {title}
    </div>
  );
};

export default Avatar;
