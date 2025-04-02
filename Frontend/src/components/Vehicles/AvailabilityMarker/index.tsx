import { FC } from "react";
import { Vehicle } from "../../../context/VehicleContext";

interface AvailabilityMarkerProps {
  vehicle: Vehicle;
  onAvailabilityChange: (id: number, availability: boolean) => void;
}

const AvailabilityMarker: FC<AvailabilityMarkerProps> = ({
  vehicle,
  onAvailabilityChange,
}) => {
  return (
    <div
      className="flex text-sm font-light space-x-2 items-center cursor-pointer"
      onClick={() => onAvailabilityChange(vehicle.id, !vehicle.availability)}
    >
      <span>{vehicle.availability ? "Disponível" : "Indisponível"}</span>
      <div
        className={`w-3 h-3 rounded-full ${
          vehicle.availability ? "bg-lime-500" : "bg-red-500"
        }`}
      />
    </div>
  );
};

export default AvailabilityMarker;
