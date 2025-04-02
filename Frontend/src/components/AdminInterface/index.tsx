import Customers from "../Customers";
import Rentals from "../Rentals";
import Vehicles from "../Vehicles";
import StatsDashboard from "./StatsDashboard";

const AdminInterface = () => {
  return (
    <div className="p-6 space-y-6">
      {/* Admin Interface */}
      <div className="bg-gray-100 p-6 space-y-6 rounded-xl shadow-lg">
        <h1 className="text-left text-2xl font-light text-gray-800">
          Admin Interface
        </h1>
        <StatsDashboard />
        <Vehicles />
        <Customers />
        <Rentals />
      </div>
    </div>
  );
};
export default AdminInterface;
