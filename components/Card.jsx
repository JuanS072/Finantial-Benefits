import axios from "axios";

const fetchProducts = async () => {
  try {
    const res = await axios.get(
      "https://virtual-e-commerce-k1ks.onrender.com/Products"
    );
    return res.data; // Axios ya ha procesado la respuesta JSON
  } catch (error) {
    console.error("Error al obtener productos:", error);
    return []; // Maneja el error de manera apropiada
  }
};

const Card = async () => {
  const products = await fetchProducts();
  return (
    <div className="">
    <ul className="flex flex-row mx-3">
      {products.map((product) => (
         <li key={product._id} className="mx-1 my-5">
         <div className="bg-white px-6 py-5 border-black border-x-2 border-y-2 border-opacity-10">
           <img src={product.img} alt={product.name} className="w-72 h-52 border-black border-x-2 border-y-2 border-opacity-10" />
           <h1>{product.name}</h1>
           <p>{product.type}</p>
           <p>{product.description}</p>
           <h1>{product.Precio}</h1>
         </div>
       </li>
      ))}
    </ul>
    </div>
  );
};

export default Card;
