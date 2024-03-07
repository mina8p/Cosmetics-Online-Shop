import axios from "axios";
import { Order } from "../pages/admin/adminPanelOrders";

export const fetchOrders = async (currentPage = 1): Promise<Order[]> => {
  const accessToken = localStorage.getItem("accessToken");
  const response = await axios.get(
    `http://localhost:8000/api/orders?page=${currentPage}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  console.log("API Response:", response.data);
  return response.data.data.orders;
};
