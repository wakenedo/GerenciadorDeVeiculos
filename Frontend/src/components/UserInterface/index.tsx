import React, { useState } from "react";
import { mockUser } from "./mocks/userMocks";
import RentalsHistory from "./RentalsHistory";
import ActiveRentals from "./ActiveRentals";
import UserForm from "./EditForm";
import { useVehicles } from "../../context/VehicleContext";
import SearchBar from "../SearchBar";
import UserProfile from "./UserProfile";

export interface Rental {
  id: number;
  vehicle: string;
  start_date: string;
  end_date: string;
  isActive: boolean;
}

export interface User {
  name: string;
  email: string;
  rentals: Rental[];
}

const UserInterface: React.FC = () => {
  const [user, setUser] = useState<User>(mockUser);
  const [isEditing, setIsEditing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch vehicles from backend
  const { vehicles, loading, error } = useVehicles();

  // Filtered vehicles based on search query
  const filteredVehicles = vehicles
    .filter((vehicle) => vehicle.availability === true) // Show only available vehicles
    .filter((vehicle) =>
      ["brand", "model", "year", "plate"].some((key) => {
        const value = vehicle[key as keyof typeof vehicle];
        return value
          ? value.toString().toLowerCase().includes(searchQuery.toLowerCase())
          : false;
      })
    );

  return (
    <div className="bg-gray-100 p-6 rounded-xl shadow-lg mt-2">
      <h1 className="text-left text-2xl font-light text-gray-800">
        Área do Cliente
      </h1>
      <div className="flex space-x-4">
        {/* User Information */}
        <UserProfile user={user} setIsEditing={setIsEditing} />

        {/* User Edit Form */}
        {isEditing && (
          <UserForm
            user={user}
            onSave={(updatedUser) => {
              setUser(updatedUser);
              setIsEditing(false);
            }}
            onCancel={() => setIsEditing(false)}
          />
        )}

        {/* Active Rentals */}
        <ActiveRentals user={user} />
      </div>

      {/* Vehicle Search & List */}
      <div className="mt-6 bg-white p-4 rounded-lg shadow">
        <span className="text-left flex text-lg font-light text-slate-600">
          Os veículos do momento estão aqui !
        </span>

        <span className="text-left flex text-xs font-light mt-4">Buscar:</span>
        <SearchBar onSearch={setSearchQuery} />
        <div>
          <span className="text-left flex text-lg font-light mt-4">
            Veículos Disponíveis
          </span>
          <ul className="mt-2 space-y-2 p-4 rounded-md bg-slate-200 min-h-62 max-h-62 overflow-y-auto">
            {loading ? (
              <p className="text-gray-500">Carregando veículos...</p>
            ) : error ? (
              <p className="text-red-500">Erro ao carregar veículos.</p>
            ) : filteredVehicles.length === 0 ? (
              <p className="text-gray-500">Nenhum veículo encontrado.</p>
            ) : (
              filteredVehicles.map((vehicle) => (
                <li
                  key={vehicle.id}
                  className="p-3 rounded-lg bg-white shadow-sm flex justify-between items-center"
                >
                  <div>
                    <span className="font-medium text-gray-800">
                      {vehicle.brand} {vehicle.model}
                    </span>
                    <span className="ml-4 text-gray-600">
                      Ano: {vehicle.year}
                    </span>
                    <span className="ml-4 text-gray-600">
                      Placa: {vehicle.plate}
                    </span>
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>

      {/* Rental History */}
      <RentalsHistory user={user} />
    </div>
  );
};

export default UserInterface;
