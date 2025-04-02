import { useEffect, useState } from "react";
import api from "../../api/api";
import { ApiError } from "../types/default";

import { toast } from "react-toastify";
import { useVehicles } from "../../context/VehicleContext";

interface Rental {
  id: number;
  vehicle_id: number;
  customer_id: number;
  start_date: string;
  end_date: string;
  price: number;
}

interface Locacao {
  id: number;
  veiculo_id: number; // API uses "veiculo_id", map to "vehicle_id"
  cliente_id: number; // API uses "cliente_id", map to "customer_id"
  data_inicio: string; // API uses "data_inicio", map to "start_date"
  data_fim: string; // API uses "data_fim", map to "end_date"
  valor: number; // API uses "valor", map to "price"
}

const useRentals = () => {
  const [rentals, setRentals] = useState<Rental[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<ApiError | null>(null);
  const { updateVehicleAvailability, vehicles } = useVehicles(); // Importa a função de atualização de veículo

  // Função para buscar locações do backend
  const fetchRentals = async () => {
    setLoading(true);
    try {
      const response = await api.get("/locacoes");
      const mappedRentals = response.data.map((r: Locacao) => ({
        id: r.id,
        vehicle_id: r.veiculo_id,
        customer_id: r.cliente_id,
        start_date: r.data_inicio,
        end_date: r.data_fim,
        price: r.valor,
      }));
      setRentals(mappedRentals);
    } catch (error) {
      setError({ message: "Erro ao buscar locações.", error });
    } finally {
      setLoading(false);
    }
  };

  // Carregar locações ao montar o componente
  useEffect(() => {
    fetchRentals();
  }, []);

  // Adicionar locação e recarregar lista
  const addRental = async (rental: Omit<Rental, "id">) => {
    try {
      console.log("🚀 Adding rental:", rental);

      const response = await api.post("/locacoes", {
        veiculo_id: rental.vehicle_id,
        cliente_id: rental.customer_id,
        data_inicio: rental.start_date,
        data_fim: rental.end_date,
        valor: rental.price,
      });

      const newRental = {
        id: response.data.id, // Get correct ID from backend response
        ...rental,
      };

      console.log("🔄 Before updating availability:", vehicles);

      // ✅ Instantly update the vehicle's availability
      await updateVehicleAvailability(rental.vehicle_id, false);

      console.log("✅ After updating availability:", vehicles);

      // ✅ Update rentals state with the correct ID
      setRentals((prevRentals) => [...prevRentals, newRental]);

      toast.success("🚗 Locação registrada com sucesso!");
    } catch (error) {
      toast.error("❌ Erro ao adicionar locação.");
      setError({ message: "Erro ao adicionar locação.", error });
    }
  };

  // Remover locação e recarregar lista
  const deleteRental = async (id: number) => {
    try {
      console.log(`❌ Deleting rental ID: ${id}`);

      const rental = rentals.find((r) => r.id === id);
      if (!rental) {
        console.error("🚨 Rental not found!");
        setError({ message: "Erro: Locação não encontrada.", error: null });
        return;
      }

      await api.delete(`/locacoes/${id}`);

      console.log("🔄 Before updating availability:", vehicles);

      // ✅ Update vehicle availability
      await updateVehicleAvailability(rental.vehicle_id, true);

      console.log("✅ After updating availability:", vehicles);

      // ✅ Also update rentals state instantly
      setRentals((prevRentals) => prevRentals.filter((r) => r.id !== id));

      toast.success("Locação removida! Veículo agora está disponível.");
    } catch (error) {
      console.error("❌ Error deleting rental:", error);
      toast.error("❌ Erro ao deletar locação.");
      setError({ message: "Erro ao deletar locação.", error });
    }
  };

  return { rentals, loading, error, addRental, deleteRental, fetchRentals };
};

export default useRentals;
