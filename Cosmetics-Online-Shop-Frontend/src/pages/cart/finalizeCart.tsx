// import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { RootState } from "../../redux/store";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// import DatePicker from "react-multi-date-picker";
// import { DateObject } from "react-multi-date-picker";
// import persian from "react-date-object/calendars/persian";
// import persian_fa from "react-date-object/locales/persian_fa";

// interface User {
//   _id: string;
//   firstname: string;
//   lastname: string;
//   username: string;
//   phoneNumber: string;
//   address: string;
// }

// export const fetchUserById = async (id: string) => {
//   const token = localStorage.getItem("accessToken");
//   const config = {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   };
//   const response = await axios.get(
//     `http://localhost:8000/api/users/${id}`,
//     config
//   );
//   return response.data;
// };

// export default function FinalizeCart() {
//   const [user, setUser] = useState<User | null>(null);
//   const [deliveryDate, setDeliveryDate] = useState<number | null>(null); // Change the state to store unix timestamp
//   const navigate = useNavigate();
//   const cartItems = useSelector((state: RootState) => state.cart.items);

//   useEffect(() => {
//     const userId = "65e7295e50e39d2e1db9956a";
//     fetchUserById(userId).then((data) => {
//       setUser(data.data.user);
//     });
//   }, []);

//   const handleDateChange = (date: DateObject) => {
//     // Store the unix timestamp instead of formatted string
//     setDeliveryDate(date.unix);
//   };

//   const handleNavigateToPayment = () => {
//     if (user && deliveryDate && Object.keys(cartItems).length > 0) {
//       const orderInfo = {
//         userId: user._id,
//         deliveryDate: deliveryDate, // This is now a unix timestamp
//         cartItems: cartItems,
//       };

//       localStorage.setItem("orderInfo", JSON.stringify(orderInfo));
//       navigate("/payment");
//     } else {
//       alert("لطفاً تمامی اطلاعات را وارد کنید.");
//     }
//   };

//   return (
//     <div>
//       <h1 className="text-3xl font-bold underline">Finalize Cart</h1>
//       <div>
//         {user && (
//           <div>
//             <p>نام: {user.firstname}</p>
//             <p>نام خانوادگی: {user.lastname}</p>
//             <p>نام کاربری: {user.username}</p>
//             <p>شماره تلفن: {user.phoneNumber}</p>
//             <p>آدرس: {user.address}</p>
//             <label>
//               تاریخ تحویل:
//               <DatePicker
//                 value={
//                   deliveryDate
//                     ? new DateObject(new Date(deliveryDate * 1000))
//                     : null
//                 }
//                 onChange={(date) => {
//                   setDeliveryDate(date.unix);
//                 }}
//                 calendar={persian}
//                 locale={persian_fa}
//                 calendarPosition="bottom-right"
//                 format="YYYY-MM-DD"
//                 minDate={
//                   new DateObject({ calendar: persian, locale: persian_fa })
//                 }
//               />
//             </label>
//           </div>
//         )}
//         <button onClick={handleNavigateToPayment}>ادامه به پرداخت</button>
//       </div>
//     </div>
//   );
// }
/////////
/////////////////////////////////////////////////////////////1348
// import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { RootState } from "../../redux/store";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// import DatePicker from "react-multi-date-picker";
// import { DateObject } from "react-multi-date-picker";
// import persian from "react-date-object/calendars/persian";
// import persian_fa from "react-date-object/locales/persian_fa";

// interface User {
//   _id: string;
//   firstname: string;
//   lastname: string;
//   username: string;
//   phoneNumber: string;
//   address: string;
// }

// export const fetchUserById = async (id: string) => {
//   const token = localStorage.getItem("accessToken");
//   const config = {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   };
//   const response = await axios.get(
//     `http://localhost:8000/api/users/${id}`,
//     config
//   );
//   return response.data;
// };

// export default function FinalizeCart() {
//   const [user, setUser] = useState<User | null>(null);
//   const [deliveryDate, setDeliveryDate] = useState<number | null>(null); // Change the state to store unix timestamp
//   const navigate = useNavigate();
//   const cartItems = useSelector((state: RootState) => state.cart.items);

//   useEffect(() => {
//     const userId = "65e7295e50e39d2e1db9956a";
//     fetchUserById(userId).then((data) => {
//       setUser(data.data.user);
//     });
//   }, []);

//   // const handleDateChange = (date: DateObject) => {
//   //   // Store the unix timestamp instead of formatted string
//   //   setDeliveryDate(date.unix);
//   // };

//   const handleNavigateToPayment = () => {
//     if (user && deliveryDate && Object.keys(cartItems).length > 0) {
//       const orderInfo = {
//         userId: user._id,
//         deliveryDate: deliveryDate, // This is now a unix timestamp
//         cartItems: cartItems,
//       };

//       localStorage.setItem("orderInfo", JSON.stringify(orderInfo));
//       navigate("/payment");
//     } else {
//       alert("لطفاً تمامی اطلاعات را وارد کنید.");
//     }
//   };

//   return (
//     <div>
//       <h1 className="text-3xl font-bold underline">Finalize Cart</h1>
//       <div>
//         {user && (
//           <div>
//             <p>نام: {user.firstname}</p>
//             <p>نام خانوادگی: {user.lastname}</p>
//             <p>نام کاربری: {user.username}</p>
//             <p>شماره تلفن: {user.phoneNumber}</p>
//             <p>آدرس: {user.address}</p>
//             <label>
//               تاریخ تحویل:
//               <DatePicker
//                 value={
//                   deliveryDate
//                     ? new DateObject(new Date(deliveryDate * 1000))
//                     : null
//                 }
//                 onChange={(date) => {
//                   setDeliveryDate(date.unix);
//                 }}
//                 calendar={persian}
//                 locale={persian_fa}
//                 calendarPosition="bottom-right"
//                 format="YYYY-MM-DD"
//                 minDate={
//                   new DateObject({ calendar: persian, locale: persian_fa })
//                 }
//               />
//             </label>
//           </div>
//         )}
//         <button onClick={handleNavigateToPayment}>ادامه به پرداخت</button>
//       </div>
//     </div>
//   );
// }

////////////////////////////////////////////////////
// //////
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface User {
  _id: string;
  firstname: string;
  lastname: string;
  username: string;
  phoneNumber: string;
  address: string;
}

export const fetchUserById = async (id: string) => {
  const token = localStorage.getItem("accessToken");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(
    `http://localhost:8000/api/users/${id}`,
    config
  );
  return response.data;
};

export default function FinalizeCart() {
  const [user, setUser] = useState<User | null>(null);
  const [deliveryDate, setDeliveryDate] = useState("");
  const navigate = useNavigate();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  useEffect(() => {
    const userId = "65e7295e50e39d2e1db9956a"; // ID provided for the user
    fetchUserById(userId).then((data) => {
      setUser(data.data.user);
    });
  }, []);

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDeliveryDate(event.target.value);
  };

  const handleNavigateToPayment = () => {

    if (user && deliveryDate && Object.keys(cartItems).length > 0) {

      const orderInfo = {
        userId: user._id,
        deliveryDate: deliveryDate,
        cartItems: cartItems,
      };

      localStorage.setItem("orderInfo", JSON.stringify(orderInfo));
      navigate("/payment");
    } else {
      alert("لطفاً تمامی اطلاعات را وارد کنید.");
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold underline">Finalize Cart</h1>
      <div>
        {user && (
          <div>
            <p>نام: {user.firstname}</p>
            <p>نام خانوادگی: {user.lastname}</p>
            <p>نام کاربری: {user.username}</p>
            <p>شماره تلفن: {user.phoneNumber}</p>
            <p>آدرس: {user.address}</p>
            <label>
              تاریخ تحویل:
              <input
                type="date"
                value={deliveryDate}
                onChange={handleDateChange}
              />
            </label>
          </div>
        )}
        <button onClick={handleNavigateToPayment}>ادامه به پرداخت</button>
      </div>
    </div>
  );
}
//////

/////////////////////////////////////////////////
// import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { RootState } from "../../redux/store";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// import moment from 'jalali-moment';
// import 'react-modern-calendar-datepicker/lib/DatePicker.css';
// // import DatePicker from 'react-modern-calendar-datepicker';

// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

// interface User {
//   _id: string;
//   firstname: string;
//   lastname: string;
//   username: string;
//   phoneNumber: string;
//   address: string;
// }

// function toJalali(date:any) {
//   return moment(date).locale('fa').format('YYYY/MM/DD');
// }

// // تابع تبدیل تاریخ شمسی به میلادی برای ذخیره
// function fromJalali(str:any) {
//   return moment.from(str, 'fa', 'YYYY/MM/DD').toDate();
// }

// export const fetchUserById = async (id: string) => {
//   const token = localStorage.getItem("accessToken");
//   const config = {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   };
//   const response = await axios.get(
//     `http://localhost:8000/api/users/${id}`,
//     config
//   );
//   return response.data;
// };

// export default function FinalizeCart() {
//   const [user, setUser] = useState<User | null>(null);
//   const [deliveryDate, setDeliveryDate] = useState("");
//   const navigate = useNavigate();
//   const cartItems = useSelector((state: RootState) => state.cart.items);

//     const [startDate, setStartDate] = useState(new Date());

//   useEffect(() => {
//     const userId = "65e7295e50e39d2e1db9956a"; // ID provided for the user
//     fetchUserById(userId).then((data) => {
//       setUser(data.data.user);
//     });
//   }, []);

//   const handleNavigateToPayment = () => {
//     // ذخیره اطلاعات سفارش در مکانی (مثلاً Redux store یا LocalStorage) که بعداً بتوان در صفحه پرداخت استفاده کرد
//     if (user && deliveryDate && Object.keys(cartItems).length > 0) {
//       // اینجا می‌توانید اطلاعات سفارش را ذخیره کنید
//       const orderInfo = {
//         userId: user._id,
//         deliveryDate: deliveryDate,
//         cartItems: cartItems,
//       };
//       // مثلاً در LocalStorage ذخیره کنید
//       localStorage.setItem('orderInfo', JSON.stringify(orderInfo));
//       navigate('/payment');
//     } else {
//       alert('لطفاً تمامی اطلاعات را وارد کنید.');
//     }
//   };

//   const [selectedDay, setSelectedDay] = useState(null);

//   const handleDateChange = (value:any) => {
//     // تنظیم تاریخ شمسی انتخاب شده
//     setSelectedDay(value);

//     // تبدیل تاریخ شمسی به میلادی و تنظیم برای ارسال به سرور
//     if (value) {
//       const { year, month, day } = value;
//       const gregorianDate = moment(`${year}/${month}/${day}`, 'jYYYY/jM/jD').locale('en').format('YYYY-MM-DD');
//       setDeliveryDate(gregorianDate);
//     }
//   };

//   return (
//     <div>
//       <h1 className="text-3xl font-bold underline">Finalize Cart</h1>
//       <div>
//         {user && (
//           <div>
//             <p>نام: {user.firstname}</p>
//             <p>نام خانوادگی: {user.lastname}</p>
//             <p>نام کاربری: {user.username}</p>
//             <p>شماره تلفن: {user.phoneNumber}</p>
//             <p>آدرس: {user.address}</p>

//             <label>
//         تاریخ تحویل:
//         <DatePicker
//       selected={startDate}
//       onChange={date => setStartDate(date)}
//       dateFormat="yyyy/MM/dd"
//       placeholderText="تاریخ را انتخاب کنید"
//       withPortal
//       calendarClassName="jalali-datepicker"
//       renderCustomHeader={({ date, decreaseMonth, increaseMonth }) => (
//         <div>
//           <button onClick={decreaseMonth}>قبلی</button>
//           <span>{toJalali(date)}</span>
//           <button onClick={increaseMonth}>بعدی</button>
//         </div>
//       )}
//     />
//       </label>
//           </div>
//         )}
//         <button onClick={handleNavigateToPayment}>ادامه به پرداخت</button>
//       </div>
//     </div>
//   );
// }
