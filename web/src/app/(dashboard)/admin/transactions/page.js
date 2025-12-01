import TransactionsPage from "@/components/user-page/transactions";

export default function Home() {
  return (
    <div className="flex flex-col space-y-9">
      <h1 className="font-bold text-2xl leading-4">Transaction</h1>
      <TransactionsPage all={true} />
    </div>
  );
}
