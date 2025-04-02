import React, { useState } from "react";
import useCustomers from "../../hooks/useCustomers";

const Customers = () => {
  const { customers, loading, error, addCustomer, deleteCustomer } =
    useCustomers();
  const [newCustomer, setNewCustomer] = useState({ name: "", contact: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addCustomer(newCustomer);
    setNewCustomer({ name: "", contact: "" });
  };

  return (
    <div className="bg-white shadow-lg rounded-xl p-6  mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Clientes</h2>

      {loading && <p className="text-gray-500">Carregando clientes...</p>}
      {error && <p className="text-red-500">Erro: {error.message}</p>}

      {/* Formulário */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          className="border p-2 rounded-lg focus:ring focus:ring-blue-300"
          type="text"
          placeholder="Nome"
          value={newCustomer.name}
          onChange={(e) =>
            setNewCustomer({ ...newCustomer, name: e.target.value })
          }
          required
        />

        <input
          className="border p-2 rounded-lg focus:ring focus:ring-blue-300"
          type="text"
          placeholder="Contato"
          value={newCustomer.contact}
          onChange={(e) =>
            setNewCustomer({ ...newCustomer, contact: e.target.value })
          }
          required
        />

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-700 transition w-full"
        >
          Adicionar Cliente
        </button>
      </form>

      {/* Lista de Clientes */}
      <div>
        <span className="text-left flex text-xs font-light mt-4">
          Registros:
        </span>
        <ul className="mt-2 space-y-2 p-4 rounded-md bg-slate-200 min-h-62 max-h-62 overflow-y-auto">
          {customers.length === 0 && (
            <p className="text-gray-500">Nenhum cliente encontrado.</p>
          )}
          {customers.map((customer) => (
            <li
              key={customer.id}
              className="p-3 rounded-lg bg-white shadow-sm flex justify-between items-center"
            >
              <span className="text-gray-800">
                👤 {customer.name} | 📞 {customer.contact}
              </span>
              <button
                onClick={() => deleteCustomer(customer.id)}
                className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-700 transition"
              >
                ❌
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Customers;
