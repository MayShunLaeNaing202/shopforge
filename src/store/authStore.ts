// src/store/authStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "../types/index";

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  register: (name: string, email: string, password: string) => boolean;
  logout: () => void;
}

// Mock users — real backend မရှိသေးတဲ့အတွက်
const MOCK_USERS: (User & { password: string })[] = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@shopforge.com",
    password: "admin123",
    role: "admin",
    createdAt: "2024-01-01",
  },
  {
    id: "2",
    name: "May Shun",
    email: "may@shopforge.com",
    password: "may123",
    role: "shopper",
    createdAt: "2024-01-01",
  },
];

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,

      login: (email, password) => {
        // Mock users ထဲမှာ ရှာတယ်
        const found = MOCK_USERS.find(
          (u) => u.email === email && u.password === password,
        );

        if (found) {
          // password မပါဘဲ user object သိမ်းတယ်
          const { password: _, ...userWithoutPassword } = found;
          set({
            user: userWithoutPassword,
            isAuthenticated: true,
          });
          return true; // login အောင်မြင်
        }

        return false; // login မအောင်မြင်
      },

      register: (name, email, password) => {
        // email ထပ်နေသလား စစ်တယ်
        const exists = MOCK_USERS.find((u) => u.email === email);
        if (exists) return false;

        // User အသစ် ဆောက်တယ်
        const newUser: User = {
          id: String(MOCK_USERS.length + 1),
          name,
          email,
          role: "shopper",
          createdAt: new Date().toISOString(),
        };

        MOCK_USERS.push({ ...newUser, password });
        set({ user: newUser, isAuthenticated: true });
        return true;
      },

      logout: () => set({ user: null, isAuthenticated: false }),
    }),
    { name: "shopforge-auth" },
  ),
);
