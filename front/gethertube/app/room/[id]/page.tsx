"use client";
import YouTube from "react-youtube";
import { useEffect, useRef, useState, KeyboardEvent } from "react";
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

interface TypeChat {
  nickName: string;
  chat: string;
  rommId?: string;
}

const Page = ({ params }: TypeRoomIdProps) => {
  const { id } = params;

  const chatBoxRef = useRef<HTMLDivElement>(null);

  const [serverChat, setServerChat] = useState("");
  const [liveChat, setLiveChat] = useState<TypeChat[]>([]);
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
          if (message.body) {
            const receivedMessage: TypeChat = JSON.parse(message.body);

            const newChat = {
              nickName: receivedMessage.nickName,
              chat: receivedMessage.chat,
            };
            setLiveChat((prev) => [...prev, newChat]);
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

  const handleInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    const newChat = chat;
    if (e.key === "Enter" && newChat !== "") {
      setChat("");
      sendMessage(newChat);
    }
  };

  // 버튼 클릭 시 메시지 전송
  const sendMessage = (_msg: string) => {
    if (stompClient) {
      const headers = {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      };
      const user = localStorage.getItem("user");
      const nickName = user ? JSON.parse(user).nickName : "default";
      stompClient.send(
        `/pub/chat/message`,
        headers,
        JSON.stringify({
          roomId: id,
          chat: _msg,
          nickName,
        })
      );
      console.log(`Message sent to /pub/chat/message`);
    } else {
      console.log("STOMP client is not connected");
    }
  };

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [liveChat]); // messages가 업데이트될 때마다 스크롤 이동

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
      <div className="w-[30%] h-full border border-gray-500 rounded-lg">
        <div className="w-full h-full flex flex-col">
          <div
            ref={chatBoxRef}
            className="flex-1 overflow-x-hidden overflow-y-auto p-2"
          >
            {liveChat.map((chat, index) => (
              <div
                className="inline-block relative break-words w-full"
                key={index}
              >
                <div>
                  <div className="text-green-500 font-bold inline-block relative mr-2">
                    {chat.nickName}
                  </div>
                  <div className="text-white text-opacity-80 break-words inline">
                    {chat.chat}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex border-t border-gray-500 p-2">
            <Input
              name="chat"
              className="flex-1"
              value={chat}
              onChange={(d) => setChat(d)}
              onKeyDown={handleInputKeyDown}
              placeholder="채팅입력"
            />
            {/* <Button onClick={sendMessage} className="h-8">
              채팅 보내기
            </Button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
