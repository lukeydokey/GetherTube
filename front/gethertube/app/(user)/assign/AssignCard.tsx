"use client";
import { TitleCard, LabelInput, FullButton } from "@/components";
import Link from "next/link";
import { useState } from "react";
import { registUserApi, idCheckApi, nicknameCheckApi } from "@/api/api";
import {
  TypeReqUserRegist,
  ResponseFormat,
  TypeResUserRegist,
} from "@/api/types";
import { useToast } from "@/hook/useToast";
import { useRouter } from "next/navigation";

const AssignCard = () => {
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const { showToast } = useToast();

  const router = useRouter();

  const fetchUserRegist = async () => {
    const reqData: TypeReqUserRegist = {
      userId: email,
      password,
      nickName: nickname,
      chatColor: "",
    };
    const response: ResponseFormat<TypeResUserRegist> = await registUserApi(
      reqData
    );
    if (response.status === 200) {
      showToast("회원가입이 완료되었습니다.", "success");
      router.push("/login");
    }
  };

  const fetchIdCheck = async () => {
    const response: ResponseFormat<string> = await idCheckApi({
      userId: email,
    });
    if (response.status === 200) {
      return true;
    }
    return false;
  };

  const fetchNicknameCheck = async () => {
    const response: ResponseFormat<string> = await nicknameCheckApi({
      nickName: nickname,
    });
    if (response.status === 200) {
      return true;
    }
    return false;
  };

  const validateCheck = () => {
    if (!email || !nickname || !password || !passwordConfirm) {
      showToast("회원가입에 필요한 정보를 입력 해 주세요.", "error");
      return false;
    }
    if (password !== passwordConfirm) {
      showToast("비밀번호를 다시 입력 해 주세요.", "error");
      return false;
    }
    return true;
  };

  const handleButtonClick = async () => {
    if (!validateCheck()) return;
    const [isIdAvailable, isNicknameAvailable] = await Promise.all([
      fetchIdCheck(),
      fetchNicknameCheck(),
    ]);

    if (!isIdAvailable) {
      showToast("이미 사용중인 ID입니다.", "error");
      return;
    }

    if (!isNicknameAvailable) {
      showToast("이미 사용중인 닉네임입니다.", "error");
      return;
    }

    fetchUserRegist();
  };

  return (
    <TitleCard title="Sign Up">
      <div className="flex flex-col gap-4 *:invalid:bg-red-400">
        <LabelInput
          label="E-Mail"
          value={email}
          onChange={(d) => setEmail(d)}
          type="email"
          maxLength={30}
          required
        />
        <LabelInput
          label="Nickname"
          value={nickname}
          onChange={(d) => setNickname(d)}
          type="text"
          maxLength={10}
          required
        />
        <LabelInput
          label="Password"
          value={password}
          onChange={(d) => setPassword(d)}
          type="password"
          maxLength={15}
          required
        />
        <LabelInput
          label="Confirm Password"
          value={passwordConfirm}
          onChange={(d) => setPasswordConfirm(d)}
          type="password"
          maxLength={15}
          required
        />
        <FullButton className="mt-2" type="primary" onClick={handleButtonClick}>
          Sign Up
        </FullButton>
        <span className="text-xs-normal text-content-white">
          Already signed up?{" "}
          <Link href="/login" className="text-primary cursor-pointer">
            Log In
          </Link>
        </span>
      </div>
    </TitleCard>
  );
};

export default AssignCard;
