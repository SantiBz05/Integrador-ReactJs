import { createContext, useState, useEffect, useContext } from "react";
import axios from 'axios';

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const API_URL = "http://localhost:3000/productos";

    const getProducts = async () => {
        try {
            const { data } = await axios.get(API_URL);
            setProducts(data);
        } catch (error) {
            console.error("Error al obtener productos", error);
            alert("Error al obtener los productos.");
        }
    };

    const handleAddProduct = async ({ name, price, color }) => {
        try {
            const { data: created } = await axios.post(API_URL, {
                name, price, color,
            });
            setProducts((prevProducts) => [...prevProducts, created]);
        } catch (error) {
            console.error("Error al añadir el producto", error);
            alert("Error al añadir el producto.");
        }
    };

    const handleEditProduct = async ({ _id, name, price, color }) => {
        try {
            await axios.put(`${API_URL}/${_id}`, {
                name, price, color,
            });
            setProducts((prev) =>
                prev.map((p) =>
                    p._id === _id ? { ...p, name, price, color } : p
                )
            );
        } catch (error) {
            alert("Error al editar producto");
            console.error(error);
        }
    };

    const handleDeleteProduct = async (id) => {
        try {
            await axios.delete(`${API_URL}/${id}`);
            setProducts((prevProducts) => prevProducts.filter((product) => product._id !== id));
        } catch (error) {
            console.error("Error al eliminar el producto", error);
            alert("Error al eliminar el producto.");
        }
    };

    useEffect(() => {
        getProducts();
    }, []);

    return (
        <ProductContext.Provider
            value={{
                products,
                getProducts,
                handleAddProduct,
                handleEditProduct,
                handleDeleteProduct,
            }}
        >
            {children}
        </ProductContext.Provider>
    );
};

export const useProductContext = () => {
    return useContext(ProductContext);
};
