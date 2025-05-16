import React, { useState } from "react";
import Modal from "react-modal";
import axios from "axios";

const CuotasTable = () => {
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
  });

  // Buscar préstamos por DNI
  const buscarPrestamos = async (dni) => {
    if (!dni.trim()) {
      setPrestamos([]);
      setPrestamoSeleccionado(null);
      setCuotas([]);
      return;
    }
    try {
      const res = await axios.get(`/prestamos?dni=${dni}`);
      setPrestamos(res.data);
      setPrestamoSeleccionado(null);
      setCuotas([]);
    } catch (error) {
      console.error("Error buscando préstamos:", error);
      setPrestamos([]);
      setPrestamoSeleccionado(null);
      setCuotas([]);
    }
  };

  // Obtener cuotas por préstamo
  const obtenerCuotas = async (idPrestamo) => {
    try {
      const res = await axios.get(`/prestamos/${idPrestamo}/cuotas`);
      setCuotas(res.data);
    } catch (error) {
      console.error("Error obteniendo cuotas:", error);
      setCuotas([]);
    }
  };

  // Crear nuevo préstamo
  const crearPrestamo = async () => {
    try {
      await axios.post("/prestamos", {
        dniCliente: nuevoPrestamo.dniCliente,
        totalPrestado: parseFloat(nuevoPrestamo.totalPrestado),
        totalAPagar:
          parseFloat(nuevoPrestamo.montoCuota) *
          parseInt(nuevoPrestamo.cantidadCuotas),
        frecuenciaPago: nuevoPrestamo.frecuenciaPago,
        cantidadCuotas: parseInt(nuevoPrestamo.cantidadCuotas),
        capital: nuevoPrestamo.capital,
      });
      setModalAbierto(false);
      setNuevoPrestamo({
        dniCliente: "",
        totalPrestado: "",
        cantidadCuotas: "",
        montoCuota: "",
        frecuenciaPago: "Mensual",
        capital: "Juan",
      });
      buscarPrestamos(nuevoPrestamo.dniCliente);
    } catch (error) {
      console.error("Error creando préstamo:", error);
    }
  };

  // Cambiar estado de cuota
  const cambiarEstadoCuota = async (idCuota, estadoNuevo) => {
    try {
      await axios.patch(`/cuotas/${idCuota}/pagar`, { estado: estadoNuevo });
      if (prestamoSeleccionado) obtenerCuotas(prestamoSeleccionado.id);
    } catch (error) {
      console.error("Error cambiando estado cuota:", error);
    }
  };

  // Manejo inputs nuevo préstamo
  const onInputChange = (e) => {
    const { name, value } = e.target;
    setNuevoPrestamo((prev) => ({ ...prev, [name]: value }));
  };

  // Cuotas filtradas por estado
  const cuotasFiltradas = cuotas.filter((c) =>
    filtroEstado ? c.estado === filtroEstado : true
  );

  return (
    <div className="max-w-screen-xl mx-auto px-4 mt-6">
      {/* Controles */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <button
          className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          onClick={() => setModalAbierto(true)}
        >
          Crear Préstamo
        </button>

        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <input
            type="text"
            placeholder="Buscar préstamos por DNI"
            value={dniBusqueda}
            onChange={(e) => setDniBusqueda(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && buscarPrestamos(dniBusqueda)}
            className="border rounded px-4 py-2 w-full sm:w-64"
          />
          <button
            className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
            onClick={() => buscarPrestamos(dniBusqueda)}
          >
            Buscar
          </button>
          <select
            className="border rounded px-4 py-2 w-full sm:w-48"
            value={filtroEstado}
            onChange={(e) => setFiltroEstado(e.target.value)}
          >
            <option value="">Todos</option>
            <option value="Pendiente">Pendiente</option>
            <option value="Pagado">Pagado</option>
            <option value="Vencido">Vencido</option>
          </select>
        </div>
      </div>

      {/* Lista de préstamos */}
      <h2 className="text-xl font-semibold mb-4">Préstamos para DNI: {dniBusqueda}</h2>
      <div className="overflow-x-auto mb-10">
        <table className="min-w-full text-left text-gray-800 text-sm table-auto">
          <thead className="bg-gray-200">
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
                const estado =
                  p.cuotas?.some((c) => c.estado !== "Pagado") ? "Vigente" : "Finalizado";
                return (
                  <tr
                    key={p.id}
                    className="border-b bg-white cursor-pointer hover:bg-gray-100"
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
                    <td className="px-4 py-2 text-blue-600 underline">Ver cuotas</td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Cuotas del préstamo seleccionado */}
      {prestamoSeleccionado && (
        <>
          <h2 className="text-xl font-semibold mb-4">
            Cuotas del préstamo #{prestamoSeleccionado.id}
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-gray-800 text-sm table-auto">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-4 py-2"># Cuota</th>
                  <th className="px-4 py-2">Monto</th>
                  <th className="px-4 py-2">Fecha</th>
                  <th className="px-4 py-2">Estado</th>
                </tr>
              </thead>
              <tbody>
                {cuotasFiltradas.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="text-center py-4 text-gray-500">
                      No hay cuotas que mostrar
                    </td>
                  </tr>
                ) : (
                  cuotasFiltradas.map((cuota) => (
                    <tr key={cuota.id} className="border-b bg-white">
                      <td className="px-4 py-2">{cuota.numero}</td>
                      <td className="px-4 py-2">{cuota.monto}</td>
                      <td className="px-4 py-2">{cuota.fecha}</td>
                      <td className="px-4 py-2">
                        <select
                          value={cuota.estado}
                          onChange={(e) => cambiarEstadoCuota(cuota.id, e.target.value)}
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
        </>
      )}

      {/* Modal crear préstamo */}
      <Modal
        isOpen={modalAbierto}
        onRequestClose={() => setModalAbierto(false)}
        ariaHideApp={false}
        className="w-full max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg mt-20"
      >
        <h2 className="text-lg font-semibold mb-4">Nuevo Préstamo</h2>
        <div className="space-y-4">
          <input
            type="text"
            name="dniCliente"
            placeholder="DNI Cliente"
            value={nuevoPrestamo.dniCliente}
            onChange={onInputChange}
            className="w-full border rounded px-4 py-2"
          />
          <input
            type="number"
            name="totalPrestado"
            placeholder="Total Prestado"
            value={nuevoPrestamo.totalPrestado}
            onChange={onInputChange}
            className="w-full border rounded px-4 py-2"
          />
          <input
            type="number"
            name="cantidadCuotas"
            placeholder="Cantidad de Cuotas"
            value={nuevoPrestamo.cantidadCuotas}
            onChange={onInputChange}
            className="w-full border rounded px-4 py-2"
          />
          <input
            type="number"
            name="montoCuota"
            placeholder="Monto por Cuota"
            value={nuevoPrestamo.montoCuota}
            onChange={onInputChange}
            className="w-full border rounded px-4 py-2"
          />
          <input
            type="text"
            name="capital"
            placeholder="Capital"
            value={nuevoPrestamo.capital}
            onChange={onInputChange}
            className="w-full border rounded px-4 py-2"
          />
          <select
            name="frecuenciaPago"
            value={nuevoPrestamo.frecuenciaPago}
            onChange={onInputChange}
            className="w-full border rounded px-4 py-2"
          >
            <option value="Mensual">Mensual</option>
            <option value="Quincenal">Quincenal</option>
          </select>
        </div>
        <div className="mt-6 flex justify-end gap-4">
          <button
            onClick={() => setModalAbierto(false)}
            className="px-6 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
          >
            Cancelar
          </button>
          <button
            onClick={crearPrestamo}
            className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
          >
            Crear
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default CuotasTable;
