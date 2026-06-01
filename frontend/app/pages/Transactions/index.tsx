import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Filters } from "./Filters";
import { Table } from "./Table";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { CreateEditTransaction } from "@/components/create-edit-transaction";
import { useState } from "react";

export const Transactions = () => {
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <div className="w-full flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-0.5">
          <h2 className="font-bold text-2xl text-gray-800">Transações</h2>
          <p className="text-base text-gray-600">
            Gerencie todas as suas transações financeiras
          </p>
        </div>

        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogTrigger asChild>
            <Button size="sm">
              <Plus />
              Nova transação
            </Button>
          </DialogTrigger>

          <CreateEditTransaction
            isOpen={openDialog}
            onOpenChange={setOpenDialog}
          />
        </Dialog>
      </div>

      <Filters />

      <Table />
    </div>
  );
};
