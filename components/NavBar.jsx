/*import Link from "next/link";
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

export default NavBar;*/
"use client";

import Link from "next/link";
import logo from "../images/logo.png";
import Image from "next/image";
import { useState } from "react";

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="bg-white text-black shadow-md">
      <div className="flex justify-between items-center px-6 py-4 md:px-16">
        <Link href="/home" onClick={closeMenu}>
          <Image src={logo} alt="Logo" width={150} />
        </Link>

        {/* Botón ☰ en móvil */}
        <button
          className="md:hidden text-2xl focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

        {/* Menú en pantallas grandes */}
        <ul className="hidden md:flex gap-8 text-lg items-center">
          <li>
            <Link href="/Clientes">Clientes</Link>
          </li>
          <li>
            <Link href="/Cuotas">Cuotas</Link>
          </li>
        </ul>
      </div>

      {/* Menú móvil desplegable */}
      {menuOpen && (
        <ul className="flex flex-col items-center gap-4 py-4 text-lg md:hidden bg-white shadow-md z-10">
          <li>
            <Link href="/Clientes" onClick={closeMenu}>
            Clientes
            </Link>
          </li>
          <li>
            <Link href="/Cuotas" onClick={closeMenu}>
            Cuotas
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default NavBar;
