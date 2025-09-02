import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

export const ProductContext = createContext();

const API_URL = "http://localhost:3000/productos";

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Obtiene productos
  const getProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token"); // opcional si tu backend usa JWT
      const { data: responseData } = await axios.get(API_URL, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });

      console.log("Respuesta productos:", responseData);

      setProducts(Array.isArray(responseData.data) ? responseData.data : []);
    } catch (e) {
      setError(e.response?.data?.message || e.message);
      console.error("Error fetching products:", e.response || e);
    } finally {
      setLoading(false);
    }
  };

  // Agrega un producto
  const addProduct = async (newProduct) => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      const { data: responseData } = await axios.post(API_URL, newProduct, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });

      const created =
        Array.isArray(responseData.data) ? responseData.data[0] : responseData.data || responseData;

      setProducts((prev) => (Array.isArray(prev) ? [...prev, created] : [created]));
    } catch (e) {
      setError(e.response?.data?.message || e.message);
      console.error("Error adding product:", e.response || e);
    } finally {
      setLoading(false);
    }
  };

  // Edita un producto
  const editProduct = async (id, updated) => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      await axios.put(`${API_URL}/${id}`, updated, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });

      setProducts((prev) =>
        prev.map((p) => (p.id === id ? { ...updated, id } : p))
      );
    } catch (e) {
      setError(e.response?.data?.message || e.message);
      console.error("Error editing product:", e.response || e);
    } finally {
      setLoading(false);
    }
  };

  // Elimina un producto
  const deleteProduct = async (id) => {
    setError(null);
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${API_URL}/${id}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (e) {
      setError(e.response?.data?.message || e.message);
      console.error("Error deleting product:", e.response || e);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        error,
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

// Hook para usar el contexto
export const useProductContext = () => useContext(ProductContext);
