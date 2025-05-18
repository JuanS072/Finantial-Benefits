'use client';
import { useState, useMemo, useEffect } from "react";
import NavBar from "@/components/NavBar";
import useAuthRedirect from "../hooks/useAuthRedirect";

const Cuotas = () => {
  useAuthRedirect();
  const hoy = new Date().toISOString().slice(0, 7); // YYYY-MM
  const [filtroMes, setFiltroMes] = useState(hoy);
  const [cuotas, setCuotas] = useState([]);

  useEffect(() => {
    const fetchCuotas = async () => {
      try {
        const res = await fetch(`https://finantial-benefits-90a7e267027b.herokuapp.com/cuotas?mes=${filtroMes}`);
        const data = await res.json();
        setCuotas(data);
      } catch (error) {
        console.error("Error al traer cuotas:", error);
      }
    };

    fetchCuotas();
  }, [filtroMes]);

  const cuotasFiltradas = useMemo(() => {
    return cuotas?.filter(c => c.estado === "Pendiente");
  }, [cuotas]);

  const total = cuotasFiltradas.reduce((acc, c) => acc + Number(c.monto), 0);

  const marcarComoPagado = async (id) => {
    try {
      const res = await fetch(`https://finantial-benefits-90a7e267027b.herokuapp.com/cuotas/${id}/pagar`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ estado: "Pagado" })
      });

      if (res.ok) {
        setCuotas((prev) =>
          prev.map((c) =>
            c.id === id ? { ...c, estado: "Pagado" } : c
          )
        );
      } else {
        console.error("Error al marcar como pagado");
      }
    } catch (error) {
      console.error("Error en la petición:", error);
    }
  };

  return (
    <div className="bg-white min-h-screen">
      <NavBar />
      <div className="max-w-screen-xl mx-auto p-4">
        <h2 className="text-xl font-semibold mb-4 text-center">Cuotas Pendientes</h2>

        <div className="flex flex-col md:flex-row items-center justify-between mb-4 gap-2">
          <label className="font-medium">
            Filtrar por mes:
            <input
              type="month"
              value={filtroMes}
              onChange={(e) => setFiltroMes(e.target.value)}
              className="ml-2 border px-2 py-1 rounded"
            />
          </label>
          <p className="font-semibold text-green-600">
            Total a cobrar:{" "}
            {total.toLocaleString("es-AR", {
              style: "currency",
              currency: "ARS",
            })}
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border rounded shadow">
            <thead>
              <tr className="bg-gray-100 text-left text-sm">
                <th className="p-2">Cliente</th>
                <th className="p-2">DNI</th>
                <th className="p-2">Cuota Nº</th>
                <th className="p-2">Monto</th>
                <th className="p-2">Fecha de Pago</th>
                <th className="p-2">Estado</th>
                <th className="p-2">Acción</th>
              </tr>
            </thead>
            <tbody>
              {cuotasFiltradas.map((cuota) => (
                <tr key={cuota.id} className="border-t">
                  <td className="p-2">{cuota.cliente}</td>
                  <td className="p-2">{cuota.dni}</td>
                  <td className="p-2">{cuota.cuotaActual}</td>
                  <td className="p-2">
                    {Number(cuota.monto).toLocaleString("es-AR", {
                      style: "currency",
                      currency: "ARS",
                    })}
                  </td>
                  <td className="p-2">{cuota.fecha}</td>
                  <td className="p-2">{cuota.estado}</td>
                  <td className="p-2">
                    <button
                      onClick={() => marcarComoPagado(cuota.id)}
                      className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition"
                    >
                      Marcar pago
                    </button>
                  </td>
                </tr>
              ))}
              {cuotasFiltradas.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center p-4 text-gray-500">
                    No hay cuotas pendientes para este mes.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Cuotas;
