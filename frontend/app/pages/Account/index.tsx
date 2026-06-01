import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupControl,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import { EDIT_USER } from "@/lib/graphql/mutations/User";
import { useAuthStore } from "@/store/auth/auth";
import { getUserLetters } from "@/utils/userLetters";
import { useMutation } from "@apollo/client/react";
import { LogOut, Mail } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import type { UserInput, UserOutput } from "./types";

export const Account = () => {
  const [name, setName] = useState("");

  const userName = useAuthStore((state) => state.user?.name);
  const email = useAuthStore((state) => state.user?.email);

  const logout = useAuthStore((state) => state.logout);
  const setUser = useAuthStore((state) => state.setUser);

  const [editUser, { loading }] = useMutation<
    { editUser: UserOutput },
    { data: UserInput }
  >(EDIT_USER, {
    onCompleted: (data) => {
      setUser(data.editUser);
      toast.success("Conta atualizada com sucesso!");
    },
    onError: (error) => {
      const err = error.message;

      toast.error(
        <>
          <p>Erro ao atualizar a conta!</p>
          {err && <p>Error: {err}</p>}
        </>,
      );
    },
  });

  const userLetters = getUserLetters(userName);

  const handleEditUser = () => {
    editUser({
      variables: {
        data: {
          name,
        },
      },
    });
  };

  useEffect(() => {
    setName(userName ?? "");
  }, [userName]);

  return (
    <Card className="w-md h-fit flex flex-col items-center">
      <div className="flex flex-col gap-6 items-center">
        <div className="w-16 h-16 flex items-center justify-center uppercase rounded-full text-2xl font-medium text-gray-800 bg-gray-300 border-none hover:bg-gray-300">
          {userLetters}
        </div>

        <div className="flex flex-col items-center">
          <p className="text-xl font-semibold text-gray-800">{userName}</p>
          <p className="text-base text-gray-500">{email}</p>
        </div>
      </div>

      <div className="w-full h-px bg-gray-200" />

      <div className="w-full flex flex-col gap-4 items-center">
        <InputGroupControl className="w-full">
          <Label htmlFor="name">Nome completo</Label>
          <InputGroup>
            <InputGroupInput
              id="name"
              type="text"
              placeholder="Seu nome completo"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </InputGroup>
        </InputGroupControl>

        <InputGroupControl className="w-full">
          <Label htmlFor="email">E-mail</Label>
          <InputGroup>
            <InputGroupAddon>
              <Mail />
            </InputGroupAddon>

            <InputGroupInput id="email" type="email" value={email} disabled />
          </InputGroup>

          <span className="text-xs text-gray-500">
            O e-mail não pode ser alterado
          </span>
        </InputGroupControl>
      </div>

      <div className="w-full flex flex-col gap-4">
        <Button
          variant="default"
          onClick={handleEditUser}
          disabled={loading || !name}
          className="w-full"
        >
          Salvar alterações
        </Button>

        <Button variant="outline" className="w-full" onClick={logout}>
          <LogOut className="text-danger" />
          Sair da conta
        </Button>
      </div>
    </Card>
  );
};
