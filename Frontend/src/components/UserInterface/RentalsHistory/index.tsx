import { FC } from "react";
import { User } from "..";

interface RentalsHistoryProps {
  user: User;
}

const RentalsHistory: FC<RentalsHistoryProps> = ({ user }) => {
  return (
    <div className="mt-4 bg-white px-4 py-4 rounded-lg shadow">
      <span className="text-left flex text-lg font-light text-slate-600">
        Histórico de Locações
      </span>
      {user.rentals.some((r) => !r.isActive) ? (
        <ul className="mt-2 space-y-2 p-4 rounded-md bg-slate-200 min-h-62 max-h-62 overflow-y-auto">
          {user.rentals
            .filter((r) => !r.isActive)
            .map((rental) => (
              <li
                key={rental.id}
                className="p-3 rounded-lg bg-white shadow-sm flex justify-between items-center"
              >
                <p>
                  <strong>Veículo:</strong> {rental.vehicle}
                </p>
                <p>
                  <strong>Início:</strong> {rental.start_date}
                </p>
                <p>
                  <strong>Fim:</strong> {rental.end_date}
                </p>
              </li>
            ))}
        </ul>
      ) : (
        <p className="text-gray-500">Nenhuma locação encontrada.</p>
      )}
    </div>
  );
};
export default RentalsHistory;
