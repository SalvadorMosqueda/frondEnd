
import { useState, useEffect, createContext } from "react"
import { useNavigate } from "react-router-dom";
import clienteAxios from "../../config/ClienteAxios"

const ProyectosContext = createContext();

const ProyectosProvider = ({ children }) => {

    const [proyectos, setProyectos] = useState([])
    const [alerta,setAlerta]=useState([])
    //guardamos el proyecto
    const [proyecto, setProyecto] = useState({})
    const [cargando, setCargando] = useState(false)
    const[modalFormularioTarea,setmodalFormularioTarea]=useState(false)
    const[modalliminarTarea,setmodalEliminarTarea]=useState(false)
    const[modalEliminarColaborador,setmodalEliminarColaborador]=useState(false)
    const [tarea,setTarea]=useState({});
    const[colaborador,setColaborador]=useState({})


    const navigate = useNavigate()
    //aqui obtenemos los proyectos
    useEffect(()=>{
        const obtenerProyectos = async ()=>{
            setCargando(true)
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
            setCargando(false)
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
    const submitProyectos = async proyecto =>{
        if(proyecto.id){
           await editarProyecto(proyecto)
        }else{
           await nuevoProyecto(proyecto)
        }
    }
    //eliminar

    const eliminarProyecto = async id=>{
      try {
        const token = localStorage.getItem('token')
        if(!token)return
        
        const config={
            headers:{
                "Content-type": "application/json",
                Authorization: `Bearer ${token} `
            }
        }
        const {data}= await clienteAxios.delete(`/proyectos/${id}`,config)
        //sincronizar el state
        //trae todos los proyectos excepto el que tenga el mimsmo id que pase por parametros
        const proyectosActualizados = proyectos.filter(proyectoState=>proyectoState._id !==id)
        setProyectos(proyectosActualizados)
        setAlerta({
            msg: data.msg,
            error:false
        })
        setTimeout(()=>{
            setAlerta({})
            navigate('/proyectos')
        },3000)
      } catch (error) {
          console.log(error)
      }
    }

    const editarProyecto = async proyecto  =>{
        try {
            //obtenemos el token del local storage
            const token = localStorage.getItem('token')
            if(!token) return
            
            const config ={
                headers:{
                    "Content-Type": "Application/json",
                    Authorization:`Bearer ${token}`
                }
            }
            const {data}= await clienteAxios.put(`/proyectos/${proyecto.id}`,proyecto,config)
            //sincronizar el state para que se actualice los proyectos solos
            //mapeamos el arreglo que tiene todos los proyectos revisamos si el proyecto que esta en memoria su id es igual
            //al id que nos retorna entonces cambia ese proyecto por el de data, si no sigeulo dejando igual
            const proyectosActualizados =proyectos.map(proyectoState => proyectoState._id ===data._id? data : proyectoState)
            setProyectos(proyectosActualizados)
            setAlerta({
                msg:'Proyecto Actualizado Correctamente',
                error:false
            })
            setTimeout(()=>{
                setAlerta({})
                navigate('/proyectos')
            },3000)
            //mostrar alerta
        } catch (error) {
            console.log(error)
        }
    }
    const nuevoProyecto = async proyecto=>{
        try {
            const token = localStorage.getItem('token')
            if(!token)return
            
            const config={
                headers:{
                    "Content-type": "application/json",
                    Authorization: `Bearer ${token} `
                }
            }
            const {data}= await clienteAxios.post('/proyectos',proyecto,config)
            
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
    const obtenerProyecto = async id =>{
        try {
            //revisamos que sea el usuario auteticado
            const token = localStorage.getItem('token')
            if(!token)return
            
            const config={
                headers:{
                    "Content-type": "application/json",
                    Authorization: `Bearer ${token} `
                }
            }
            const {data}=await clienteAxios(`/proyectos/${id}`,config)
            setProyecto(data)
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error:true
            })
            
        }
    }
    const handleModalTarea = ()=>{
        //siempre sera lo contrario, ejemplo si esta como true pasa a false etc
        setmodalFormularioTarea(!modalFormularioTarea)
        setTarea({})
    }

    const submitTarea =async tarea=>{
        if(tarea?.id){
            editarTarea(tarea)
        }else{
           await crearTarea(tarea)
        }
    }

    const editarTarea = async(tarea)=>{
       try {
            //revisamos que sea el usuario auteticado
            const token = localStorage.getItem('token')
            if(!token)return
            
            const config={
                headers:{
                    "Content-type": "application/json",
                    Authorization: `Bearer ${token} `
                }
            }
            const{data}= await clienteAxios.put(`/tareas/${tarea.id}`,tarea,config)
            //actualizar el state
            //creamos un nuevo arreglo con proyecto actualizado que es una copia de proyectos
            //iteramos sobre las tareas si el la taraa en memeria es igual al actualizado que esta en date retornamos
            //el data en el nuevo arreglo, si no es asi lo pasamos igual
            const proyectoActualizado ={...proyecto}
            proyectoActualizado.tareas = proyectoActualizado.tareas.map(tareaState => (
                tareaState._id ===data._id ? data: tareaState))
                setProyecto(proyectoActualizado);
                setAlerta({})
                setmodalFormularioTarea(false)

       } catch (error) {
           console.log(error)
       }
    }
    const crearTarea = async (tarea)=>{
        try {
            const token = localStorage.getItem('token')
            if(!token)return
            
            const config={
                headers:{
                    "Content-type": "application/json",
                    Authorization: `Bearer ${token} `
                }
            }
            const {data}=await clienteAxios.post('/tareas',tarea,config)
            //agrega la tarea al state
            const proyectoActualizado = {...proyecto};
            proyectoActualizado.tareas=[...proyecto.tareas,data]
            setProyecto(proyectoActualizado)
            setAlerta({})
            setmodalFormularioTarea(false)
        } catch (error) {
            console.log(error)
        }
    }
        
    const handleModalEditarTarea = tarea=>{
        setTarea(tarea)
        setmodalFormularioTarea(true)

    }
    const handleModalEliminarTarea =tarea=>{
        setTarea(tarea)
        setmodalEliminarTarea(!modalliminarTarea)
    }
    const eliminarTarea=async()=>{
        try {
            const token = localStorage.getItem('token')
            if(!token)return
            
            const config={
                headers:{
                    "Content-type": "application/json",
                    Authorization: `Bearer ${token} `
                }
            }
            const {data}=await clienteAxios.delete(`/tareas/${tarea._id}`,config)
            console.log(data)
            setAlerta({
                msg:data.msg,
                error:false
            })
            //agrega la tarea al state
            const proyectoActualizado = {...proyecto};
            //trae todas las tareas que tengan id diferente del que paso por la tarea por que esa ya esta eliminada
            proyectoActualizado.tareas = proyectoActualizado.tareas.filter(tareaState=>(
                tareaState._id !== tarea._id 
            ))
            setmodalEliminarTarea(false)
            setProyecto(proyectoActualizado)
            setTimeout(()=>{
                setAlerta({})
                setTarea({})
            },3000)
            
        } catch (error) {
            console.log(error)
        }
    }
    const submitColaborador = async email=>{
        setCargando(true)
        try {
            const token = localStorage.getItem('token')
            if(!token)return
            
            const config={
                headers:{
                    "Content-type": "application/json",
                    Authorization: `Bearer ${token} `
                }
            }
            const {data} =await clienteAxios.post('/proyectos/colaboradores',{email},config)
            setColaborador(data)
            setAlerta({})
        } catch (error) {
            setAlerta({msg: error.response.data.msg,
                error:true})
        }finally{
            setCargando(false)
        }
    }
    const agregarColaborador = async email =>{
    
    try {
        const token = localStorage.getItem('token')
        if(!token)return
        
        const config={
            headers:{
                "Content-type": "application/json",
                Authorization: `Bearer ${token} `
            }
        }
        const {data} =await clienteAxios.post(`/proyectos/colaboradores/${proyecto._id}`,email,config)
        setAlerta({
            msg:data.msg,
            error:false
        })
        setTimeout(()=>{
            setAlerta({})
            setColaborador({})
        },3000)
    } catch (error) {
        setAlerta({
            msg:error.response.data.msg,
            error:true
        })
    }
    }
    const handleModalEliminarColaborador= colaborador=>{
        setmodalEliminarColaborador(!modalEliminarColaborador)
        setColaborador(colaborador)

    }
    const eliminarColaborador =async()=>{
       try {
        const token = localStorage.getItem('token')
        if(!token)return
        
        const config={
            headers:{
                "Content-type": "application/json",
                Authorization: `Bearer ${token} `
            }
        }
        const {data} =await clienteAxios.post(`/proyectos/eliminar-colaborador/${proyecto._id}`,{id:colaborador._id},config)
        
        const proyectoActualiado = {...proyecto}
        proyectoActualiado.colaboradores =proyectoActualiado.colaboradores.filter(colaboradorState=>colaboradorState._id !==colaborador._id)
        setProyecto(proyectoActualiado)
        setAlerta({
            msg:data.msg,
            error:false
        })
        setmodalEliminarColaborador(false)
        setTimeout(()=>{
            setAlerta({})
            setColaborador({})
        },3000)
       } catch (error) {
           console.log(error.response)
           
       }
    }
    return ( 
        <ProyectosContext.Provider
        value={{proyectos,eliminarColaborador, handleModalEliminarColaborador,modalEliminarColaborador ,agregarColaborador,submitColaborador,colaborador,eliminarTarea,handleModalEditarTarea,tarea,mostrarAlerta,modalliminarTarea,handleModalEliminarTarea, submitTarea, cargando,submitProyectos,alerta, modalFormularioTarea,handleModalTarea, eliminarProyecto, obtenerProyecto,setProyecto,proyecto}}>
            {children}
        </ProyectosContext.Provider>
    )
}
export { ProyectosProvider }

export default ProyectosContext;