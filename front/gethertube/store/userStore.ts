import { create } from "zustand";
import { utilStorage } from "@/util/utilStorage";

interface TypeUserStore {
  userId: string;
  nickName: string;
  setUser: (userId: string, nickName: string) => void;
}

export const userStore = create<TypeUserStore>((set) => ({
  userId: utilStorage().getItem("user").userId || "",
  nickName: utilStorage().getItem("user").nickName || "",
  setUser: (userId: string, nickName: string) => set({ userId, nickName }),
}));
