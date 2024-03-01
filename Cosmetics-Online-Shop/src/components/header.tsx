import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className=" flex justify-around items-center shadow h-20 w-full bg-[#FEF9FC]">
      <div className="flex ">
        <div className="mr-5 flex flex-col justify-center items-center font-bold hover:text-pink-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>

          <Link to="/adminLogin">پنل مدیریت</Link>
        </div>
        <div className="flex flex-col justify-center items-center font-bold hover:text-pink-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
            />
          </svg>

          <Link to="/cart">سبد خرید</Link>
        </div>
      </div>

      <div className=" flex  justify-center items-center font-bold ">
        <div className="mr-5 hover:text-pink-500">محصولات</div>
        <div className="mr-5 hover:text-pink-500">برند ها</div>
        <div>
          <img
            className="h-16 w-16 rounded-full  border-4 border-pink-500"
            src="../../public/cosmetics.png"
            alt=""
          />
        </div>
      </div>
    </div>
  );
}


