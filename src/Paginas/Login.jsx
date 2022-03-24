import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import clienteAxios from "../../config/ClienteAxios"
import Alerta from "../Componentes/Alerta"
import useAuth from "../hooks/useAuth"


 const Login = () => {

  const navigate = useNavigate()
   //state incial del formulario
   const[email,setEmail]=useState('')
   const[password,setPassword]=useState('')
   const[alerta,setAlerta]=useState({})

  const{setAuth,cargando,auth}=useAuth()
 

   const handleSubmit = async e =>{
      e.preventDefault();
      if([email,password].includes('')){
        setAlerta({msg:'todos los campos son obligatorios',error:true})
        return
      }
      setAlerta({})
      try {
        const {data} = await clienteAxios.post('/usuarios/login',{email,password})
        //guardamo el token en localstorage
       localStorage.setItem('token',data.token)
       //guardamos la if del usuario
        setAuth(data)
        navigate('/proyectos')
      } catch (error) {
        setAlerta({msg:error.response.data.msg,error:true})
      }
   }

  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">Inicia sesion y administra tus <span className="text-slate-600">proyectos</span> </h1>
     {alerta.msg && <Alerta alerta={alerta}/>}
      <form onSubmit={handleSubmit} className="my-10 bg-white shadow rounded-lg p-10">
            <div className="my-5">
                <label className="uppercase text-gray-600 block text-xl font-bold" htmlFor="email">Email</label>
                <input value={email} onChange={e=>setEmail(e.target.value)} className="w-full mt-3 p-3 border rounded-xl bg-gray-50" type="email" name="email" id="username"
                 placeholder="email de Registro" 
                />

            </div>
            <div className="my-5">
                <label className="uppercase text-gray-600 block text-xl font-bold" htmlFor="password">Password</label>
                <input value={password} onChange={e=>setPassword(e.target.value)} className="w-full mt-3 p-3 border rounded-xl bg-gray-50" type="password" name="password" id="password"
                 placeholder="tu password" 
                />

            </div>
           
                <input type="submit" className=" bg-blue-700 w-full py-3 text-white uppercase font-bold rounded hover:bg-blue-800 mb-5" value='Iniciar Sesion'/>

           
        </form>
        <nav className="lg:flex lg:justify-between">
          <Link className="block text-center my-5 text-slate-500 uppercase text-sm" to="registrar">
          No tienes una cuenta? Registrate
          </Link>
          <Link className="block text-center my-5 text-slate-500 uppercase text-sm" to="olvide-password">
          Olvide Mi Password
          </Link>
        </nav>
    </>
  )
}

export default Login