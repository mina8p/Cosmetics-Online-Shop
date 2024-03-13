// import axios from 'axios';

// interface ProductForm {
//   name: string;
//   price: number;
//   description: string;
//   category: string;
// }

// export const sendProductData = async (productData: ProductForm): Promise<void> => {
//   const formData = new FormData();
//   formData.append('name', productData.name);
//   formData.append('price', productData.price.toString());
//   formData.append('description', productData.description);
//   formData.append('category', productData.category);

//   // در صورتی که نیاز به افزودن تصاویر یا فایل‌های دیگر به FormData باشد، می‌توانید از formData.append استفاده کنید.
//   // مثال: formData.append('image', fileInput.files[0]);

//   // دریافت توکن ذخیره شده
//   const token = localStorage.getItem("accessToken");

//   try {
//     const response = await axios.post('http://localhost:8000/api/products', formData, {
//       headers: {
//         'Authorization': `Bearer ${token}`,
//         // 'Content-Type': 'multipart/form-data' نیازی به تعیین نیست زیرا Axios به طور خودکار مقدار مناسب را تنظیم می‌کند
//       },
//     });

//     console.log(response.data); // لاگ یا نمایش نتیجه
//     // می‌توانید در اینجا برای به‌روزرسانی UI یا نمایش پیغام موفقیت آمیز به کاربر، کدی بنویسید.
//   } catch (error) {
//     console.error('Error:', error);
//     // نمایش خطا به کاربر یا لاگ کردن آن
//   }
// };

////////////////////

import axios from 'axios';

interface ProductForm {
  category: string;
  subcategory: string;
  name: string;
  price: number;
  quantity: number;
  brand: string;
  description: string;
  thumbnail: File | null;
  images: File[];
}

export const sendProductData = async (productData: ProductForm): Promise<void> => {
  const formData = new FormData();
  formData.append('category', productData.category);
  formData.append('subcategory', productData.subcategory);
  formData.append('name', productData.name);
  formData.append('price', productData.price.toString());
  formData.append('quantity', productData.quantity.toString());
  formData.append('brand', productData.brand);
  formData.append('description', productData.description);

  if (productData.thumbnail) {
    formData.append('thumbnail', productData.thumbnail);
  }

  productData.images.forEach((image, index) => {
    formData.append(`images[${index}]`, image);
  });

  const token = localStorage.getItem("accessToken");

  try {
    const response = await axios.post('http://localhost:8000/api/products', formData, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    console.log(response.data); 
  } catch (error) {
    console.error('Error:', error);
  }
};

