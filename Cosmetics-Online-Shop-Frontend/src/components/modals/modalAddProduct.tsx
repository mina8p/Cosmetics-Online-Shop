// import React, { useState } from 'react';

// interface ProductForm {
//   name: string;
//   price: number;
//   description: string;
//   category: string;
// }

// interface ModalAddProductProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onSave: (product: ProductForm) => Promise<void>;
// }

// export const ModalAddProduct: React.FC<ModalAddProductProps> = ({ isOpen, onClose, onSave }) => {
//   const [product, setProduct] = useState<ProductForm>({ name: '', price: 0, description: '', category: '' });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setProduct({ ...product, [name]: value });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     await onSave(product);
//     onClose(); // Close modal after save
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
//       <div className="bg-white p-5 rounded-lg">
//         <h2 className="text-xl mb-4">افزودن محصول جدید</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-3">
//             <label htmlFor="name" className="block mb-2">نام محصول</label>
//             <input type="text" id="name" name="name" value={product.name} onChange={handleChange} className="border p-2 w-full" required />
//           </div>
//           <div className="mb-3">
//             <label htmlFor="price" className="block mb-2">قیمت</label>
//             <input type="number" id="price" name="price" value={product.price} onChange={handleChange} className="border p-2 w-full" required />
//           </div>
//           <div className="mb-3">
//             <label htmlFor="description" className="block mb-2">توضیحات</label>
//             <textarea id="description" name="description" value={product.description} onChange={handleChange} className="border p-2 w-full" required />
//           </div>
//           <div className="mb-3">
//             <label htmlFor="category" className="block mb-2">دسته‌بندی</label>
//             <input type="text" id="category" name="category" value={product.category} onChange={handleChange} className="border p-2 w-full" required />
//           </div>
//           <div className="flex justify-between">
//             <button type="button" onClick={onClose} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l">
//               بستن
//             </button>
//             <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r">
//               ذخیره
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ModalAddProduct;

////////////////////////////
// import React, { useState } from 'react';
// import { sendProductData } from '../../api/sendProductData';// مسیر درست را وارد کنید

// interface ProductForm {
//   name: string;
//   price: number;
//   description: string;
//   category: string;
// }

// interface ModalAddProductProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onSave: (product: ProductForm) => Promise<void>;
// }

// export const ModalAddProduct: React.FC<ModalAddProductProps> = ({ isOpen, onClose }) => {
//   const [product, setProduct] = useState<ProductForm>({ name: '', price: 0, description: '', category: '' });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setProduct({ ...product, [name]: value });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       await sendProductData(product);
//       onClose(); // Close modal after successful save
//       // Optional: You can refresh the products list or show a success message here
//     } catch (error) {
//       console.error('Error while saving product:', error);
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
//       <div className="bg-white p-5 rounded-lg">
//         <h2 className="text-xl mb-4">افزودن محصول جدید</h2>
//         <form onSubmit={handleSubmit}>
//         <div className="mb-3">
//              <label htmlFor="name" className="block mb-2">نام محصول</label>
//              <input type="text" id="name" name="name" value={product.name} onChange={handleChange} className="border p-2 w-full" required />
//            </div>
//            <div className="mb-3">
//              <label htmlFor="price" className="block mb-2">قیمت</label>
//              <input type="number" id="price" name="price" value={product.price} onChange={handleChange} className="border p-2 w-full" required />
//            </div>
//            <div className="mb-3">
//              <label htmlFor="description" className="block mb-2">توضیحات</label>
//              <textarea id="description" name="description" value={product.description} onChange={handleChange} className="border p-2 w-full" required />
//            </div>
//            <div className="mb-3">
//              <label htmlFor="category" className="block mb-2">دسته‌بندی</label>
//              <input type="text" id="category" name="category" value={product.category} onChange={handleChange} className="border p-2 w-full" required />
//           </div>

//           <div className="flex justify-between">
//             <button type="button" onClick={onClose} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l">
//               بستن
//             </button>
//             <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r">
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

// 







import React, { useState } from 'react';
import { sendProductData } from '../../api/sendProductData';  

interface ProductForm {
  category: string;
  subcategory: string;
  name: string;
  price: number;
  quantity: number;
  brand: string;
  description: string;
  thumbnail: File | null;
  images: File[];
}

interface ModalAddProductProps {
  isOpen: boolean;
  onClose: () => void;

  onSave: (product: ProductForm) => Promise<void>;
 
}

export const ModalAddProduct: React.FC<ModalAddProductProps> = ({ isOpen, onClose }) => {
  const [product, setProduct] = useState<ProductForm>({
    category: '',
    subcategory: '',
    name: '',
    price: 0,
    quantity: 0,
    brand: '',
    description: '',
    thumbnail: null,
    images: [],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (e.target.type === 'file') {
      const files = (e.target as HTMLInputElement).files;
      if (files) {
        name === 'thumbnail'
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
      // Optional: You can refresh the products list or show a success message here
    } catch (error) {
      console.error('Error while saving product:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-5 rounded-lg">
        <h2 className="text-xl mb-4">افزودن محصول جدید</h2>
        <form onSubmit={handleSubmit}>
          {/* Input fields for product information */}
          <div className="mb-3">
              <label htmlFor="name" className="block mb-2">نام محصول</label>
              <input type="text" id="name" name="name" value={product.name} onChange={handleChange} className="border p-2 w-full" required />
            </div>
            <div className="mb-3">
              <label htmlFor="price" className="block mb-2">قیمت</label>
              <input type="number" id="price" name="price" value={product.price} onChange={handleChange} className="border p-2 w-full" required />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="block mb-2">توضیحات</label>
              <textarea id="description" name="description" value={product.description} onChange={handleChange} className="border p-2 w-full" required />
            </div>
            <div className="mb-3">
              <label htmlFor="category" className="block mb-2">دسته‌بندی</label>
              <input type="text" id="category" name="category" value={product.category} onChange={handleChange} className="border p-2 w-full" required />
           </div>
          {/* Input field for thumbnail */}
          <div className="mb-3">
            <label htmlFor="thumbnail" className="block mb-2">تامبنیل</label>
            <input type="file" id="thumbnail" name="thumbnail" onChange={handleChange} className="border p-2 w-full" />
          </div>
          {/* Input field for images */}
          <div className="mb-3">
            <label htmlFor="images" className="block mb-2">تصاویر</label>
            <input type="file" id="images" name="images" multiple onChange={handleChange} className="border p-2 w-full" />
          </div>
          {/* Submit button */}
          <div className="flex justify-between">
             <button type="button" onClick={onClose} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l">
               بستن
             </button>
             <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r">
               ذخیره
             </button>
           </div>
          
        </form>
      </div>
    </div>
  );
};

export default ModalAddProduct;

///////////////










