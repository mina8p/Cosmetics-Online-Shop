import { useState } from "react";
import CategoriesWithSubcategories from "../pages/homePage/CategoriesWithSubcategories";

// تعریف نوع برای آیتم‌های منو و وضعیت زیرمنوها
interface MenuItems {
  [key: string]: string[];
}

interface OpenSubMenus {
  [key: string]: boolean;
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [openSubMenus, setOpenSubMenus] = useState<OpenSubMenus>({});

  const menuItems: MenuItems = {
    "آرایش چشم": ["ریمل", "خط چشم", "سایه چشم"],
    "آرایش لب": ["رژلب", "خط لب", "برق لب"],
    "آرایش صورت": ["کرم پودر", "رژگونه","کانسیلر", "هایلایتر"],
  };
  const toggleSubMenu = (item: string) => {
    // بررسی اینکه آیا منوی مورد نظر در حال حاضر باز است یا خیر
    const isCurrentlyOpen = openSubMenus[item];

    // بستن همه زیرمنوها
    setOpenSubMenus({});

    // اگر منوی مورد نظر در حال حاضر بسته بود، آن را باز کن
    if (!isCurrentlyOpen) {
      setOpenSubMenus({ [item]: true });
    }
  };

  //   const toggleSubMenu = (item: string) => {
  //     setOpenSubMenus(prev => ({ ...prev, [item]: !prev[item] }));
  //   };

  return (
    <div>
    <nav className="bg-violet-500 text-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center">
          <div>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white focus:outline-none md:hidden"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                ></path>
              </svg>
            </button>
          </div>
        </div>
        <div className={`md:flex ${isOpen ? "" : "hidden"}`}>
          {Object.keys(menuItems).map((item) => (
            <div key={item} className="relative">
              <button
                onClick={() => toggleSubMenu(item)}
                className="py-5 px-3 block hover:text-gray-400 md:hover:text-gray-900 md:px-0"
              >
                {item}
                <svg
                  className="inline h-4 w-4 ml-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </button>
              {openSubMenus[item] && (
                <div
                  className={`md:absolute md:bg-gray-800 md:text-white md:py-2 transition-opacity duration-1000 ease-in-out ${
                    openSubMenus[item] ? "opacity-100" : "opacity-0"
                  }`}
                >
                  {menuItems[item].map((subItem) => (
                    <a
                      href="#"
                      key={subItem}
                      className="block px-4 py-2 hover:bg-gray-700 md:hover:bg-gray-900"
                    >
                      {subItem}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </nav>
       <CategoriesWithSubcategories/>

    </div>
  );
};

export default Navbar;
