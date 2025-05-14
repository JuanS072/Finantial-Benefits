import Image from "next/image";
import Link from "next/link";
//import fondo from "../images/fondo.jpg";
import logo from "../images/logo.png"

const LandingPage = () => {
  return (
    <div className="relative h-screen overflow-hidden">
      
      <div className=" absolute inset-0 flex flex-col justify-center items-center">
        <div className=" bg-black shadow-md shadow-white rounded-none mb-5 flex justify-center items-center">
          <Image className=" text-5xl w-200  flex justify-center items-center rounded-none" src={logo}/>
        </div>
        
        <div className="mt-20">
          <Link href="/home">
            <h1 className="bg-gray-300 p-4 rounded-2xl text-xl">INICIAR</h1>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
