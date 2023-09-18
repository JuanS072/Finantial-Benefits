import Image from "next/image";

const fetchProducts = async () => {
    const res = await fetch(
      "https://virtual-e-commerce-k1ks.onrender.com/Products"
    );
    const data = await res.json();
    return data;
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
  