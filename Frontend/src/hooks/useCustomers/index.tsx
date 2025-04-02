import { useEffect, useState } from "react";
import api from "../../api/api";
import { ApiError } from "../types/default";

interface Customer {
  id: number;
  name: string;
  contact: string;
}

interface Cliente {
  id: number;
  nome: string; // API uses "nome", map to "name"
  contato: string; // API uses "contato", map to "contact"
}

const useCustomers = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<ApiError | null>(null);

  // Função para buscar clientes do backend
  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const response = await api.get("/clientes");
      const mappedCustomers = response.data.map((c: Cliente) => ({
        id: c.id,
        name: c.nome,
        contact: c.contato,
      }));
      setCustomers(mappedCustomers);
    } catch (error) {
      setError({ message: "Erro ao buscar clientes.", error });
    } finally {
      setLoading(false);
    }
  };

  // Carregar clientes ao montar o componente
  useEffect(() => {
    fetchCustomers();
  }, []);

  // Adicionar cliente e recarregar lista
  const addCustomer = async (customer: Omit<Customer, "id">) => {
    try {
      await api.post("/clientes", {
        nome: customer.name,
        contato: customer.contact,
      });
      await fetchCustomers(); // 🔄 Atualiza a lista para garantir que os dados estejam corretos
    } catch (error) {
      setError({
        message: "Não é possivel remover Clientes registrados em Locações..",
        error,
      });
    }
  };

  // Remover cliente e recarregar lista
  const deleteCustomer = async (id: number) => {
    try {
      await api.delete(`/clientes/${id}`);
      await fetchCustomers(); // 🔄 Atualiza a lista para refletir a remoção no backend
    } catch (error) {
      setError({ message: "Erro ao deletar Cliente.", error });
    }
  };

  return {
    customers,
    loading,
    error,
    addCustomer,
    deleteCustomer,
    fetchCustomers,
  };
};

export default useCustomers;
