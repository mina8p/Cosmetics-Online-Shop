import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { GetAllProducts } from "../../api/getAllProducts";
import { Product } from "../admin/adminPanelProducts";

import { GetsubcategoryById } from "../../api/getsubcategorybyid";
import { GetCategoryById } from "../../api/getCategoryById";

const SubcategorizationPage = () => {
  const { subcategoryId } = useParams<{ subcategoryId: string }>();
  const [products, setProducts] = useState<Product[]>([]);

  const [subcategoryName, setSubCategoryName] = useState<string>("");

  useEffect(() => {
    // بارگیری نام دسته‌بندی بر اساس آیدی
    const loadSubCategoryName = async () => {
      if (subcategoryId) {
        try {
          const subcategoryData = await GetsubcategoryById(subcategoryId);
          setSubCategoryName(subcategoryData.data.subcategory.name); // تنظیم نام دسته‌بندی
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
          (product: Product) => product.subcategory === subcategoryId
        );
        setProducts(filteredProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    loadSubCategoryName();
    loadAllProducts();
  }, [subcategoryId]);

  //////////////////

  const { categoryId } = useParams<{ categoryId: string }>();
  // const [products, setProducts] = useState<Product[]>([]);
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
  /////////////////

  return (
    <div className="m-5 w-full flex flex-col">
      <div className="text-xl font-bold  mb-6">{`خانه/${categoryName}/${subcategoryName}`}</div>

      <div className="grid grid-cols-1  m-auto sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {products.length > 0 ? (
          products.map((product) => (
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
          ))
        ) : (
          <p className="col-span-full text-center">
            هیچ محصولی در این زیر گروه یافت نشد
          </p>
        )}
      </div>
    </div>
  );
};

export default SubcategorizationPage;

////////////
// import { useEffect, useState } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import { GetAllProducts } from '../../api/getAllProducts';
// import { Product } from '../admin/adminPanelProducts';
// import Sidebar from '../homePage/sidebar';

// const SubcategorizationPage = () => {
//   const { subcategoryId } = useParams<{ subcategoryId: string }>();
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const loadProducts = async () => {
//       try {
//         setLoading(true);
//         const response = await GetAllProducts(1);

//         const filteredProducts = response.data.products.filter(
//           (product: Product) => product.subcategory === subcategoryId
//         );
//         setProducts(filteredProducts);
//       } catch (error) {
//         console.error("Error fetching products:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadProducts();
//   }, [subcategoryId]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <Sidebar />

//       <h1>Products for Subcategory ID: {subcategoryId}</h1>
//       <div className="products-grid">
//         {products.length > 0 ? (
//           products.map((product) => (
//             <div key={product._id} className="product-item">
//               <img src={`http://localhost:8000/images/products/thumbnails/${product.thumbnail}`} alt={product.name} />
//               <h3>{product.name}</h3>
//               <p>Price: {product.price}</p>
//               <Link to={`/products/${product._id}`}>View Product</Link>
//             </div>
//           ))
//         ) : (
//           <p>No products found in this subcategory.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default SubcategorizationPage;

////////////
