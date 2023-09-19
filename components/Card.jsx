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
    <ul className="bg-gray-500">
      {products.map((product) => (
        <li key={product._id}>
          <div>
            <h1>{product.name}</h1>
            <p>{product.type}</p>
            <p>{product.description}</p>
            <h1>{product.Precio}</h1>
          </div>
          <img src={product.img} alt={product.name} />
        </li>
      ))}
    </ul>
  );
};

export default Card;
