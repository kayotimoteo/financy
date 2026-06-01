import { Layout } from "@/components/layout";
import { Login } from "@/pages/Login";
import { Signup } from "@/pages/Signup";
import { Navigate, Route, Routes } from "react-router-dom";
import { PrivateRoute } from "./private";
import { PublicRoute } from "./public";
import { Dashboard } from "@/pages/Dashboard";
import { useAuthStore } from "@/store/auth/auth";
import { Transactions } from "@/pages/Transactions";
import { Categories } from "@/pages/Categories";
import { Account } from "@/pages/Account";

export const AppRoutes = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/account" element={<Account />} />
        </Route>

        <Route
          path="/"
          element={
            <Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />
          }
        />

        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
      </Route>
    </Routes>
  );
};
