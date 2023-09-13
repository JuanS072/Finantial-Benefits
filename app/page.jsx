import Link from "next/link"

const LandingPage = () => {
  return (
    <div className="container h-screen flex justify-center items-center">
      <Link href="/home">
        <h1 className="bg-gray-400 mb-2 p-4 rounded-md">Iniciar</h1>
      </Link>
    </div>
  )
}

export default LandingPage
