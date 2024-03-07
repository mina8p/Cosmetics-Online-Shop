import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

export default function AdminTopBar() {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState("/adminPanel");

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location]);

  return (
    <div className="font-IRANSans w-full">
      <div className="flex gap-10 justify-center">
        <div
          className={`text-3xl font-bold p-2 rounded-lg${
            activeLink === "/adminPanel"
              ? "bg-violet-500 text-white"
              : "text-violet-500"
          }`}
        >
          <Link to="/adminPanel">سفارش ها</Link>
        </div>
        <div
          className={`text-3xl font-bold ${
            activeLink === "/adminPanel/adminPanelInventory&Prices"
              ? "bg-violet-500 text-white"
              : "text-violet-500"
          }`}
        >
          <Link to="/adminPanel/adminPanelInventory&Prices">
            موجودی و قیمت ها
          </Link>
        </div>
        <div
          className={`text-3xl font-bold ${
            activeLink === "/adminPanel/adminPanelProducts"
              ? "bg-violet-500 text-white"
              : "text-violet-500"
          }`}
        >
          <Link to="/adminPanel/adminPanelProducts">کالاها</Link>
        </div>
      </div>
    </div>
  );
}
