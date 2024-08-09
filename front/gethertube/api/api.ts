import { TypeReqUserRegist, TypeReqLogin } from "./types";

const YOUTUBE_URL = "https://www.googleapis.com/youtube/v3/videos";
const BASE_URL = "https://gethertube.codns.com/api";

const urls = {
  userRegist: "/user",
  login: "/user/login",
};

const fetchPost = async <T>(url: string, params: T): Promise<Response> => {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
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

export const registUserApi = async (params: TypeReqUserRegist) => {
  const response = await fetchPost<TypeReqUserRegist>(
    `${BASE_URL}${urls.userRegist}`,
    params
  );
  return response.json();
};

export const loginApi = async (params: TypeReqLogin) => {
  const response = await fetchPost<TypeReqLogin>(
    `${BASE_URL}${urls.login}`,
    params
  );
  return response.json();
};
