import Logo from "@/assets/logo.svg";
import { useAuthStore } from "@/store/auth/auth";
import { getUserLetters } from "@/utils/userLetters";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

const navItems = [
  { label: "Dashboard", path: "/dashboard" },
  { label: "Transações", path: "/transactions" },
  { label: "Categorias", path: "/categories" },
] as const;

export const getActivePageClass = (pathname: string, targetPath: string) =>
  pathname === targetPath ? "font-semibold" : "text-gray-600 font-normal";

/**
 * Main authenticated navigation with current-page highlighting and account access.
 */
export const Header = () => {
  const userName = useAuthStore((state) => state.user?.name);

  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleAccessAccount = () => {
    navigate("/account");
  };

  const userLetters = getUserLetters(userName);

  return (
    <div className="w-full sticky top-0 left-0 z-1 flex flex-row items-center justify-between bg-white py-4 px-12 border-b border-gray-200">
      <Link to="/dashboard">
        <img
          src={Logo}
          alt="Texto 'Financy' com dois desenhos no lado esquerdo do escrito representando moedas"
          className="h-6"
        />
      </Link>

      <div className="flex flex-row gap-5">
        {navItems.map((item) => (
          <Link key={item.path} to={item.path}>
            <Button
              variant="link"
              className={getActivePageClass(pathname, item.path)}
            >
              {item.label}
            </Button>
          </Link>
        ))}
      </div>

      <Button
        variant="outline"
        onClick={handleAccessAccount}
        className="w-9 h-9 rounded-full text-sm font-medium text-gray-800 bg-gray-300 border-none hover:bg-gray-300 uppercase"
      >
        {userLetters}
      </Button>
    </div>
  );
};
