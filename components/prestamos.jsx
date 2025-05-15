import React, { useState } from "react";
import Modal from "react-modal";

const CuotasTable = ({ prestamosData, crearPrestamo, actualizarPrestamos }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [searchId, setSearchId] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("");
  const [nuevoPrestamo, setNuevoPrestamo] = useState({
    totalPrestado: "",
    cantidadCuotas: "",
    montoCuota: "",
    frecuenciaPago: "Mensual",
    capital: "Juan",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevoPrestamo((prev) => ({ ...prev, [name]: value }));
  };

  const handleCrearPrestamo = () => {
    crearPrestamo(nuevoPrestamo);
    setModalIsOpen(false);
    setNuevoPrestamo({
      totalPrestado: "",
      cantidadCuotas: "",
      montoCuota: "",
      frecuenciaPago: "Mensual",
      capital: "Juan",
    });
  };

  const prestamosFiltrados = prestamosData.filter((p) =>
    searchId.trim() === "" ? true : String(p.id).includes(searchId.trim())
  );

  const cuotasFiltradas = prestamosFiltrados
    .flatMap((p) =>
      p.cuotas?.map((cuota, i) => ({
        ...cuota,
        prestamoId: p.id,
        index: i,
      })) || []
    )
    .filter((cuota) => (filtroEstado ? cuota.estado === filtroEstado : true));

  const handleEstadoChange = (prestamoId, cuotaIndex, nuevoEstado) => {
    const actualizados = prestamosData.map((prestamo) => {
      if (prestamo.id === prestamoId) {
        const nuevasCuotas = prestamo.cuotas.map((cuota, i) =>
          i === cuotaIndex ? { ...cuota, estado: nuevoEstado } : cuota
        );
        return { ...prestamo, cuotas: nuevasCuotas };
      }
      return prestamo;
    });

    if (actualizarPrestamos) {
      actualizarPrestamos(actualizados);
    }
  };

  return (
    <div className="mt-6 max-w-screen-xl mx-auto px-4">
      <div className="flex justify-center mb-6">
        <button
          onClick={() => setModalIsOpen(true)}
          className="px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition w-full sm:w-auto"
        >
          Crear Préstamo
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="w-full sm:w-1/2">
          <label className="block font-semibold mb-1">Buscar por ID:</label>
          <input
            type="text"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            className="w-full px-4 py-2 border rounded"
          />
        </div>
        <div className="w-full sm:w-1/2">
          <label className="block font-semibold mb-1">Filtrar por Estado:</label>
          <select
            value={filtroEstado}
            onChange={(e) => setFiltroEstado(e.target.value)}
            className="w-full px-4 py-2 border rounded"
          >
            <option value="">Todos</option>
            <option value="Pendiente">Pendiente</option>
            <option value="Pagado">Pagado</option>
            <option value="Vencido">Vencido</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto mb-10">
        <h2 className="text-xl font-bold mb-4">Préstamos</h2>
        <table className="min-w-full table-auto text-sm text-gray-800">
          <thead className="bg-gray-200 text-left">
            <tr>
              <th className="px-4 py-2">Préstamo ID</th>
              <th className="px-4 py-2">Total Prestado</th>
              <th className="px-4 py-2">Cantidad de Cuotas</th>
              <th className="px-4 py-2">Total A Pagar</th>
              <th className="px-4 py-2">Frecuencia de Pago</th>
              <th className="px-4 py-2">Capital</th>
              <th className="px-4 py-2">Estado</th>
            </tr>
          </thead>
          <tbody>
            {prestamosFiltrados.map((prestamo) => {
              const cuotasPendientes = prestamo.cuotas?.filter(
                (cuota) => cuota.estado !== "Pagado"
              )?.length;
              const estado = cuotasPendientes > 0 ? "Vigente" : "Finalizado";

              return (
                <tr key={prestamo.id} className="border-b">
                  <td className="px-4 py-2">{prestamo.id}</td>
                  <td className="px-4 py-2">{prestamo.totalPrestado}</td>
                  <td className="px-4 py-2">{prestamo.cantidadCuotas}</td>
                  <td className="px-4 py-2">{prestamo.totalAPagar}</td>
                  <td className="px-4 py-2">{prestamo.frecuenciaPago}</td>
                  <td className="px-4 py-2">{prestamo.capital}</td>
                  <td className="px-4 py-2">{estado}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="overflow-x-auto mb-10">
        <h2 className="text-xl font-bold mb-4">Cuotas</h2>
        <table className="min-w-full table-auto text-sm text-gray-800">
          <thead className="bg-gray-200 text-left">
            <tr>
              <th className="px-4 py-2">Préstamo ID</th>
              <th className="px-4 py-2"># Cuota</th>
              <th className="px-4 py-2">Monto</th>
              <th className="px-4 py-2">Fecha de Cobro</th>
              <th className="px-4 py-2">Estado</th>
            </tr>
          </thead>
          <tbody>
            {cuotasFiltradas.map((cuota) => (
              <tr
                key={`${cuota.prestamoId}-${cuota.index}`}
                className="border-b"
              >
                <td className="px-4 py-2">{cuota.prestamoId}</td>
                <td className="px-4 py-2">{cuota.index + 1}</td>
                <td className="px-4 py-2">{cuota.monto}</td>
                <td className="px-4 py-2">{cuota.fecha}</td>
                <td className="px-4 py-2">
                  <select
                    value={cuota.estado}
                    onChange={(e) =>
                      handleEstadoChange(
                        cuota.prestamoId,
                        cuota.index,
                        e.target.value
                      )
                    }
                    className="border rounded px-2 py-1"
                  >
                    <option value="Pendiente">Pendiente</option>
                    <option value="Pagado">Pagado</option>
                    <option value="Vencido">Vencido</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Crear Préstamo"
        className="w-full max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg mt-20"
      >
        <h2 className="text-lg font-semibold mb-4">Nuevo Préstamo</h2>
        <div className="space-y-4">
          <div>
            <label>Total Prestado:</label>
            <input
              type="text"
              name="totalPrestado"
              value={nuevoPrestamo.totalPrestado}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded"
            />
          </div>
          <div>
            <label>Cantidad de Cuotas:</label>
            <input
              type="text"
              name="cantidadCuotas"
              value={nuevoPrestamo.cantidadCuotas}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded"
            />
          </div>
          <div>
            <label>Monto de la Cuota:</label>
            <input
              type="text"
              name="montoCuota"
              value={nuevoPrestamo.montoCuota}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded"
            />
          </div>
          <div>
            <label>Cantidad a Devolver:</label>
            <input
              type="text"
              value={
                (parseFloat(nuevoPrestamo.montoCuota) || 0) *
                (parseInt(nuevoPrestamo.cantidadCuotas) || 0)
              }
              disabled
              className="w-full px-4 py-2 border rounded bg-gray-100"
            />
          </div>
          <div>
            <label>Frecuencia de Pago:</label>
            <select
              name="frecuenciaPago"
              value={nuevoPrestamo.frecuenciaPago}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded"
            >
              <option value="Mensual">Mensual</option>
              <option value="Semanal">Semanal</option>
            </select>
          </div>
          <div>
            <label>Capital:</label>
            <select
              name="capital"
              value={nuevoPrestamo.capital}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded"
            >
              <option value="Juan">Juan</option>
              <option value="Enzo">Enzo</option>
            </select>
          </div>
        </div>
        <div className="mt-4 flex justify-end gap-4">
          <button
            onClick={() => setModalIsOpen(false)}
            className="px-6 py-2 bg-gray-300 text-gray-700 rounded"
          >
            Cancelar
          </button>
          <button
            onClick={handleCrearPrestamo}
            className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            Crear
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default CuotasTable;