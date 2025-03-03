import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserState {
  isLoggedIn: boolean;
  setIsLoggedIn: (status: boolean) => void;
}

const useUserStore = create(
  persist<UserState>(
    (set) => ({
      isLoggedIn: false,
      setIsLoggedIn: (status: boolean) => set({ isLoggedIn: status }),
    }),
    {
      name: "user",
    }
  )
);

export default useUserStore;
