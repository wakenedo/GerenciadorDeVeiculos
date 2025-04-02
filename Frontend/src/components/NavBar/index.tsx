// src/components/Navbar.tsx
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-500 p-4 text-white flex gap-4">
      <Link to="/" className="hover:underline">
        🏠 Home
      </Link>
      <Link to="/Admin" className="hover:underline">
        🔧 Admin
      </Link>
      <Link to="/User" className="hover:underline">
        👤 User
      </Link>
    </nav>
  );
};

export default Navbar;
