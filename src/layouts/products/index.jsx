import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductsView from './ProductView';
import ProductsForm from './ProductForm';

export default function ProductsModule() {
  return (
    <Routes>
      <Route path="/" element={<ProductsView />} />
      <Route path="/crear" element={<ProductsForm />} />
      <Route path="/editar/:id" element={<ProductsForm />} />
    </Routes>
  );
}