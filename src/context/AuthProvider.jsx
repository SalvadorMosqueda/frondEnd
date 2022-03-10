import { useState,useEffect,createContext } from "react";
import clienteAxios from "../../config/ClienteAxios";
import { useNavigate } from "react-router-dom";
//creamos el context 
const AuthContext = createContext();

//definimos el provaider que rodea toda la aplicacion

const AuthProvider = ({children}) =>{
    //creamos el primero state global
    const[auth,setAuth]=useState({})
    const [cargando, setCargando] = useState(true)
    const navigate = useNavigate()
    //comprobaremos si existe un token asi realizamos una auto autenticacion 
    // y llevamos el perfil con la info del usario autenticado asi para traer los proyectos etc
    useEffect(()=>{
        const autenticarUsuario=async()=>{
            const token=localStorage.getItem('token')
            if(!token){
                setCargando(false)
                return  
            }
            //todos los req deben tener esta confi
            const config={
                headers:{
                    "Content-Type": "application/json",
                    Authorization:`Bearer ${token}`
                }
            }
            try {

              const {data}= await clienteAxios('/usuarios/perfil',config)
                //guardamos la info del del usuario
              setAuth(data)
              navigate('/proyectos')


            } catch (error) {
                    console.log(error)
                   
                } finally{
                    //como la funcion tarda en ejecutarse te saca rapido de la ruta antes de comprobar ya con esto
                    //hacemos que se detenga

                    setCargando(false);
                }
           }
       autenticarUsuario()
    },[])

    return(
        <AuthContext.Provider
        value={{
            setAuth,
            auth,
            cargando
            
        }}
        >
            {children}
        </AuthContext.Provider>
    )
}
export{
    AuthProvider
}

export default AuthContext