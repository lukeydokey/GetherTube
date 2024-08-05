export interface TypeReqUserRegist {
  userId: string;
  password: string;
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

export interface TypeReqLogin {
  userId: string;
  password: string;
}

export interface TypeResLogin {
  userId: string;
  nickName: string;
  accessToken: string;
}
