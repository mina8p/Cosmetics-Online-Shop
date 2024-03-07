import { useQuery } from "react-query";
import { useState } from "react";
import { fetchProducts } from "../../api/fetchProducts";
import PriceTable from "../../components/adminPanelComponents/tables/Inventory&PricesTable";

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
}

const AdminPanelPrices = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const {
    data: products,

    isLoading,
  } = useQuery(["products", currentPage], () => fetchProducts(currentPage));

  console.log(products);
  if (isLoading) return <div>Loading...</div>;

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 font-IRANSans">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            مدیریت محصولات
          </h1>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            className="block rounded-md bg-violet-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-violet-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            ذخیره
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
                      className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900"
                    >
                      تصویر
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900"
                    >
                      نام کالا
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900"
                    >
                      دسته بندی
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900"
                    >
                      قیمت
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900"
                    >
                      موجودی
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {products?.data?.products?.map((product: Product) => (
                    <PriceTable
                      _id={product._id}
                      name={product.name}
                      thumbnail={product.thumbnail}
                      subcategory={product.subcategory}
                      price={product.price}
                      quantity={product.quantity}
                      brand={""}
                      description={""}
                      images={[]}
                      category={""}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {products?.total_pages > 1 && (
        <nav className="flex justify-center m-8">
        <ul className="border-2 border-violet-200 rounded-lg flex">
          {/* Previous Button */}
          {currentPage > 1 && (
            <li
              className="cursor-pointer"
              onClick={() => handlePageChange(currentPage - 1)}
            >
              <span className="px-3 border-x-2">قبلی</span>
            </li>
          )}

          {/* Current Page Number */}
          <li className="bg-violet-200">
            <span className="px-3 border-x-2">{currentPage}</span>
          </li>

          {/* Next Button */}
          {currentPage < products.total_pages && (
            <li
              className="cursor-pointer"
              onClick={() => handlePageChange(currentPage + 1)}
            >
              <span className="px-3 border-x-2">بعدی</span>
            </li>
          )}
        </ul>
      </nav>
      )}
    </div>
  );
};

export default AdminPanelPrices;
