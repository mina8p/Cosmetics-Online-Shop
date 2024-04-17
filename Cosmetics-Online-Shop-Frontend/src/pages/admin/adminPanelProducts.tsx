////////////////////////////////////////
// import { useQuery } from "react-query";
// import ProductTable from "../../components/adminPanelComponents/tables/productsTable";
// import { useState } from "react";
// import { fetchProducts } from "../../api/fetchProducts";
// import ModalAddProduct from "../../components/modals/modalAddProduct";

// export interface Product {
//   _id: string;
//   category: string;
//   subcategory: string;
//   name: string;
//   price: number;
//   quantity: number;
//   brand: string;
//   description: string;
//   thumbnail: string;
//   images: string[];
//   [key: string]: any;
// }

// const AdminPanelProducts = () => {
//   const [currentPage, setCurrentPage] = useState(1);
//   const { data: products, isLoading } = useQuery(
//     ["products", currentPage],
//     () => fetchProducts(currentPage)
//   );

//   console.log(products);
//   ///////////////
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const toggleModal = () => setIsModalOpen(!isModalOpen);

//   /////////////////

//   /////loading
//   if (isLoading)
//     return (
//       <div className="flex justify-center items-center h-64">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
//       </div>
//     );

//   /////Pagination
//   const handleChangingPage = (page: number) => {
//     setCurrentPage(page);
//   };

//   return (
//     <div className="px-4 sm:px-6 lg:px-8 font-IRANSans mb-28">
//       <div className="sm:flex sm:items-center">
//         <div className="sm:flex-auto">
//           <h1 className="text-base font-semibold leading-6 text-purple-800">
//             مدیریت محصولات
//           </h1>
//         </div>
//         <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
//           <button
//             onClick={toggleModal}
//             type="button"
//             className="block rounded-md bg-violet-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-violet-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
//           >
//             اضافه کردن محصول جدید
//           </button>
//         </div>
//       </div>
//       <div className="mt-8 flow-root">
//         <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
//           <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
//             <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
//               <table className="min-w-full divide-y divide-violet-300">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th
//                       scope="col"
//                       className="px-3 py-3.5 text-center text-sm font-semibold text-purple-800"
//                     >
//                       تصویر
//                     </th>
//                     <th
//                       scope="col"
//                       className="px-3 py-3.5 text-center text-sm font-semibold text-purple-800"
//                     >
//                       نام کالا
//                     </th>
//                     <th
//                       scope="col"
//                       className="px-3 py-3.5 text-center text-sm font-semibold text-purple-800"
//                     >
//                       دسته بندی
//                     </th>
//                     <th
//                       scope="col"
//                       className="px-3 py-3.5 text-center text-sm font-semibold text-purple-800"
//                     >
//                       ویرایش کالا
//                     </th>
//                     <th
//                       scope="col"
//                       className="px-3 py-3.5 text-center text-sm font-semibold text-purple-800"
//                     >
//                       حذف کالا
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-gray-200 bg-white">
//                   {products?.data?.products?.map((product: Product) => (
//                     <ProductTable
//                       _id={product._id}
//                       name={product.name}
//                       thumbnail={product.thumbnail}
//                       subcategory={product.subcategory}
//                       price={product.price}
//                       quantity={product.quantity}
//                       brand={product.brand}
//                       description={product.description}
//                       images={product.images}
//                       category={product.category}
//                     />
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//       </div>
//       {products?.total_pages > 1 && (
//         <nav className="flex justify-center m-2 text-gray-600">
//           <ul className="rounded-lg flex overflow-hidden">
//             {products?.total_pages > 1 && (
//               <nav className="flex justify-center m-8">
//                 <ul className="border-2 border-violet-200 rounded-lg flex">
//                   {currentPage > 1 && (
//                     <li
//                       className="cursor-pointer"
//                       onClick={() => handleChangingPage(currentPage - 1)}
//                     >
//                       <span className="px-3 ">قبلی</span>
//                     </li>
//                   )}

//                   <li className="bg-violet-200">
//                     <span className="px-3 ">{currentPage}</span>
//                   </li>

//                   {currentPage < products.total_pages && (
//                     <li
//                       className="cursor-pointer"
//                       onClick={() => handleChangingPage(currentPage + 1)}
//                     >
//                       <span className="px-3 ">بعدی</span>
//                     </li>
//                   )}
//                 </ul>
//               </nav>
//             )}
//           </ul>
//         </nav>
//       )}

//       <ModalAddProduct
//         isOpen={isModalOpen}
//         onClose={toggleModal}
//         onSave={async (productData) => {
//           console.log("Product Data:", productData);

//           toggleModal();
//         }}
//       />
//     </div>
//   );
// };

// export default AdminPanelProducts;
////////////////////////////////////////
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate, useLocation } from "react-router-dom";
import queryString from "query-string";
import { fetchProducts } from "../../api/fetchProducts";
import ProductTable from "../../components/adminPanelComponents/tables/productsTable";
import ModalAddProduct from "../../components/modals/modalAddProduct";
import Loading from "../../components/loding/loading";

export interface Product {
  _id: string;
  category: string;
  subcategory: string;
  name: string;
  price: number;
  quantity: number;
  brand: string;
  description: string;
  thumbnail: string;
  images: string[];
  [key: string]: any;
}

const AdminPanelProducts = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { page = "1" } = queryString.parse(location.search);
  const [currentPage, setCurrentPage] = useState(parseInt(page as string));
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: products, isLoading } = useQuery(
    ["products", currentPage],
    () => fetchProducts(currentPage),
    {
      keepPreviousData: true,
    }
  );

  useEffect(() => {
    navigate(`?page=${currentPage}`, { replace: true });
  }, [currentPage, navigate]);

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  if (isLoading)  return ( <div className="m-auto"><Loading /></div>);

  const handleChangingPage = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 font-IRANSans mb-28">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-purple-800">
            مدیریت محصولات
          </h1>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            onClick={toggleModal}
            type="button"
            className="block rounded-md bg-violet-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-violet-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            اضافه کردن محصول جدید
          </button>
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
              <table className="min-w-full divide-y divide-violet-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-center text-sm font-semibold text-purple-800"
                    >
                      تصویر
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-center text-sm font-semibold text-purple-800"
                    >
                      نام کالا
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-center text-sm font-semibold text-purple-800"
                    >
                      دسته بندی
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-center text-sm font-semibold text-purple-800"
                    >
                      ویرایش کالا
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-center text-sm font-semibold text-purple-800"
                    >
                      حذف کالا
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {products?.data?.products?.map((product: Product) => (
                    <ProductTable
                      _id={product._id}
                      name={product.name}
                      thumbnail={product.thumbnail}
                      subcategory={product.subcategory}
                      price={product.price}
                      quantity={product.quantity}
                      brand={product.brand}
                      description={product.description}
                      images={product.images}
                      category={product.category}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {products?.total_pages > 1 && (
        <nav className="flex justify-center m-2 text-gray-600">
          <ul className="rounded-lg flex overflow-hidden">
            {products?.total_pages > 1 && (
              <nav className="flex justify-center m-8">
                <ul className="border-2 border-violet-200 rounded-lg flex">
                  {currentPage > 1 && (
                    <li
                      className="cursor-pointer"
                      onClick={() => handleChangingPage(currentPage - 1)}
                    >
                      <span className="px-3 ">قبلی</span>
                    </li>
                  )}

                  <li className="bg-violet-200">
                    <span className="px-3 ">{currentPage}</span>
                  </li>

                  {currentPage < products.total_pages && (
                    <li
                      className="cursor-pointer"
                      onClick={() => handleChangingPage(currentPage + 1)}
                    >
                      <span className="px-3 ">بعدی</span>
                    </li>
                  )}
                </ul>
              </nav>
            )}
          </ul>
          {/* <div>{products.total_pages}</div> */}
        </nav>
      )}

      <ModalAddProduct
        isOpen={isModalOpen}
        onClose={toggleModal}
        onSave={async (productData) => {
          console.log("Product Data:", productData);

          toggleModal();
        }}
      />
    </div>
  );
};

export default AdminPanelProducts;
