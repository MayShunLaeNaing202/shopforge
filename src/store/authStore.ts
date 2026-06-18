// src/store/authStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "../types/index";

type StoredUser = User & { password: string };

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  registeredUsers: StoredUser[];
  login: (email: string, password: string) => boolean;
  register: (name: string, email: string, password: string) => boolean;
  logout: () => void;
}

const SEED_USERS: StoredUser[] = [
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

const toUser = (stored: StoredUser): User => ({
  id: stored.id,
  name: stored.name,
  email: stored.email,
  role: stored.role,
  createdAt: stored.createdAt,
});

const getAllUsers = (registeredUsers: StoredUser[]): StoredUser[] => [
  ...SEED_USERS,
  ...registeredUsers,
];

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      registeredUsers: [],

      login: (email, password) => {
        const found = getAllUsers(get().registeredUsers).find(
          (u) => u.email === email && u.password === password,
        );

        if (found) {
          set({
            user: toUser(found),
            isAuthenticated: true,
          });
          return true;
        }

        return false;
      },

      register: (name, email, password) => {
        const exists = getAllUsers(get().registeredUsers).some(
          (u) => u.email === email,
        );
        if (exists) return false;

        const newUser: User = {
          id: `user-${Date.now()}`,
          name,
          email,
          role: "shopper",
          createdAt: new Date().toISOString(),
        };

        set((state) => ({
          registeredUsers: [
            ...state.registeredUsers,
            { ...newUser, password },
          ],
          user: newUser,
          isAuthenticated: true,
        }));
        return true;
      },

      logout: () => set({ user: null, isAuthenticated: false }),
    }),
    {
      name: "shopforge-auth",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        registeredUsers: state.registeredUsers,
      }),
    },
  ),
);
