import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { addItem, removeItem, deleteItem } from "../../redux/cartSlice";

export default function Cart() {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  const handleRemoveItem = (productId: string, quantity: number = 1) => {
    dispatch(removeItem({ productId, quantity }));
  };
  const handleaddItem = (productId: string,  quantity: number = 1) => {
    dispatch(addItem({ productId, quantity  }));
  };

  const handleDeleteItem = (productId: string) => {
    dispatch(deleteItem({ productId }));
  };

  return (
    <div>
      <h1 className="text-3xl font-bold underline">Cart</h1>
      <div>
        {Object.keys(cartItems).length === 0 ? (
          <p>سبد خرید خالی است.</p>
        ) : (
          <ul>
            {Object.entries(cartItems).map(([productId, quantity ]) => (
              <li key={productId}>
                محصول ID: {productId} - تعداد: {quantity} نام محصول: {productId}
                <button onClick={() => handleRemoveItem(productId)}>
                  کم کردن
                </button>{" "}
                <button onClick={() => handleaddItem(productId)}>
                  اضافه کردن
                </button>{" "}
                <button onClick={() => handleDeleteItem(productId)}>حذف</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
