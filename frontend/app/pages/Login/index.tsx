import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupControl,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import { Eye, EyeClosed, Lock, Mail, UserRoundPlus } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import type { LoginFormData } from "./types";
import Logo from "@/assets/logo.svg";
import { toast } from "sonner";
import { useAuthStore } from "@/store/auth/auth";

const loginSchema = z.object({
  email: z.email("E-mail inválido"),
  password: z.string(),
});

export const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [remeberMe, setRemeberMe] = useState(false);

  const [loading, setLoading] = useState(false);

  const { handleSubmit, register } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const login = useAuthStore((state) => state.login);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleRemeberMe = () => {
    setRemeberMe(!remeberMe);
  };

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true);

    try {
      const isSuccess = await login(data, remeberMe);

      if (isSuccess) {
        toast.success("Login realizado com sucesso!");
      }
    } catch (error) {
      toast.error("Erro ao realizar o login!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md flex flex-col items-center gap-8">
      <img
        src={Logo}
        alt="Texto 'Financy' com dois desenhos no lado esquerdo do escrito representando moedas"
      />

      <Card className="text-center w-full">
        <CardHeader>
          <CardTitle>Fazer login</CardTitle>
          <CardDescription>Entre na sua conta para continuar</CardDescription>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            <div className="flex flex-col gap-4">
              <InputGroupControl>
                <Label htmlFor="email">E-mail</Label>
                <InputGroup>
                  <InputGroupAddon>
                    <Mail />
                  </InputGroupAddon>

                  <InputGroupInput
                    id="email"
                    type="email"
                    placeholder="mail@exemplo.com"
                    {...register("email")}
                  />
                </InputGroup>
              </InputGroupControl>

              <InputGroupControl>
                <Label htmlFor="password">Senha</Label>
                <InputGroup>
                  <InputGroupAddon>
                    <Lock />
                  </InputGroupAddon>

                  <InputGroupInput
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Digite sua senha"
                    {...register("password")}
                  />

                  <InputGroupButton
                    onClick={handleShowPassword}
                    className="w-fit h-fit bg-transparent hover:bg-transparent leading-none mr-3 py-2! px-0!"
                  >
                    {showPassword ? (
                      <Eye className="text-gray-700! cursor-pointer" />
                    ) : (
                      <EyeClosed className="text-gray-700! cursor-pointer" />
                    )}
                  </InputGroupButton>
                </InputGroup>
              </InputGroupControl>

              <div className="flex flex-row justify-between">
                <div className="flex flex-row gap-2">
                  <Checkbox
                    id="remember-me"
                    checked={remeberMe}
                    onClick={handleRemeberMe}
                  />
                  <Label htmlFor="remember-me">Lembrar-me</Label>
                </div>

                <Button variant="link" type="button">
                  Recuperar senha
                </Button>
              </div>
            </div>

            <Button disabled={loading} className="w-full">
              Entrar
            </Button>

            <div className="flex flex-row items-center gap-3">
              <div className="h-0.25 w-full bg-gray-300" />
              <p className="text-sm font-normal text-gray-500">ou</p>
              <div className="h-0.25 w-full bg-gray-300" />
            </div>

            <div className="flex flex-col gap-4">
              <p className="text-sm text-gray-600">Ainda não tem uma conta?</p>

              <Button
                type="button"
                variant="outline"
                className="w-full"
                asChild
              >
                <Link to="/signup">
                  <UserRoundPlus />
                  Criar conta
                </Link>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
