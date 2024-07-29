"use client";
import { TitleCard, LabelInput, FullButton } from "@/components";
import Link from "next/link";
import { useState } from "react";

const AssignCard = () => {
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const handleButtonClick = () => {
    console.log(email, nickname, password, passwordConfirm);
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
