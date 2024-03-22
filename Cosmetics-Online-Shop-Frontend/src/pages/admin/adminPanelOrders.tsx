import { useQuery } from "react-query";
import { useState } from "react";
import OrdersTable from "../../components/adminPanelComponents/tables/ordersTable";
import { fetchOrders } from "../../api/fetchOrders";



export interface Order {
  _id: string;
  user: string;

  products: {
    product: {
      name: string | undefined;
      thumbnail: any;
      _id: string;
      price: number;
    };
    count: number;
    _id: string;
  }[];
  
  totalPrice: number;
  deliveryDate: string;
  deliveryStatus: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const AdminPanelOrders = () => {
  const [deliveryFilter, setDeliveryFilter] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const { data: orders, isLoading } = useQuery(
    ["orders", currentPage],
    () => fetchOrders(currentPage),
    {}
  );
  console.log(orders);

  /////loading
  if (isLoading)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );

  /////Pagination
  const handleChangingPage = (Page: number) => {
    setCurrentPage(Page);
  };

  /////filtering
  const filteredOrders = orders?.data?.orders.filter((order: Order) => {
    if (deliveryFilter === null) return true;
    return deliveryFilter === "delivered"
      ? order.deliveryStatus
      : !order.deliveryStatus;
  });

  const handleFilterChange = (filter: string | null) => {
    setDeliveryFilter((prevFilter) => (prevFilter === filter ? null : filter));
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 font-IRANSans mb-28">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-purple-800">
            مدیریت سفارش ها
          </h1>
        </div>
        <div className="filters flex gap-5 text-purple-800">
          <label>
            سفارش های تحویل شده
            <input
              type="checkbox"
              checked={deliveryFilter === "delivered"}
              onChange={() => handleFilterChange("delivered")}
            />
          </label>
          <label>
            سفارش های در انتظار ارسال
            <input
              type="checkbox"
              checked={deliveryFilter === "notDelivered"}
              onChange={() => handleFilterChange("notDelivered")}
            />
          </label>
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
                      نام کاربر
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-center text-sm font-semibold text-purple-800"
                    >
                      مجموع مبلغ
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-center text-sm font-semibold text-purple-800"
                    >
                      زمان ثبت سفارش
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-center text-sm font-semibold text-purple-800"
                    >
                      وضعیت سفارش
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-center text-sm font-semibold text-purple-800"
                    >
                      بررسی سفارش ها
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {filteredOrders && filteredOrders.length > 0 ? (
                    filteredOrders.map((order: Order) => (
                      <OrdersTable
                        _id={order._id}
                        user={order.user}
                        products={[]}
                        totalPrice={order.totalPrice}
                        deliveryDate={order.deliveryDate}
                        deliveryStatus={order.deliveryStatus}
                        createdAt={order.createdAt}
                        updatedAt={""}
                        __v={0}                      />
                    ))
                  ) : (
                    <p>هیچ سفارشی یافت نشد</p>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {orders?.total_pages > 1 && (
        <nav className="flex justify-center m-2 text-gray-600">
          <ul className="rounded-lg flex overflow-hidden">
            {orders?.total_pages > 1 && (
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

                  {currentPage < orders.total_pages && (
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
        </nav>
      )}
    </div>
  );
};

export default AdminPanelOrders;

////////////////////////////////////////////
