import Logo from "@/assets/logo.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { useAuthStore } from "@/store/auth/auth";
import { getUserLetters } from "@/utils/userLetters";

export const Header = () => {
  const userName = useAuthStore((state) => state.user?.name);

  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleAccessAccount = () => {
    navigate("/account");
  };

  const isDashboardPage = pathname === "/";
  const isTransactionsPage = pathname === "/transactions";
  const isCategoriesPage = pathname === "/categories";

  const unselectedPageClassName = "text-gray-600 font-normal";
  const selectedPageClassName = "font-semibold";

  const userLetters = getUserLetters(userName);

  return (
    <div className="w-full sticky top-0 left-0 z-1 flex flex-row items-center justify-between bg-white py-4 px-12 border-b border-gray-200">
      <Link to="/">
        <img
          src={Logo}
          alt="Texto 'Financy' com dois desenhos no lado esquerdo do escrito representando moedas"
          className="h-6"
        />
      </Link>

      <div className="flex flex-row gap-5">
        <Link to="/">
          <Button
            variant="link"
            className={
              isDashboardPage ? selectedPageClassName : unselectedPageClassName
            }
          >
            Dashboard
          </Button>
        </Link>

        <Link to="/transactions">
          <Button
            variant="link"
            className={
              isTransactionsPage
                ? selectedPageClassName
                : unselectedPageClassName
            }
          >
            Transações
          </Button>
        </Link>

        <Link to="/categories">
          <Button
            variant="link"
            className={
              isCategoriesPage ? selectedPageClassName : unselectedPageClassName
            }
          >
            Categorias
          </Button>
        </Link>
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
