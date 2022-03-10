import React, { useState } from 'react'
import useProyectos from '../hooks/useProyectos'
import Alerta from './Alerta'

const FormularioProyecto = () => {

    const[nombre,setNombre]=useState('')
    const[descripcion,setDescripcion]=useState('')
    const[fechaEntrega,setFechaEntrega]=useState('')
    const[cliente,setCliente]=useState('')
    //obtenemos la funcion

    const {mostrarAlerta,alerta,submitProyectos}=useProyectos()

    const handleSubmit = async e=>{
        e.preventDefault()
        if([nombre,descripcion,fechaEntrega,cliente].includes('')){
            console.log('error')
            mostrarAlerta({msg:'Todos los campos son obligatorios',error:true})
            return
        }
        //pasar los datos hacia provaider
        await submitProyectos({nombre,descripcion,fechaEntrega,cliente})
        setNombre("")
        setCliente("")
        setFechaEntrega("")
        setDescripcion("")

    }

  return (
    <form action="" onSubmit={handleSubmit} className='bg-white py-10 px-5 md:w-1/2 roundend-lg shadow'>
        {alerta.msg && <Alerta alerta={alerta}/>}
        <div className='mb-5'>
            <label htmlFor="nombre" className='text-gray-700  uppercase font-bold text-sm'>
                    Nombre  Proyecto</label>

            <input type="text"value={nombre} onChange={e =>setNombre(e.target.value)} className='border w-full p-2 mt-2 placeholder-gray-400 rounded-md'placeholder='Nombre del proyecto' name="nombre" id="nombre" />
        </div>
        <div className='mb-5'>
            <label htmlFor="descripcion" className='text-gray-700  uppercase font-bold text-sm'>
                    Descripcion del Proyecto</label>

            <textarea value={descripcion} onChange={e =>setDescripcion(e.target.value)}  type="text" className='border w-full p-2 mt-2 placeholder-gray-400 rounded-md'placeholder='descripcion del proyecto' name="descripcion" id="descripcion" />
        </div>
        
        <div className='mb-5'>
            <label htmlFor="fecha-entrega" className='text-gray-700  uppercase font-bold text-sm'>
                    Fecha de entrega</label>

            <input value={fechaEntrega} onChange={e =>setFechaEntrega(e.target.value)}  type="date" className='border w-full p-2 mt-2 placeholder-gray-400 rounded-md'placeholder='fecha de Entrega' name="fechaEntrega" id="fecha-entrega" />
        </div>
        <div className='mb-5'>
            <label htmlFor="cliente" className='text-gray-700  uppercase font-bold text-sm'>
                    Nombre Cliente</label>

            <input type="text"value={cliente} onChange={e =>setCliente(e.target.value)} className='border w-full p-2 mt-2 placeholder-gray-400 rounded-md'placeholder='Nombre del cliente' name="cliente" id="cliente" />
        </div>
        <input className='bg-sky-600 w-full p-3 uppercase font-bold text-white rounded hover:bg-sky-700 transition-colors' type="submit" value="Crear Proyecto"  name="" id="" />
        
        </form>
  )
}

export default FormularioProyecto