"use client";

import { Card, Input } from "@/components";
import { userDetailApi } from "@/api/api";
import { useState, useEffect } from "react";
import { ResponseFormat, TypeResUserDetail } from "@/api/types";

const Page = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [nickname, setNickname] = useState("");

  useEffect(() => {
    const fetchUserDetails = async () => {
      const res: ResponseFormat<TypeResUserDetail> = await userDetailApi();
      if (res.status === 200 && res.data?.nickName) {
        setNickname(res.data.nickName);
      }
    };

    fetchUserDetails();
  });

  return (
    <div className="flex flex-col gap-5 py-5">
      <span className="text-white">닉네임 변경</span>
      <Card className="flex flex-col">
        <span className="text-white text-xs">
          채팅창에서 보여질 닉네임을 변경할 수 있습니다.
        </span>
        <div className="relative">
          <Input value={nickname} name="nickname" className="w-full" />
          <div className="absolute top-0 right-0">
            {isEdit ? (
              <div>
                <div>Save</div>
                <div>Cancel</div>
              </div>
            ) : (
              <div>Edit</div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Page;
