import React from "react";
import { Formik, Form, Field } from "formik";
import { Product } from "../../pages/admin/adminPanelProducts";
interface EditProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: Product) => Promise<void>;
  product: Product;
}

export const ModalEditProduct: React.FC<EditProductModalProps> = ({
  isOpen,
  onClose,
  product,
  onSave,
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal fixed inset-0 z-50 overflow-auto bg-stone-800 bg-opacity-50 flex font-IRANSans">
      <div className="modal-content relative p-8 bg-white w-full max-w-md m-auto flex-col flex rounded-lg shadow">
        <Formik
          initialValues={product}
          onSubmit={(values, { setSubmitting }) => {
            onSave(values);
            console.log(values);
            setSubmitting(false);
          }}
        >
          {({ isSubmitting }) => (
            <Form className="flex flex-col">
              <Field name="name" />
              <Field name="thumbnail" type="image" />
              <Field name="price" type="number" />
              <Field name="quantity" type="number" />
              <Field name="category" type="string" />
              <Field name="subcategory" type="string" />
              <Field name="description" as="textarea" />
              
              <button type="submit" disabled={isSubmitting}>
                ذخیره
              </button>
            </Form>
          )}
        </Formik>
        <button onClick={onClose}>لغو</button>
      </div>
    </div>
  );
};
