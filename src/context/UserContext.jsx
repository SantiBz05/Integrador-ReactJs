import { createContext, useState, useEffect, useContext } from "react";
import axios from 'axios';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [users, setUsers] = useState([]);
    const API_URL = "http://localhost:3000/usuarios";

    const getUsers = async () => {
        try {
            const { data } = await axios.get(API_URL);
            setUsers(data);
        } catch (error) {
            console.error("Error al obtener usuarios", error);
            alert("Error al obtener los usuarios.");
        }
    };

    const handleAddUser = async ({ name, color, age, power }) => {
        try {
            const { data: created } = await axios.post(API_URL, {
                name,
                data: { color, age: Number(age), power },
            });
            setUsers((prevUsers) => [...prevUsers, created]);
        } catch (error) {
            console.error("Error al añadir el usuario", error);
            alert("Error al añadir el usuario.");
        }
    };

    const handleEditUser = async ({ _id, name, color, age, power }) => {
        try {
            await axios.put(`${API_URL}/${_id}`, {
                name,
                data: { color, age: Number(age), power },
            });
            setUsers((prev) =>
                prev.map((u) =>
                    u._id === _id ? { ...u, name, data: { color, age, power } } : u
                )
            );
        } catch (error) {
            alert("Error al editar usuario");
            console.error(error);
        }
    };

    const handleDeleteUser = async (id) => {
        try {
            await axios.delete(`${API_URL}/${id}`);
            setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
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
                handleAddUser,
                handleEditUser,
                handleDeleteUser,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => {
    return useContext(UserContext);
};
