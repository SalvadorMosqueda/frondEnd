import React from 'react'
import useProyectos from '../hooks/useProyectos'
import PreviwProyecto from '../Componentes/PreviwProyecto'
const Proyectos = () => {
    //extremos proyectos de provaider
    const {proyectos}=useProyectos()
    

  return (
    <>
        <h1  className='text-4xl font-black '>Proyectos</h1>
        <div className='bg-white shadow rounded-lg p-5 mt-5'>   
            {proyectos.lenght ? 
            //creamos un componente por cada tarea
            proyectos.map(proyecto =>(
                <PreviwProyecto
                key={proyecto._id}
                proyecto={proyecto}
                />

            ))
            
            
            : <p className=' text-gray-600 uppercase mt-5 text-center'>no hay nada</p>}
        </div>
    
    </>
  )
}

export default Proyectos