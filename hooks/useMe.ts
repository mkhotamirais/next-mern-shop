import { create } from "zustand";
import axios from "axios";
import { url } from "@/lib/constants";

const axiosCred = axios.create({ withCredentials: true });

export interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: "user" | "admin";
  accessToken: string[];
  createdAt: string;
  updatedAt: string;
}

type MeState = {
  me: User | null;
  loadMe: boolean;
  errMe: string | null;
  getMe: () => void;
};

export const useMe = create<MeState>((set) => ({
  me: null,
  loadMe: false,
  errMe: null,
  getMe: async () => {
    set({ loadMe: true });
    await axiosCred
      .get(`${url}/v3/me`)
      .then((res) => {
        set({ me: res.data });
      })
      .catch((err) => {
        if (err.response) {
          set({ errMe: err.response.data.error });
        } else set({ errMe: err.message });
      })
      .finally(() => set({ loadMe: false }));
  },
}));
