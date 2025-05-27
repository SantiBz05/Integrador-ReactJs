// import React, { useState, useContext, useEffect } from "react";
// import { UnicornContext } from "../context/UnicornContext";
// import { Button } from 'primereact/button';
// import { DataTable } from 'primereact/datatable';
// import { Column } from 'primereact/column';
// import { Formik, Form, Field, ErrorMessage } from 'formik';
// import * as Yup from 'yup';

// const UnicornsForm = () => {
//     const { unicorns, handleAddUnicorn, handleEditUnicorn, handleDeleteUnicorn } = useContext(UnicornContext);
//     const [editingUnicorn, setEditingUnicorn] = useState(null);

//     // Estado de initialValues
//     const [initialValues, setInitialValues] = useState({
//         name: '',
//         color: '',
//         age: '',
//         power: ''
//     });

//     // Iniciar edición
//     const startEdit = (unicorn) => {
//         console.log('Editando unicornio:', unicorn);  // Ver qué unicornio se está editando
//         setEditingUnicorn(unicorn);
//     };

//     // Cuando editingUnicorn cambie, actualizar initialValues
//     useEffect(() => {
//         if (editingUnicorn) {
//             console.log('Unicornio para editar:', editingUnicorn);  // Ver el unicornio que se ha seleccionado para editar
//             setInitialValues({
//                 name: editingUnicorn.name,
//                 color: editingUnicorn.data?.color || '', // Asegúrate de acceder a data.color
//                 age: editingUnicorn.data?.age || '', // Asegúrate de acceder a data.age
//                 power: editingUnicorn.data?.power || '' // Asegúrate de acceder a data.power
//             });
//         }
//     }, [editingUnicorn]);

//     const validationSchema = Yup.object({
//         name: Yup.string()
//             .min(6, 'Debe tener mínimo 6 caracteres')
//             .max(20, 'Debe tener menos de 20 caracteres')
//             .required('Nombre es obligatorio'),
//         age: Yup.number()
//             .required('Edad es obligatorio'),
//         color: Yup.string()
//             .required('Color es obligatorio'),
//         power: Yup.string()
//             .required('Poder es obligatorio'),
//     });

//     const actionBodyTemplate = (rowData) => (
//         <div className="flex gap-2">
//             <Button
//                 label="Editar"
//                 icon="pi pi-pencil"
//                 onClick={() => startEdit(rowData)}
//                 style={{
//                     backgroundColor: '#f0ad4e',
//                     border: 'none',
//                     color: '#000',
//                 }}
//             />
//         </div>
//     );

//     return (
//         <div
//             className="p-6"
//             style={{ backgroundColor: '#121212', minHeight: '100vh', color: '#ffffff' }}
//         >
//             <h2 className="text-2xl mb-8"> 🦄 Gestión de Unicornios</h2>

//             {/* Formulario */}
//             <Formik
//                 initialValues={initialValues}
//                 validationSchema={validationSchema}
//                 onSubmit={(values, { resetForm }) => {
//                     console.log('Formulario enviado con los siguientes valores:', values); // Ver los valores al enviar el formulario
//                     if (editingUnicorn) {
//                         // Agregar el _id al enviar los valores de edición
//                         const unicornWithId = {
//                             _id: editingUnicorn._id,  // Asegúrate de agregar el _id aquí
//                             ...values,
//                         };
//                         handleEditUnicorn(unicornWithId);  // Editar unicornio
//                     } else {
//                         handleAddUnicorn(values);   // Agregar nuevo unicornio
//                     }
//                     // Limpiar el formulario después de la acción
//                     resetForm();  // Esto restablece los valores a initialValues
//                     // Limpiar el estado de edición
//                     setEditingUnicorn(null);
//                     // Restablecer initialValues a sus valores vacíos después de un submit
//                     setInitialValues({
//                         name: '',
//                         color: '',
//                         age: '',
//                         power: ''
//                     });
//                 }}
//                 enableReinitialize
//             >
//                 <Form>
//                     <div>
//                         <label>Nombre</label>
//                         <Field name="name" />
//                         <ErrorMessage name="name" component="div" />
//                     </div>
//                     <div>
//                         <label>Edad</label>
//                         <Field name="age" />
//                         <ErrorMessage name="age" component="div" />
//                     </div>
//                     <div>
//                         <label>Color</label>
//                         <Field name="color" />
//                         <ErrorMessage name="color" component="div" />
//                     </div>
//                     <div>
//                         <label>Poder</label>
//                         <Field name="power" />
//                         <ErrorMessage name="power" component="div" />
//                     </div>
//                     <Button
//                         style={{ color: 'white' }}
//                         label={editingUnicorn ? 'Editar unicornio' : 'Crear unicornio'}
//                         type="submit"
//                     />
//                 </Form>
//             </Formik>

//             {/* Tabla */}
//             <div style={{ marginTop: '2rem' }}>
//                 <DataTable
//                     value={unicorns}
//                     tableStyle={{ minWidth: '50rem' }}
//                     className="p-datatable-sm"
//                 >
//                     <Column field="name" header="Nombre" style={{ color: '#fff' }} />
//                     <Column field="data.age" header="Edad" />
//                     <Column field="data.color" header="Color" />
//                     <Column field="data.power" header="Poder" />
//                     <Column
//                         body={actionBodyTemplate}
//                         header="Acciones"
//                         style={{ width: '12rem' }}
//                     />
//                 </DataTable>
//             </div>
//         </div>
//     );
// };

// export default UnicornsForm;
