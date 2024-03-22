import React from "react";
import { Order } from "../../pages/admin/adminPanelOrders";
import { Link } from "react-router-dom";
import moment from "jalali-moment";

export interface User {
  _id: string;
  firstname: string;
  lastname: string;
  address: string;
  phoneNumber: string;
  // Include other user properties as needed
}

interface OrderDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderDetails: Order | null;
}

const isUserObject = (user: any): user is User => {
  return (
    user &&
    typeof user === "object" &&
    "firstname" in user &&
    "lastname" in user &&
    "phoneNumber" in user &&
    "address" in user
  );
};

const OrderDetailsModal: React.FC<OrderDetailsModalProps> = ({
  isOpen,
  onClose,
  orderDetails,
}) => {
  if (!isOpen) return null;
  //
  const formatDateToJalali = (dateString: string) => {
    const date = moment(dateString);
    return date.locale("fa").format("YYYY/MM/DD");
  };
  //

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white p-5 rounded-lg shadow-lg">
        {orderDetails ? (
          <>
            <h2 className="text-lg font-bold mb-4">جزئیات سفارش</h2>
            <p>
              <strong>کاربر:</strong>{" "}
              {isUserObject(orderDetails.user)
                ? `${orderDetails.user.firstname} ${orderDetails.user.lastname}`
                : "User Info Not Available"}
            </p>
            <p>
              <strong>آدرس:</strong>{" "}
              {isUserObject(orderDetails.user)
                ? `${orderDetails.user.address} `
                : "User Info Not Available"}
            </p>
            <p>
              <strong>تلفن همراه:</strong>{" "}
              {isUserObject(orderDetails.user)
                ? `${orderDetails.user.phoneNumber} `
                : "User Info Not Available"}
            </p>
           
           
            <p>
              <strong>قیمت کل:</strong> {orderDetails.totalPrice} تومان
            </p>
            <p>
              <strong> تاریخ سفارش:</strong>{" "}
              {formatDateToJalali(orderDetails.createdAt)}
            </p>
            <p>
              <strong>وضعیت سفارش:</strong>{" "}
              {orderDetails.deliveryStatus
                ? "تحویل داده شده"
                : "در انتظار تحویل"}
            </p>

            {/* Table for ordered products */}
            <div className="mt-4">
              <div></div>
              <h3 className="text-lg font-bold mb-2">
                محصولات سفارش داده شده:
              </h3>
              <table className="min-w-full">
                <thead>
                  <tr>
                    <th className="px-3 py-2 text-xs text-center font-medium text-gray-500 uppercase tracking-wider">
                      تصویر
                    </th>
                    <th className="px-3 py-2 text-xs text-center font-medium text-gray-500 uppercase tracking-wider">
                      نام محصول
                    </th>
                    <th className="px-3 py-2 text-xs text-center font-medium text-gray-500 uppercase tracking-wider">
                      تعداد
                    </th>
                    <th className="px-3 py-2 text-xs text-center font-medium text-gray-500 uppercase tracking-wider">
                      قیمت
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {orderDetails.products.map((item) => (
                    <tr className="text-center" key={item._id}>
                      <td className="px-3 py-4 whitespace-nowrap">
                        <Link to={`/products/${item.product._id}`}>
                          <img
                            src={`http://localhost:8000/images/products/thumbnails/${item.product.thumbnail}`}
                            alt={item.product.name}
                            className="w-10 h-10 object-cover"
                          />
                        </Link>
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap">
                        <Link to={`/products/${item.product._id}`}>
                          {item.product.name}
                        </Link>
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap">
                        {item.count}
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap">
                        {item.product.price} تومان
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <button
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
              onClick={onClose}
            >
              بستن
            </button>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default OrderDetailsModal;

///////
