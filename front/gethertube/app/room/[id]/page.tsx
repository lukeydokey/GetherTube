"use client";
import YouTube from "react-youtube";
interface TypeParams {
  id: string;
}

interface TypeRoomIdProps {
  params: TypeParams;
}

const Page = ({ params }: TypeRoomIdProps) => {
  const { id } = params;
  return (
    <div className="w-full h-full p-10 flex gap-10 flex-col md:flex-row">
      <div className="md:w-[70%] h-full flex flex-col gap-5 w-full">
        <YouTube
          videoId="GZKj-PRPc2c" // defaults -> ''
          id=""
          className=""
          iframeClassName=""
          style={{ height: "100%", width: "100%" }}
          title=""
          // loading={string} // defaults -> undefined
          opts={{
            height: "100%", // 원하는 높이
            width: "100%", // 원하는 폭
            playerVars: {
              autoplay: 1, // 자동 재생 설정
            },
          }}
          onReady={() => {}}
          onPlay={() => {}}
          onPause={() => {}}
          onEnd={() => {}}
          onError={() => {}}
          onStateChange={() => {}}
          onPlaybackRateChange={() => {}}
          onPlaybackQualityChange={() => {}}
        />
        <div className="w-full h-[10%] bg-slate-50"></div>
      </div>
      <div className="w-[30%] h-full">
        <div className="w-full h-full bg-slate-300">wefkbawelufbwealuf</div>
      </div>
    </div>
  );
};

export default Page;
