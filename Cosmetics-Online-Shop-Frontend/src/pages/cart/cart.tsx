// import { useSelector, useDispatch } from "react-redux";
// import { RootState } from "../../redux/store";
// import { addItem, removeItem, deleteItem } from "../../redux/cartSlice";

// export default function Cart() {
//   const cartItems = useSelector((state: RootState) => state.cart.items);
//   const dispatch = useDispatch();

//   const handleRemoveItem = (productId: string, quantity: number = 1) => {
//     dispatch(removeItem({ productId, quantity }));
//   };
//   const handleaddItem = (productId: string,  quantity: number = 1) => {
//     dispatch(addItem({ productId, quantity  }));
//   };

//   const handleDeleteItem = (productId: string) => {
//     dispatch(deleteItem({ productId }));
//   };

//   return (
//     <div>
//       <h1 className="text-3xl font-bold underline">Cart</h1>
//       <div>
//         {Object.keys(cartItems).length === 0 ? (
//           <p>سبد خرید خالی است.</p>
//         ) : (
//           <ul>
//             {Object.entries(cartItems).map(([productId, quantity ]) => (
//               <li key={productId}>
//                 محصول ID: {productId} - تعداد: {quantity} نام محصول: {productId}
//                 <button onClick={() => handleRemoveItem(productId)}>
//                   کم کردن
//                 </button>{" "}
//                 <button onClick={() => handleaddItem(productId)}>
//                   اضافه کردن
//                 </button>{" "}
//                 <button onClick={() => handleDeleteItem(productId)}>حذف</button>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </div>
//   );
// }
/////////////////

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { addItem, removeItem, deleteItem } from "../../redux/cartSlice";
import axios from "axios";
import { Link } from "react-router-dom";

interface ProductInfo {
  name: string;
  image: string;
  price: number
}

// تعریف تابع fetchProductById با استفاده از axios
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

  // استخراج نام و تصویر بندانگشتی از پاسخ
  const { name, thumbnail, price } = response.data.data.product;
  return { name, image: thumbnail, price }; // ساختار برگشتی مطابق با اینترفیس ProductInfo
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
    dispatch(addItem({ productId, quantity }));
  };

  const handleDeleteItem = (productId: string) => {
    dispatch(deleteItem({ productId }));
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

  return (
    <div>
      <h1 className="text-3xl font-bold underline">Cart</h1>
      <div>
        {Object.keys(cartItems).length === 0 ? (
          <p>سبد خرید خالی است.</p>
        ) : (
          <ul>
            {Object.entries(cartItems).map(([productId, quantity]) => (
              <li key={productId}>
                <Link to={`/products/${productId}`} key={productId}>
                نام محصول: {productInfos[productId]?.name}
                </Link>
                قیمت: {productInfos[productId]?.price}
                <img
                  src={`http://localhost:8000/images/products/thumbnails/${productInfos[productId]?.image}`}
                  alt="محصول"
                  style={{ width: 50, height: 50 }}
                />
                <button onClick={() => handleRemoveItem(productId)}>
                  کم کردن
                </button>
                تعداد: {quantity}
                
                <button onClick={() => handleaddItem(productId)}>
                  اضافه کردن
                </button>
                <button onClick={() => handleDeleteItem(productId)}>حذف</button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div>
      <Link to={`/finalizeCart`}>
        <button>
          نهایی کردن سبد خرید
        </button>
        </Link>
      </div>
    </div>
  );
}
