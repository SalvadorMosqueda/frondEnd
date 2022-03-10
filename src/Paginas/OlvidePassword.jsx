import { Link } from "react-router-dom"
import{useState} from "react"
import Alerta from "../Componentes/Alerta"
import clienteAxios from "../../config/ClienteAxios"


const OlvidePassword = () => {
    const [email,setEmail]=useState('')
    const [alerta,setAlerta]=useState({})

    const handleSubmit=async(e)=>{
        e.preventDefault()
        if(email===''|| email.length<6){
        setAlerta({msg:'el Email es obligatorio',error:true})
            return
    }
    try {
        const {data} =await clienteAxios.post(`/usuarios/olvide-password`,{email}
        )
        setAlerta({
            msg:data.msg,
            error:false
        })
    } catch (error) {
     console.log(error.response)
    }
    }
  return (
   <>
    <h1 className="text-sky-600 font-black text-6xl capitalize">recupera tu acceso y no pierdas tus
    {" "}
    
    <span className="text-slate-600">proyectos</span> </h1>
    {alerta.msg &&<Alerta alerta={alerta}/> }
    <form  onSubmit={handleSubmit} className="my-10 bg-white shadow rounded-lg p-10"> 
          <div className="my-5">
              <label className="uppercase text-gray-600 block text-xl font-bold" htmlFor="email">Email</label>
              <input value={email} onChange={e=>setEmail(e.target.value)} className="w-full mt-3 p-3 border rounded-xl bg-gray-50" type="email" name="email" id="username"
               placeholder="Email de Registro" 
              />

          </div>
         
         
              <input type="submit" className=" bg-blue-700 w-full py-3 text-white uppercase font-bold rounded hover:bg-blue-800 mb-5" value='Enviar Emial'/>

         
      </form>
      <nav className="lg:flex lg:justify-between">
        <Link className="block text-center my-5 text-slate-500 uppercase text-sm" to="/">
        ya tienes una cuenta? inicia sesion
        </Link>
        
      </nav>
  </>
  )
}

export default OlvidePassword