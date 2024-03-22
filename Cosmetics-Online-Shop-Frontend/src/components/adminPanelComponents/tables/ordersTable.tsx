import { useQuery } from "react-query";
import { fetchuserById } from "../../../api/fetchuserbyid";
import { Order } from "../../../pages/admin/adminPanelOrders";
import moment from "jalali-moment";
import { useState } from "react";
import { GetOrderById } from "../../../api/getOrdersById";
import OrderDetailsModal from "../../modals/modalOrderDetails";

export default function OrdersTable({
  _id,
  createdAt,
  totalPrice,
  user,
  deliveryStatus,
}: Order) {
  //////////////////////
  const { data: userIdData } = useQuery([`userId`, user], () =>
    fetchuserById(user)
  );
  console.log(userIdData);
  //////////////////////
  const solarCalendarCreatedAt = moment(createdAt).format("jYYYY/jMM/jDD");
  ////////////////
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedOrderDetails, setSelectedOrderDetails] =
    useState<Order | null>(null);

  const handleOpenModal = async (orderId: string) => {
    // Fetch order details using orderId
    const orderDetails = await GetOrderById(orderId); // Assuming this is your fetch function
    setSelectedOrderDetails(orderDetails);
    setModalOpen(true);
    console.log(orderDetails);
  };

  return (
    <tr key={_id}>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-600 text-center">
        {userIdData?.data?.user?.firstname} {userIdData?.data?.user?.lastname}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-600 text-center">
        {totalPrice}
        {"   تومان"}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-600 text-center">
        {solarCalendarCreatedAt}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-600 text-center">
        {deliveryStatus ? "تحویل داده شده" : "در انتظار تحویل"}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-600 text-center">
        <button onClick={() => handleOpenModal(_id)}>بررسی سفارش</button>
      </td>
      <OrderDetailsModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        orderDetails={selectedOrderDetails}
      />
    </tr>
  );
}
