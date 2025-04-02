import { createContext, useContext, useEffect, useState } from "react";
import api from "../../api/api";
import { toast } from "react-toastify";
import { ApiError } from "../../hooks/types/default";

// Vehicle interface
export interface Vehicle {
  id: number;
  brand: string;
  model: string;
  year: number;
  plate: string;
  availability: boolean;
}

// API response structure
interface Veiculo {
  id: number;
  marca: string;
  modelo: string;
  ano: number;
  placa: string;
  disponibilidade: boolean;
}

// Context type definition
interface VehicleContextType {
  vehicles: Vehicle[];
  loading: boolean;
  error: ApiError | null;
  fetchVehicles: () => Promise<void>;
  addVehicle: (vehicle: Omit<Vehicle, "id">) => Promise<void>;
  deleteVehicle: (id: number) => Promise<void>;
  updateVehicle: (
    id: number,
    updatedVehicle: Omit<Vehicle, "id">
  ) => Promise<void>;
  updateVehicleAvailability: (
    id: number,
    availability: boolean
  ) => Promise<void>;
}

const VehicleContext = createContext<VehicleContextType | undefined>(undefined);

// Vehicle Provider component
export const VehicleProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<ApiError | null>(null);

  // Fetch vehicles from API
  const fetchVehicles = async () => {
    setLoading(true);
    try {
      const response = await api.get("/veiculos");
      const mappedVehicles = response.data.map((vehicle: Veiculo) => ({
        id: vehicle.id,
        brand: vehicle.marca,
        model: vehicle.modelo,
        year: vehicle.ano,
        plate: vehicle.placa,
        availability: Boolean(vehicle.disponibilidade),
      }));
      setVehicles(mappedVehicles);
    } catch (error) {
      toast.error(
        `❌ Erro ao buscar veículos: ${error || "Servidor fora do ar"}`
      );
      setError({ message: "Erro ao buscar veículos.", error });
    } finally {
      setLoading(false);
    }
  };

  // Add a new vehicle
  const addVehicle = async (vehicle: Omit<Vehicle, "id">) => {
    try {
      const response = await api.post("/veiculos", vehicle);
      const newVehicle = response.data;

      toast.success("🚗 Veículo adicionado com sucesso!");

      // ✅ Update state immediately without refetching everything
      setVehicles((prevVehicles) => [
        ...prevVehicles,
        {
          id: newVehicle.id,
          brand: newVehicle.marca,
          model: newVehicle.modelo,
          year: newVehicle.ano,
          plate: newVehicle.placa,
          availability: Boolean(newVehicle.disponibilidade),
        },
      ]);
      fetchVehicles(); // Refetch to ensure data consistency
    } catch (error) {
      toast.error("❌ Erro ao adicionar veículo.");
      setError({ message: "Erro ao adicionar veículo.", error });
    }
  };

  // Delete a vehicle
  const deleteVehicle = async (id: number) => {
    try {
      await api.delete(`/veiculos/${id}`);
      toast.success("🗑️ Veículo removido com sucesso!");
      setVehicles((prevVehicles) => prevVehicles.filter((v) => v.id !== id));
    } catch (error) {
      toast.error("❌ Erro ao remover veículo.");
      setError({
        message: "Não é possível remover veículos registrados em locações.",
        error,
      });
    }
  };

  // Update vehicle details
  const updateVehicle = async (
    id: number,
    updatedVehicle: Omit<Vehicle, "id">
  ) => {
    try {
      await api.put(`/veiculos/${id}`, updatedVehicle);
      toast.success("✅ Veículo atualizado com sucesso!");
      setVehicles((prevVehicles) =>
        prevVehicles.map((v) => (v.id === id ? { ...v, ...updatedVehicle } : v))
      );
    } catch (error) {
      toast.error("❌ Erro ao atualizar veículo.");
      setError({ message: "Erro ao atualizar veículo.", error });
    }
  };

  // Update vehicle availability
  const updateVehicleAvailability = async (
    id: number,
    availability: boolean
  ) => {
    try {
      console.log(`🔄 Updating availability for vehicle ${id}:`, availability);

      await api.patch(`/veiculos/${id}/disponibilidade`, { availability });

      setVehicles((prevVehicles) =>
        prevVehicles.map((v) => (v.id === id ? { ...v, availability } : v))
      );
    } catch (error) {
      toast.error("❌ Erro ao atualizar disponibilidade.");
      setError({ message: "Erro ao atualizar disponibilidade.", error });
    }
  };

  // Load vehicles when the app starts
  useEffect(() => {
    fetchVehicles();
  }, []);

  return (
    <VehicleContext.Provider
      value={{
        vehicles,
        loading,
        error,
        fetchVehicles,
        addVehicle,
        deleteVehicle,
        updateVehicle,
        updateVehicleAvailability,
      }}
    >
      {children}
    </VehicleContext.Provider>
  );
};

// Hook to use the vehicle context
export const useVehicles = () => {
  const context = useContext(VehicleContext);
  if (!context) {
    throw new Error("useVehicles must be used within a VehicleProvider");
  }
  return context;
};
