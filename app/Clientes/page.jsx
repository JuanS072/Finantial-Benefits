'use client';
import { useState, useEffect } from "react";
import NavBar from "@/components/NavBar";
import Link from "next/link";
import axios from "axios";
import useAuthRedirect from "../hooks/useAuthRedirect";

const Clientes = () => {
  useAuthRedirect();
  const [clientes, setClientes] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [nuevoCliente, setNuevoCliente] = useState({
    name: "",
    apellido: "",
    dniFrente: "",
    dniAtras: "",
    dni: "",
    wsp: "",
    estado: "En deuda",
  });

  useEffect(() => {
    axios.get(`https://finantial-benefits-90a7e267027b.herokuapp.com/Clientes`)
      .then(res => setClientes(res.data))
      .catch(err => console.error("Error al obtener clientes:", err));
  }, []);

  const agregarCliente = async () => {
    try {
      const res = await axios.post(`https://finantial-benefits-90a7e267027b.herokuapp.com/Clientes/Crear`, nuevoCliente);
      setClientes((prev) => [...prev, res.data]);
      setNuevoCliente({
        name: "",
        apellido: "",
        dniFrente: "",
        dniAtras: "",
        dni: "",
        wsp: "",
        estado: "En deuda",
      });
      setMostrarFormulario(false);
    } catch (error) {
      console.error("Error al agregar cliente:", error);
    }
  };

  const clientesFiltrados = clientes.filter((cliente) =>
    cliente.name?.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <div className="max-w-7xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Listado de Clientes</h1>

        <div className="mb-4 flex flex-col sm:flex-row justify-between gap-4 items-center">
          <input
            type="text"
            placeholder="Buscar por nombre..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="w-full sm:w-1/2 px-4 py-2 border rounded-md shadow-sm"
          />

          <button
            className="bg-blue-600 text-white px-6 py-2 rounded-md w-full sm:w-auto hover:bg-blue-700 transition-colors"
            onClick={() => setMostrarFormulario(true)}
          >
            Agregar Cliente
          </button>
        </div>

        {mostrarFormulario && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-50 z-50 flex justify-center items-center p-4">
            <div className="bg-white p-6 rounded-md w-full sm:w-96">
              <h2 className="text-xl font-semibold mb-4">Nuevo Cliente</h2>
              <div className="space-y-4">
                <input
                  className="w-full border px-3 py-2 rounded-md"
                  placeholder="Nombre"
                  value={nuevoCliente.name}
                  onChange={(e) =>
                    setNuevoCliente({ ...nuevoCliente, name: e.target.value })
                  }
                />
                <input
                  className="w-full border px-3 py-2 rounded-md"
                  placeholder="Apellido"
                  value={nuevoCliente.apellido}
                  onChange={(e) =>
                    setNuevoCliente({ ...nuevoCliente, apellido: e.target.value })
                  }
                />
                <div className="flex flex-col sm:flex-row gap-4">
                  <input
                    type="file"
                    className="w-full sm:w-1/2 border px-3 py-2 rounded-md"
                    onChange={(e) =>
                      setNuevoCliente({
                        ...nuevoCliente,
                        dniFrente: e.target.files?.[0]?.name ?? "",
                      })
                    }
                  />
                  <input
                    type="file"
                    className="w-full sm:w-1/2 border px-3 py-2 rounded-md"
                    onChange={(e) =>
                      setNuevoCliente({
                        ...nuevoCliente,
                        dniAtras: e.target.files?.[0]?.name ?? "",
                      })
                    }
                  />
                </div>
                <input
                  className="w-full border px-3 py-2 rounded-md"
                  placeholder="Número de DNI"
                  value={nuevoCliente.dni}
                  onChange={(e) =>
                    setNuevoCliente({ ...nuevoCliente, dni: e.target.value })
                  }
                />
                <input
                  className="w-full border px-3 py-2 rounded-md"
                  placeholder="Número de WhatsApp"
                  value={nuevoCliente.wsp}
                  onChange={(e) =>
                    setNuevoCliente({ ...nuevoCliente, wsp: e.target.value })
                  }
                />
              </div>
              <div className="mt-4 flex justify-end gap-4">
                <button
                  className="bg-gray-300 text-black px-4 py-2 rounded-md"
                  onClick={() => setMostrarFormulario(false)}
                >
                  Cancelar
                </button>
                <button
                  className="bg-blue-600 text-white px-4 py-2 rounded-md"
                  onClick={agregarCliente}
                >
                  Guardar
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="overflow-x-auto mt-6">
          <table className="min-w-full bg-white shadow-md rounded-md table-auto">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left py-2 px-4">Nombre</th>
                <th className="text-left py-2 px-4">Apellido</th>
                <th className="text-left py-2 px-4">Número de DNI</th>
                <th className="text-left py-2 px-4">WhatsApp</th>
                <th className="text-left py-2 px-4">Estado</th>
              </tr>
            </thead>
            <tbody>
              {clientesFiltrados.map((cliente) => (
                <tr key={cliente.id} className="border-t hover:bg-gray-50 transition-colors">
                  <Link href={`/home/${cliente.dni}`} className="contents">
                    <td className="py-2 px-4 cursor-pointer">{cliente.name}</td>
                  </Link>
                  <td className="py-2 px-4">{cliente.apellido}</td>
                  <td className="py-2 px-4">{cliente.dni}</td>
                  <td className="py-2 px-4">{cliente.wsp}</td>
                  <td className="py-2 px-4">
                    <span
                      className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
                        cliente.estado === "Pago"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {cliente.estado}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {clientesFiltrados.length === 0 && (
            <p className="text-center py-6 text-gray-500">No se encontraron clientes.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Clientes;
