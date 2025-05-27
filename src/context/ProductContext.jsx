import { createContext, useState, useEffect, useContext } from "react";
import axios from 'axios';

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    
    const API_URL = "http://localhost:3000/productos";

    const getProducts = async () => {
        try {
            const { data } = await axios.get(API_URL);
            const productList = Array.isArray(data?.data) ? data.data : data;
            setProducts(productList);
        } catch (error) {
            console.error("Error al obtener productos", error);
            alert("Error al obtener los productos.");
        }
    };

    const addProduct = async ({ name, price, color }) => {
        try {
            const { data } = await axios.post(API_URL, {
                name, price, color,
            });
            const created = Array.isArray(data?.data) ? data.data[0] : data.data || data;
            setProducts((prevProducts) => [...prevProducts, created]);
        } catch (error) {
            console.error("Error al añadir el producto", error);
            alert("Error al añadir el producto.");
        }
    };

    const editProduct = async (id, { name, price, color }) => {
    try {
        await axios.put(`${API_URL}/${id}`, {
            name, price, color,
        });
        setProducts((prev) =>
            prev.map((p) =>
                p.id === id ? { ...p, name, price, color } : p
            )
        );
    } catch (error) {
        alert("Error al editar producto");
        console.error(error);
    }
};


    const deleteProduct = async (id) => {
        try {
            await axios.delete(`${API_URL}/${id}`);
            setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
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
                addProduct,
                editProduct,
                deleteProduct,
            }}
        >
            {children}
        </ProductContext.Provider>
    );
};

export const useProductContext = () => {
    return useContext(ProductContext);
};
