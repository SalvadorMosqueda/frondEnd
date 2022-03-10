import { useContext } from "react";
import AuthContext, { AuthProvider } from "../context/AuthProvider";

const useAuth = () => {
    //aqui extraemos las valores de context
    return useContext(AuthContext)
}

export default useAuth