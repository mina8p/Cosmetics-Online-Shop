import { Link } from "react-router-dom";

export default function UnsuccessfulPayment () {
    return (
      <div>
      <h1 className="text-3xl font-bold underline">
       unsuccessfulPayment
      </h1>
      <p>پرداخت موفقیت آمیز نبود سفارش شما در انتظار پرداخت است </p>
      
      <button>
          <Link to="/cart">بازگشت به سبد خرید</Link>
        </button>
      </div>
    )
  }