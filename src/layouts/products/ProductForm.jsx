// ProductsForm.js
import React from "react";
import { Button } from 'primereact/button';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const ProductsForm = () => {
    const { addProduct } = useProducts();  // Obtener la función addProduct

    // Valores iniciales del formulario
    const initialValues = {
        nombreProds: "",
        precioProds: "",
        colorProds: "",
    };

    // Validación con Yup
    const validationSchema = Yup.object({
        nombreProds: Yup.string().required("El nombre del producto es obligatorio"),
        precioProds: Yup.number().required("El precio es obligatorio").positive("El precio debe ser positivo"),
        colorProds: Yup.string().required("El color del producto es obligatorio"),
    });

    // Función para manejar el envío del formulario
    const onSubmit = (values, { resetForm }) => {
        // Llamamos a la función addProduct para agregar el nuevo producto
        addProduct(values);

        // Limpiar el formulario después de agregar el producto
        resetForm();
    };

    return (
        <div className="p-4">
            <h2>Agregar Producto</h2>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <div className="p-field">
                            <label htmlFor="nombreProds">Nombre del Producto</label>
                            <Field id="nombreProds" name="nombreProds" placeholder="Nombre del producto" />
                            <ErrorMessage name="nombreProds" component="div" className="p-error" />
                        </div>
                        <div className="p-field">
                            <label htmlFor="precioProds">Precio</label>
                            <Field id="precioProds" name="precioProds" type="number" placeholder="Precio" />
                            <ErrorMessage name="precioProds" component="div" className="p-error" />
                        </div>
                        <div className="p-field">
                            <label htmlFor="colorProds">Color</label>
                            <Field id="colorProds" name="colorProds" placeholder="Descripción" />
                            <ErrorMessage name="colorProds" component="div" className="p-error" />
                        </div>

                        <Button type="submit" label="Agregar Producto" disabled={isSubmitting} />
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default ProductsForm;
