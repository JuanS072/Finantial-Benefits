import NavBar from "@/components/NavBar"
import useAuthRedirect from "../hooks/useAuthRedirect";

const HomeLayout = ({children}) => {
  return (
    <div className="bg-white min-h-screen">
    <NavBar/>
    {children}
    </div>
  )
}

export default HomeLayout