import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthLayout from './Layouts/AuthLayout';
import  Login  from './Paginas/Login';
import  Registrar  from './Paginas/Registrar';
import OlvidePassword from './Paginas/OlvidePassword';
import NuevoPassword from './Paginas/NuevoPassword';
import ConfirmarCuenta from './Paginas/ConfirmarCuenta';
import { AuthProvider } from './context/AuthProvider';
import RutaProtegida from './Layouts/RutaProtegida';
import Proyectos from './Paginas/Proyectos';
import NuevoProyecto from './Paginas/NuevoProyecto';
import { ProyectosProvider } from './context/ProyectosProvider';

function App() {


  return (
   <BrowserRouter>
   <AuthProvider>
   <ProyectosProvider>
    <Routes>
        <Route path='/' element={<AuthLayout/>}>
            <Route index element={<Login/>}/>
            <Route path='registrar' element={<Registrar/>}/> 
            <Route path='olvide-password' element={<OlvidePassword/>}/>
            <Route path='nuevo-password/:token' element={<NuevoPassword/>}/>
            <Route path='confirmar/:id' element={<ConfirmarCuenta/>}/>
        </Route>
        <Route path='/proyectos'element={<RutaProtegida/>}>
            <Route index element={<Proyectos/>}/>
            <Route path="crear-proyecto" element={<NuevoProyecto/>}  />

        </Route>
    </Routes>
    </ProyectosProvider>
    </AuthProvider>
   </BrowserRouter>
  )
}

export default App
