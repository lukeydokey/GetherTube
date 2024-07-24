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
    <>
      {id}번방
      <div>
        <YouTube
          videoId="GZKj-PRPc2c" // defaults -> ''
          id=""
          className=""
          iframeClassName=""
          style={{}}
          title=""
          // loading={string} // defaults -> undefined
          opts={{}}
          onReady={() => {}}
          onPlay={() => {}}
          onPause={() => {}}
          onEnd={() => {}}
          onError={() => {}}
          onStateChange={() => {}}
          onPlaybackRateChange={() => {}}
          onPlaybackQualityChange={() => {}}
        />
      </div>
    </>
  );
};

export default Page;
