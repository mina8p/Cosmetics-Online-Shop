import { useQuery } from "react-query";
import { fetchuserById } from "../../../api/fetchuserbyid";
import { Order } from "../../../pages/admin/adminPanelOrders";
import moment from "jalali-moment";

export default function OrdersTable({
  _id,
  createdAt,
  totalPrice,
  user,
  deliveryStatus,
  
}: Order) {
  //////////////////////
  const { data: userIdData } = useQuery([`userId`,user], () => fetchuserById(user));
  console.log(userIdData);
  //////////////////////
  const solarCalendarCreatedAt = moment(createdAt).format('jYYYY/jMM/jDD')

  return (
    <tr key={_id}>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-600 text-center">
        {userIdData?.data?.user?.firstname} {userIdData?.data?.user?.lastname}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-600 text-center">
        {totalPrice}{"   تومان"}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-600 text-center">
        {solarCalendarCreatedAt}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-600 text-center">
        <button>بررسی سفارش</button>
        {deliveryStatus ? "Delivered" : "Not Delivered"}
      </td>
    </tr>
  );
}
