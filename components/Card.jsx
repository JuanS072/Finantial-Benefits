// "use client";

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
