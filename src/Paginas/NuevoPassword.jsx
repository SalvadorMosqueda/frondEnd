import { useEffect,useState } from "react"
import { Link,useParams } from "react-router-dom"
import clienteAxios from "../../config/ClienteAxios"
import Alerta from "../Componentes/Alerta"

 const NuevoPassword = () => {
     const params =useParams()
     const {token}=params;
    //state para ocultar el formulario en caso de que el token no sea valido
     const [tokenValido,setTokenValido]=useState(false)
     const [alerta,setAlerta]=useState({})     
     const [password,setPassword]=useState('')
     const [passwordModiciado, setPasswordModificado]=useState(false)



     useEffect(()=>{
        const comprobarToken = async()=>{
            try {
               await clienteAxios(`/usuarios/olvide-password/${token}`)
               setTokenValido(true)
            } catch (error) {
                setAlerta({msg:error.response.data.msg,error:true})
            }
        }
        comprobarToken()
     },[])

     //funcion para revisar formulario

     const handleSubmit= async(e)=>{
         e.preventDefault()
         if(password.length<6){
             setAlerta({
                 msg:'El password debe ser minimo de 6 caracateres',
                 error:true

             })
             return
         }
        
         try {
             setAlerta({})
             const url= `/usuarios/olvide-password/${token}`
             const {data}=await clienteAxios.post(url,{password})
             setAlerta({msg:data.msg,error:false})
             setPasswordModificado(true);

         } catch (error) {
             setAlerta({msg: error.response.data.msg})
         }
     }
  return (
    <>
    <h1 className="text-sky-600 font-black text-6xl capitalize">Restablece tu password y recupera tus
    {" "}
    <span className="text-slate-600">proyectos</span> </h1>
    {alerta.msg && <Alerta alerta={alerta}/>}
   {tokenValido &&( <form onSubmit={handleSubmit} className="my-10 bg-white shadow rounded-lg p-10">

       
<div className="my-5">
    <label className="uppercase text-gray-600 block text-xl font-bold" htmlFor="password"> Nuevo Password</label>
    <input value={password} onChange={e=>setPassword(e.target.value)} className="w-full mt-3 p-3 border rounded-xl bg-gray-50" type="password" name="password" id="password"
     placeholder="Escribe tu nuevo password" 
    />


</div>


    <input type="submit" className=" bg-blue-700 w-full py-3 text-white uppercase font-bold rounded hover:bg-blue-800 mb-5" value='Guardar Nuevo Password'/>


</form>

)}
      {passwordModiciado&&(<Link className="block text-center my-5 text-slate-500 uppercase text-sm" to="/">
             inicia sesion
            </Link>

            )}
  </>
  )
}

export default NuevoPassword