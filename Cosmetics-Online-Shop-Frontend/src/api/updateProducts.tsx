// import axios from "axios";
// import { Product } from "../pages/admin/adminPanelProducts";


// export const updateProduct = async (productId: string, productData: Product) => {
//     const token = localStorage.getItem("accessToken");
//     const formData = new FormData();
  
//     Object.keys(productData).forEach(key => {
//       formData.append(key, productData[key]);
//     });
  
//     const config = {
//       headers: {
//         'Authorization': `Bearer ${token}`,
//       },
//     };
  
//     try {
//       const response = await axios.patch(
//         `http://localhost:8000/api/products/${productId}`,
//         formData,
//         config
//       );
//       console.log(response.data);
//     } catch (error) {
//       console.error("خطا در به‌روزرسانی محصول:", error);
//       throw error;
//     }
//   };
  //////////////////

  import axios from "axios";
import { Product } from "../pages/admin/adminPanelProducts";

export const updateProduct = async (productId: string, productData: Product, images?: FileList) => {
    const token = localStorage.getItem("accessToken");
    const formData = new FormData();
  
    // اضافه کردن فیلدهای متنی به formData
    Object.keys(productData).forEach(key => {
        // برای فیلدهایی که از نوع object هستند، می‌توانید JSON.stringify کنید یا فیلدهای تکی را اضافه کنید
        if (typeof productData[key] === 'object' && productData[key] !== null) {
            formData.append(key, JSON.stringify(productData[key]));
        } else {
            formData.append(key, productData[key]);
        }
    });
  
    // اضافه کردن فایل‌های عکس به formData
    if (images) {
        Array.from(images).forEach((file, index) => {
            formData.append(`images[${index}]`, file);
        });
    }

    const config = {
        headers: {
            'Authorization': `Bearer ${token}`,
            // نیازی به تعیین Content-Type نیست زیرا مرورگر به صورت خودکار آن را مدیریت می‌کند
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
