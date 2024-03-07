import { useQuery } from "react-query";
import { useState } from "react";
import OrdersTable from "../../components/adminPanelComponents/tables/ordersTable";
import { fetchOrders } from "../../api/fetchOrders";

export interface Order {
  _id: string;
  user: string;
  products: {
    product: {
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
  
  const [totalPages] = useState(5);

  const { data: orders, isLoading } = useQuery(["orders", currentPage], () => fetchOrders(currentPage), {
   
  });

  if (isLoading) return <p>Loading...</p>;

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const filteredOrders = orders?.filter((order) => {
    if (deliveryFilter === null) return true;
    return deliveryFilter === "delivered"
      ? order.deliveryStatus
      : !order.deliveryStatus;
  });

  const handleFilterChange = (filter: string | null) => {
    setDeliveryFilter((prevFilter) => (prevFilter === filter ? null : filter));
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 font-IRANSans">
            <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            مدیریت سفارش ها
          </h1>
        </div>
        <div className="filters flex gap-5">
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
                      className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900"
                    >
                      نام کاربر
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900"
                    >
                      مجموع مبلغ
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900"
                    >
                      زمان ثبت سفارش
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900"
                    >
                      وضعیت سفارش
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
                        __v={0}
                      />
                    ))
                  ) : (
                    <p>No orders found.</p>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className="pagination">
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage <= 1}>
          قبلی
        </button>
        <span>{currentPage} </span>
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage >= totalPages}>
          بعدی
        </button>
      </div>
    </div>
  );
};

export default AdminPanelOrders;






////////////////////////////////////////////
// import { useQuery } from "react-query";
// import axios from "axios";
// import { useState } from "react";
// import OrdersTable from "../../components/adminPanelComponents/tables/ordersTable";

// export interface Order {
//   _id: string;
//   user: string;
//   products: {
//     product: {
//       _id: string;
//       price: number;
//     };
//     count: number;
//     _id: string;
//   }[];
//   totalPrice: number;
//   deliveryDate: string;
//   deliveryStatus: boolean;
//   createdAt: string;
//   updatedAt: string;
//   __v: number;
// }

// const fetchOrders = async (): Promise<Order[]> => {
//   const accessToken = localStorage.getItem("accessToken");
//   const response = await axios.get("http://localhost:8000/api/orders", {
//     headers: {
//       Authorization: `Bearer ${accessToken}`,
//     },
//   });
//   console.log("API Response:", response.data);
//   return response.data.data.orders;
// };

// const AdminPanelOrders = () => {
//   const [deliveryFilter, setDeliveryFilter] = useState<string | null>(null);

//   const {
//     data: orders,
//     isLoading,
    
//   } = useQuery({
//     queryKey: ["orders"],
//     queryFn: fetchOrders,
//   });

//   if (isLoading) return <p>Loading...</p>;
  

//   const filteredOrders = orders?.filter((order) => {
//     if (deliveryFilter === null) return true;
//     return deliveryFilter === "delivered"
//       ? order.deliveryStatus
//       : !order.deliveryStatus;
//   });

//   const handleFilterChange = (filter: string | null) => {
//     setDeliveryFilter((prevFilter) => (prevFilter === filter ? null : filter));
//   };

//   return (
//     <div className="px-4 sm:px-6 lg:px-8 font-IRANSans">
      // <div className="sm:flex sm:items-center">
      //   <div className="sm:flex-auto">
      //     <h1 className="text-base font-semibold leading-6 text-gray-900">
      //       مدیریت سفارش ها
      //     </h1>
      //   </div>
      //   <div className="filters flex gap-5">
      //     <label>
      //       سفارش های تحویل شده
      //       <input
      //         type="checkbox"
      //         checked={deliveryFilter === "delivered"}
      //         onChange={() => handleFilterChange("delivered")}
      //       />
      //     </label>
      //     <label>
      //       سفارش های در انتظار ارسال
      //       <input
      //         type="checkbox"
      //         checked={deliveryFilter === "notDelivered"}
      //         onChange={() => handleFilterChange("notDelivered")}
      //       />
      //     </label>
      //   </div>
      // </div>
      // <div className="mt-8 flow-root">
      //   <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      //     <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
      //       <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
      //         <table className="min-w-full divide-y divide-violet-300">
      //           <thead className="bg-gray-50">
      //             <tr>
      //               <th
      //                 scope="col"
      //                 className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900"
      //               >
      //                 نام کاربر
      //               </th>
      //               <th
      //                 scope="col"
      //                 className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900"
      //               >
      //                 مجموع مبلغ
      //               </th>
      //               <th
      //                 scope="col"
      //                 className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900"
      //               >
      //                 زمان ثبت سفارش
      //               </th>
      //               <th
      //                 scope="col"
      //                 className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900"
      //               >
      //                 وضعیت سفارش
      //               </th>
      //             </tr>
      //           </thead>
      //           <tbody className="divide-y divide-gray-200 bg-white">
      //             {filteredOrders && filteredOrders.length > 0 ? (
      //               filteredOrders.map((order: Order) => (
      //                 <OrdersTable
      //                   _id={order._id}
      //                   user={order.user}
      //                   products={[]}
      //                   totalPrice={order.totalPrice}
      //                   deliveryDate={order.deliveryDate}
      //                   deliveryStatus={order.deliveryStatus}
      //                   createdAt={order.createdAt}
      //                   updatedAt={""}
      //                   __v={0}
      //                 />
      //               ))
      //             ) : (
      //               <p>No orders found.</p>
      //             )}
      //           </tbody>
      //         </table>
      //       </div>
      //     </div>
      //   </div>
      // </div>
//     </div>
//   );
// };

// export default AdminPanelOrders;
/////




