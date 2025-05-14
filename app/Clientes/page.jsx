'use client';
import { useState, useEffect } from "react";
import NavBar from "@/components/NavBar";
import Link from "next/link";

const Clientes = () => {
  const [clientes, setClientes] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [nuevoCliente, setNuevoCliente] = useState({
    nombre: "",
    apellido: "",
    dniFrente: "",
    dniAtras: "",
    dni: "",
    whatsapp: "",
    estado: "En deuda",
  });

  // Simulación de la carga de datos (puedes reemplazarla con una llamada a la API o similar)
  useEffect(() => {
    setClientes([
      {
        id: 1,
        nombre: "Juan",
        apellido: "Pérez",
        dniFrente: "dni-frente.jpg",
        dniAtras: "dni-atras.jpg",
        dni: "12345678",
        whatsapp: "123456789",
        estado: "En deuda",
      },
      {
        id: 2,
        nombre: "María",
        apellido: "López",
        dniFrente: "dni-frente2.jpg",
        dniAtras: "dni-atras2.jpg",
        dni: "87654321",
        whatsapp: "987654321",
        estado: "Pago",
      },
    ]);
  }, []); // Este hook solo se ejecuta en el cliente

  const agregarCliente = () => {
    const nuevo = { ...nuevoCliente, id: Date.now() };
    setClientes((prev) => [...prev, nuevo]);
    setNuevoCliente({
      nombre: "",
      apellido: "",
      dniFrente: "",
      dniAtras: "",
      dni: "",
      whatsapp: "",
      estado: "En deuda",
    });
    setMostrarFormulario(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <div className="max-w-7xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Listado de Clientes</h1>

        {/* Botón centrado y responsivo */}
        <div className="flex justify-center mb-6">
          <button
            className="bg-blue-600 text-white px-6 py-3 rounded-md w-full sm:w-auto hover:bg-blue-700 transition-colors"
            onClick={() => setMostrarFormulario(true)}
          >
            Agregar Cliente
          </button>
        </div>

        {mostrarFormulario && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-50 z-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-md w-full sm:w-96">
              <h2 className="text-xl font-semibold mb-4">Nuevo Cliente</h2>
              <div className="space-y-4">
                <input
                  className="w-full border px-3 py-2 rounded-md"
                  placeholder="Nombre"
                  value={nuevoCliente.nombre}
                  onChange={(e) =>
                    setNuevoCliente({ ...nuevoCliente, nombre: e.target.value })
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
                <div className="flex gap-4">
                  <input
                    type="file"
                    className="w-full sm:w-1/2 border px-3 py-2 rounded-md"
                    onChange={(e) =>
                      setNuevoCliente({
                        ...nuevoCliente,
                        dniFrente: e.target.files[0]?.name ?? nuevoCliente.dniFrente,
                      })
                    }
                  />
                  <input
                    type="file"
                    className="w-full sm:w-1/2 border px-3 py-2 rounded-md"
                    onChange={(e) =>
                      setNuevoCliente({
                        ...nuevoCliente,
                        dniAtras: e.target.files[0]?.name ?? nuevoCliente.dniAtras,
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
                  value={nuevoCliente.whatsapp}
                  onChange={(e) =>
                    setNuevoCliente({ ...nuevoCliente, whatsapp: e.target.value })
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
          <table className="min-w-full bg-white  shadow-md rounded-md table-auto">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left py-2 px-4">Nombre</th>
                <th className="text-left py-2 px-4">Apellido</th>
                <th className="text-left py-2 px-4">Número de DNI</th>
                <th className="text-left py-2 px-4">Número de WhatsApp</th>
                <th className="text-left py-2 px-4">Estado</th>
              </tr>
            </thead>
            <tbody>
              {clientes.map((cliente) => (
                  <tr key={cliente.id} className="border-t">
                    <Link href={`/home/${cliente.dni}`} key={cliente.dni}>
                    <td className="py-2 px-4">{cliente.nombre}</td>
                    </Link>
                    <td className="py-2 px-4">{cliente.apellido}</td>
                    <td className="py-2 px-4">{cliente.dni}</td>
                    <td className="py-2 px-4">{cliente.whatsapp}</td>
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
        </div>
      </div>
    </div>
  );
};

export default Clientes;
