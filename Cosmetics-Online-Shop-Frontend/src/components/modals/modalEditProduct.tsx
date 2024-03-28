// import React from "react";
// import { Formik, Form, Field } from "formik";
// import { Product } from "../../pages/admin/adminPanelProducts";

// interface EditProductModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onSave: (product: Product) => Promise<void>;
//   product: Product;
// }

// export const ModalEditProduct: React.FC<EditProductModalProps> = ({
//   isOpen,
//   onClose,
//   product,
//   onSave,
// }) => {
//   if (!isOpen) return null;

//   return (
//     <div className="modal fixed inset-0 z-50 overflow-auto bg-stone-800 bg-opacity-50 flex">
//       <div className="modal-content relative p-8 bg-white w-full max-w-md m-auto flex-col flex rounded-lg shadow">
//         <button
//           className="absolute top-0 left-4 mt-4 mr-4 text-gray-700 hover:text-gray-900 transition ease-in-out duration-150"
//           onClick={onClose}
//         >
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 24 24"
//             strokeWidth="1.5"
//             stroke="currentColor"
//             className="w-6 h-6"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               d="M6 18L18 6M6 6l12 12"
//             />
//           </svg>
//         </button>

//         <Formik
//           initialValues={product}
//           onSubmit={(values, { setSubmitting }) => {
//             onSave(values);
//             console.log(values);
//             setSubmitting(false);
//           }}
//         >
//           {({ isSubmitting }) => (
//             <Form className="flex flex-col">
//               <Field name="name" />

//               <Field name="thumbnail" type="image" />
//               <Field name="images" type="image" />
//               <Field name="price" type="number" />
//               <Field name="quantity" type="number" />
//               <Field name="category" type="string" />
//               <Field name="subcategory" type="string" />
//               <Field name="brand" type="string" />
//               <Field name="description" as="textarea" />
//               <div className="flex justify-center">
//                 <button
//                   className="w-20 bg-violet-800 hover:bg-violet-900 text-white font-bold py-2 px-4 rounded"
//                   type="submit"
//                   disabled={isSubmitting}
//                 >
//                   ذخیره
//                 </button>
//               </div>
//             </Form>
//           )}
//         </Formik>
//       </div>
//     </div>
//   );
// };
//////////////////////////////////////

// import React, { useState } from "react";
// import { Product } from "../../pages/admin/adminPanelProducts";

// interface EditProductModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onSave: (product: Product) => Promise<void>;
//   product: Product;
// }

// export const ModalEditProduct: React.FC<EditProductModalProps> = ({
//   isOpen,
//   onClose,
//   product,
//   onSave,
// }) => {
//   const [formData, setFormData] = useState(product);

//   if (!isOpen) return null;

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     await onSave(formData);
//   };

//   return (
//     <div className="modal fixed inset-0 z-50 overflow-auto bg-stone-800 bg-opacity-50 flex">
//       <div className="modal-content relative p-8 bg-white w-full max-w-md m-auto flex-col flex rounded-lg shadow">
//         <button
//           className="absolute top-0 left-4 mt-4 mr-4 text-gray-700 hover:text-gray-900 transition ease-in-out duration-150"
//           onClick={onClose}
//         >
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 24 24"
//             strokeWidth="1.5"
//             stroke="currentColor"
//             className="w-6 h-6"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               d="M6 18L18 6M6 6l12 12"
//             />
//           </svg>
//         </button>
//         <form className="flex flex-col" onSubmit={handleSubmit}>
//           <input name="name" value={formData.name} onChange={handleChange} />

//           <input name="thumbnail" type="text" value={formData.thumbnail} onChange={handleChange} />
//           <input name="images" type="text" value={formData.images} onChange={handleChange} />
//           <input name="price" type="number" value={formData.price} onChange={handleChange} />
//           <input name="quantity" type="number" value={formData.quantity} onChange={handleChange} />
//           <input name="category" type="text" value={formData.category} onChange={handleChange} />
//           <input name="subcategory" type="text" value={formData.subcategory} onChange={handleChange} />
//           <input name="brand" type="text" value={formData.brand} onChange={handleChange} />
//           <textarea name="description" value={formData.description} onChange={handleChange} />
//           <div className="flex justify-center">
//             <button
//               className="w-20 bg-violet-800 hover:bg-violet-900 text-white font-bold py-2 px-4 rounded"
//               type="submit"
//             >
//               ذخیره
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

//////////////////

import React, { useState } from "react";
import { Product } from "../../pages/admin/adminPanelProducts";

interface EditProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (productFormData: FormData) => Promise<void>;
  product: Product;
}

export const ModalEditProduct: React.FC<EditProductModalProps> = ({
  isOpen,
  onClose,
  product,
  onSave,
}) => {
  const [formData, setFormData] = useState({ ...product });
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [images, setImages] = useState<FileList | null>(null);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "thumbnail") {
      setThumbnail(e.target.files?.[0] || null);
    } else if (e.target.name === "images") {
      setImages(e.target.files);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const productFormData = new FormData();
    for (const key in formData) {
      productFormData.append(key, formData[key]);
    }
    if (thumbnail) {
      productFormData.append("thumbnail", thumbnail);
    }
    if (images) {
      for (let i = 0; i < images.length; i++) {
        productFormData.append("images", images[i]);
      }
    }

    await onSave(productFormData);
  };
/////////////////////////////////
  // const handleFileChange = (e) => {
  //   const { files, name } = e.target;
  //   if (files) {
  //     const newFiles = name === 'thumbnail' ? files[0] : files; // Assuming only one thumbnail
  //     setFormData((prevFormData) => ({ ...prevFormData, [name]: newFiles }));
  //   }
  // };
  
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const productFormData = new FormData();
  //   for (const key in formData) {
  //     const value = formData[key];
  //     if (value instanceof FileList) {
  //       // If it's a FileList, append each file
  //       Array.from(value).forEach((file) => {
  //         productFormData.append(key, file);
  //       });
  //     } else if (value instanceof File) {
  //       // If it's a single File, append it directly
  //       productFormData.append(key, value);
  //     } else {
  //       // For all other data types
  //       productFormData.append(key, String(value));
  //     }
  //   }
  //   // Now send this FormData directly to your API
  //   await onSave(productFormData);
  // };
  /////////////////////////////

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
        <form className="flex flex-col" onSubmit={handleSubmit}>
          {/* Other inputs */}
          <input name="name" value={formData.name} onChange={handleChange} />

           <input name="thumbnail" type="text" value={formData.thumbnail} onChange={handleChange} />
           <input name="images" type="text" value={formData.images} onChange={handleChange} />
           <input name="price" type="number" value={formData.price} onChange={handleChange} />
           <input name="quantity" type="number" value={formData.quantity} onChange={handleChange} />
           <input name="category" type="text" value={formData.category} onChange={handleChange} />
           <input name="subcategory" type="text" value={formData.subcategory} onChange={handleChange} />
           <input name="brand" type="text" value={formData.brand} onChange={handleChange} />
           <textarea name="description" value={formData.description} onChange={handleChange} />

          <input name="thumbnail" type="file" onChange={handleFileChange} />
          <input name="images" type="file" multiple onChange={handleFileChange} />
          {/* Other inputs */}
          <div className="flex justify-center">
            <button
              className="w-20 bg-violet-800 hover:bg-violet-900 text-white font-bold py-2 px-4 rounded"
              type="submit"
            >
              ذخیره
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};


