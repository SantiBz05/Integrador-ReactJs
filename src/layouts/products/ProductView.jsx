// ProductView.js
import { ProductContext } from '../../context/ProductCotext';
import { exportToPDF } from '../../utils/ExportToPdf';
import { Link } from 'react-router-dom';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';

const ProductsView = () => {
    const {products , deleteProducts } = ProductContext();

    const handleExport = () => {
        exportToPDF(products, 'Productos', ['nombre', 'precio', 'color']);
    };

    return (
        <div className="p-4">
            <h2>Gestión de Productos</h2>

            <DataTable alue={Array.isArray(products) ? products : []} paginator={false} className="p-datatable-sm p-shadow-2 mt-4">
                <Column field="nombreProds" header="Producto" />
                <Column field="precioProds" header="Precio" />
                <Column field="colorProds" header="Color" />
            </DataTable>
        </div>
    );
};

export default ProductsView;
