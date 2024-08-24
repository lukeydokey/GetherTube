"use server";
import { ResponseFormat, TypeReqLogin, TypeResLogin } from "@/api/types";
import { loginApi } from "@/api/api";
import { setCookie } from "@/api/cookies";
// import { useCookies } from "@/api/cookies";
import { cookies } from "next/headers";

export const handleSubmit = async (prevState: any, data: FormData) => {
  "use server";
  const reqData: TypeReqLogin = {
    userId: data.get("email") as string,
    password: data.get("password") as string,
  };
  const response: ResponseFormat<TypeResLogin> = await loginApi(reqData);
  if (response.status === 200) {
    setCookie("accessToken", response.data?.accessToken as string);
  }

  return response;
};
