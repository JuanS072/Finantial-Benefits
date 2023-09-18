import NavBar from "@/components/NavBar"

const HomeLayout = ({children}) => {
  return (
    <>
    <NavBar/>
    {children}
    </>
  )
}

export default HomeLayout