import { TypeReqUserRegist, TypeReqLogin } from "./types";

const YOUTUBE_URL = "https://www.googleapis.com/youtube/v3/videos";
const BASE_URL = "https://gethertube.codns.com/api";

const urls = {
  userRegist: "/user",
  login: "/user/login",
  nickCheck: "/user/nickCheck",
  idCheck: "/user/idCheck",
  addRoom: "/room",
};

const fetchPost = async <T>(url: string, params?: T): Promise<Response> => {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
    body: JSON.stringify(params),
  });
  return res;
};

export const getYoutubeApi = async (id: string) => {
  try {
    const url = `${YOUTUBE_URL}?id=${id}&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}
    &part=snippet`;
    const response = await fetch(url);
    return response.json();
  } catch (e) {
    console.log(e);
  }
};

export const idCheckApi = async (params: { userId: string }) => {
  const response = await fetchPost(`${BASE_URL}${urls.idCheck}`, params);
  return response.json();
};

export const nicknameCheckApi = async (params: { nickName: string }) => {
  const response = await fetchPost(`${BASE_URL}${urls.nickCheck}`, params);
  return response.json();
};

export const registUserApi = async (params: TypeReqUserRegist) => {
  const response = await fetch(`${BASE_URL}${urls.userRegist}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  });
  return response.json();
};

export const loginApi = async (params: TypeReqLogin) => {
  const response = await fetch(`${BASE_URL}${urls.login}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  });
  return response.json();
};

export const addRoomApi = async () => {
  const response = await fetchPost(`${BASE_URL}${urls.addRoom}`);
  return response.json();
};
