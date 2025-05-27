import { createContext, useState, useEffect, useContext } from "react";
import axios from 'axios';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [users, setUsers] = useState([]);
    
    const API_URL = "http://localhost:3000/usuarios";

    const getUsers = async () => {
        try {
            const { data } = await axios.get(API_URL);
            const userList = Array.isArray(data?.data) ? data.data : data;
            setUsers(userList);
        } catch (error) {
            console.error("Error al obtener usuarios", error);
            alert("Error al obtener los usuarios.");
        }
    };

    const addUser = async ({ name, lastname ,email, age }) => {
        try {
            const { data } = await axios.post(API_URL, {
                name, lastname ,email, age
            });
            const created = Array.isArray(data?.data) ? data.data[0] : data.data || data;
            setUsers((prevUsers) => [...prevUsers, created]);
        } catch (error) {
            console.error("Error al añadir el usuario", error);
            alert("Error al añadir el usuario.");
        }
    };

    const editUser = async (id, { name, lastname ,email, age }) => {
        try {
            await axios.put(`${API_URL}/${id}`, {
                name, lastname ,email, age
            });
            setUsers((prev) =>
                prev.map((u) =>
                    u.id === id ? { ...u, name, lastname ,email, age } : u
                )
            );
        } catch (error) {
            alert("Error al editar usuario");
            console.error(error);
        }
    };

    const deleteUser = async (id) => {
        try {
            await axios.delete(`${API_URL}/${id}`);
            setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
        } catch (error) {
            console.error("Error al eliminar el usuario", error);
            alert("Error al eliminar el usuario.");
        }
    };

    useEffect(() => {
        getUsers();
    }, []);

    return (
        <UserContext.Provider
            value={{
                users,
                getUsers,
                addUser,
                editUser,
                deleteUser,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => {
    return useContext(UserContext);
};
