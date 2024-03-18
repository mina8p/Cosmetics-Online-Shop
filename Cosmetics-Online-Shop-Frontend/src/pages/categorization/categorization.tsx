// export default function Categorization () {
//     return (
//       <h1 className="text-3xl font-bold underline">
//        categorization
//       </h1>
//     )
//   }

///////////

// import  { useEffect, useState } from 'react';
// import { Link, useParams } from 'react-router-dom';
// import { GetAllProducts } from '../../api/getAllProducts';
// import { Product } from '../admin/adminPanelProducts';
// import Sidebar from '../homePage/sidebar';

// const CategorizationPage = () => {
//   const { categoryId } = useParams<{ categoryId: string }>();
//   const [products, setProducts] = useState<Product[]>([]);

//   useEffect(() => {
//     const loadAllProducts = async () => {
//       try {
//         const allProductsData = await GetAllProducts(1);

//         const filteredProducts = allProductsData.data.products.filter(
//           (product: Product) => product.category === categoryId
//         );
//         setProducts(filteredProducts);
//       } catch (error) {
//         console.error("Error fetching products:", error);
//       }
//     };

//     loadAllProducts();
//   }, [categoryId]);

//   return (
//     <div>
//        <Sidebar />
//       <h1>Products for Category ID: {categoryId}</h1>
//       <div className="products-grid">
//         {products.map((product) => (
//           <div key={product._id} className="product-item">
//             <img className='w-20 h-20' src={`http://localhost:8000/images/products/thumbnails/${product.thumbnail}`} alt={product.name} />
//             <h3>{product.name}</h3>
//             <p>Price: {product.price}</p>
//             <Link to={`/products/${product._id}`}>View Product</Link>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default CategorizationPage;

///////////////

import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { GetAllProducts } from "../../api/getAllProducts";
import { GetCategoryById } from "../../api/getCategoryById"; // اطمینان حاصل کنید که مسیر درست است
import { Product } from "../admin/adminPanelProducts";

const CategorizationPage = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [categoryName, setCategoryName] = useState<string>("");

  useEffect(() => {
    // بارگیری نام دسته‌بندی بر اساس آیدی
    const loadCategoryName = async () => {
      if (categoryId) {
        try {
          const categoryData = await GetCategoryById(categoryId);
          setCategoryName(categoryData.data.category.name); // تنظیم نام دسته‌بندی
        } catch (error) {
          console.error("Error fetching category name:", error);
        }
      }
    };

    // بارگیری همه محصولات مرتبط با دسته‌بندی
    const loadAllProducts = async () => {
      try {
        const allProductsData = await GetAllProducts(1);
        const filteredProducts = allProductsData.data.products.filter(
          (product: Product) => product.category === categoryId
        );
        setProducts(filteredProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    loadCategoryName();
    loadAllProducts();
  }, [categoryId]);

  return (
    <div className="m-5 w-full flex flex-col">
      <div className="text-xl font-bold  mb-6">{`خانه / ${categoryName}`}</div>

      <div className="grid grid-cols-1  m-auto sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {products.map((product) => (
          <Link to={`/products/${product._id}`} className="">
            <div className="product-item shadow shadow-violet-400 rounded-lg w-56 h-72 m-2 flex  justify-center items-center">
              <div className="">
                <img
                  className="w-40 h-40 m-auto"
                  src={`http://localhost:8000/images/products/thumbnails/${product.thumbnail}`}
                  alt={product.name}
                />
                <div className="w-48">
                  <h3>{product.name}</h3>
                </div>
                <p className="text-left ">
                  {product.price} {"تومان"}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategorizationPage;
/////////////

// import { useEffect, useState } from "react";
// import { Link, useParams, useNavigate } from "react-router-dom";
// import { GetAllProducts } from "../../api/getAllProducts";
// import { GetCategoryById } from "../../api/getCategoryById";
// import { Product } from "../admin/adminPanelProducts";
// import { GetAllProductsP } from "../../api/getAllProducts(p)";

// const CategorizationPage = () => {
//   const { categoryId, page } = useParams();
//   const navigate = useNavigate();
//   const currentPage = parseInt(page || '1', 10);

//   const [products, setProducts] = useState<Product[]>([]);
//   const [categoryName, setCategoryName] = useState<string>("");
//   const [totalPages, setTotalPages] = useState<number>(0);

//   useEffect(() => {
//     // Load Category Name
//     const loadCategoryName = async () => {/* ... */};
//     // Assume loadCategoryName function body is defined here

//     // Load Products based on Category and Page
//     const loadAllProducts = async () => {
//       try {
//         const allProductsData = await GetAllProducts(currentPage);
//         setProducts(allProductsData.data.products);
//         setTotalPages(allProductsData.data.totalPages); // Assume this info is provided by your API
//       } catch (error) {
//         console.error("Error fetching products:", error);
//       }
//     };

//     loadCategoryName();
//     loadAllProducts();
//   }, [categoryId, currentPage]);

//   const goToPage = (pageNumber: number) => {
//     navigate(`/category/${categoryId}/page/${pageNumber}`);
//   };

//   return (
//     <div>
//       <div>{categoryName}</div>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//         {products.map((product) => (
//           <div key={product._id} className="product-item border p-4 flex flex-col items-center">
//             <img
//               className="w-20 h-20 mb-2"
//               src={`http://localhost:8000/images/products/thumbnails/${product.thumbnail}`}
//               alt={product.name}
//             />
//             <h3 className="text-md font-semibold">{product.name}</h3>
//             <p className="mb-2">Price: {product.price}</p>
//             <Link to={`/products/${product._id}`} className="text-blue-600 hover:text-blue-800">View Product</Link>
//           </div>
//         ))}
//       </div>
//       <div className="pagination-controls">
//         <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>
//           Previous
//         </button>
//         <span>Page {currentPage} of {totalPages}</span>
//         <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// export default CategorizationPage;
