import { Link } from "react-router-dom"
import { useState } from "react"
import Alerta from "../Componentes/Alerta"
import clienteAxios from "../../config/ClienteAxios"

 const Registrar = () => {

    //cremeamos el state para validar formulario local
    const [datos,setDatos]=useState({
        nombre:'',
        email:'',
        password2:'',
        password:''
    })

    //state para las alertas
    const [alerta, setAlerta]=useState({})

    //extramos los datos del obejeto
    const {nombre,email,password,password2}=datos

    //funciones para ir llenando los campos
    //usamos speed predator para tomar una copia exacta  y donde el name de donde hicismos click sea igual agregaremos el valor

    const handleChange = (e)=>{
        setDatos({
            ...datos,[e.target.name]: e.target.value
        })
        console.log(datos)
    }
    //validamos el formulario
    const handleSubmit   =e =>{
        e.preventDefault()
        if(nombre.trim()===''|| password.trim()===''|| password2.trim()===''||email.trim()===''){
            setAlerta({msg: 'todos los campos son obligatorios', error:true})
            return;
        }else{
            setAlerta({})
        }
        //password minimo de 6 caracteres
        if(password.length<6){
            setAlerta({msg: 'La password minimo debe tener 6 caracteres', error:true})
            return;
        }
        setAlerta({})
        // revisar que los 2 password sean iguales
        if(password !== password2){
            setAlerta({msg:'Los password no coninciden', error:true})
            return;
        }
        setAlerta({})
        //creamos el usuario en la api
        Registrar()
    }

    //funcion para hacer peticion 
    const Registrar = async ()=>{
        try {
            //extramos directamente data del resultado de la api
            const {data } = await clienteAxios.post(`/usuarios`,{nombre,email,password})
            //mandamos el mensaje que viene del servidor a nuestro componente 
            setAlerta({msg:data.msg,error:false})

            //reiciamos los datos
            setDatos({
                nombre:'',
                email:'',
                password2:'',
                password:''
            })
            
        } catch (error) {
            //response nos deja leer el error
            setAlerta({msg:error.response.data.msg,error:true})
        }
    }

  return (
    <>
    <h1 className="text-sky-600 font-black text-6xl capitalize">crea tu cuenta  y administra tus
    {" "}
    <span className="text-slate-600">proyectos</span> </h1>
    
    {alerta.msg && <Alerta alerta={alerta}/>}
    <form onSubmit={handleSubmit}  className="my-10 bg-white shadow rounded-lg p-10">

         <div className="my-5">
              <label className="uppercase text-gray-600 block text-xl font-bold" htmlFor="nombre">Nombre</label>
              <input onChange={handleChange} value={nombre} className="w-full mt-3 p-3 border rounded-xl bg-gray-50" type="nombre" name="nombre" id="tu nombre"
               placeholder="tu nombre" 
              />

          </div>
          <div className="my-5">
              <label className="uppercase text-gray-600 block text-xl font-bold" htmlFor="email">Email</label>
              <input value={email}  onChange={handleChange} className="w-full mt-3 p-3 border rounded-xl bg-gray-50" type="email" name="email" id="username"
               placeholder="email de Registro" 
              />

          </div>
          <div className="my-5">
              <label className="uppercase text-gray-600 block text-xl font-bold" htmlFor="password">Password</label>
              <input value={password}  onChange={handleChange} className="w-full mt-3 p-3 border rounded-xl bg-gray-50" type="password" name="password" id="password"
               placeholder="tu password" 
              />

          </div>
          <div className="my-5">
              <label className="uppercase text-gray-600 block text-xl font-bold" htmlFor="password2">Repetir Password</label>
              <input  value={password2}  onChange={handleChange} className="w-full mt-3 p-3 border rounded-xl bg-gray-50" type="password" name="password2" id="password2"
               placeholder="Repite tu password" 
              />

          </div>
         
              <input type="submit" className=" bg-blue-700 w-full py-3 text-white uppercase font-bold rounded hover:bg-blue-800 mb-5" value='Iniciar Sesion'/>

         
      </form>
      <nav className="lg:flex lg:justify-between">
        <Link className="block text-center my-5 text-slate-500 uppercase text-sm" to="/">
        ya tienes una cuenta? inicia sesion
        </Link>
        <Link className="block text-center my-5 text-slate-500 uppercase text-sm" to="olvide-password">
        Olvide Mi Password
        </Link>
      </nav>
  </>
  )
}
export default Registrar