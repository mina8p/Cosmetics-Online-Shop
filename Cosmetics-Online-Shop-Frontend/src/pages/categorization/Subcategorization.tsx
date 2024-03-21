// import { useEffect, useState } from "react";
// import { useParams, Link } from "react-router-dom";
// import { GetAllProducts } from "../../api/getAllProducts";
// import { Product } from "../admin/adminPanelProducts";

// import { GetsubcategoryById } from "../../api/getsubcategorybyid";
// import { GetCategoryById } from "../../api/getCategoryById";

// const SubcategorizationPage = () => {
//   const { subcategoryId } = useParams<{ subcategoryId: string }>();
//   const [products, setProducts] = useState<Product[]>([]);

//   const [subcategoryName, setSubCategoryName] = useState<string>("");

//   useEffect(() => {
//     // بارگیری نام دسته‌بندی بر اساس آیدی
//     const loadSubCategoryName = async () => {
//       if (subcategoryId) {
//         try {
//           const subcategoryData = await GetsubcategoryById(subcategoryId);
//           setSubCategoryName(subcategoryData.data.subcategory.name); // تنظیم نام دسته‌بندی
//         } catch (error) {
//           console.error("Error fetching category name:", error);
//         }
//       }
//     };

//     // بارگیری همه محصولات مرتبط با دسته‌بندی
//     const loadAllProducts = async () => {
//       try {
//         const allProductsData = await GetAllProducts(1);
//         const filteredProducts = allProductsData.data.products.filter(
//           (product: Product) => product.subcategory === subcategoryId
//         );
//         setProducts(filteredProducts);
//       } catch (error) {
//         console.error("Error fetching products:", error);
//       }
//     };

//     loadSubCategoryName();
//     loadAllProducts();
//   }, [subcategoryId]);

//   //////////////////

//   const { categoryId } = useParams<{ categoryId: string }>();
//   // const [products, setProducts] = useState<Product[]>([]);
//   const [categoryName, setCategoryName] = useState<string>("");

//   useEffect(() => {
//     // بارگیری نام دسته‌بندی بر اساس آیدی
//     const loadCategoryName = async () => {
//       if (categoryId) {
//         try {
//           const categoryData = await GetCategoryById(categoryId);
//           setCategoryName(categoryData.data.category.name); // تنظیم نام دسته‌بندی
//         } catch (error) {
//           console.error("Error fetching category name:", error);
//         }
//       }
//     };

//     // بارگیری همه محصولات مرتبط با دسته‌بندی
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

//     loadCategoryName();
//     loadAllProducts();
//   }, [categoryId]);
//   /////////////////

//   return (
//     <div className="m-5 w-full flex flex-col">
//       <div className="text-xl font-bold  mb-6">{`خانه/${categoryName}/${subcategoryName}`}</div>

//       <div className="grid grid-cols-1  m-auto sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
//         {products.length > 0 ? (
//           products.map((product) => (
//             <Link to={`/products/${product._id}`} className="">
//               <div className="product-item shadow shadow-violet-400 rounded-lg w-56 h-72 m-2 flex  justify-center items-center">
//                 <div className="">
//                   <img
//                     className="w-40 h-40 m-auto"
//                     src={`http://localhost:8000/images/products/thumbnails/${product.thumbnail}`}
//                     alt={product.name}
//                   />
//                   <div className="w-48">
//                     <h3>{product.name}</h3>
//                   </div>
//                   <p className="text-left ">
//                     {product.price} {"تومان"}
//                   </p>
//                 </div>
//               </div>
//             </Link>
//           ))
//         ) : (
//           <p className="col-span-full text-center">
//             هیچ محصولی در این زیر گروه یافت نشد
//           </p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default SubcategorizationPage;

///////////////////////////////////////

//////////////////////////////////


//////////////////////////////////
// import { useEffect, useState } from 'react';
// import { Link, useParams } from 'react-router-dom';
// import { useQuery } from 'react-query';
// import { GetAllProducts } from '../../api/getAllProducts';
// import { GetsubcategoryById } from '../../api/getsubcategorybyid';
// import { Product } from '../admin/adminPanelProducts';

// const SubcategorizationPage = () => {
//   const { subcategoryId } = useParams<{ subcategoryId: string | undefined }>();
//   const [initiated, setInitiated] = useState(false);

//   useEffect(() => {
//     if (subcategoryId) {
//       setInitiated(true);
//     }
//   }, [subcategoryId]);

//   const { data: subcategoryName, isSuccess: isSubcategoryNameSuccess } = useQuery(
//     ['subcategoryName', subcategoryId],
//     () => GetsubcategoryById(subcategoryId!).then(res => res.data.subcategory.name),
//     { enabled: initiated }
//   );

//   const { data: products, isSuccess: isProductsSuccess } = useQuery(
//     ['allProducts', subcategoryId],
//     () => GetAllProducts(1).then(res =>
//       res.data.products.filter((product: Product) => product.subcategory === subcategoryId)
//     ),
//     { enabled: initiated }
//   );

//   if (!isSubcategoryNameSuccess || !isProductsSuccess) return <div>Loading...</div>;



//   /////////////

//   return (
//     <div className="m-5 w-full flex flex-col">
//       <div className="text-xl font-bold mb-6">{`خانه/${subcategoryName}`}</div>
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
//////////////////////////////////
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { GetAllProducts } from '../../api/getAllProducts';
import { GetsubcategoryById } from '../../api/getsubcategorybyid';
import { GetCategoryById } from '../../api/getCategoryById';
import { Product } from '../admin/adminPanelProducts';

const SubcategorizationPage = () => {
  const { subcategoryId, categoryId } = useParams<{ subcategoryId?: string, categoryId?: string }>();
  const [initiated, setInitiated] = useState(false);

  useEffect(() => {
    if (subcategoryId || categoryId) {
      setInitiated(true);
    }
  }, [subcategoryId, categoryId]);

  const { data: subcategoryName, isSuccess: isSubcategoryNameSuccess } = useQuery(
    ['subcategoryName', subcategoryId],
    () => subcategoryId ? GetsubcategoryById(subcategoryId).then(res => res.data.subcategory.name) : Promise.resolve(null),
    { enabled: !!subcategoryId && initiated }
  );

  const { data: categoryName, isSuccess: isCategoryNameSuccess } = useQuery(
    ["categoryName", categoryId],
    () => categoryId ? GetCategoryById(categoryId).then(res => res.data.category.name) : Promise.resolve(null),
    { enabled: !!categoryId && initiated }
  );

  const { data: products, isSuccess: isProductsSuccess } = useQuery(
    ['allProducts', subcategoryId],
    () => GetAllProducts(1).then(res =>
      res.data.products.filter((product: Product) => product.subcategory === subcategoryId)
    ),
    { enabled: initiated }
  );

  if (!isSubcategoryNameSuccess || !isProductsSuccess || !isCategoryNameSuccess) return <div>Loading...</div>;

  return (
    <div className="m-5 w-full flex flex-col">
      <div className="text-xl font-bold mb-6">{`خانه/${categoryName}/${subcategoryName}`}</div>
      <div className="grid grid-cols-1 m-auto sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {products?.map((product: Product) => (
          <Link to={`/products/${product._id}`} key={product._id} className="">
            <div className="product-item shadow shadow-violet-400 rounded-lg w-56 h-72 m-2 flex justify-center items-center">
              <div className="">
                <img
                  className="w-40 h-40 m-auto"
                  src={`http://localhost:8000/images/products/thumbnails/${product.thumbnail}`}
                  alt={product.name}
                />
                <div className="w-48">
                  <h3>{product.name}</h3>
                </div>
                <p className="text-left">
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

export default SubcategorizationPage;



///////////////////////////////////////
