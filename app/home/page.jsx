'use client';
import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import useAuthRedirect from "../hooks/useAuthRedirect";
const HomePage = () => {
  useAuthRedirect();
  const [prestamos, setPrestamos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`https://finantial-benefits-90a7e267027b.herokuapp.com/prestamos/dashboard`);
        setPrestamos(res.data);
      } catch (err) {
        console.error("Error al obtener préstamos:", err);
      }
    };

    fetchData();
  }, []);

  const totalCapitalPorCapital = useMemo(() => {
    const resumen = {};
    const mesActual = new Date().toISOString().slice(0, 7);

    prestamos.forEach((p) => {
      if (p.fecha?.slice(0, 7) === mesActual) {
        resumen[p.capital] = (resumen[p.capital] || 0) + Number(p.totalPrestado || 0);
      }
    });

    return resumen;
  }, [prestamos]);

  const totalCuotasPendientes = useMemo(() => {
    return prestamos.reduce((acc, p) => {
      const pendientes = p.cuotas?.filter((c) => c.estado === "Pendiente") || [];
      return acc + pendientes.reduce((a, c) => a + Number(c.monto || 0), 0);
    }, 0);
  }, [prestamos]);

  const dineroEntranteActual = useMemo(() => {
    const mesActual = new Date().toISOString().slice(0, 7);
    let total = 0;

    prestamos.forEach((p) => {
      p.cuotas?.forEach((c) => {
        if (c.fecha?.slice(0, 7) === mesActual) {
          total += Number(c.monto || 0);
        }
      });
    });

    return total;
  }, [prestamos]);

  const totalCapital = Object.values(totalCapitalPorCapital).reduce((acc, val) => acc + val, 0);

  const pieDataCapital = Object.entries(totalCapitalPorCapital).map(([name, value]) => ({
    name,
    value,
  }));

  return (
    <div className="max-w-screen-xl mx-auto p-4">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Total Capital Prestado */}
        <div className="flex-1 bg-lime-300 p-4 rounded shadow min-h-[320px] flex flex-col">
          <h3 className="text-center font-semibold mb-2">Capital Prestado (Mes Actual)</h3>
          <p className="text-center text-lg font-bold mb-4">
            {totalCapital.toLocaleString("es-AR", { style: "currency", currency: "ARS" })}
          </p>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieDataCapital}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {pieDataCapital.map((_, i) => (
                  <Cell key={i} fill={i % 2 === 0 ? "#4f46e5" : "#6366f1"} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => value.toLocaleString("es-AR", { style: "currency", currency: "ARS" })} />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Cuotas Pendientes */}
        <div className="flex-1 bg-lime-300 p-4 rounded shadow min-h-[320px] flex flex-col">
          <h3 className="text-center font-semibold mb-2">Plata en Calle (Cuotas Pendientes)</h3>
          <p className="text-center text-lg font-bold mb-4">
            {totalCuotasPendientes.toLocaleString("es-AR", { style: "currency", currency: "ARS" })}
          </p>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={[{ name: "Pendiente", value: totalCuotasPendientes }]}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={90}
                label
              >
                <Cell fill="#ef4444" />
              </Pie>
              <Tooltip formatter={(value) => value.toLocaleString("es-AR", { style: "currency", currency: "ARS" })} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Dinero Entrante */}
        <div className="flex-1 bg-lime-300 p-4 rounded shadow min-h-[320px] flex flex-col items-center justify-center">
          <h3 className="text-center font-semibold mb-2">Dinero Entrante (Mes Actual)</h3>
          <p className="text-2xl font-bold text-green-600">
            {dineroEntranteActual.toLocaleString("es-AR", { style: "currency", currency: "ARS" })}
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
