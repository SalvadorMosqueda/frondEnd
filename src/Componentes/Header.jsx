import React from 'react'
import { Link } from 'react-router-dom'
import useProyectos from '../hooks/useProyectos'
const Header = () => {
    const {handleBuscador} = useProyectos()

  return (
    <header className='px-4 py-4 bg-white border-b'>
    <div className='md:flex md:justify-between'>
        <h2 className='text-4xl text-sky-600 font-black text-center mb-5 md:mb-0'>
            UpTask
        </h2>
        <div className='flex items-center flex-col md:flex-row gap-4'>
            <button onClick={handleBuscador} type='button' className='font-bold uppercase'> 
                Buscar Proyecto
            </button>
            <Link to='/proyectos' className='font-bold uppercase'>
                Proyectos
            </Link>
            <button type='button' className='text-white text-sm bg-sky-600 p-3 rounded-md uppercase font-bold'>
                Cerrar Sesion
            </button>
          
        </div>
    </div>

    </header>
  )
}

export default Header