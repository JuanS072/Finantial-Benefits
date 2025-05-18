'use client';
import CuotasTable from "@/components/prestamos";
import { useEffect, useState } from "react";
import { BiLogoWhatsapp } from "react-icons/bi";
import useAuthRedirect from "../../hooks/useAuthRedirect";

const ClientePage = ({ params }) => {
  useAuthRedirect();
  const [cliente, setCliente] = useState(null);
  const [currentImage, setCurrentImage] = useState(0);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editData, setEditData] = useState({ name: "", apellido: "", descripcion: "" });
  const [dniFrente, setDniFrente] = useState(null);
  const [dniAtras, setDniAtras] = useState(null);
  const dni = params?.id;

  useEffect(() => {
    const fetchCliente = async () => {
      try {
        const res = await fetch(`https://finantial-benefits-90a7e267027b.herokuapp.com/Clientes/${dni}`);
        const data = await res.json();
        setCliente(data);
        setEditData({ name: data.name, apellido: data.apellido, descripcion: data.descripcion });
        setCurrentImage(0);
      } catch (error) {
        console.error("Error al obtener los datos del cliente:", error);
      }
    };
    if (dni) fetchCliente();
  }, [dni]);

  if (!cliente) return <div className="p-4 text-center">Cargando cliente...</div>;

  const images = [
    { src: `${cliente.Dni_Img_Frente}`, alt: "DNI frente" },
    { src: `${cliente.Dni_Img_Atras}`, alt: "DNI atrás" },
  ];
  const nextImage = () => setCurrentImage((prev) => (prev + 1) % images.length);
  const prevImage = () => setCurrentImage((prev) => (prev - 1 + images.length) % images.length);

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", editData.name);
    formData.append("apellido", editData.apellido);
    formData.append("description", editData.descripcion);
    if (dniFrente) formData.append("dni_frente", dniFrente);
    if (dniAtras) formData.append("dni_atras", dniAtras);

    try {
      const res = await fetch(`https://finantial-benefits-90a7e267027b.herokuapp.com/Clientes/${dni}`, {
        method: "PUT",
        body: formData,
      });
      const updated = await res.json();
      if (res.ok) {
        setCliente(updated);
        setIsEditModalOpen(false);
      } else {
        alert("Error al actualizar el cliente");
      }
    } catch (err) {
      console.error(err);
      alert("Error al actualizar");
    }
  };

  return (
    <div className="p-4 md:p-6 max-w-5xl mx-auto">
      <div className="bg-white shadow-md rounded-xl p-4 md:p-6 mb-6">
        {/* Carrusel */}
        <div className="relative w-full max-w-md mx-auto mb-4">
          <img
            src={images[currentImage].src}
            alt={images[currentImage].alt}
            className="w-full h-64 sm:h-72 md:h-80 object-cover rounded-lg border"
          />
          <button
            onClick={prevImage}
            className="absolute top-1/2 left-2 -translate-y-1/2 bg-white bg-opacity-80 rounded-full p-1 shadow hover:bg-opacity-100"
          >
            ‹
          </button>
          <button
            onClick={nextImage}
            className="absolute top-1/2 right-2 -translate-y-1/2 bg-white bg-opacity-80 rounded-full p-1 shadow hover:bg-opacity-100"
          >
            ›
          </button>
        </div>

        {/* Info Cliente */}
        <h1 className="text-xl sm:text-2xl font-semibold mb-2">
          {cliente.name} {cliente.apellido}
        </h1>
        <h2 className="text-lg sm:text-xl mb-2">DNI: {cliente.dni}</h2>
        <p className="text-sm md:text-base mb-3">{cliente.descripcion}</p>

        {cliente.wsp && (
          <a
            href={`https://wa.me/${cliente.wsp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-green-600 text-sm hover:underline mb-4"
          >
            <BiLogoWhatsapp className="mr-2 text-xl" />
            Contactar por WhatsApp
          </a>
        )}

        {/* Botón editar debajo */}
        <div className="mt-4 flex justify-center">
          <button
            onClick={() => setIsEditModalOpen(true)}
            className="px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition"
          >
            Editar Cliente
          </button>
        </div>
      </div>

      {/* Tabla de cuotas */}
      <div className="bg-white shadow-md rounded-xl p-4 md:p-6">
        <h2 className="text-lg sm:text-xl font-semibold mb-4">Historial de Préstamos</h2>
        <div className="overflow-x-auto">
          <CuotasTable dniCliente={dni} />
        </div>
      </div>

      {/* Modal editar */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex justify-center items-center p-4">
          <div className="bg-white rounded-xl p-6 max-w-lg w-full">
            <h3 className="text-xl font-semibold mb-4">Editar Cliente</h3>
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Nombre"
                value={editData.name}
                onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                className="w-full border p-2 rounded"
              />
              <input
                type="text"
                placeholder="Apellido"
                value={editData.apellido}
                onChange={(e) => setEditData({ ...editData, apellido: e.target.value })}
                className="w-full border p-2 rounded"
              />
              <textarea
                placeholder="Descripción"
                value={editData.descripcion}
                onChange={(e) => setEditData({ ...editData, descripcion: e.target.value })}
                className="w-full border p-2 rounded"
              />
              <div>
                <label className="block text-sm font-medium mb-1">DNI Frente</label>
                <input
                  type="file"
                  name="dni_frente"
                  accept="image/*"
                  onChange={(e) => setDniFrente(e.target.files[0])}
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">DNI Atrás</label>
                <input
                  type="file"
                  name="dni_atras"
                  accept="image/*"
                  onChange={(e) => setDniAtras(e.target.files[0])}
                  className="w-full"
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 border rounded text-gray-700 hover:bg-gray-100"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientePage;
