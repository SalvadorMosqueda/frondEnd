import {useEffect}from 'react'
//leer datos de la url
import { useParams,Link } from 'react-router-dom'
//use en los hooks vendran todos los proyectos y usando ese componente todas las funciones se pasaran
import useProyectos from '../hooks/useProyectos'
import ModalFormularioTarea from '../Componentes/ModalFormularioTarea'
import ModalEliminarTarea from '../Componentes/ModalEliminarTarea'
import Tarea from '../Componentes/Tarea'
import Alerta from '../Componentes/Alerta'
import Colaborador from '../Componentes/Colaborador'
import ModalEliminarColaborador from '../Componentes/ModalEliminarColaborador'
import useAdmin from '../hooks/useAdmin'
//importamos socket
import io from 'socket.io-client'
let socket;



const Proyecto = () => {
    const params = useParams()
    const {obtenerProyecto,proyecto,cargando,handleModalTarea,alerta,submitTareasProyecto} =useProyectos()
    const {nombre}=proyecto

    const admin =useAdmin()

    useEffect(()=>{
        obtenerProyecto(params.id)
    },[])

    //use efect para socket
    useEffect(()=>{
        //le decimos a que direccion nos queremos conectar
        socket = io(import.meta.env.VITE_BACKEND_URL)
        //creamos un evento con esta emit
        //esto le dira en que proyecto esta este usuario que esta visitando actual mente el pryecto 
        socket.emit('abrir proyecto',params.id)
    },[])

        //siempre estara ala espera y a recbir tarea aregada
       useEffect(()=>{
        socket.on('tarea agregada',tareaNueva=>{
        if(tareaNueva.proyecto === proyecto._id){
         submitTareasProyecto(tareaNueva)
        }  

        })
        
    })        
    if(cargando) return 'Cargando'
    const{msg}=alerta


  return (
   <>
    
    <div className='flex justify-between'>
        <h1 className='font-black text-4xl'>{nombre}</h1>
        {admin &&(
        <div className='flex items-center gap-2 text-gray-400 hover:text-black' >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
            <Link to={`/proyectos/editar/${params.id}`} className='uppercase font-bold'>Editar</Link>
        </div>
        )}
        </div>  
        {admin&&(
        <button onClick={handleModalTarea} type='button' className=' flex gap-2 items-center justify-center text-sm px-5 py-3 w-full md:w-auto rounded-lg uppercase font-bold bg-sky-400 text-white
        text-center mt-5'>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
            </svg>
            Nueva Tarea
        </button>
        )}
        <p className='font-bold text-xl mt-10'>Tareas del proyecto</p>
        <div className='bg-white shadow mt-10 rounded-lg'>
            {proyecto.tareas?.length?
            //por cada tarea lo agregamos a tarea creamos un componte le pasos el id y pasamos toda la info al nuevo componente 
            proyecto.tareas?.map(tarea =>(
                <Tarea
                key={tarea._id}
                tarea={tarea}
                />
            ))
            :
            <p className='text-center my-5 p-10 '>No hay tareas en este proyecto</p>
            }       
        </div>
        {admin&&(
        <>
        <div className='flex items-center justify-between mt-10'>
            <p className='font-bold text-xl'>Colaboradores</p>
            <Link className='text-gray-400 hover:text-black font-bold uppercase' to={`/proyectos/nuevo-colaborador/${proyecto._id}`}>
            A??adir
            </Link>
        </div>
        <div className='bg-white shadow mt-10 rounded-lg'>
            {proyecto.colaboradores?.length?
            //por cada tarea lo agregamos a tarea creamos un componte le pasos el id y pasamos toda la info al nuevo componente 
            proyecto.colaboradores?.map(colaborador =>(
                <Colaborador
                key={colaborador._id}
                colaborador={colaborador}
                />
            ))
            :
            <p className='text-center my-5 p-10 '>No hay colaboradoes en este proyecto</p>
            } 
            </div>
             </>
             )}
            
        
      
    <ModalFormularioTarea/>
    <ModalEliminarTarea/>
   <ModalEliminarColaborador/>
   
    </>
    )
  
}

export default Proyecto