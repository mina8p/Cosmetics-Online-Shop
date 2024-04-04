// import { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { RootState } from "../../redux/store";
// import { addItem, removeItem, deleteItem } from "../../redux/cartSlice";
// import axios from "axios";
// import { Link } from "react-router-dom";

// interface ProductInfo {
//   name: string;
//   image: string;
//   price: number;
//   availableQuantity: number;
// }

// // تعریف تابع fetchProductById با استفاده از axios
// const getProductById = async (productId: string) => {
//   const token = localStorage.getItem("accessToken");

//   const config = {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   };
//   const response = await axios.get(
//     `http://localhost:8000/api/products/${productId}`,
//     config
//   );

//   // استخراج نام و تصویر بندانگشتی از پاسخ
//   const { name, thumbnail, price ,quantity } = response.data.data.product;
//   return { name, image: thumbnail, price , availableQuantity:quantity}; // ساختار برگشتی مطابق با اینترفیس ProductInfo
// };

// export default function Cart() {
//   const cartItems = useSelector((state: RootState) => state.cart.items);
//   const dispatch = useDispatch();
//   const [productInfos, setProductInfos] = useState<{
//     [productId: string]: ProductInfo;
//   }>({});

//   const handleRemoveItem = (productId: string, quantity: number = 1) => {
//     dispatch(removeItem({ productId, quantity }));
//   };

//   // const handleaddItem = (productId: string, quantity: number = 1) => {
//   //   dispatch(addItem({ productId, quantity }));
//   // };
//   const handleaddItem = (productId: string, quantity: number = 1) => {
//     // دریافت تعداد فعلی و موجودی محصول
//     const currentQuantity = cartItems[productId] ?? 0;
//     const availableQuantity = productInfos[productId]?.availableQuantity ?? 0;

//     // بررسی که با افزودن، تعداد از موجودی تجاوز نکند
//     if (currentQuantity + quantity > availableQuantity) {
//       console.log("نمی‌توان بیشتر از موجودی به سبد اضافه کرد"); // یا نمایش یک پیام خطا به کاربر
//       return;
//     }

//     dispatch(addItem({ productId, quantity }));
//   };

//   const handleDeleteItem = (productId: string) => {
//     dispatch(deleteItem({ productId }));
//   };

//     // A function to calculate the total price of items in the cart
//     const calculateTotalPrice = () => {
//       return Object.entries(cartItems).reduce((total, [productId, quantity]) => {
//         const price = productInfos[productId]?.price || 0;
//         return total + price * quantity;
//       }, 0);
//     };

//   useEffect(() => {
//     const fetchAllProductInfos = async () => {
//       const productInfoPromises = Object.keys(cartItems).map((productId) =>
//         getProductById(productId)
//       );
//       const productsInfos = await Promise.all(productInfoPromises);
//       const newProductInfos = productsInfos.reduce(
//         (acc, productInfo, index) => {
//           const productId = Object.keys(cartItems)[index];
//           acc[productId] = productInfo;
//           return acc;
//         },
//         {} as { [productId: string]: ProductInfo }
//       );

//       setProductInfos(newProductInfos);
//     };

//     if (Object.keys(cartItems).length > 0) {
//       fetchAllProductInfos();
//     }
//   }, [cartItems]);

//   //////////////////

//   return (
//     <div className="mb-56">
//       <h1 className="text-3xl font-bold underline ">Cart</h1>
//       <div>
//         {Object.keys(cartItems).length === 0 ? (
//           <p>سبد خرید خالی است.</p>
//         ) : (
//           <ul>
//             {Object.entries(cartItems).map(([productId, quantity]) => (
//               <li key={productId}>
//                 <Link to={`/products/${productId}`} key={productId}>
//                   نام محصول: {productInfos[productId]?.name}
//                 </Link>
//                 قیمت: {productInfos[productId]?.price}
//                 <img
//                   src={`http://localhost:8000/images/products/thumbnails/${productInfos[productId]?.image}`}
//                   alt="محصول"
//                   style={{ width: 50, height: 50 }}
//                 />
//                 <button onClick={() => handleRemoveItem(productId)}>
//                   -
//                 </button>
//                 {quantity}
//                 <button onClick={() => handleaddItem(productId)}>
//                   +
//                 </button>
//                 <button onClick={() => handleDeleteItem(productId)}>حذف</button>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>

//       <div>
//       <h2>جمع کل: {calculateTotalPrice()} تومان</h2>
//       <div>
//         <Link to={`/finalizeCart`}>
//           <button>نهایی کردن سبد خرید</button>
//         </Link>
//       </div>
//       </div>

//     </div>
//   );
// }
//////////////
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { addItem, removeItem, deleteItem } from "../../redux/cartSlice";
import axios from "axios";
import { Link } from "react-router-dom";

interface ProductInfo {
  name: string;
  image: string;
  brand: string;
  price: number;
  availableQuantity: number;
}


const getProductById = async (productId: string) => {
  const token = localStorage.getItem("accessToken");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(
    `http://localhost:8000/api/products/${productId}`,
    config
  );


  const { name, thumbnail, price, quantity,brand } = response.data.data.product;
  return { name, image: thumbnail, price,brand, availableQuantity: quantity }; 
};

export default function Cart() {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const [productInfos, setProductInfos] = useState<{
    [productId: string]: ProductInfo;
  }>({});

  const handleRemoveItem = (productId: string, quantity: number = 1) => {
    dispatch(removeItem({ productId, quantity }));
  };

  const handleaddItem = (productId: string, quantity: number = 1) => {
    // دریافت تعداد فعلی و موجودی محصول
    const currentQuantity = cartItems[productId] ?? 0;
    const availableQuantity = productInfos[productId]?.availableQuantity ?? 0;

    // بررسی که با افزودن، تعداد از موجودی تجاوز نکند
    if (currentQuantity + quantity > availableQuantity) {
      console.log("نمی‌توان بیشتر از موجودی به سبد اضافه کرد"); // یا نمایش یک پیام خطا به کاربر
      return;
    }

    dispatch(addItem({ productId, quantity }));
  };

  const handleDeleteItem = (productId: string) => {
    dispatch(deleteItem({ productId }));
  };

  // A function to calculate the total price of items in the cart
  const calculateTotalPrice = () => {
    return Object.entries(cartItems).reduce((total, [productId, quantity]) => {
      const price = productInfos[productId]?.price || 0;
      return total + price * quantity;
    }, 0);
  };

  useEffect(() => {
    const fetchAllProductInfos = async () => {
      const productInfoPromises = Object.keys(cartItems).map((productId) =>
        getProductById(productId)
      );
      const productsInfos = await Promise.all(productInfoPromises);
      const newProductInfos = productsInfos.reduce(
        (acc, productInfo, index) => {
          const productId = Object.keys(cartItems)[index];
          acc[productId] = productInfo;
          return acc;
        },
        {} as { [productId: string]: ProductInfo }
      );

      setProductInfos(newProductInfos);
    };

    if (Object.keys(cartItems).length > 0) {
      fetchAllProductInfos();
    }
  }, [cartItems]);

  //////////////////

  return (
    <div className="mb-56">
      <h1 className="text-3xl font-bold underline ">سبد خرید</h1>
      <div>
        {Object.keys(cartItems).length === 0 ? (
          <p>سبد خرید شما خالی است.</p>
        ) : (
          <ul>
            {Object.entries(cartItems).map(([productId, quantity]) => (
              <div key={productId}>

                
                <Link to={`/products/${productId}`} key={productId}>
                  نام محصول: {productInfos[productId]?.name}
                </Link>
                قیمت: {productInfos[productId]?.price}
                برند: {productInfos[productId]?.brand}
                <img
                  src={`http://localhost:8000/images/products/thumbnails/${productInfos[productId]?.image}`}
                  alt="محصول"
                  style={{ width: 50, height: 50 }}
                />
                <button onClick={() => handleRemoveItem(productId)}>-</button>
                {quantity}
                <button onClick={() => handleaddItem(productId)}>+</button>
                <button onClick={() => handleDeleteItem(productId)}>حذف</button>
              </div>
            ))}
          </ul>
        )}
      </div>

      <div>
        <h2>جمع کل: {calculateTotalPrice()} تومان</h2>
        <div>
          <Link to={`/finalizeCart`}>
            <button>نهایی کردن سبد خرید</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
