export const getYoutubeApi = async (id: string) => {
  try {
    const url = `https://www.googleapis.com/youtube/v3/videos?id=${id}&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}
    &part=snippet`;
    const response = await fetch(url);
    return response.json();
  } catch (e) {
    console.log(e);
  }
};
