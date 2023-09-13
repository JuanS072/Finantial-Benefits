import Link from "next/link"

const LandingPage = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center ">
        <h1 className="mb-4 text-4xl">BolsosGlam</h1>
      <Link href="/home">
        <h1 className="bg-violet-600  p-4 rounded-2xl text-xl" >INICIAR</h1>
      </Link>
    </div>
  )
}

export default LandingPage
