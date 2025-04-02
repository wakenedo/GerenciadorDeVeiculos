import { FC } from "react";
import { User } from "..";

interface ActiveRentalsProps {
  user: User;
}
const ActiveRentals: FC<ActiveRentalsProps> = ({ user }) => {
  return (
    <div className="mt-4 bg-white p-4 rounded-lg shadow w-full">
      <span className="text-left flex text-lg font-light text-slate-600">
        Locações Ativas
      </span>
      <div className="text-left lg:flex flex-col gap-2 rounded-sm w-full">
        {user.rentals.some((r) => r.isActive) ? (
          <ul className="mt-2 p-4 space-y-2 rounded-md bg-slate-200 min-h-62 max-h-62 overflow-y-auto ">
            {user.rentals
              .filter((r) => r.isActive)
              .map((rental) => (
                <li
                  key={rental.id}
                  className="p-3 rounded-lg bg-white shadow-sm flex justify-between items-center"
                >
                  <p className="text-xs">
                    <strong>Veículo:</strong> {rental.vehicle}
                  </p>
                  <p className="text-xs">
                    <strong>Início:</strong> {rental.start_date}
                  </p>
                  <p className="text-xs">
                    <strong>Fim:</strong> {rental.end_date}
                  </p>
                  <div>
                    <div className={`w-3 h-3 rounded-full bg-lime-500`} />
                  </div>
                </li>
              ))}
          </ul>
        ) : (
          <p className="text-gray-500">Nenhuma locação ativa.</p>
        )}
      </div>
    </div>
  );
};
export default ActiveRentals;
