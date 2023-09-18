import Link from "next/link";
import logo from "../images/logotipo.png"
import Image from "next/image";

const NavBar = () => {
  return (
    <nav className="navbar bg-black flex justify-between px-16 text-gray-200">
      <div>
        <Link href="/home">
        <Image src={logo} width={100} />
      </Link>
      </div>
      <ul className="flex gap-5 justify-center items-center text-lg ">
        <Link href="/home">
          <li>Home</li>
        </Link>
        <Link href="/productos">
          <li>Productos</li>
        </Link>
        <Link href="/home/sobrenosotros">
          <li>Nosotros</li>
        </Link>
        <Link href="/home/contacto">
          <li>Contacto</li>
        </Link>
      </ul>
    </nav>
  );
};

export default NavBar;
