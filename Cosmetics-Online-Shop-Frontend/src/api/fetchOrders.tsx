import axios from "axios";
import { Order } from "../pages/admin/adminPanelOrders";

export const fetchOrders = async (currentPage :number): Promise<Order[]> => {
  const accessToken = localStorage.getItem("accessToken");
  const response = await axios.get(
    `http://localhost:8000/api/orders?page=${currentPage}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  
  return response.data.data.orders;
};
