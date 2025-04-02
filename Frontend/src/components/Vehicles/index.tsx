import React, { useState } from "react";
import VehicleForm from "./EditForm";
import AvailabilityMarker from "./AvailabilityMarker";
import { useVehicles, Vehicle } from "../../context/VehicleContext";
import SearchBar from "../SearchBar";

const Vehicles = () => {
  const {
    vehicles,
    loading,
    error,
    addVehicle,
    deleteVehicle,
    updateVehicle,
    updateVehicleAvailability,
  } = useVehicles();

  const [editVehicle, setEditVehicle] = useState<Vehicle | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [newVehicle, setNewVehicle] = useState({
    brand: "",
    model: "",
    year: "",
    plate: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formattedVehicle = {
      ...newVehicle,
      year: Number(newVehicle.year),
      availability: true,
    };

    await addVehicle(formattedVehicle);
    setNewVehicle({ brand: "", model: "", year: "", plate: "" });
  };

  const handleSave = async (vehicleData: Omit<Vehicle, "id">) => {
    if (editVehicle) {
      await updateVehicle(editVehicle.id, vehicleData);
    } else {
      await addVehicle(vehicleData);
    }

    setEditVehicle(null);
    setIsOpen(false);
  };

  const filteredVehicles = vehicles.filter((vehicle) =>
    ["brand", "model", "year", "plate"].some((key) => {
      const value = vehicle[key as keyof Vehicle];
      return value
        ? value.toString().toLowerCase().includes(searchQuery.toLowerCase())
        : false;
    })
  );

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Veículos</h2>

      {/* Form to Add New Vehicle */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          className="border p-2 rounded"
          type="text"
          placeholder="Marca"
          value={newVehicle.brand}
          onChange={(e) =>
            setNewVehicle({ ...newVehicle, brand: e.target.value })
          }
          required
        />
        <input
          className="border p-2 rounded"
          type="text"
          placeholder="Modelo"
          value={newVehicle.model}
          onChange={(e) =>
            setNewVehicle({ ...newVehicle, model: e.target.value })
          }
          required
        />
        <input
          className="border p-2 rounded"
          type="number"
          placeholder="Ano"
          value={newVehicle.year}
          onChange={(e) =>
            setNewVehicle({ ...newVehicle, year: e.target.value })
          }
          required
        />
        <input
          className="border p-2 rounded"
          type="text"
          placeholder="Placa"
          value={newVehicle.plate}
          onChange={(e) =>
            setNewVehicle({ ...newVehicle, plate: e.target.value })
          }
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700 transition"
        >
          Adicionar Veículo
        </button>
      </form>

      {loading && <p className="text-gray-500 mt-2">Carregando veículos...</p>}
      {error && <p className="text-red-500 mt-2">Erro: {error.message}</p>}

      {/* Vehicles List */}
      <span className="text-left flex text-xs font-light mt-4">Buscar:</span>
      <SearchBar onSearch={setSearchQuery} />
      <div>
        <span className="text-left flex text-xs font-light mt-4">
          Registros:
        </span>
        <ul className="mt-2 space-y-2  p-4 rounded-md bg-slate-100 ">
          {filteredVehicles.length === 0 ? (
            <p className="text-gray-500  ">Nenhum veículo encontrado.</p>
          ) : (
            filteredVehicles.map((vehicle) => (
              <li
                key={vehicle.id}
                className=" p-3 rounded-lg bg-white shadow-sm flex justify-between items-center"
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

                  <AvailabilityMarker
                    vehicle={vehicle}
                    onAvailabilityChange={updateVehicleAvailability}
                  />
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => {
                      setEditVehicle(vehicle);
                      setIsOpen(true);
                    }}
                    className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-700 transition"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => deleteVehicle(vehicle.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-700 transition"
                  >
                    ❌
                  </button>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>

      {/* ✅ Modal for Editing Vehicle */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-semibold mb-4">Editar Veículo</h3>
            <VehicleForm
              vehicle={editVehicle || undefined}
              onSubmit={handleSave}
              onCancel={() => setIsOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Vehicles;
