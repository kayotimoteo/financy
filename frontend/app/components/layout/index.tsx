import { Outlet } from "react-router-dom";
import { useAuthStore } from "@/store/auth/auth";
import { Header } from "../header";

export const Layout = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <div className="w-full h-fit min-h-screen bg-gray-100">
      {isAuthenticated && <Header />}

      <div className="w-full h-fit flex flex-col items-center justify-center p-12">
        <Outlet />
      </div>
    </div>
  );
};
