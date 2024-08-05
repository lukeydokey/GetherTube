import { TypeReqUserRegist } from "./types";

const YOUTUBE_URL = "https://www.googleapis.com/youtube/v3/videos";
const BASE_URL =
  "http://ec2-3-35-51-36.ap-northeast-2.compute.amazonaws.com:18080/api";

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
