import Link from "next/link";

const NavBar = () => {
  return (
    <nav className="navbar bg-black flex justify-between px-16 py-5 text-gray-200">
      <Link href="/home">
        <h1 className="text-3xl font-bold">BolsosGlam</h1>
      </Link>
      <ul className="flex gap-5  text-lg">
        <Link href="/home">
          <li>Home</li>
        </Link>
        <Link href="/productos">
          <li>Productos</li>
        </Link>
        <Link href="/sobrenosotros">
          <li>Nosotros</li>
        </Link>
        <Link href="/contacto">
          <li>Contacto</li>
        </Link>
      </ul>
    </nav>
  );
};

export default NavBar;
