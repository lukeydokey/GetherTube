"use server";
import { cookies } from "next/headers";

export const setCookie = (key: string, value: string) => {
  return cookies().set(key, value);
};

export const getCookie = async (key: string) => {
  const cookie = await cookies().get(key);
  return cookie?.value;
  // return cookies().get(key)?.json();
};
