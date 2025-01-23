import { create } from "zustand";

interface TypeRoomStore {
  roomId: string;
  setRoomId: (_roomId: string) => void;
}

export const roomStore = create<TypeRoomStore>((set) => ({
  roomId: "",
  setRoomId: (_roomId: string) => set({ roomId: _roomId }),
}));
