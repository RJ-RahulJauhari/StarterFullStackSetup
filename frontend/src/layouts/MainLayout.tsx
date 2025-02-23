import { Outlet } from "react-router-dom"


const MainLayout = () => {
  return (
    <div>
        <nav>Navbar</nav>
        <Outlet></Outlet>
        <div>Footer</div>      
    </div>
  )
}

export default MainLayout
