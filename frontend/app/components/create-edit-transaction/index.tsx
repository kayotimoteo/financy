import {
  ChevronDownIcon,
  CircleArrowDown,
  CircleArrowUp,
  Loader,
  X,
} from "lucide-react";
import { Button } from "../ui/button";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupControl,
  InputGroupInput,
  InputGroupSelectTrigger,
} from "../ui/input-group";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectValue } from "../ui/select";
import { useEffect, useState } from "react";
import type { Category, TransactionType } from "@/types/types";
import {
  CREATE_TRANSACTION,
  UPDATE_TRANSACTION,
} from "@/lib/graphql/mutations/Transaction";
import { useMutation, useQuery } from "@apollo/client/react";
import { toast } from "sonner";
import type {
  CreateEditTransactionProps,
  TransactionFormData,
  TransactionInput,
  TransactionOutput,
} from "./types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { LIST_CATEGORIES } from "@/lib/graphql/queries/Category";
import { format } from "date-fns";
import { refetchQueries, updateQueries } from "@/utils/updateRefetchQueries";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

const transactionSchema = z.object({
  description: z.string().min(1, "Campo obrigatório"),
  amount: z
    .number("Campo obrigatório")
    .min(0.01, "O valor deve ser maior que 0"),
});

export const CreateEditTransaction = ({
  isOpen,
  transaction,
  onOpenChange,
}: CreateEditTransactionProps) => {
  const [type, setType] = useState<TransactionType>("expense");
  const [category, setCategory] = useState<string>("");
  const [date, setDate] = useState<Date | undefined>(new Date());

  const [emptyDate, setEmptyDate] = useState(false);
  const [emptyCategory, setEmptyCategory] = useState(false);

  const { data } = useQuery<{
    listAllCategories: Category[];
  }>(LIST_CATEGORIES);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<TransactionFormData>({
    resolver: zodResolver(transactionSchema),
  });

  const handleTypeChange = (type: TransactionType) => {
    setType(type);
  };

  const resetFields = () => {
    reset();
    setType("expense");
    setCategory("");
    setDate(new Date());
  };

  const [createTransaction, { loading: loadingCreate }] = useMutation<
    { createTransaction: TransactionOutput },
    { data: TransactionInput }
  >(CREATE_TRANSACTION, {
    refetchQueries: refetchQueries(),
    update(cache) {
      updateQueries(cache);
    },
    onCompleted: () => {
      toast.success("Transação criada com sucesso!");
      resetFields();
      onOpenChange(false);
    },
    onError: (error) => {
      const err = error.message;

      toast.error(
        <>
          <p>Erro ao criar transação!</p>
          {err && <p>Error: {err}</p>}
        </>,
      );
    },
  });

  const [updateTransaction, { loading: loadingUpdate }] = useMutation<
    { updateTransaction: TransactionOutput },
    { data: TransactionInput; id: string }
  >(UPDATE_TRANSACTION, {
    refetchQueries: refetchQueries(),
    update(cache) {
      updateQueries(cache);
    },
    onCompleted: () => {
      toast.success("Transação atualizada com sucesso!");
      resetFields();
      onOpenChange(false);
    },
    onError: (error) => {
      const err = error.message;

      toast.error(
        <>
          <p>Erro ao atualizar a transação!</p>
          {err && <p>Error: {err}</p>}
        </>,
      );
    },
  });

  const onSubmit = async (formData: TransactionFormData) => {
    if (!date) {
      setEmptyDate(true);
      return;
    }

    if (!category) {
      setEmptyCategory(true);
      return;
    }

    if (transaction) {
      updateTransaction({
        variables: {
          data: {
            ...formData,
            type,
            categoryId: category,
            date: date.toISOString(),
          },
          id: transaction.id,
        },
      });
    } else {
      createTransaction({
        variables: {
          data: {
            ...formData,
            type,
            categoryId: category,
            date: date.toISOString(),
          },
        },
      });
    }
  };

  useEffect(() => {
    if (!isOpen) {
      resetFields();
    } else {
      if (transaction) {
        setValue("description", transaction.description);
        setValue("amount", transaction.amount);
        setType(transaction.type);
        setCategory(transaction.category?.id ?? "");
        setDate(new Date(transaction.date));
      }
    }
  }, [isOpen, transaction]);

  useEffect(() => {
    if (emptyDate && date) {
      setEmptyDate(false);
    }
  }, [date]);

  useEffect(() => {
    if (emptyCategory && category) {
      setEmptyCategory(false);
    }
  }, [category, emptyCategory]);

  const categories = data?.listAllCategories || [];

  const isExpense = type === "expense";

  const selectedTypeClassName = `${isExpense ? "border-red-base [&_svg]:text-red-base" : "border-green-base [&_svg]:text-green-base"} text-gray-800 bg-gray-100`;
  const unselectedTypeClassName = `border-0 text-gray-600 font-normal [&_svg]:text-gray-400`;

  const loading = loadingCreate || loadingUpdate;

  return (
    <DialogContent showCloseButton={false} className="w-md gap-6">
      <DialogHeader className="flex flex-row items-start justify-between">
        <div className="flex flex-col gap-0.5">
          <DialogTitle>{transaction ? "Editar" : "Nova"} transação</DialogTitle>
          <DialogDescription>Registre sua despesa ou receita</DialogDescription>
        </div>

        <DialogClose asChild>
          <Button variant="outline" className="p-2!">
            <X />
          </Button>
        </DialogClose>
      </DialogHeader>

      <div className="flex flex-row gap-2 p-2 border border-gray-200 rounded-xl">
        <Button
          variant="outline"
          onClick={() => handleTypeChange("expense")}
          className={`bg-white flex-1 ${isExpense ? selectedTypeClassName : unselectedTypeClassName}`}
        >
          <CircleArrowDown /> Despesa
        </Button>

        <Button
          variant="outline"
          onClick={() => handleTypeChange("income")}
          className={`bg-white flex-1 ${isExpense ? unselectedTypeClassName : selectedTypeClassName}`}
        >
          <CircleArrowUp /> Receita
        </Button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <InputGroupControl>
          <Label htmlFor="description">Descrição</Label>
          <InputGroup>
            <InputGroupInput
              id="description"
              type="text"
              placeholder="Ex. Almoço no restaurante"
              {...register("description")}
            />
          </InputGroup>

          {errors.description && (
            <span className="text-xs text-danger">
              {errors.description.message}
            </span>
          )}
        </InputGroupControl>

        <div className="flex flex-row gap-4">
          <InputGroupControl className="flex-1">
            <Label htmlFor="date">Data</Label>

            <InputGroup>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    data-empty={!date}
                    className="w-full data-[empty=true]:text-muted-foreground justify-between text-left font-normal hover:bg-white"
                  >
                    {date ? (
                      format(date, "dd/MM/yyyy")
                    ) : (
                      <span className="text-gray-400">Selecione</span>
                    )}
                    <ChevronDownIcon />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(date) => setDate(date)}
                    defaultMonth={date}
                  />
                </PopoverContent>
              </Popover>
            </InputGroup>

            {emptyDate && (
              <span className="text-xs text-danger">Campo obrigatório</span>
            )}
          </InputGroupControl>

          <InputGroupControl className="flex-1">
            <Label htmlFor="amount">Valor</Label>
            <InputGroup>
              <InputGroupAddon className="text-base font-normal">
                R$
              </InputGroupAddon>

              <InputGroupInput
                id="amount"
                type="number"
                placeholder="0,00"
                className="[&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [-moz-appearance:textfield]"
                {...register("amount", { valueAsNumber: true })}
              />
            </InputGroup>

            {errors.amount && (
              <span className="text-xs text-danger">
                {errors.amount.message}
              </span>
            )}
          </InputGroupControl>
        </div>

        <InputGroupControl className="flex-1">
          <Label>Categoria</Label>

          <InputGroup>
            <Select value={category} onValueChange={setCategory}>
              <InputGroupSelectTrigger>
                <SelectValue placeholder="Selecione" />
              </InputGroupSelectTrigger>

              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </InputGroup>

          {emptyCategory && (
            <span className="text-xs text-danger">Campo obrigatório</span>
          )}
        </InputGroupControl>

        <Button variant="default" disabled={loading} className="mt-2">
          Salvar
          {loading && <Loader className="ml-2 h-4 w-4 animate-spin" />}
        </Button>
      </form>
    </DialogContent>
  );
};
