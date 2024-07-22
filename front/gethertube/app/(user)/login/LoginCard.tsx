"use client";
import { TitleCard, LabelInput, FullButton } from "@/components";
import Link from "next/link";
import { useState } from "react";

const LoginCard = () => {
  const [id, setId] = useState("");

  const fetchLogin = async (id: string) => {
    const response = await fetch(
      `http://ec2-3-36-58-245.ap-northeast-2.compute.amazonaws.com:18080/api/test/mongo`,
      {
        method: "GET",
        headers: {
          userId: "test1234",
          accept: "*/*",
        },
      }
    );
    console.log(response);
  };

  const handleClick = async () => {
    const response = await fetchLogin(id);
    console.log(response);
  };
  return (
    <TitleCard title="Log In">
      <div className="flex flex-col gap-4">
        <LabelInput
          label="E-Mail"
          value={id}
          onChange={(data) => setId(data)}
        />
        <LabelInput label="Password" />
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
