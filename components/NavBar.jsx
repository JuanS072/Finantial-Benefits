import Link from "next/link";
import logo from "../images/logo.png"
import Image from "next/image";

const NavBar = () => {
  return (
    <nav className="navbar bg-white flex justify-between px-16 text-black">
      <div>
        <Link href="/home">
        <Image src={logo} width={200} />
      </Link>
      </div>
      <ul className="flex gap-5 justify-center items-center text-lg ">
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
