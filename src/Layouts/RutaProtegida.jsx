import { Outlet,Navigate } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import Header from "../Componentes/Header"
import Sidebar from "../Componentes/Sidebar"

const RutaProtegida = () => {
    //extramos la informacion que se guardo del usuario en auth pata ver si esta auntenticado si no, para mandarlo al index

    const{auth,Cargando}=useAuth()

    if(Cargando) return 'Cargando' 
  return (
    <>
        {auth._id? (
            <div className="bg-gray-100">
                <Header/>
                <div className="md:flex md:min-h-screen">
                    <Sidebar/>
                    <main className=" p-10 flex-1">
                        <Outlet/>
                    </main>
                </div>

            </div>

        ):  <Navigate to="/"/> }
    
    </>
  )
}

export default RutaProtegida