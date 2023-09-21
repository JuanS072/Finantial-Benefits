import axios from "axios";
import { BiLogoWhatsapp } from "react-icons/bi";

const getProducts = async (id) => {
  try {
    const res = await axios.get(
      `https://virtual-e-commerce-k1ks.onrender.com/Products/Product/${id}`
    );
    return res.data; // Axios ya ha procesado la respuesta JSON
  } catch (error) {
    console.error("Error al obtener productos:", error);
    return []; // Maneja el error de manera apropiada
  }
};

const Products = async ({ params }) => {
  const products = await getProducts(params.id);
  return (
    <div class="flex font-sans items-center my-20 border-2 rounded-3xl border-black bg-white">
      <div class="flex-none w-80 relative  ">
        <img src={products.img} alt="" class="w-full h-full border-black ml-10" />
      </div>
      <form class="flex-auto p-20 ml-20">
        <div class="flex  flex-wrap justify-center items-center">
          <h1 class="flex-auto text-3xl font-semibold text-slate-900">
            {products.name}
          </h1>
          <div class="text-lg font-semibold text-black flex flex-col-reverse gap-2 items-center mt-12">
            {products.Precio}
            <div class="flex-auto flex space-x-4">
              <button
                class="h-10 font-semibold rounded-md bg-black text-white mb-5 flex gap-2 justify-center items-center px-10"
                type="submit"
              >
                Pedir <BiLogoWhatsapp className="text-xl" />
              </button>
            </div>
            <h1 className="text-teal-600">{products.stock}</h1>
          </div>
        </div>

        <p class="text-sm text-slate-700">{products.description}</p>
      </form>
    </div>
  );
};

export default Products;
