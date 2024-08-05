"use client";
import { TitleCard, LabelInput, FullButton } from "@/components";
import Link from "next/link";
import { useState } from "react";
import { loginApi } from "@/api/api";
import { ResponseFormat, TypeReqLogin, TypeResLogin } from "@/api/types";
import { useToast } from "@/hook/useToast";
import { utilStorage } from "@/util/utilStorage";
import { useRouter } from "next/navigation";
import { userStore } from "@/store/userStore";

const LoginCard = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const { setUser } = userStore();

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
    fetchLogin();
  };

  const handleEnter = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleClick();
  };

  return (
    <TitleCard title="Log In">
      <div className="flex flex-col gap-4">
        <LabelInput
          label="E-Mail"
          value={id}
          onChange={(data) => setId(data)}
        />
        <LabelInput
          label="Password"
          type="password"
          value={password}
          onChange={(data) => setPassword(data)}
          onKeyDown={handleEnter}
        />
        <FullButton className="mt-2" type="primary" onClick={handleClick}>
          Log In
        </FullButton>
        <span className="text-xs-normal text-content-white">
          Not signed up?{" "}
          <Link href="/assign" className="text-primary cursor-pointer">
            Sign Up
          </Link>
        </span>
      </div>
    </TitleCard>
  );
};

export default LoginCard;
