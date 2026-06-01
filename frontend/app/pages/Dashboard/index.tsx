import { Cards } from "./components/Cards";
import { Categories } from "./components/Categories";
import { RecentTransactions } from "./components/RecentTransactions";

export const Dashboard = () => {
  return (
    <div className="w-full flex flex-col gap-6">
      <Cards />

      <div className="grid grid-cols-3 gap-6">
        <RecentTransactions />
        <Categories />
      </div>
    </div>
  );
};
