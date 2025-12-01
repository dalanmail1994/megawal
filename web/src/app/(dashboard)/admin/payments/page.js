import ContainerViewAll from "@/components/co/container-view-all";

export default function Home() {
  return (
    <div className="flex flex-col space-y-9">
      <h1 className="font-bold text-2xl leading-4">Payments Management</h1>
      <ContainerViewAll
        title = "Payments"
        subTitle = "List of all agency users payments"
      >
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="flex flex-col items-center space-y-4">
            <img src="/flags/ic-content.svg" className="w-[160px]" />
            <h2 className="font-semibold text-lg text-gray-400">No payments yet</h2>
            <span className="text-xs text-gray-400">All caught up!</span>
          </div>
        </div>
      </ContainerViewAll>
    </div>
  );
}
