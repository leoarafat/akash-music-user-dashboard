import ChartArea from "@/components/DashboardHome/ChartArea";
import EarnStatus from "@/components/DashboardHome/EarnStatus";
import PurchasedPackageList from "@/components/DashboardHome/PurchasedPackageList";

const DashboardHome = () => {
  return (
    <div>
      <EarnStatus />
      <ChartArea />
      <PurchasedPackageList />
    </div>
  );
};

export default DashboardHome;
