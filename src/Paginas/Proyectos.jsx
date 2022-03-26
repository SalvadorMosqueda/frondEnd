import {useEffect}from 'react'
import useProyectos from '../hooks/useProyectos'
import PreviwProyecto from '../Componentes/PreviwProyecto'
import Alerta from '../Componentes/Alerta'
const Proyectos = () => {
    //extremos proyectos de provaider
    const {proyectos,alerta}=useProyectos()

    


    const{msg} =alerta
  return (

    <>
        <h1  className='text-4xl font-black '>Proyectos</h1>
        {msg && <Alerta alerta={alerta}/>}
        <div className='bg-white shadow rounded-lg mt-5'>   
            {proyectos.length ? 
            //creamos un componente por cada tarea
            proyectos.map(proyecto =>(
                <PreviwProyecto
                key={proyecto._id}
                proyecto={proyecto}
                />

            ))
            
            
            : <p className=' text-gray-600 uppercase mt-5 text-center p-5'>no hay nada</p>}
        </div>
    
    </>
  )
}

export default Proyectos