import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
//
import { useDispatch } from "react-redux";
import { clearCart } from "../../redux/cartSlice";
//

export default function CartPayment() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  ////
  const dispatch = useDispatch();
  ///

  const handlePayment = async () => {
    setIsSubmitting(true);
    const token = localStorage.getItem("accessToken");

    const orderInfo = JSON.parse(localStorage.getItem("orderInfo") || "{}");

    if (!token || !orderInfo.userId) {
      alert("اطلاعات کاربر یافت نشد.");
      setIsSubmitting(false);
      navigate("/unsuccessfulPayment");
      return;
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const orderData = {
      user: orderInfo.userId,
      products: Object.keys(orderInfo.cartItems).map((productId) => ({
        product: productId,
        count: orderInfo.cartItems[productId],
      })),
      deliveryStatus: false,
      deliveryDate: orderInfo.deliveryDate,
    };

    try {
      const response = await axios.post(
        `http://localhost:8000/api/orders`,
        orderData,
        config
      );
      setIsSubmitting(false);

      if (response.data.status === "success") {
        dispatch(clearCart());
        navigate("/successfulPayment");
      } else {
        navigate("/unsuccessfulPayment");
      }
    } catch (error) {
      console.error("There was an error processing the payment:", error);
      setIsSubmitting(false);
      navigate("/unsuccessfulPayment");
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold underline">Cart Payment</h1>
      <div>
        <button onClick={handlePayment} disabled={isSubmitting}>
          {isSubmitting ? "در حال پردازش..." : "پرداخت"}
        </button>
        <button
          onClick={() => navigate("/unsuccessfulPayment")}
          disabled={isSubmitting}
        >
          انصراف
        </button>
      </div>
    </div>
  );
}
