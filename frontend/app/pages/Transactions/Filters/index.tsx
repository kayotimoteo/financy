import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupControl,
  InputGroupInput,
  InputGroupSelectTrigger,
} from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { LIST_CATEGORIES } from "@/lib/graphql/queries/Category";
import type { Category, TransactionType } from "@/types/types";
import { useQuery } from "@apollo/client/react";
import { format } from "date-fns";
import { ChevronDownIcon, Search } from "lucide-react";
import { useTransactionsStore } from "@/store/transactions/transactions";

export const Filters = () => {
  const { filters, setSearch, setType, setCategoryId, setPeriod } =
    useTransactionsStore();

  const { data } = useQuery<{
    listAllCategories: Category[];
  }>(LIST_CATEGORIES);

  const categories = data?.listAllCategories || [];

  return (
    <Card className="flex flex-row items-center gap-4 p-6">
      <InputGroupControl className="flex-1">
        <Label>Buscar</Label>

        <InputGroup>
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>

          <InputGroupInput
            id="search"
            type="search"
            placeholder="Buscar por descrição"
            value={filters.search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </InputGroup>
      </InputGroupControl>

      <InputGroupControl className="flex-1">
        <Label>Tipo</Label>

        <InputGroup>
          <Select
            value={filters.type}
            onValueChange={(value) => setType(value as TransactionType)}
          >
            <InputGroupSelectTrigger>
              <SelectValue placeholder="Selecione um tipo" />
            </InputGroupSelectTrigger>

            <SelectContent>
              <SelectItem value="all">Todas</SelectItem>
              <SelectItem value="income">Entrada</SelectItem>
              <SelectItem value="expense">Saída</SelectItem>
            </SelectContent>
          </Select>
        </InputGroup>
      </InputGroupControl>

      <InputGroupControl className="flex-1">
        <Label>Categoria</Label>

        <InputGroup>
          <Select
            value={filters.categoryId}
            onValueChange={(value) => setCategoryId(value)}
          >
            <InputGroupSelectTrigger>
              <SelectValue placeholder="Selecione uma categoria" />
            </InputGroupSelectTrigger>

            <SelectContent>
              <SelectItem value="all">Todas</SelectItem>

              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </InputGroup>
      </InputGroupControl>

      <InputGroupControl className="flex-1">
        <Label htmlFor="period">Período</Label>

        <InputGroup className="border-0">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                data-empty={!filters.period}
                className="w-full data-[empty=true]:text-muted-foreground justify-between text-left font-normal hover:bg-white"
              >
                {filters.period ? (
                  format(filters.period.from!, "dd/MM/yyyy") +
                  " - " +
                  format(filters.period.to!, "dd/MM/yyyy")
                ) : (
                  <span className="text-gray-400">Selecione um período</span>
                )}
                <ChevronDownIcon />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="range"
                selected={filters.period}
                onSelect={(date) => setPeriod(date)}
                defaultMonth={filters.period?.from}
              />
            </PopoverContent>
          </Popover>
        </InputGroup>
      </InputGroupControl>
    </Card>
  );
};
