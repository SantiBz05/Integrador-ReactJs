import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useProductContext } from "../../context/ProductContext"; 
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { Card } from "primereact/card";

const validationSchema = Yup.object({
  name: Yup.string().required("El nombre del producto es obligatorio"),
  price: Yup.number()
    .required("El precio es obligatorio")
    .positive("Debe ser un número positivo"),
  color: Yup.string().required("El color es obligatorio"),
});

export default function ProductsForm() {
  const { products, addProduct, editProduct } = useProductContext();
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [initialValues, setInitialValues] = useState({
    name: "",
    price: "",
    color: "",
  });

  useEffect(() => {
    if (isEdit) {
      const product = products.find((p) => p.id === Number(id));
      if (product) {
        setInitialValues({
          name: product.name || "",
          price: product.price || "",
          color: product.color || "",
        });
      } else {
        navigate("/productos");
      }
    } else {
      setInitialValues({ name: "", price: "", color: "" });
    }
  }, [id, isEdit, products, navigate]);

  const handleSubmit = async (values, { resetForm }) => {
    if (isEdit) {
      await editProduct(Number(id), values);
    } else {
      await addProduct(values);
    }
    resetForm();
    navigate("/productos");
  };

  return (
    <div className="flex justify-content-center mt-5">
      <Card
        title={isEdit ? "Editar producto" : "Agregar producto"}
        className="w-full sm:w-10 md:w-6 lg:w-4 shadow-4"
      >
        <Formik
          initialValues={initialValues}
          enableReinitialize
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form className="formgrid grid p-fluid">
            <div className="field col-12">
              <label htmlFor="name" className="block text-900 font-medium mb-2">
                Nombre del producto
              </label>
              <Field
                id="name"
                name="name"
                className="p-inputtext w-full"
                placeholder="Nombre del producto"
              />
              <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <div className="field col-12">
              <label htmlFor="price" className="block text-900 font-medium mb-2">
                Precio
              </label>
              <Field
                id="price"
                name="price"
                type="number"
                className="p-inputtext w-full"
                placeholder="Precio"
              />
              <ErrorMessage name="price" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <div className="field col-12">
              <label htmlFor="color" className="block text-900 font-medium mb-2">
                Color
              </label>
              <Field
                id="color"
                name="color"
                className="p-inputtext w-full"
                placeholder="Color"
              />
              <ErrorMessage name="color" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <div className="col-12 flex justify-content-between mt-4">
              <Button
                type="submit"
                label={isEdit ? "Guardar cambios" : "Agregar"}
                className="p-button-success"
              />
              <Button
                label="Volver"
                className="p-button-secondary"
                onClick={() => navigate("/productos")}
                type="button"
              />
            </div>
          </Form>
        </Formik>
      </Card>
    </div>
  );
}
