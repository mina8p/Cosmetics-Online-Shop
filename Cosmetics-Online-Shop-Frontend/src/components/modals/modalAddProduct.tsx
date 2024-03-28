//////////////ok
// import React, { useState } from "react";
// import { sendProductData } from "../../api/sendProductData";
// import { ModalAddProductProps, ProductForm } from "../../api/interfaces";

// export const ModalAddProduct: React.FC<ModalAddProductProps> = ({
//   isOpen,
//   onClose,
// }) => {
//   const [product, setProduct] = useState<ProductForm>({
//     category: "",
//     subcategory: "",
//     name: "",
//     price: 0,
//     quantity: 0,
//     brand: "",
//     description: "",
//     thumbnail: null,
//     images: [],
//   });

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target;
//     if (e.target.type === "file") {
//       const files = (e.target as HTMLInputElement).files;
//       if (files) {
//         name === "thumbnail"
//           ? setProduct({ ...product, thumbnail: files[0] })
//           : setProduct({ ...product, images: Array.from(files) });
//       }
//     } else {
//       setProduct({ ...product, [name]: value });
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       await sendProductData(product);
//       onClose(); // Close modal after successful save
//       // Optional: You can refresh the products list or show a success message here
//     } catch (error) {
//       console.error("Error while saving product:", error);
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center ">
//       <div className="bg-white p-5 rounded-lg relative">
//         <button
//           type="button"
//           onClick={onClose}
//           className="absolute top-0 left-4 mt-4 mr-4 text-gray-700 hover:text-gray-900 transition ease-in-out duration-150"
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
//         <h2 className="text-xl mb-4">افزودن محصول جدید</h2>
//         <form onSubmit={handleSubmit}>
//           {/* Input fields for product information */}
//           <div className="mb-1">
//             <label htmlFor="name" className="block mb-2">
//               نام محصول
//             </label>
//             <input
//               type="text"
//               id="name"
//               name="name"
//               value={product.name}
//               onChange={handleChange}
//               className="border p-2 w-full"
//               required
//             />
//           </div>
//           <div className="mb-1">
//             <label htmlFor="price" className="block mb-2">
//               قیمت
//             </label>
//             <input
//               type="number"
//               id="price"
//               name="price"
//               value={product.price}
//               onChange={handleChange}
//               className="border p-2 w-full"
//               required
//             />
//           </div>
//           <div className="mb-1">
//             <label htmlFor="description" className="block mb-2">
//               توضیحات
//             </label>
//             <textarea
//               id="description"
//               name="description"
//               value={product.description}
//               onChange={handleChange}
//               className="border p-2 w-full"
//               required
//             />
//           </div>
//           <div className="mb-1">
//             <label htmlFor="category" className="block mb-2">
//               گروه
//             </label>
//             <input
//               type="text"
//               id="category"
//               name="category"
//               value={product.category}
//               onChange={handleChange}
//               className="border p-2 w-full"
//               required
//             />
//           </div>
//           <div className="mb-1">
//             <label htmlFor="subcategory" className="block mb-2">
//               زیر گروه
//             </label>
//             <input
//               type="text"
//               id="subcategory"
//               name="subcategory"
//               value={product.subcategory}
//               onChange={handleChange}
//               className="border p-2 w-full"
//               required
//             />
//           </div>

//           <div className=" flex justify-between">
//             <div className="mb-1">
//               <label htmlFor="quantity" className="block mb-2">
//                 موجودی
//               </label>
//               <input
//                 type="number"
//                 id="quantity"
//                 name="quantity"
//                 value={product.quantity}
//                 onChange={handleChange}
//                 className="border p-2 w-full"
//                 required
//               />
//             </div>
//             <div className="mb-1">
//               <label htmlFor="brand" className="block mb-2">
//                 برند
//               </label>
//               <input
//                 type="text"
//                 id="brand"
//                 name="brand"
//                 value={product.brand}
//                 onChange={handleChange}
//                 className="border p-2 w-full"
//                 required
//               />
//             </div>
//           </div>

//           <div className="flex ">
//             {/* Input field for thumbnail */}
//             <div className="mb-1">
//               <label htmlFor="thumbnail" className="block mb-2 ">
//                 تامبنیل
//               </label>
//               <input
//                 type="file"
//                 id="thumbnail"
//                 name="thumbnail"
//                 onChange={handleChange}
//                 className="border p-2 w-full"
//               />
//             </div>
//             {/* Input field for images */}
//             <div className="mb-1">
//               <label htmlFor="images" className="block mb-2">
//                 تصاویر
//               </label>
//               <input
//                 type="file"
//                 id="images"
//                 name="images"
//                 multiple
//                 onChange={handleChange}
//                 className="border p-2 w-full"
//               />
//             </div>
//           </div>

//           <div className="flex justify-center">
//             <button
//               type="submit"
//               className="bg-violet-800 hover:bg-violet-900 text-white font-bold py-2 px-4 rounded"
//             >
//               ذخیره
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ModalAddProduct;

////////////////////
// import React, { useState, useEffect } from "react";
// import { sendProductData } from "../../api/sendProductData";
// import { GetAllCategories } from "../../api/getAllCategories"; // فرض بر این است که این تابع برای گرفتن لیست گروه‌ها است
// import { ModalAddProductProps, ProductForm } from "../../api/interfaces";

// export const ModalAddProduct: React.FC<ModalAddProductProps> = ({
//   isOpen,
//   onClose,
// }) => {
//   const [product, setProduct] = useState<ProductForm>({
//     category: "",
//     subcategory: "",
//     name: "",
//     price: 0,
//     quantity: 0,
//     brand: "",
//     description: "",
//     thumbnail: null,
//     images: [],
//   });

//   const [categories, setCategories] = useState<Array<{ id: string; name: string }>>([]);

//   useEffect(() => {
//     const fetchCategories = async () => {
//       const result = await GetAllCategories();
//       setCategories(result); // فرض بر این است که نتیجه به شکل لیستی از گروه‌ها باشد
//     };

//     fetchCategories();
//   }, []);

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
//   ) => {
//     const { name, value } = e.target;
//     if (e.target.type === "file") {
//       const files = (e.target as HTMLInputElement).files;
//       if (files) {
//         name === "thumbnail"
//           ? setProduct({ ...product, thumbnail: files[0] })
//           : setProduct({ ...product, images: Array.from(files) });
//       }
//     } else {
//       setProduct({ ...product, [name]: value });
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       await sendProductData(product);
//       onClose(); // Close modal after successful save
//     } catch (error) {
//       console.error("Error while saving product:", error);
//     }
//   };

//   if (!isOpen) return null;

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center ">
//       <div className="bg-white p-5 rounded-lg relative">
//         <button
//           type="button"
//           onClick={onClose}
//           className="absolute top-0 left-4 mt-4 mr-4 text-gray-700 hover:text-gray-900 transition ease-in-out duration-150"
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
//         <h2 className="text-xl mb-4">افزودن محصول جدید</h2>
//         <form onSubmit={handleSubmit}>
//           {/* Input fields for product information */}
//           <div className="mb-1">
//             <label htmlFor="name" className="block mb-2">
//               نام محصول
//             </label>
//             <input
//               type="text"
//               id="name"
//               name="name"
//               value={product.name}
//               onChange={handleChange}
//               className="border p-2 w-full"
//               required
//             />
//           </div>
//           <div className="mb-1">
//             <label htmlFor="price" className="block mb-2">
//               قیمت
//             </label>
//             <input
//               type="number"
//               id="price"
//               name="price"
//               value={product.price}
//               onChange={handleChange}
//               className="border p-2 w-full"
//               required
//             />
//           </div>
//           <div className="mb-1">
//             <label htmlFor="description" className="block mb-2">
//               توضیحات
//             </label>
//             <textarea
//               id="description"
//               name="description"
//               value={product.description}
//               onChange={handleChange}
//               className="border p-2 w-full"
//               required
//             />
//           </div>
//           <div className="mb-1">
//             <label htmlFor="category" className="block mb-2">
//               گروه
//             </label>
//             <select
//               id="category"
//               name="category"
//               value={product.category}
//               onChange={handleChange}
//               className="border p-2 w-full"
//               required
//             >
//               <option value="">انتخاب کنید</option>
//               {categories.categories.map((category) => (
//                 <option key={category.id} value={category._id}>
//                   {category.name}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div className="mb-1">
//             <label htmlFor="subcategory" className="block mb-2">
//               زیر گروه
//             </label>
//             <input
//               type="text"
//               id="subcategory"
//               name="subcategory"
//               value={product.subcategory}
//               onChange={handleChange}
//               className="border p-2 w-full"
//               required
//             />
//           </div>

//           <div className=" flex justify-between">
//             <div className="mb-1">
//               <label htmlFor="quantity" className="block mb-2">
//                 موجودی
//               </label>
//               <input
//                 type="number"
//                 id="quantity"
//                 name="quantity"
//                 value={product.quantity}
//                 onChange={handleChange}
//                 className="border p-2 w-full"
//                 required
//               />
//             </div>
//             <div className="mb-1">
//               <label htmlFor="brand" className="block mb-2">
//                 برند
//               </label>
//               <input
//                 type="text"
//                 id="brand"
//                 name="brand"
//                 value={product.brand}
//                 onChange={handleChange}
//                 className="border p-2 w-full"
//                 required
//               />
//             </div>
//           </div>

//           <div className="flex ">
//             {/* Input field for thumbnail */}
//             <div className="mb-1">
//               <label htmlFor="thumbnail" className="block mb-2 ">
//                 تامبنیل
//               </label>
//               <input
//                 type="file"
//                 id="thumbnail"
//                 name="thumbnail"
//                 onChange={handleChange}
//                 className="border p-2 w-full"
//               />
//             </div>
//             {/* Input field for images */}
//             <div className="mb-1">
//               <label htmlFor="images" className="block mb-2">
//                 تصاویر
//               </label>
//               <input
//                 type="file"
//                 id="images"
//                 name="images"
//                 multiple
//                 onChange={handleChange}
//                 className="border p-2 w-full"
//               />
//             </div>
//           </div>

//           <div className="flex justify-center">
//             <button
//               type="submit"
//               className="bg-violet-800 hover:bg-violet-900 text-white font-bold py-2 px-4 rounded"
//             >
//               ذخیره
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ModalAddProduct;

///////////////////////
/////////////////////

import React, { useState, useEffect } from "react";
import { sendProductData } from "../../api/sendProductData";
import { GetCategories } from "../../api/getSubcategoryOfCategory";
import { GetSubcategoryOfCategory } from "../../api/getSubcategoryOfCategory";
import { ModalAddProductProps, ProductForm } from "../../api/interfaces";

export const ModalAddProduct: React.FC<ModalAddProductProps> = ({
  isOpen,
  onClose,
}) => {
  const [product, setProduct] = useState<ProductForm>({
    category: "",
    subcategory: "",
    name: "",
    price: 0,
    quantity: 0,
    brand: "",
    description: "",
    thumbnail: null,
    images: [],
  });

  const [categories, setCategories] = useState<
    Array<{ _id: string; name: string }>
  >([]);
  const [subcategories, setSubcategories] = useState<
    Array<{ _id: string; name: string }>
  >([]);
  const [isSubcategoryDisabled, setIsSubcategoryDisabled] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      const result = await GetCategories();
      setCategories(result);
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchSubcategories = async () => {
      if (product.category) {
        const result = await GetSubcategoryOfCategory(product.category);
        setSubcategories(result);
        setIsSubcategoryDisabled(false);
      } else {
        setSubcategories([]);
        setIsSubcategoryDisabled(true);
      }
    };

    fetchSubcategories();
  }, [product.category]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    if (e.target.type === "file") {
      const files = (e.target as HTMLInputElement).files;
      if (files) {
        name === "thumbnail"
          ? setProduct({ ...product, thumbnail: files[0] })
          : setProduct({ ...product, images: Array.from(files) });
      }
    } else {
      setProduct({ ...product, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await sendProductData(product);
      onClose(); // Close modal after successful save
    } catch (error) {
      console.error("Error while saving product:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center ">
      <div className="bg-white p-5 rounded-lg relative">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-0 left-4 mt-4 mr-4 text-gray-700 hover:text-gray-900 transition ease-in-out duration-150"
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
        <h2 className="text-xl mb-4">افزودن محصول جدید</h2>
        <form onSubmit={handleSubmit}>
          {/* Input fields for product information */}
          <div className="mb-1">
            <label htmlFor="name" className="block mb-2">
              نام محصول
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={product.name}
              onChange={handleChange}
              className="border p-2 w-full"
              required
            />
          </div>
          <div className="mb-1">
            <label htmlFor="price" className="block mb-2">
              قیمت
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={product.price}
              onChange={handleChange}
              className="border p-2 w-full"
              required
            />
          </div>
          <div className="mb-1">
            <label htmlFor="description" className="block mb-2">
              توضیحات
            </label>
            <textarea
              id="description"
              name="description"
              value={product.description}
              onChange={handleChange}
              className="border p-2 w-full"
              required
            />
          </div>
          <div className="mb-1">
            <label htmlFor="category" className="block mb-2">
              گروه
            </label>
            <select
              id="category"
              name="category"
              value={product.category}
              onChange={handleChange}
              className="border p-2 w-full"
              required
            >
              <option value="">انتخاب کنید</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-1">
            <label htmlFor="subcategory" className="block mb-2">
              زیر گروه
            </label>
            <select
              id="subcategory"
              name="subcategory"
              value={product.subcategory}
              onChange={handleChange}
              className="border p-2 w-full"
              required
              disabled={isSubcategoryDisabled}
            >
              <option value="">انتخاب کنید</option>
              {subcategories.map((subcategory) => (
                <option key={subcategory._id} value={subcategory._id}>
                  {subcategory.name}
                </option>
              ))}
            </select>
          </div>

          <div className=" flex justify-between">
            <div className="mb-1">
              <label htmlFor="quantity" className="block mb-2">
                موجودی
              </label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                value={product.quantity}
                onChange={handleChange}
                className="border p-2 w-full"
                required
              />
            </div>
            <div className="mb-1">
              <label htmlFor="brand" className="block mb-2">
                برند
              </label>
              <input
                type="text"
                id="brand"
                name="brand"
                value={product.brand}
                onChange={handleChange}
                className="border p-2 w-full"
                required
              />
            </div>
          </div>

          <div className="flex ">
            {/* Input field for thumbnail */}
            <div className="mb-1">
              <label htmlFor="thumbnail" className="block mb-2 ">
                تامبنیل
              </label>
              <input
                type="file"
                id="thumbnail"
                name="thumbnail"
                onChange={handleChange}
                className="border p-2 w-full"
              />
            </div>
            {/* Input field for images */}
            <div className="mb-1">
              <label htmlFor="images" className="block mb-2">
                تصاویر
              </label>
              <input
                type="file"
                id="images"
                name="images"
                multiple
                onChange={handleChange}
                className="border p-2 w-full"
              />
            </div>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-violet-800 hover:bg-violet-900 text-white font-bold py-2 px-4 rounded"
            >
              ذخیره
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalAddProduct;

//////////////////////
///////////////////////c w s
// import React, { useState, useEffect } from "react";
// import { ModalAddProductProps, ProductForm } from "../../api/interfaces";
// import { GetAllCategories } from "../../api/getAllCategories";
// import { GetAllSubcategories } from "../../api/getAllSubcategories";
// import { sendProductData } from "../../api/sendProductData";

// // ... other imports remain unchanged

// export const ModalAddProduct: React.FC<ModalAddProductProps> = ({
//   isOpen,
//   onClose,
// }) => {
//   const [product, setProduct] = useState<ProductForm>({
//     category: "",
//     subcategory: "",
//     name: "",
//     price: 0,
//     quantity: 0,
//     brand: "",
//     description: "",
//     thumbnail: null,
//     images: [],
//   });

//   //////////

//   ///////////
//   // ... other states remain unchanged
//   const [categories, setCategories] = useState([]);
//   const [subcategories, setSubcategories] = useState([]);

//   useEffect(() => {
//     const fetchCategories = async () => {
//       const categoryData = await GetAllCategories();
//       setCategories(categoryData);
//     };

//     const fetchSubcategories = async () => {
//       const subcategoryData = await GetAllSubcategories();
//       setSubcategories(subcategoryData);
//     };

//     fetchCategories();
//     fetchSubcategories();
//   }, []);

//   // Update subcategories when category is selected
//   const handleCategoryChange = (e : any) => {
//     const selectedCategory = e.target.value;
//     setProduct({ ...product, category: selectedCategory });
//     updateSubcategories(selectedCategory);
//   };

//   const updateSubcategories = (categoryId: any) => {
//     // Assuming GetAllSubcategories returns all subcategories, you filter them based on the selected category
//     const filteredSubcategories = subcategories.filter(
//       (sc) => sc.category === categoryId
//     );
//     setSubcategories(filteredSubcategories);
//   };

//   // ... rest of the component remains unchanged

//   // Update the return statement to include dropdowns for categories and subcategories
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       await sendProductData(product);
//       onClose(); // Close modal after successful save
//       // Optional: You can refresh the products list or show a success message here
//     } catch (error) {
//       console.error("Error while saving product:", error);
//     }
//   };

//   if (!isOpen) return null;

//     const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target;
//     if (e.target.type === "file") {
//       const files = (e.target as HTMLInputElement).files;
//       if (files) {
//         name === "thumbnail"
//           ? setProduct({ ...product, thumbnail: files[0] })
//           : setProduct({ ...product, images: Array.from(files) });
//       }
//     } else {
//       setProduct({ ...product, [name]: value });
//     }
//   };
//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center ">
//       <div className="bg-white p-5 rounded-lg relative">
//         <button
//           type="button"
//           onClick={onClose}
//           className="absolute top-0 left-4 mt-4 mr-4 text-gray-700 hover:text-gray-900 transition ease-in-out duration-150"
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
//         <h2 className="text-xl mb-4">افزودن محصول جدید</h2>
//         <form onSubmit={handleSubmit}>
//           {/* Input fields for product information */}
//           <div className="mb-1">
//             <label htmlFor="name" className="block mb-2">
//               نام محصول
//             </label>
//             <input
//               type="text"
//               id="name"
//               name="name"
//               value={product.name}
//               onChange={handleChange}
//               className="border p-2 w-full"
//               required
//             />
//           </div>
//           <div className="mb-1">
//             <label htmlFor="price" className="block mb-2">
//               قیمت
//             </label>
//             <input
//               type="number"
//               id="price"
//               name="price"
//               value={product.price}
//               onChange={handleChange}
//               className="border p-2 w-full"
//               required
//             />
//           </div>
//           <div className="mb-1">
//             <label htmlFor="description" className="block mb-2">
//               توضیحات
//             </label>
//             <textarea
//               id="description"
//               name="description"
//               value={product.description}
//               onChange={handleChange}
//               className="border p-2 w-full"
//               required
//             />
//           </div>
//           <div className="mb-1">
//       <label htmlFor="category" className="block mb-2">
//         گروه
//       </label>
//       <select
//         id="category"
//         name="category"
//         value={product.category}
//         onChange={handleCategoryChange}
//         className="border p-2 w-full"
//         required
//       >
//         {categories.categories.map((category:any) => (
//           <option key={category.id} value={category.id}>
//             {category.name}
//           </option>
//         ))}
//       </select>
//     </div>
//     <div className="mb-1">
//       <label htmlFor="subcategory" className="block mb-2">
//         زیر گروه
//       </label>
//       <select
//         id="subcategory"
//         name="subcategory"
//         value={product.subcategory}
//         onChange={(e) => setProduct({ ...product, subcategory: e.target.value })}
//         className="border p-2 w-full"
//         required
//       >
//         {subcategories.subcategories.map((subcategory:any) => (
//           <option key={subcategory.id} value={subcategory.id}>
//             {subcategory.name} {subcategory.id}
//           </option>
//         ))}
//       </select>
//     </div>

//           <div className=" flex justify-between">
//             <div className="mb-1">
//               <label htmlFor="quantity" className="block mb-2">
//                 موجودی
//               </label>
//               <input
//                 type="number"
//                 id="quantity"
//                 name="quantity"
//                 value={product.quantity}
//                 onChange={handleChange}
//                 className="border p-2 w-full"
//                 required
//               />
//             </div>
//             <div className="mb-1">
//               <label htmlFor="brand" className="block mb-2">
//                 برند
//               </label>
//               <input
//                 type="text"
//                 id="brand"
//                 name="brand"
//                 value={product.brand}
//                 onChange={handleChange}
//                 className="border p-2 w-full"
//                 required
//               />
//             </div>
//           </div>

//           <div className="flex ">
//             {/* Input field for thumbnail */}
//             <div className="mb-1">
//               <label htmlFor="thumbnail" className="block mb-2 ">
//                 تامبنیل
//               </label>
//               <input
//                 type="file"
//                 id="thumbnail"
//                 name="thumbnail"
//                 onChange={handleChange}
//                 className="border p-2 w-full"
//               />
//             </div>
//             {/* Input field for images */}
//             <div className="mb-1">
//               <label htmlFor="images" className="block mb-2">
//                 تصاویر
//               </label>
//               <input
//                 type="file"
//                 id="images"
//                 name="images"
//                 multiple
//                 onChange={handleChange}
//                 className="border p-2 w-full"
//               />
//             </div>
//           </div>

//           <div className="flex justify-center">
//             <button
//               type="submit"
//               className="bg-violet-800 hover:bg-violet-900 text-white font-bold py-2 px-4 rounded"
//             >
//               ذخیره
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ModalAddProduct;
