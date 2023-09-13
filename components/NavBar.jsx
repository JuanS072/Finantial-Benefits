import Link from "next/link";

const NavBar = () => {
  return (
    <nav className="navbar flex justify-between px-16 mt-4">
      <Link href="/home">
        <h1>BolsosGlam</h1>
      </Link>
      <ul className="flex gap-3  text-lg">
        <Link href="/home">
          <li>Home</li>
        </Link>
        <Link href="/productos">
          <li>Productos</li>
        </Link>
        <Link href="/sobrenosotros">
          <li>Sobre Nosotros</li>
        </Link>
        <Link href="/contacto">
          <li>Contacto</li>
        </Link>
      </ul>
    </nav>
  );
};

export default NavBar;
