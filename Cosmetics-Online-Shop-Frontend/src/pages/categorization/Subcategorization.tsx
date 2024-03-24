//////////////////////////////////
// import { useEffect, useState } from 'react';
// import { Link, useParams } from 'react-router-dom';
// import { useQuery } from 'react-query';
// import { GetAllProducts } from '../../api/getAllProducts';
// import { GetsubcategoryById } from '../../api/getsubcategorybyid';
// import { GetCategoryById } from '../../api/getCategoryById';
// import { Product } from '../admin/adminPanelProducts';

// const SubcategorizationPage = () => {
//   const { subcategoryId, categoryId } = useParams<{ subcategoryId?: string, categoryId?: string }>();
//   const [initiated, setInitiated] = useState(false);

//   useEffect(() => {
//     if (subcategoryId || categoryId) {
//       setInitiated(true);
//     }
//   }, [subcategoryId, categoryId]);

//   const { data: subcategoryName, isSuccess: isSubcategoryNameSuccess } = useQuery(
//     ['subcategoryName', subcategoryId],
//     () => subcategoryId ? GetsubcategoryById(subcategoryId).then(res => res.data.subcategory.name) : Promise.resolve(null),
//     { enabled: !!subcategoryId && initiated }
//   );

//   const { data: categoryName, isSuccess: isCategoryNameSuccess } = useQuery(
//     ["categoryName", categoryId],
//     () => categoryId ? GetCategoryById(categoryId).then(res => res.data.category.name) : Promise.resolve(null),
//     { enabled: !!categoryId && initiated }
//   );

//   const { data: products, isSuccess: isProductsSuccess } = useQuery(
//     ['allProducts', subcategoryId],
//     () => GetAllProducts(1).then(res =>
//       res.data.products.filter((product: Product) => product.subcategory === subcategoryId)
//     ),
//     { enabled: initiated }
//   );

//   if (!isSubcategoryNameSuccess || !isProductsSuccess || !isCategoryNameSuccess) return <div>Loading...</div>;

//   return (
//     <div className="m-5 w-full flex flex-col">
//       <div className="text-xl font-bold mb-6">{`خانه/${categoryName}/${subcategoryName}`}</div>
//       <div className="grid grid-cols-1 m-auto sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
//         {products?.map((product: Product) => (
//           <Link to={`/products/${product._id}`} key={product._id} className="">
//             <div className="product-item shadow shadow-violet-400 rounded-lg w-56 h-72 m-2 flex justify-center items-center">
//               <div className="">
//                 <img
//                   className="w-40 h-40 m-auto"
//                   src={`http://localhost:8000/images/products/thumbnails/${product.thumbnail}`}
//                   alt={product.name}
//                 />
//                 <div className="w-48">
//                   <h3>{product.name}</h3>
//                 </div>
//                 <p className="text-left">
//                   {product.price} {"تومان"}
//                 </p>
//               </div>
//             </div>
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default SubcategorizationPage;

///////////////////////////////////////

/////////////////////////////////

import { useEffect, useState } from "react";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import { useQuery } from "react-query";
import queryString from "query-string";
import { GetAllProductsInSubcategory } from "../../api/getAllProductsInSubcategory";
import { GetsubcategoryById } from "../../api/getsubcategorybyid";
import { GetCategoryById } from "../../api/getCategoryById";
import { Product } from "../admin/adminPanelProducts";

const SubcategorizationPage = () => {
  const { subcategoryId, categoryId } = useParams<{
    subcategoryId: string | undefined;
    categoryId: string | undefined;
  }>();
  const location = useLocation();
  const navigate = useNavigate();

  // استخراج صفحه از URL با استفاده از query-string کتابخانه
  const { page = "1" } = queryString.parse(location.search);
  const [currentPage, setCurrentPage] = useState(parseInt(page as string));
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if (!location.search) {
      navigate(`?page=1`, { replace: true });
    }
  }, [location.search, navigate]);

  useEffect(() => {
    if (subcategoryId) {
      GetAllProductsInSubcategory(currentPage, subcategoryId).then((res) => {
        // فرض بر این است که پاسخ شامل تعداد کل محصولات است
        setTotalPages(Math.ceil(res.total / res.per_page));
      });
    }
  }, [subcategoryId, currentPage]);

  const { data: categoryName } = useQuery(
    ["categoryName", categoryId],
    () => GetCategoryById(categoryId!).then((res) => res.data.category.name),
    { enabled: !!categoryId }
  );

  const { data: subcategoryName } = useQuery(
    ["subcategoryName", subcategoryId],
    () =>
      GetsubcategoryById(subcategoryId!).then(
        (res) => res.data.subcategory.name
      ),
    { enabled: !!subcategoryId }
  );

  const { data: products } = useQuery(
    ["allProductsInSubcategory", subcategoryId, currentPage],
    () =>
      GetAllProductsInSubcategory(currentPage, subcategoryId!).then(
        (res) => res.data.products
      ),
    { enabled: !!subcategoryId }
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    navigate(`?page=${page}`);
  };

  if (!categoryName || !subcategoryName || !products)
    return <div>Loading...</div>;

  return (
    <div className="m-5 w-full flex flex-col">
      <div className="text-xl font-bold mb-6">{`خانه / ${categoryName} / ${subcategoryName}`}</div>
      <div className="grid grid-cols-1 m-auto sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {products.map((product: Product) => (
          <Link to={`/products/${product._id}`} key={product._id}>
            <div className="product-item shadow rounded-lg w-56 h-72 m-2 flex justify-center items-center">
              <div>
                <img
                  src={`http://localhost:8000/images/products/thumbnails/${product.thumbnail}`}
                  alt={product.name}
                  className="w-40 h-40 m-auto"
                />
                <div className="w-48">
                  <h3>{product.name}</h3>
                </div>
                <p className="text-left">{product.price} تومان</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className="flex justify-center items-center mt-4">
        {/* ایجاد دکمه‌های پیجینیشن */}
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`page-item ${
              currentPage === index + 1 ? "active font-bold" : ""
            }`}
            style={{ margin: "0 5px" }}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SubcategorizationPage;
