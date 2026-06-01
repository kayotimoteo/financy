import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupControl,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import { Eye, EyeClosed, Lock, LogIn, Mail, UserRound } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Logo from "@/assets/logo.svg";
import type { SignupFormData } from "./types";
import { useAuthStore } from "@/store/auth/auth";
import { toast } from "sonner";

const userSchema = z.object({
  name: z.string().min(3, "O nome deve ter no mínimo 3 caracteres"),
  email: z.email("E-mail inválido"),
  password: z.string().min(8, "A senha deve ter no mínimo 8 caracteres"),
});

export const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<SignupFormData>({
    resolver: zodResolver(userSchema),
  });

  const signup = useAuthStore((state) => state.signup);

  const navigate = useNavigate();

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (data: SignupFormData) => {
    setLoading(true);

    try {
      const isSuccess = await signup(data);

      if (isSuccess) {
        toast.success("Cadastro realizado com sucesso!");

        navigate("/dashboard", { replace: true });
      }
    } catch (error) {
      toast.error("Erro ao realizar o cadastro!");
    } finally {
      setLoading(false);
    }
  };

  const nameError = errors.name?.message;
  const emailError = errors.email?.message;
  const passwordError = errors.password?.message;

  return (
    <div className="w-full flex flex-col items-center gap-8">
      <img
        src={Logo}
        alt="Texto 'Financy' com dois desenhos no lado esquerdo do escrito representando moedas"
      />

      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <CardTitle>Criar conta</CardTitle>
          <CardDescription>
            Comece a controlar suas finanças ainda hoje
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-6 text-left"
          >
            <div className="flex flex-col gap-4">
              <InputGroupControl variant={nameError ? "error" : "default"}>
                <Label htmlFor="name">Nome completo</Label>
                <InputGroup>
                  <InputGroupAddon>
                    <UserRound />
                  </InputGroupAddon>

                  <InputGroupInput
                    id="name"
                    type="text"
                    placeholder="Seu nome completo"
                    {...register("name")}
                  />
                </InputGroup>

                {nameError && (
                  <span className="text-xs text-danger">{nameError}</span>
                )}
              </InputGroupControl>

              <InputGroupControl variant={emailError ? "error" : "default"}>
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

                {emailError && (
                  <span className="text-xs text-danger">{emailError}</span>
                )}
              </InputGroupControl>

              <InputGroupControl variant={passwordError ? "error" : "default"}>
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

                <span
                  className={`text-xs ${
                    passwordError ? "text-danger" : "text-gray-500"
                  }`}
                >
                  A senha deve ter no mínimo 8 caracteres
                </span>
              </InputGroupControl>
            </div>

            <Button disabled={loading} className="w-full">
              Cadastrar
            </Button>

            <div className="flex flex-row items-center gap-3">
              <div className="h-0.25 w-full bg-gray-300" />
              <p className="text-sm font-normal text-gray-500">ou</p>
              <div className="h-0.25 w-full bg-gray-300" />
            </div>

            <div className="flex flex-col gap-4">
              <p className="text-sm text-gray-600">Já tem uma conta?</p>

              <Button
                type="button"
                variant="outline"
                className="w-full"
                asChild
              >
                <Link to="/login">
                  <LogIn />
                  Fazer login
                </Link>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
