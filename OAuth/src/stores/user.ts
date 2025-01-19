import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserState {
  isLoggedIn: boolean;
  setIsLoggedIn: (status: boolean) => void;

  nickname: string;
  setNickname: (nickname: string) => void;

  profileImage: string;
  setProfileImage: (profileImage: string) => void;
}

const useUserStore = create(
  persist<UserState>(
    (set) => ({
      isLoggedIn: false,
      setIsLoggedIn: (status: boolean) => set({ isLoggedIn: status }),

      nickname: "",
      setNickname: (nickname: string) => set({ nickname }),

      profileImage: "",
      setProfileImage: (profileImage: string) => set({ profileImage }),
    }),
    {
      name: "user",
    }
  )
);

export default useUserStore;
