// import { useState } from "react";
// import { Button } from 'primereact/button';
// import { Column } from 'primereact/column';
// import { DataTable } from 'primereact/datatable';
// import { exportToPDF } from '../utils/ExportToPdf';


// const UnicornsView = ({
//     handleAddUnicorn,
//     handleEditUnicorn,
//     handleDeleteUnicorn,
//     handleGetUnicorns,
//     unicorns,
// }) => {
//     const [name, setName] = useState("");
//     const [color, setColor] = useState("");
//     const [age, setAge] = useState("");
//     const [power, setPower] = useState("");
//     const [selectedUnicorn, setSelectedUnicorn] = useState(null);

//     const onRowSelect = (e) => {
//         const unicorn = e.value;
//         if (!unicorn) return;

//         setSelectedUnicorn(unicorn);
//         setName(unicorn.name || "");
//         setColor(unicorn.data?.color || "");
//         setAge(unicorn.data?.age || "");
//         setPower(unicorn.data?.power || "");
//     };

//     const onManualSelectAndDelete = (unicorn) => {
//         setSelectedUnicorn(unicorn);
//         setName(unicorn.name || "");
//         setColor(unicorn.data?.color || "");
//         setAge(unicorn.data?.age || "");
//         setPower(unicorn.data?.power || "");
        
//         // Elimina el unicornio seleccionado
//         handleDeleteUnicorn(unicorn._id);
//         clearForm();
//     };

//     const onDelete = () => {
//         if (!selectedUnicorn?._id) {
//             alert("Selecciona un unicornio para eliminar.");
//             return;
//         }

//         handleDeleteUnicorn(selectedUnicorn._id);
//         clearForm();
//     };

//     const clearForm = () => {
//         setName("");
//         setColor("");
//         setAge("");
//         setPower("");
//         setSelectedUnicorn(null);
//     };

//     const handleExport = () => {
//         exportToPDF(unicorns, 'Unicornios');
//       };

//     return (
//         <div className="p-4">
//             <h2>Gestión de Unicornios</h2>

//             <Button label="Exportar PDF" icon="pi pi-file-pdf" className="p-button-rounded p-button-warning" onClick={handleExport} />
            
//             <DataTable
//                 value={Array.isArray(unicorns) ? unicorns : []} 
//                 selectionMode="single"
//                 dataKey="_id"
//                 selection={selectedUnicorn}
//                 onSelectionChange={onRowSelect}
//                 paginator
//                 rows={5}
//                 responsiveLayout="scroll"
//                 emptyMessage="No hay unicornios aún."
//             >
//                 <Column field="name" header="Nombre" />
//                 <Column field="data.color" header="Color" />
//                 <Column field="data.age" header="Edad" />
//                 <Column field="data.power" header="Poder" />
//                 <Column
//                     header="Acciones"
//                     body={(rowData) => (
//                         <Button
//                             icon="pi pi-trash"
//                             label="Eliminar"
//                             className="p-button-sm"
//                             onClick={() => onManualSelectAndDelete(rowData)} 
//                         />
//                     )}
//                 />
//             </DataTable>


//         </div>
//     );
// };

// export default UnicornsView;
