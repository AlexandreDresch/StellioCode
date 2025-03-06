import AdminDashboard from "@/components/dashboard/admin-dashboard";
import DevDashboard from "@/components/dashboard/dev-dashboard";
import Sidebar from "@/components/dashboard/sidebar";

interface DashboardProps {
  userRole: string;
}

export default function Dashboard({ userRole }: DashboardProps) {
  if (userRole !== "admin" && userRole !== "developer") {
    return <h1>Unauthorized Access</h1>;
  }

  return (
    <div>
      <Sidebar />
      {userRole === "admin" ? <AdminDashboard /> : <DevDashboard />}
    </div>
  );
}
