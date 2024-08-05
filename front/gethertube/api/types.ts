export interface TypeReqUserRegist {
  userId: string;
  passWord: string;
  nickName: string;
  chatColor: string;
}

export interface ResponseFormat<T> {
  status: number;
  data?: T;
  message: string;
  timestamp: string;
}

export interface TypeResUserRegist {
  userId: string;
  nickName: string;
  chatColor: string;
  userPlaylistsId: string[];
  userRoomsId: string[];
}
