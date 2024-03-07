import { Link } from "react-router-dom";

export default function AdminTopBar() {
  return (
    <div className="font-IRANSans w-full">
      <div className="flex gap-10 justify-center">
        <div className="text-3xl font-bold ">
          <Link to="/adminPanel">سفارش ها</Link>
        </div>
        <div className="text-3xl font-bold ">
          <Link to="/adminPanel/adminPanelInventory&Prices">
            موجودی و قیمت ها
          </Link>
        </div>
        <div className="text-3xl font-bold ">
          <Link to="/adminPanel/adminPanelProducts">کالاها</Link>
        </div>
      </div>
    </div>
  );
}
