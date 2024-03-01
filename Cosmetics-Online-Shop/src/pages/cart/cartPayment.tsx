import { Link } from "react-router-dom"

export default function CartPayment () {
    return (
        <div>
      <h1 className="text-3xl font-bold underline">
       cartPayment
      </h1>
      <div>
<button><Link to="/successfulPayment">پرداخت</Link></button>
<button><Link to="/unsuccessfulPayment">انصراف</Link></button>
      </div>
      </div>
    )
  }