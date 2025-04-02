import React, { useState } from "react";
import useRentals from "../../hooks/useRentals";

import useCustomers from "../../hooks/useCustomers";
import { useVehicles } from "../../context/VehicleContext";

export interface Rental {
  id: number;
  vehicle_id: number;
  customer_id: number;
  start_date: string;
  end_date: string;
  price: number;
}

const Rentals = () => {
  const { rentals, loading, error, addRental, deleteRental } = useRentals();
  const { vehicles, fetchVehicles, updateVehicleAvailability } = useVehicles(); // Pegamos fetchVehicles
  const { customers, fetchCustomers } = useCustomers(); // Pegamos fetchCustomers

  const [newRental, setNewRental] = useState({
    vehicle_id: "",
    customer_id: "",
    start_date: "",
    end_date: "",
    price: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const selectedVehicle = vehicles.find(
      (v) => v.id === Number(newRental.vehicle_id)
    );

    if (!selectedVehicle || !selectedVehicle.availability) {
      alert("Este veículo não está disponível para locação.");
      return;
    }

    await addRental({
      ...newRental,
      vehicle_id: Number(newRental.vehicle_id),
      customer_id: Number(newRental.customer_id),
      price: Number(newRental.price),
    });

    // Update vehicle availability to false
    await updateVehicleAvailability(Number(newRental.vehicle_id), false);
    setNewRental({
      vehicle_id: "",
      customer_id: "",
      start_date: "",
      end_date: "",
      price: "",
    });
  };

  console.log("newRental", newRental);
  return (
    <div className="bg-white shadow-lg rounded-xl p-6 mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Locações</h2>

      {loading && <p className="text-gray-500">Carregando locações...</p>}
      {error && <p className="text-red-500">Erro: {error.message}</p>}

      {/* Formulário */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <select
          className="border p-2 rounded-lg focus:ring focus:ring-blue-300"
          value={newRental.vehicle_id}
          onChange={(e) =>
            setNewRental({ ...newRental, vehicle_id: e.target.value })
          }
          onFocus={fetchVehicles}
          required
        >
          <option value="">Selecione um veículo</option>
          {vehicles.map((v) => (
            <option key={v.id} value={v.id}>
              {v.brand} {v.model} ({v.year})
            </option>
          ))}
        </select>

        <select
          className="border p-2 rounded-lg focus:ring focus:ring-blue-300"
          value={newRental.customer_id}
          onChange={(e) =>
            setNewRental({ ...newRental, customer_id: e.target.value })
          }
          onFocus={fetchCustomers}
          required
        >
          <option value="">Selecione um cliente</option>
          {customers.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        <input
          className="border p-2 rounded-lg focus:ring focus:ring-blue-300"
          type="date"
          value={newRental.start_date}
          onChange={(e) =>
            setNewRental({ ...newRental, start_date: e.target.value })
          }
          required
        />

        <input
          className="border p-2 rounded-lg focus:ring focus:ring-blue-300"
          type="date"
          value={newRental.end_date}
          onChange={(e) =>
            setNewRental({ ...newRental, end_date: e.target.value })
          }
          required
        />

        <input
          className="border p-2 rounded-lg focus:ring focus:ring-blue-300"
          type="number"
          placeholder="Valor"
          value={newRental.price}
          onChange={(e) =>
            setNewRental({ ...newRental, price: e.target.value })
          }
          required
        />

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-700 transition w-full"
        >
          Registrar Locação
        </button>
      </form>

      {/* Lista de Locações */}
      <ul className="mt-4 space-y-3">
        {rentals.length === 0 && (
          <p className="text-gray-500">Nenhuma locação encontrada.</p>
        )}
        {rentals.map((rental) => (
          <li
            key={rental.id}
            className="border p-3 rounded-lg bg-gray-100 flex justify-between items-center"
          >
            <span className="text-gray-800">
              🚗 {rental.vehicle_id} | 👤 {rental.customer_id} | 📅{" "}
              {rental.start_date} - {rental.end_date} | 💰 R$ {rental.price}
            </span>
            <button
              onClick={() => deleteRental(rental.id)}
              className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-700 transition"
            >
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Rentals;
