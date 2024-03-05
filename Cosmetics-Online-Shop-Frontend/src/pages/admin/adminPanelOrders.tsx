import { Link } from "react-router-dom";

export default function AdminPanelOrders () {
    return (
      <div>
      <h1 className="text-3xl font-bold underline">
       AdminPanelOrders
      </h1>
      <div className="text-3xl font-bold underline"><Link to="/adminPanel/adminPanelInventory&Prices">dminPanelInventory&Prices</Link></div>
      <div className="text-3xl font-bold underline"><Link to="/adminPanel/adminPanelProducts">adminPanelProducts</Link></div>
      </div>
    )
  }


