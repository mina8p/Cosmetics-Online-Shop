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
    <div className="modal fixed inset-0 z-50 overflow-auto bg-stone-800 bg-opacity-50 flex">
      <div className="modal-content relative p-8 bg-white w-full max-w-md m-auto flex-col flex rounded-lg shadow">
        <button
          className="absolute top-0 left-4 mt-4 mr-4 text-gray-700 hover:text-gray-900 transition ease-in-out duration-150"
          onClick={onClose}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

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
              <div className="flex justify-center">
                <button
                  className="w-20 bg-violet-800 hover:bg-violet-900 text-white font-bold py-2 px-4 rounded"
                  type="submit"
                  disabled={isSubmitting}
                >
                  ذخیره
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
