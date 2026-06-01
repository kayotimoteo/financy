import { apolloClient } from "@/lib/graphql/apollo";
import { LOGIN, SIGNUP } from "@/lib/graphql/mutations/Auth";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type {
  LoginInput,
  LoginOutput,
  SignupInput,
  SignupOutput,
  User,
} from "./types";

type AuthState = {
  token: string | null;
  refreshToken: string | null;
  user: User | null;
  isAuthenticated: boolean;
  rememberMe: boolean;
  signup: (user: SignupInput) => Promise<boolean>;
  login: (user: LoginInput, rememberMe: boolean) => Promise<boolean>;
  logout: () => void;
  setUser: (user: User) => void;
  setRefreshToken: (token: string, refreshToken: string) => void;
};

const storage = {
  getItem: (name: string) => {
    const local = localStorage.getItem(name);
    const session = sessionStorage.getItem(name);
    return local || session;
  },
  setItem: (name: string, value: string) => {
    const { state } = JSON.parse(value);

    if (state?.rememberMe) {
      localStorage.setItem(name, value);
      sessionStorage.removeItem(name);
    } else {
      sessionStorage.setItem(name, value);
      localStorage.removeItem(name);
    }
  },
  removeItem: (name: string) => {
    localStorage.removeItem(name);
    sessionStorage.removeItem(name);
  },
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      refreshToken: null,
      user: null,
      isAuthenticated: false,
      rememberMe: false,
      signup: async (user: SignupInput) => {
        try {
          const { data } = await apolloClient.mutate<
            SignupOutput,
            { data: SignupInput }
          >({
            mutation: SIGNUP,
            variables: { data: user },
          });

          if (data?.register) {
            const { token, refreshToken, user } = data.register;
            set({ token, refreshToken, user, isAuthenticated: true });

            return true;
          }
        } catch (error) {
          console.log(`Erro ao fazer o cadastro: ${error}`);

          throw error;
        }

        return false;
      },
      login: async (user: LoginInput, rememberMe: boolean) => {
        try {
          const { data } = await apolloClient.mutate<
            LoginOutput,
            { data: LoginInput }
          >({
            mutation: LOGIN,
            variables: { data: user },
          });

          if (data?.login) {
            const { token, refreshToken, user } = data.login;
            set({
              token,
              refreshToken,
              user,
              rememberMe,
              isAuthenticated: true,
            });

            return true;
          }
        } catch (error) {
          console.log(`Erro ao fazer o login: ${error}`);

          throw error;
        }

        return false;
      },
      logout: () => {
        set({
          token: null,
          refreshToken: null,
          user: null,
          isAuthenticated: false,
        });

        apolloClient.clearStore();
      },
      setUser: (user: User) => set({ user }),
      setRefreshToken: (token: string, refreshToken: string) =>
        set({ token, refreshToken }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => storage),
    },
  ),
);
