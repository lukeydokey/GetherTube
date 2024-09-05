"use client";

import { Card, Input } from "@/components";
import { userDetailApi, userDetailChangeApi } from "@/api/api";
import { useState, useEffect, useRef } from "react";
import { useToast } from "@/hook/useToast";
import {
  ResponseFormat,
  TypeResUserDetail,
  TypeReqUserDetailChange,
} from "@/api/types";

const Page = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isEdit, setIsEdit] = useState(false);
  const { showToast } = useToast();
  // const [nickname, setNickname] = useState("");
  const [userDetail, setUserDetail] = useState<TypeReqUserDetailChange>({
    nickName: "",
    chatColor: "",
  });

  const fetchUserDetails = async () => {
    const res: ResponseFormat<TypeResUserDetail> = await userDetailApi();
    if (res.status === 200 && res.data?.nickName) {
      const { nickName, chatColor } = res.data;
      setUserDetail({ nickName, chatColor });
      // setNickname(res.data.nickName);
    }
  };

  const handleNicknameChange = async () => {
    const res: ResponseFormat<TypeResUserDetail> = await userDetailChangeApi(
      userDetail
    );
    if (res.status === 200) {
      showToast(`닉네임 수정에 성공하였습니다.`, "success");
      fetchUserDetails();
    }
  };

  // useEffect(() => {
  //   fetchUserDetails();
  // }, []);

  useEffect(() => {
    if (isEdit && inputRef.current) {
      inputRef.current.focus();
    }
    if (!isEdit) fetchUserDetails();
  }, [isEdit]);

  return (
    <div className="flex flex-col gap-5 py-5">
      <span className="text-white">닉네임 변경</span>
      <Card className="flex flex-col gap-2">
        <span className="text-white text-xs">
          채팅창에서 보여질 닉네임을 변경할 수 있습니다.
        </span>
        <div className="relative">
          <Input
            ref={inputRef}
            value={userDetail.nickName}
            onChange={(d) => setUserDetail({ ...userDetail, nickName: d })}
            maxLength={20}
            name="nickname"
            className="w-full focus:outline-2 focus:outline-blue-400"
            disabled={!isEdit}
          />
          <div className="absolute top-1 right-1 cursor-pointer">
            {isEdit ? (
              <div className="flex gap-4 text-blue-400">
                <div onClick={handleNicknameChange}>Save</div>
                <div onClick={() => setIsEdit(false)}>Cancel</div>
              </div>
            ) : (
              <div className="text-blue-400" onClick={() => setIsEdit(true)}>
                Edit
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Page;
