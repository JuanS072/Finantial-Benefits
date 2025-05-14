/*

import Link from "next/link";

const Card = ({ products }) => {
  return (
    <ul className="grid grid-cols-4 selection: mx-3">
      {products.map((product) => (
        <Link href={`/home/${product._id}`} key={product._id}>
          <li className="mx-1 my-5">
            <div className="bg-white px-6 py-5 border-black border-x-2 border-y-2 border-opacity-10 text-center">
              <img
                src={product.img}
                alt={product.name}
                className="w-72 h-52 border-black border-x-2 border-y-2 border-opacity-10"
              />
              <h1 className="text-black text-3xl">{product.name}</h1>
              <p className="text-black text-xl">Tipo: {product.type}</p>
              <p className="text-black text-l">{product.description}</p>
              <h1 className="text-black text-xl">Precio: {product.Precio}</h1>
            </div>
          </li>
        </Link>
      ))}
    </ul>
  );
};

export default Card;
*/
import Link from "next/link";

const Card = ({ products }) => {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-3">
      {products.map((product) => (
        <Link href={`/home/${product._id}`} key={product._id}>
          <li className="my-5">
            <div className="bg-white px-4 py-5 border-black border-2 border-opacity-10 text-center rounded shadow">
              <img
                src={product.img}
                alt={product.name}
                className="w-full h-52 object-cover border-black border-2 border-opacity-10 mb-3"
              />
              <h1 className="text-black text-xl font-semibold">{product.name}</h1>
              <p className="text-black text-base">Tipo: {product.type}</p>
              <p className="text-black text-sm mb-2">{product.description}</p>
              <h1 className="text-black text-base font-bold">Precio: {product.Precio}</h1>
            </div>
          </li>
        </Link>
      ))}
    </ul>
  );
};

export default Card;
