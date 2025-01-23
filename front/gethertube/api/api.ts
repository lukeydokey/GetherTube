import {
  TypeReqUserRegist,
  TypeReqLogin,
  TypeReqAddRoomPlaylist,
  TypeReqUserDetailChange,
} from "./types";
import { getCookie } from "./cookies";

const YOUTUBE_URL = "https://www.googleapis.com/youtube/v3/videos";
const BASE_URL = "https://www.gethertube.site/api";

const urls = {
  userRegist: "/user",
  login: "/user/login",
  nickCheck: "/user/nickCheck",
  idCheck: "/user/idCheck",

  addRoom: "/room",
  room: "/room",
  addRoomPlaylist: (roomId: string) => `/room/${roomId}/playlist`,

  roomMember: "/room/member",
};

const customFetch = async <T>(
  method: "GET" | "PUT" | "DELETE",
  url: string,
  params?: T
): Promise<Response> => {
  const res = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
    body: JSON.stringify(params),
  });
  return res;
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

/**
 * User Api
 */
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

export const userDetailApi = async () => {
  const accessToken = await getCookie("accessToken");
  const response = await fetch(`${BASE_URL}${urls.userRegist}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken})}`,
    },
  });
  return response.json();
};

export const userDetailChangeApi = async (params: TypeReqUserDetailChange) => {
  const response = await customFetch<TypeReqUserDetailChange>(
    "PUT",
    `${BASE_URL}${urls.userRegist}`,
    params
  );
  return response.json();
};

/**
 * Room Api
 */
export const getRoomInfoApi = async (roomId: string) => {
  const response = await customFetch(
    "GET",
    `${BASE_URL}${urls.room}/${roomId}`
  );
  return response.json();
};

export const addRoomApi = async () => {
  const response = await fetchPost(`${BASE_URL}${urls.addRoom}`);
  return response.json();
};

export const addRoomPlaylistApi = async (
  roomId: string,
  params: TypeReqAddRoomPlaylist
) => {
  const response = await fetchPost(
    `${BASE_URL}${urls.addRoomPlaylist(roomId)}`,
    params
  );
  return response.json();
};

export const deleteRoomApi = async (roomId: string) => {
  const response = await customFetch(
    "DELETE",
    `${BASE_URL}${urls.room}/${roomId}`
  );
  return response.json();
};

export const addRoomMember = async (roomId: string) => {
  const response = await fetchPost(`${BASE_URL}${urls.roomMember}/${roomId}`);
  return response.json();
};
