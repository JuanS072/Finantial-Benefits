import Image from "next/image";
import Link from "next/link";
import fondo from "../images/fondo.jpg";

const LandingPage = () => {
  return (
    <div className="relative h-screen overflow-hidden">
      <Image
        src={fondo}
        alt="fondo"
        layout="fill"
        objectFit="cover"
        objectPosition="center"
      />
      <div className="absolute inset-0 flex flex-col justify-center items-center">
        <div className="h-20 bg-gray-300 rounded-2xl mb-5 flex justify-center items-center">
          <h1 className=" shadow-gray-300 shadow-2xl text-5xl w-72  flex justify-center items-center">
            BolsosGlam
          </h1>
        </div>
        <div className="mt-2">
          <Link href="/home">
            <h1 className="bg-gray-300 p-4 rounded-2xl text-xl">INICIAR</h1>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
