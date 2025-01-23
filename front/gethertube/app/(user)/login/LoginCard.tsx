"use client";
import { TitleCard, LabelInput, FullButton } from "@/components";
import Link from "next/link";
import { useState, useEffect } from "react";
import { loginApi, addRoomMember, getRoomInfoApi } from "@/api/api";
import { ResponseFormat, TypeReqLogin, TypeResLogin } from "@/api/types";
import { useToast } from "@/hook/useToast";
import { utilStorage } from "@/util/utilStorage";
import { useRouter } from "next/navigation";
import { userStore, roomStore } from "@/store/index";

import { handleSubmit } from "./actions";
import { useFormState } from "react-dom";

const LoginCard = () => {
  const [state, action] = useFormState(handleSubmit, null);
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const { setUser } = userStore();
  const { roomId, setRoomId } = roomStore();

  // console.log(state);

  const router = useRouter();
  const storage = utilStorage();
  const { showToast } = useToast();

  const fetchLogin = async () => {
    const reqData: TypeReqLogin = {
      userId: id,
      password,
    };
    const response: ResponseFormat<TypeResLogin> = await loginApi(reqData);
    const { status, data } = response;
    if (status === 200 && data) {
      showToast("로그인에 성공했습니다.", "success");
      const { userId, nickName, accessToken } = data;
      storage.setItem("user", {
        userId,
        nickName,
      });
      storage.setItem("accessToken", accessToken);
      setUser(userId, nickName);
      if (roomId) {
        const response = await addRoomMember(roomId);
        alert("WEf");
        // router.replace(roomId);
        // setRoomId("");
        return;
      }
      router.push("/");
    } else {
      showToast("로그인에 실패하였습니다.", "error");
    }
  };

  const handleClick = async () => {
    if (!id || !password) {
      showToast("아이디 혹은 패스워드를 입력 해 주세요.", "error");
      return;
    }
    // fetchLogin();
  };

  const handleEnter = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleClick();
  };

  useEffect(() => {
    if (!state) return;
    const api = async () => {
      if (state && state.status === 200) {
        const { data } = state;
        console.log(data);
        if (data) {
          showToast("로그인에 성공했습니다.", "success");
          const { userId, nickName, accessToken } = data;
          storage.setItem("user", {
            userId,
            nickName,
          });
          storage.setItem("accessToken", accessToken);
          setUser(userId, nickName);
          if (roomId) {
            const res = await getRoomInfoApi(roomId);
            if (res.status === 200) {
              const memberList: string[] = res.data.roomMembers.map(
                (d: any) => d.userId
              );
              if (memberList.includes(userId)) {
                alert("이미 방 멤버");
                showToast("이미 방 멤버. 바로 이동", "success");
                router.replace(`/room/${roomId}`);
                return;
              } else {
                const response = await addRoomMember(roomId);
                if (response.status === 200) {
                  showToast("방에 가입 성공", "success");
                  router.replace(`/room/${roomId}`);
                  return;
                }
                showToast("알수 없는 이유로 방에 가입 불가", "error");
              }
            }
            // const response = await addRoomMember(roomId);
            return;
            // if (response.)
            // console.log(response);

            // router.replace(roomId);
            // setRoomId("");
            // return;
          }
          router.push("/");
        }
      } else {
        showToast("로그인에 실패했습니다..", "error");
      }
    };
    api();
  }, [state]);

  return (
    <TitleCard title="Log In">
      <form action={action}>
        <div className="flex flex-col gap-4">
          <LabelInput
            label="E-Mail"
            name="email"
            value={id}
            onChange={(data) => setId(data)}
          />
          <LabelInput
            label="Password"
            type="password"
            name="password"
            value={password}
            onChange={(data) => setPassword(data)}
            onKeyDown={handleEnter}
          />
          <FullButton className="mt-2" type="primary">
            Log In
          </FullButton>
          <span className="text-xs-normal text-content-white">
            Not signed up?{" "}
            <Link href="/assign" className="text-primary cursor-pointer">
              Sign Up
            </Link>
          </span>
        </div>
      </form>
    </TitleCard>
  );
};

export default LoginCard;
