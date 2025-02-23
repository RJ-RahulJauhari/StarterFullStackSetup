import {createBrowserRouter, RouterProvider} from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import LandingPage from "./pages/LandingPage";


function App() {

  const MainRouter = createBrowserRouter([
    {
      path:"/",
      element:<MainLayout></MainLayout>,
      children:[
        {
          path:"",
          element:<LandingPage></LandingPage>,
          children:[]
        }
      ]
    }
  ])

  return <RouterProvider router={MainRouter}></RouterProvider>
}

export default App
