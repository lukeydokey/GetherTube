"use client";
import YouTube from "react-youtube";
import { useEffect, useRef, useState } from "react";
import { Client, CompatClient, IFrame } from "@stomp/stompjs";
import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { Button, Input } from "@/components";

interface TypeParams {
  id: string;
}

interface TypeRoomIdProps {
  params: TypeParams;
}

const Page = ({ params }: TypeRoomIdProps) => {
  const { id } = params;

  const [serverChat, setServerChat] = useState("");
  const [chat, setChat] = useState("");

  const [stompClient, setStompClient] = useState<CompatClient | null>(null);

  useEffect(() => {
    var sock = new SockJS("https://www.gethertube.site/api/ws");
    var stompClient = Stomp.over(sock);
    var headers = {
      Authorization: "Bearer " + localStorage.getItem("accessToken"),
    };
    stompClient.connect(
      headers,
      function (frame: any) {
        setStompClient(stompClient); // stompClient 상태 저장
        console.log("Connected: " + frame);

        stompClient.subscribe(`/sub/chat/${id}`, (message) => {
          console.log(message);
          if (message.body) {
            const receivedMessage = JSON.parse(message.body);
            setServerChat(receivedMessage);
            console.log("Received message:", receivedMessage);
            // setMessages((prevMessages) => [...prevMessages, receivedMessage]); // 메시지 추가
          }
        });

        stompClient.subscribe(`/sub/playInfo/${id}`, (message) => {
          console.log(message);
          if (message.body) {
            const receivedMessage = JSON.parse(message.body);
            console.log("Received message:", receivedMessage);
            // setMessages((prevMessages) => [...prevMessages, receivedMessage]); // 메시지 추가
          }
        });
      },
      function (error: any) {
        console.log("Error : " + error);
      }
    );

    return () => {
      if (stompClient) {
        stompClient.disconnect(() => {
          console.log("Disconnected");
        });
      }
    };
    // var sock = new SockJS("https://www.gethertube.site/api/ws");
    // sock.onopen = function () {
    //   console.log("open");
    //   sock.send("test");
    // };
    // fetchData();
    // 1. SockJS 객체를 생성한다
    // const socket = new SockJS(`https://www.gethertube.site/api/ws`);
    // console.log(socket);

    // const client = Stomp.over(socket);
    // console.log(client);
    // client.connect(
    //   { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
    //   () => {
    //     console.log("연결 성공");
    //     // 연결 후 구독을 수행
    //     client.subscribe("/topic/some-topic", (message) => {
    //       console.log("Received message:", message.body);
    //     });
    //     // client.subscribe("/topic/some-topic", (message) => {
    //     //   console.log("Received message:", message.body);
    //     // });
    //     // 연결 성공 시 실행되는 콜백 함수
    //   },
    //   // 연결 실패 시 실행되는 콜백 함수
    //   (error: any) => {
    //     console.log("연결 실패");
    //     console.error("Connection error:", error);
    //   }
    // );

    // client.onConnect(() => {
    //   console.log("onConnect");
    // });
    // client.onDisconnect(() => {
    //   console.log("disconnect");
    // });
    // client.onConnect(() => {
    //   console.log("onConnect");
    // });
    // client.onWebSocketClose(() => {
    //   console.log("websocket close");
    // });
    // client.onWebSocketError(() => {
    //   console.log("websocket error");
    // });
    // client.send(
    //   "/app/some-destination",
    //   {},
    //   JSON.stringify({ message: "Hello, Server!" })
    // );
    // 2. STOMP 객체를 생성한다.
    // const client = Stomp.over(socket);
    // STOMP 클라이언트 설정
    // const client = new Client({
    //   // brokerURL: "ws://https://www.gethertube.site/api/pub/chat/send", // WebSocket 서버 주소
    //   // brokerURL: "ws://www.gethertube.site/api/pub/chat/send", // WebSocket 서버 주소
    //   brokerURL: "ws://www.gethertube.site/api/ws", // WebSocket 서버 주소
    //   connectHeaders: {
    //     Authorization: `Bearer ${localStorage.getItem("accessToken")}`, // accessToken을 헤더에 포함
    //   },
    //   debug: (str) => {
    //     console.log(str);
    //   },
    //   reconnectDelay: 5000, // 연결이 끊어졌을 때 5초 후 재연결 시도
    //   onConnect: () => {
    //     console.log("Connected");
    //     // 특정 주제 구독
    //     client.subscribe("/topic/messages", (message) => {
    //       if (message.body) {
    //         const receivedMessage = JSON.parse(message.body);
    //         // setMessages((prevMessages) => [...prevMessages, receivedMessage]);
    //       }
    //     });
    //   },
    //   onStompError: (frame) => {
    //     console.error("STOMP Error: " + frame.headers["message"]);
    //     console.error("Additional details: " + frame.body);
    //   },
    //   onWebSocketError: (event) => {
    //     console.error("WebSocket Error: ", event);
    //   },
    //   onDisconnect: () => {
    //     console.log("Disconnected");
    //   },
    // });
    // // 클라이언트 활성화 (연결)
    // client.activate();
    // // 컴포넌트가 언마운트될 때 클라이언트 비활성화 (연결 종료)
    // return () => {
    //   client.deactivate();
    // };
  }, []);

  // 버튼 클릭 시 메시지 전송
  const sendMessage = () => {
    if (stompClient) {
      stompClient.send(
        `/api/pub/chat/message`,
        {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
        JSON.stringify({ roomId: id, chat: chat })
      );
      console.log(`Message sent to /api/pub/chat/message`);
    } else {
      console.log("STOMP client is not connected");
    }
  };

  return (
    <div className="w-full h-full p-10 flex gap-10 flex-col md:flex-row">
      <div className="md:w-[70%] h-full flex flex-col gap-5 w-full">
        <YouTube
          videoId={id}
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
        <div className="w-full h-full bg-slate-300 flex flex-col">
          <div className="flex-1">{serverChat}</div>
          <div>
            <Input
              name="chat"
              onChange={(d) => setChat(d)}
              placeholder="채팅입력"
            />
            <Button onClick={sendMessage} className="h-8">
              채팅 보내기
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
