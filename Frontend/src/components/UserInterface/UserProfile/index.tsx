import { FC } from "react";
import { User } from "..";

interface UserProfileProps {
  user: User;
  setIsEditing: (isEditing: boolean) => void;
}

const UserProfile: FC<UserProfileProps> = ({ user, setIsEditing }) => {
  return (
    <div className="mt-4 bg-white p-4 rounded-lg shadow w-fit">
      <span className="text-left flex text-lg font-light text-slate-600">
        Dados do Usuário
      </span>
      <div className="mt-2 p-4 space-y-2 rounded-md bg-slate-200 min-h-62 max-h-62 overflow-y-auto ">
        <div className="text-left flex space-y-2 flex-col p-3 rounded-lg bg-white shadow-sm justify-between ">
          <p className="p-2 space-x-2 rounded-md bg-slate-100 overflow-x-auto">
            <strong className="text-xs">Nome:</strong> {user.name}
          </p>
          <p className="p-2 space-x-2 rounded-md bg-slate-100 overflow-x-auto">
            <strong className="text-xs">Email:</strong> {user.email}
          </p>
          <button
            onClick={() => setIsEditing(true)}
            className="mt-2 bg-yellow-500 text-white p-2 rounded hover:bg-yellow-700 min-w-md"
          >
            Editar
          </button>
        </div>
      </div>
    </div>
  );
};
export default UserProfile;
