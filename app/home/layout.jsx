import NavBar from "@/components/NavBar"

const HomeLayout = ({children}) => {
  return (
    <div className="bg-white min-h-screen">
    <NavBar/>
    {children}
    </div>
  )
}

export default HomeLayout