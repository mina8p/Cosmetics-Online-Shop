import axios from "axios";
import { Product } from "../pages/admin/adminPanelProducts";


export const updateProduct = async (productId: string, productData: Product) => {
    const token = localStorage.getItem("accessToken");
    const formData = new FormData();
  
    Object.keys(productData).forEach(key => {
      formData.append(key, productData[key]);
    });
  
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    };
  
    try {
      const response = await axios.patch(
        `http://localhost:8000/api/products/${productId}`,
        formData,
        config
      );
      console.log(response.data);
    } catch (error) {
      console.error("خطا در به‌روزرسانی محصول:", error);
      throw error;
    }
  };
  