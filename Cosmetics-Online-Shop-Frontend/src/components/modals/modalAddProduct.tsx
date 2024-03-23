import React, { useState } from "react";
import { sendProductData } from "../../api/sendProductData";

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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
      // Optional: You can refresh the products list or show a success message here
    } catch (error) {
      console.error("Error while saving product:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
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
          <div className="mb-3">
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
          <div className="mb-3">
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
          <div className="mb-3">
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
          <div className="mb-3">
            <label htmlFor="category" className="block mb-2">
              دسته‌بندی
            </label>
            <input
              type="text"
              id="category"
              name="category"
              value={product.category}
              onChange={handleChange}
              className="border p-2 w-full"
              required
            />
          </div>
          {/* Input field for thumbnail */}
          <div className="mb-3">
            <label htmlFor="thumbnail" className="block mb-2">
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
          <div className="mb-3">
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
          {/* Submit button */}
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

///////////////
