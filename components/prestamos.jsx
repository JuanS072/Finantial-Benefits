import React, { useState, useEffect } from "react";
import Modal from "react-modal";  // Usando una librería para modales como 'react-modal'

const CuotasTable = ({ prestamosData, crearPrestamo }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [nuevoPrestamo, setNuevoPrestamo] = useState({
    totalPrestado: "",
    cantidadCuotas: "",
    montoCuota: "",
    frecuenciaPago: "Mensual",
  });

  // Manejo de cambios en el modal
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevoPrestamo(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Función para crear un nuevo préstamo
  const handleCrearPrestamo = () => {
    crearPrestamo(nuevoPrestamo); // Pasa los datos al componente padre
    setModalIsOpen(false); // Cerrar modal
    setNuevoPrestamo({ totalPrestado: "", cantidadCuotas: "", montoCuota: "", frecuenciaPago: "Mensual" }); // Resetear
  };

  return (
    <div className="mt-6 max-w-screen-lg mx-auto px-4">
      {/* Botón para crear un préstamo */}
      <div className="flex justify-center mb-6">
        <button
          onClick={() => setModalIsOpen(true)}
          className="px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors w-full sm:w-auto"
        >
          Crear Préstamo
        </button>
      </div>

      {/* Tabla de Préstamos Activos */}
      <div className="overflow-x-auto mb-6">
        <table className="min-w-full table-auto text-sm text-gray-700">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 text-left">Préstamo ID</th>
              <th className="px-4 py-2 text-left">Total Prestado</th>
              <th className="px-4 py-2 text-left">Cantidad de Cuotas</th>
              <th className="px-4 py-2 text-left">Frecuencia de Pago</th>
            </tr>
          </thead>
          <tbody>
            {prestamosData.map((prestamo) => (
              <tr key={prestamo.id} className="border-b">
                <td className="px-4 py-2">{prestamo.id}</td>
                <td className="px-4 py-2">{prestamo.totalPrestado}</td>
                <td className="px-4 py-2">{prestamo.cantidadCuotas}</td>
                <td className="px-4 py-2">{prestamo.frecuenciaPago}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal para crear un préstamo */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Crear Préstamo"
        className="w-full max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg"
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
              value={nuevoPrestamo.cantidadCuotas * nuevoPrestamo.montoCuota}
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
            className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Crear
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default CuotasTable;
