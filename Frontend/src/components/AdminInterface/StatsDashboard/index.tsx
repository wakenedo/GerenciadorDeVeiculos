import React, { useEffect, useState } from "react";

interface StatsData {
  totalUsers: number;
  totalVehicles: number;
  availableVehicles: number;
  activeRentals: number;
  completedRentals: number;
  avgRentalDuration: number;
  mostRentedVehicle?: { vehicle_id: number; rental_count: number } | null;
}

const StatsDashboard: React.FC = () => {
  const [stats, setStats] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:8081/stats")
      .then((res) => res.json())
      .then((data) => {
        setStats(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erro ao buscar estatísticas:", err);
        setError("Erro ao carregar estatísticas.");
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Carregando estatísticas...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="bg-slate-200 p-6 rounded-xl shadow-lg mx-2 mt-2 w-full">
      <h1 className="text-2xl font-bold text-slate-600 text-left">
        Estatísticas e Métricas
      </h1>
      <div className="mt-4 grid grid-cols-2 gap-4">
        <StatCard title="Usuários cadastrados" value={stats?.totalUsers} />
        <StatCard title="Veículos cadastrados" value={stats?.totalVehicles} />
        <StatCard
          title="Veículos disponíveis"
          value={stats?.availableVehicles}
        />
        <StatCard title="Aluguéis em andamento" value={stats?.activeRentals} />
        <StatCard title="Aluguéis concluídos" value={stats?.completedRentals} />
        <StatCard
          title="Duração média dos aluguéis"
          value={`${stats?.avgRentalDuration} dias`}
        />
        {stats?.mostRentedVehicle && (
          <StatCard
            title="Veículo mais alugado"
            value={`ID ${stats.mostRentedVehicle.vehicle_id} - ${stats.mostRentedVehicle.rental_count} vezes`}
          />
        )}
      </div>
    </div>
  );
};

const StatCard: React.FC<{
  title: string;
  value: string | number | undefined;
}> = ({ title, value }) => (
  <div className="bg-white p-4 rounded-lg shadow-md">
    <h2 className="text-lg font-semibold text-gray-700">{title}</h2>
    <p className="text-2xl font-bold text-blue-600">{value ?? "N/A"}</p>
  </div>
);

export default StatsDashboard;
