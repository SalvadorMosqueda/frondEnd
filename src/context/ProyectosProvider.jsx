import { useState, useEffect, createContext } from "react"
import { useNavigate } from "react-router-dom";
import clienteAxios from "../../config/ClienteAxios"

const ProyectosContext = createContext();

const ProyectosProvider = ({ children }) => {

    const [proyectos, setProyectos] = useState([])
    const [alerta,setAlerta]=useState([])
     

    const navigate = useNavigate()
    //aqui obtenemos los proyectos
    useEffect(()=>{
        const obtenerProyectos = async ()=>{
            try {
                const token = localStorage.getItem('token')
                if(!token)return
                
                const config={
                    headers:{
                        "Content-type": "application/json",
                        Authorization: `Bearer ${token} `
                    }
                }
                const {data}= await clienteAxios('/proyectos',config)
                setProyectos(data)
            } catch (error) {
                console.log(error)
                
            }
          
        }  
        obtenerProyectos()    
    },[])
    
    const mostrarAlerta = alerta=>{
        setAlerta(alerta)

        //quitr alerta despues de 5 s
        setTimeout(()=>{
            setAlerta({})
        },5000)
    }
    //registramos en nuevo proyecto
    const submitProyectos = async proyectos =>{
        try {
            const token = localStorage.getItem('token')
            if(!token)return
            
            const config={
                headers:{
                    "Content-type": "application/json",
                    Authorization: `Bearer ${token} `
                }
            }
            const {data}= await clienteAxios.post('/proyectos',proyectos,config)
            console.log(data)
            setAlerta({
                msg:'proyecto creado correctamente',error:false
            })
                   //quitr alerta despues de 5 s

        setTimeout(()=>{
            setAlerta({})

            navigate('/proyectos')
        },5000)
    
            
        } catch (error) {
            console.log(error)
        }
    }
    return ( 
        <ProyectosContext.Provider
        value={{proyectos,mostrarAlerta,submitProyectos,alerta}}>
            {children}
        </ProyectosContext.Provider>
    )
}
export { ProyectosProvider }

export default ProyectosContext;