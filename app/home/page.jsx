import Card from "@/components/Card";
import FilterCard from "@/components/FilterCard";
import axios from "axios";

const getProducts = async () => {
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

const HomePage = async () => {
  const products = await getProducts();

  return (
    <div>
      <FilterCard />
      <Card products={products} />
    </div>
  );
};

export default HomePage;
