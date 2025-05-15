'use client';
import React, { useMemo } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

const mockPrestamosData = [
  {
    id: 1,
    capital: "Juan",
    totalPrestado: 10000,
    cuotas: [
      { monto: 1000, fecha: "2025-05-10", estado: "Pendiente" },
      { monto: 1000, fecha: "2025-06-10", estado: "Pendiente" },
      { monto: 1000, fecha: "2025-07-10", estado: "Pagado" },
    ],
  },
  {
    id: 2,
    capital: "Enzo",
    totalPrestado: 8000,
    cuotas: [
      { monto: 800, fecha: "2025-05-15", estado: "Pagado" },
      { monto: 800, fecha: "2025-06-15", estado: "Pendiente" },
      { monto: 800, fecha: "2025-07-15", estado: "Pendiente" },
    ],
  },
  {
    id: 3,
    capital: "Juan",
    totalPrestado: 12000,
    cuotas: [
      { monto: 1200, fecha: "2025-05-20", estado: "Pendiente" },
      { monto: 1200, fecha: "2025-06-20", estado: "Pendiente" },
      { monto: 1200, fecha: "2025-07-20", estado: "Pendiente" },
    ],
  },
];

const HomePage = () => {
  const totalCapitalPorCapital = useMemo(() => {
    const resumen = { Juan: 0, Enzo: 0 };
    mockPrestamosData.forEach((p) => {
      resumen[p.capital] += Number(p.totalPrestado || 0);
    });
    return resumen;
  }, []);

  const totalCuotasPendientes = useMemo(() => {
    return mockPrestamosData.reduce((acc, p) => {
      const pendientes = p.cuotas?.filter((c) => c.estado === "Pendiente") || [];
      return acc + pendientes.reduce((a, c) => a + Number(c.monto || 0), 0);
    }, 0);
  }, []);

  const dineroEntranteActual = useMemo(() => {
    const hoy = new Date();
    const mesActual = hoy.toISOString().slice(0, 7); // formato YYYY-MM
    let total = 0;

    mockPrestamosData.forEach((p) => {
      p.cuotas?.forEach((c) => {
        if (
          c.estado === "Pendiente" &&
          c.fecha?.slice(0, 7) === mesActual
        ) {
          total += Number(c.monto || 0);
        }
      });
    });

    return total;
  }, []);

  const totalCapital = totalCapitalPorCapital.Juan + totalCapitalPorCapital.Enzo;

  return (
    <div className="max-w-screen-xl mx-auto p-4">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Total Capital Prestado (donut) */}
        <div className="flex-1 bg-white p-4 rounded shadow min-h-[320px] flex flex-col">
          <h3 className="text-center font-semibold mb-2">Total Capital Prestado</h3>
          <p className="text-center text-lg font-bold mb-4">
            {totalCapital.toLocaleString("es-AR", {
              style: "currency",
              currency: "ARS",
            })}
          </p>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={[
                  { name: "Juan", value: totalCapitalPorCapital.Juan },
                  { name: "Enzo", value: totalCapitalPorCapital.Enzo },
                ]}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
              >
                <Cell fill="#4f46e5" />
                <Cell fill="#6366f1" />
              </Pie>
              <Tooltip
                formatter={(value) =>
                  value.toLocaleString("es-AR", {
                    style: "currency",
                    currency: "ARS",
                  })
                }
              />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Plata en Calle - SOLO cuotas pendientes */}
        <div className="flex-1 bg-white p-4 rounded shadow min-h-[320px] flex flex-col">
          <h3 className="text-center font-semibold mb-2">Plata en Calle (Cuotas Pendientes)</h3>
          <p className="text-center text-lg font-bold mb-4">
            {totalCuotasPendientes.toLocaleString("es-AR", {
              style: "currency",
              currency: "ARS",
            })}
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
              <Tooltip
                formatter={(value) =>
                  value.toLocaleString("es-AR", {
                    style: "currency",
                    currency: "ARS",
                  })
                }
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Dinero Entrante del Mes Actual */}
        <div className="flex-1 bg-white p-4 rounded shadow min-h-[320px] flex flex-col items-center justify-center">
          <h3 className="text-center font-semibold mb-2">Dinero Entrante (Mes Actual)</h3>
          <p className="text-2xl font-bold text-green-600">
            {dineroEntranteActual.toLocaleString("es-AR", {
              style: "currency",
              currency: "ARS",
            })}
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
