// ProductView.js
import { useProductContext } from '../../context/ProductContext';
import { exportToPDF } from '../../utils/ExportToPdf';
import { Link } from 'react-router-dom';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';

const ProductsView = () => {
    const { products, deleteProduct } = useProductContext();

    const handleExport = () => {
        exportToPDF(products, 'Productos', ['name', 'price', 'color']);
    };

    return (
        <div className="p-4">
            <h2>Gestión de Productos</h2>

            <div className="mb-3 flex gap-2">
                <Link to="/">
                    <Button label="Volver al inicio" icon="pi pi-home" className="p-button-rounded p-button-secondary" style={{ marginBottom: '1rem' }}/>
                </Link>
                <Link to="/productos/crear">
                        <Button label="Crear nuevo producto" icon="pi pi-plus" className="p-button-rounded p-button-success" style={{ marginBottom: '1rem' }}/>
                </Link>
                <Button 
                    label="Exportar PDF" 
                    icon="pi pi-file-pdf" 
                    className="p-button-rounded p-button-warning" 
                    onClick={handleExport} 
                    style={{ marginBottom: '1rem' }}
                />
            </div>

            <DataTable value={Array.isArray(products) ? products : []} paginator={false} className="p-datatable-sm p-shadow-2 mt-4">
                <Column field="name" header="Nombre" />
                <Column field="price" header="Precio" />
                <Column field="color" header="Color" />
                <Column 
                    header="Acciones" 
                    body={(rowData) => (
                        <>
                            <Link to={`/productos/editar/${rowData.id}`}>
                                <Button 
                                    label="Editar" 
                                    icon="pi pi-pencil" 
                                    className="p-button-rounded p-button-info mr-2" 
                                />
                            </Link>
                            <Button 
                                label="Eliminar" 
                                icon="pi pi-trash" 
                                className="p-button-rounded p-button-danger" 
                                onClick={() => deleteProduct(rowData.id)} 
                            />
                        </>
                    )} 
                />
            </DataTable>

        </div>
    );
};

export default ProductsView;
