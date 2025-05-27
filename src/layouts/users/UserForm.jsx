import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useUserContext } from "../../context/UserContext"; 
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { Card } from "primereact/card";

const validationSchema = Yup.object({
  name: Yup.string().required("El nombre es obligatorio"),
  lastname: Yup.string().required("El apellido es obligatorio"),
  email: Yup.string()
    .email("Debe ser un email válido")
    .required("El email es obligatorio"),
  age: Yup.number()
    .required("La edad es obligatoria")
    .positive("La edad debe ser positiva")
    .integer("La edad debe ser un número entero"),
});

export default function UsersForm() {
  const { users, addUser, editUser } = useUserContext();
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [initialValues, setInitialValues] = useState({
    name: "",
    lastname: "",
    email: "",
    age: "",
  });

  useEffect(() => {
    if (isEdit) {
      const user = users.find((u) => u.id === Number(id));
      if (user) {
        setInitialValues({
          name: user.name || "",
          lastname: user.lastname || "",
          email: user.email || "",
          age: user.age || "",
        });
      } else {
        navigate("/usuarios");
      }
    } else {
      setInitialValues({ name: "", lastname: "", email: "", age: "" });
    }
  }, [id, isEdit, users, navigate]);

  const handleSubmit = async (values, { resetForm }) => {
    if (isEdit) {
      await editUser(Number(id), values);
    } else {
      await addUser(values);
    }
    resetForm();
    navigate("/usuarios");
  };

  return (
    <div className="flex justify-content-center mt-5">
      <Card
        title={isEdit ? "Editar usuario" : "Agregar usuario"}
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
                Nombre
              </label>
              <Field
                id="name"
                name="name"
                className="p-inputtext w-full"
                placeholder="Nombre"
              />
              <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <div className="field col-12">
              <label htmlFor="lastname" className="block text-900 font-medium mb-2">
                Apellido
              </label>
              <Field
                id="lastname"
                name="lastname"
                className="p-inputtext w-full"
                placeholder="Apellido"
              />
              <ErrorMessage name="lastname" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <div className="field col-12">
              <label htmlFor="email" className="block text-900 font-medium mb-2">
                Email
              </label>
              <Field
                id="email"
                name="email"
                type="email"
                className="p-inputtext w-full"
                placeholder="Email"
              />
              <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <div className="field col-12">
              <label htmlFor="age" className="block text-900 font-medium mb-2">
                Edad
              </label>
              <Field
                id="age"
                name="age"
                type="number"
                className="p-inputtext w-full"
                placeholder="Edad"
              />
              <ErrorMessage name="age" component="div" className="text-red-500 text-sm mt-1" />
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
                onClick={() => navigate("/usuarios")}
                type="button"
              />
            </div>
          </Form>
        </Formik>
      </Card>
    </div>
  );
}
