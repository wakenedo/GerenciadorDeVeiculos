import React, { useState } from "react";
import { Vehicle } from "../../../context/VehicleContext";

interface VehicleFormProps {
  vehicle?: Vehicle; // If editing, we get an existing vehicle
  onSubmit: (vehicle: Omit<Vehicle, "id">) => void; // Submit without requiring ID
  onCancel: () => void;
}

const VehicleForm: React.FC<VehicleFormProps> = ({
  vehicle,
  onSubmit,
  onCancel,
}) => {
  const [formData, setFormData] = useState<Omit<Vehicle, "id">>(
    vehicle || {
      brand: "",
      model: "",
      year: new Date().getFullYear(),
      plate: "",
      availability: true,
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : type === "number"
          ? Number(value)
          : value,
    }));
  };
  console.log("formData", formData);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(formData);
      }}
      className="flex flex-col gap-2 p-4 rounded-lg bg-gray-50 shadow-md"
    >
      <input
        className="border p-2 rounded"
        type="text"
        name="brand"
        value={formData.brand}
        onChange={handleChange}
        placeholder="Marca"
        required
      />
      <input
        className="border p-2 rounded"
        type="text"
        name="model"
        value={formData.model}
        onChange={handleChange}
        placeholder="Modelo"
        required
      />
      <input
        className="border p-2 rounded"
        type="number"
        name="year"
        value={formData.year}
        onChange={handleChange}
        placeholder="Ano"
        required
      />
      <input
        className="border p-2 rounded"
        type="text"
        name="plate"
        value={formData.plate}
        onChange={handleChange}
        placeholder="Placa"
        required
      />

      <button
        type="submit"
        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
      >
        Salvar
      </button>
      <button
        type="button"
        onClick={onCancel}
        className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition"
      >
        Cancelar
      </button>
    </form>
  );
};

export default VehicleForm;
