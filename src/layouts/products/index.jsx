import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductsView from './ProductView';
import ProductsForm from './ProductForm';

const ProductsModule = () => {
  return (
      <Routes>
        <Route path="/productos" element={<ProductsView />} />    
        <Route path="/productos/crear" element={<ProductsForm />} />    
        <Route path="/editar/:id" element={<ProductsForm />} />
      </Routes>
  )
};

export default ProductsModule;