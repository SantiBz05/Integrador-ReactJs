import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({children}) =>{
    const [user,setUser] = useState(null)
    const navigate = useNavigate()

    useEffect(()=>{
        const token = localStorage.getItem('token')
        if(token){
            try {
                const base64Payload = token.split('.')[1]
                if(base64Payload){
                    const payload = JSON.parse(atob(base64Payload))
                    setUser({...payload, token})
                }
            } catch (e) {
                console.error("Error al parsear token:", e)
                localStorage.removeItem('token')
            }
        }
    },[])

    const login = async (credentials)=>{
        try {
            const response = await axios.post('http://localhost:3000/auth/login', credentials)
            const token = response.data.token
            localStorage.setItem('token', token)
            const payload = JSON.parse(atob(token.split('.')[1]))
            setUser({...payload.user, token}) // si el payload tiene {user:{...}}
            navigate('/')
        } catch (error) {
            if(error.response){
                alert(error.response.data.message)
            } else {
                alert("Error de conexión")
            }
        }
    }

    const register = async (userData) =>{
        try {
            const response = await axios.post('http://localhost:3000/auth/register', userData)
            if(response.status === 201){
                alert("Usuario creado exitosamente")
                navigate('/inicio-sesion')
            }else{
                alert(response.message)
            }
        } catch (error) {
            alert("Hubo un error al registrar el usuario")
        }
    }

    const logout = () =>{
        setUser(null)
        localStorage.removeItem('token')
        navigate('/inicio-sesion')
    }

    return(
        <AuthContext.Provider value={{user, setUser, register, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}