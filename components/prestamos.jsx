import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import axios from "axios";

const API_BASE = "https://finantial-benefits-90a7e267027b.herokuapp.com";

const CuotasTable = ({ dniCliente }) => {
  const [prestamos, setPrestamos] = useState([]);
  const [prestamoSeleccionado, setPrestamoSeleccionado] = useState(null);
  const [cuotas, setCuotas] = useState([]);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [dniBusqueda, setDniBusqueda] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("");
  const [nuevoPrestamo, setNuevoPrestamo] = useState({
    dniCliente: "",
    totalPrestado: "",
    cantidadCuotas: "",
    montoCuota: "",
    frecuenciaPago: "Mensual",
    capital: "Juan",
    estado:"Vigente"
  });

  useEffect(() => {
    if (dniCliente) {
      buscarPrestamos(dniCliente);
      setDniBusqueda(dniCliente);
    }
  }, [dniCliente]);

  const buscarPrestamos = async (dni = dniBusqueda) => {
    if (!dni.trim()) return;
    try {
      const res = await axios.get(`${API_BASE}/prestamos/dni/${dni}`);

      setPrestamos(res.data);
      setPrestamoSeleccionado(null);
      setCuotas([]);
    } catch (error) {
      console.error("Error buscando préstamos:", error);
    }
  };

  const obtenerCuotas = async (idPrestamo) => {
    try {
      const res = await axios.get(`${API_BASE}/cuotas/prestamos/${idPrestamo}/cuotas`);
      setCuotas(res.data);
    } catch (error) {
      console.error("Error obteniendo cuotas:", error);
      setCuotas([]);
    }
  };

  const cambiarEstadoCuota = async (idCuota, nuevoEstado) => {
    try {
      await axios.patch(`${API_BASE}/cuotas/${idCuota}/pagar`, { estado: nuevoEstado });
      if (prestamoSeleccionado) obtenerCuotas(prestamoSeleccionado.id);
    } catch (error) {
      console.error("Error cambiando estado de cuota:", error);
    }
  };

  const crearPrestamo = async () => {
    const payload = {
      dni_Cliente: nuevoPrestamo.dniCliente,
      Total_Prestado: parseFloat(nuevoPrestamo.totalPrestado),
      Cant_Cuotas: parseInt(nuevoPrestamo.cantidadCuotas),
      Monto_Cuota: parseFloat(nuevoPrestamo.montoCuota),
      Frecuencia_de_Pago: nuevoPrestamo.frecuenciaPago,
      Capital: nuevoPrestamo.capital,
      estado: nuevoPrestamo.estado,
    };

    try {
      await axios.post(`${API_BASE}/prestamos`, payload);
      setModalAbierto(false);
      setNuevoPrestamo({
        dniCliente: "",
        totalPrestado: "",
        cantidadCuotas: "",
        montoCuota: "",
        frecuenciaPago: "Mensual",
        capital: "Juan",
        estado:"Vigente"
      });
      buscarPrestamos();
    } catch (error) {
      console.error("Error creando préstamo:", error);
    }
  };

  const cuotasFiltradas = cuotas.filter((c) =>
    filtroEstado ? c.estado === filtroEstado : true
  );

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setNuevoPrestamo((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-6">
      {/* Controles */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={() => setModalAbierto(true)}
        >
          Crear Préstamo
        </button>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <input
            type="text"
            placeholder="Buscar por DNI"
            value={dniBusqueda}
            onChange={(e) => setDniBusqueda(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && buscarPrestamos()}
            className="border rounded px-4 py-2 w-full sm:w-64"
          />
          <button
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            onClick={buscarPrestamos}
          >
            Buscar
          </button>
          <select
            value={filtroEstado}
            onChange={(e) => setFiltroEstado(e.target.value)}
            className="border rounded px-4 py-2 w-full sm:w-48"
          >
            <option value="">Todos</option>
            <option value="Pendiente">Pendiente</option>
            <option value="Pagado">Pagado</option>
            <option value="Vencido">Vencido</option>
          </select>
        </div>
      </div>

      {/* Tabla de préstamos */}
      <h2 className="text-lg font-semibold mb-2">
        Préstamos de DNI: {dniBusqueda}
      </h2>
      <div className="overflow-x-auto mb-8">
        <table className="min-w-full table-auto text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Total Prestado</th>
              <th className="px-4 py-2">Total a Pagar</th>
              <th className="px-4 py-2">Cuotas</th>
              <th className="px-4 py-2">Estado</th>
              <th className="px-4 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {prestamos.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-4 text-gray-500">
                  No se encontraron préstamos
                </td>
              </tr>
            ) : (
              prestamos.map((p) => {
                const estado = p.estado;
                return (
                  <tr
                    key={p.id}
                    className="border-b hover:bg-gray-50 cursor-pointer"
                    onClick={() => {
                      setPrestamoSeleccionado(p);
                      obtenerCuotas(p.id);
                    }}
                  >
                    <td className="px-4 py-2">{p.id}</td>
                    <td className="px-4 py-2">{p.totalPrestado}</td>
                    <td className="px-4 py-2">{p.totalAPagar}</td>
                    <td className="px-4 py-2">{p.cantidadCuotas}</td>
                    <td className="px-4 py-2">{estado}</td>
                    <td className="px-4 py-2 text-blue-600 underline">
                      Ver cuotas
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Tabla de cuotas */}
      {prestamoSeleccionado && (
        <div>
          <h2 className="text-lg font-semibold mb-2">
            Cuotas del préstamo #{prestamoSeleccionado.id}
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2">#Id Cuota</th>
                  <th className="px-4 py-2">#Num Cuota</th>
                  <th className="px-4 py-2">Monto</th>
                  <th className="px-4 py-2">Fecha</th>
                  <th className="px-4 py-2">Estado</th>
                </tr>
              </thead>
              <tbody>
                {cuotasFiltradas.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="text-center py-4 text-gray-500">
                      No hay cuotas para mostrar
                    </td>
                  </tr>
                ) : (
                  cuotasFiltradas.map((cuota) => (
                    <tr key={cuota.id} className="border-b">
                      <td className="px-4 py-2">{cuota.idCuota}</td>
                      <td className="px-4 py-2">{cuota.numeroCuota}</td>
                      <td className="px-4 py-2">{cuota.monto}</td>
                      <td className="px-4 py-2">{cuota.fecha}</td>
                      <td className="px-4 py-2">
                        <select
                          value={cuota.estado}
                          onChange={(e) =>
                            cambiarEstadoCuota(cuota.idCuota, e.target.value)
                          }
                          className="border rounded px-2 py-1 w-full sm:w-auto"
                        >
                          <option value="Pendiente">Pendiente</option>
                          <option value="Pagado">Pagado</option>
                          <option value="Vencido">Vencido</option>
                        </select>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal para crear préstamo */}
      <Modal
        isOpen={modalAbierto}
        onRequestClose={() => setModalAbierto(false)}
        ariaHideApp={false}
        className="w-full max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg mt-20"
      >
        <h2 className="text-lg font-semibold mb-4">Nuevo Préstamo</h2>
        <div className="space-y-4">
          {[
            { name: "dniCliente", placeholder: "DNI Cliente" },
            { name: "totalPrestado", type: "number", placeholder: "Total Prestado" },
            { name: "cantidadCuotas", type: "number", placeholder: "Cantidad de Cuotas" },
            { name: "montoCuota", type: "number", placeholder: "Monto por Cuota" },
            { name: "capital", placeholder: "Capital" },
          ].map((input) => (
            <input
              key={input.name}
              type={input.type || "text"}
              name={input.name}
              placeholder={input.placeholder}
              value={nuevoPrestamo[input.name]}
              onChange={onInputChange}
              className="w-full border rounded px-4 py-2"
            />
          ))}
          <select
            name="frecuenciaPago"
            value={nuevoPrestamo.frecuenciaPago}
            onChange={onInputChange}
            className="w-full border rounded px-4 py-2"
          >
            <option value="Mensual">Mensual</option>
            <option value="Semanal">Semanal</option>
            <option value="Quincenal">Quincenal</option>
          </select>
        </div>
        <div className="mt-6 flex justify-end gap-4">
          <button
            onClick={() => setModalAbierto(false)}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancelar
          </button>
          <button
            onClick={crearPrestamo}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Crear
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default CuotasTable;
