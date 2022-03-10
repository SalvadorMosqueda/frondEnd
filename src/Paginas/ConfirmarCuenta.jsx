import { useEffect,useState } from "react"
import { useParams,Link}from 'react-router-dom'
import clienteAxios from "../../config/ClienteAxios"
import Alerta from "../Componentes/Alerta"

 const ConfirmarCuenta = () => {

    const [alerta,setAlerta]=useState({})
    const [cuentaConfirmada,setCuentaConfirmada]=useState(false)

    //leer el id 
    const  params = useParams();
    const {id} =params
    //pasamos arreglo basio para que se ejecute solo una vez
    useEffect(()=>{
        const confirmarCuenta = async()=>{
            try {
                const url = `/usuarios/confirmar/${id}`
                //si no le pasamos ni un metodo lo toma como get
                const {data} = await clienteAxios(url)
                setAlerta({
                    msg:data.msg,error:false
                })
                setCuentaConfirmada(true)

            } catch (error) {
                setAlerta({msg:error.response.data.msg,error:true})
            }
        }
        confirmarCuenta()
    },[])
    return (
    <>
        <h1 className="text-sky-600 font-black text-6xl capitalize">Confirma tu cuenta</h1>
        <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
            {alerta.msg &&  <Alerta alerta={alerta}/>}
            {cuentaConfirmada&&(<Link className="block text-center my-5 text-slate-500 uppercase text-sm" to="/">
             inicia sesion
            </Link>

            )}
        </div>
    
    </>
  )
}
export default ConfirmarCuenta
