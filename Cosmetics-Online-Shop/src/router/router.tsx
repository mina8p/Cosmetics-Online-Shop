import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layout/mainLayout/layout";
import AdminLayout from "../layout/adminLayout/adminLayout";
import AdminLogin from "../pages/admin/adminLogin";
import AdminPanelOrders from "../pages/admin/adminPanelOrders";
import AdminPanelPrice from "../pages/admin/adminPanelPrice";
import AdminPanelProducts from "../pages/admin/adminPanelProducts";
import HomePage from "../pages/homePage/homePage";
import NotFound from "../pages/notFoundPage/notFoundPage";
import SinglePageProduct from "../pages/singlePageProduct/singlePageProduct";
import Cart from "../pages/cart/cart";
import FinalizeCart from "../pages/cart/finalizeCart";
import CartPayment from "../pages/cart/cartPayment";
import SuccessfulPayment from "../pages/cart/successfulPayment";
import UnsuccessfulPayment from "../pages/cart/unsuccessfulPayment";
import Categories from "../pages/categories/categories";

const routes = createBrowserRouter([
  {
    path: "",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/adminLogin",
        element: <AdminLogin />,
      },
      {
        path: "/Categories",
        element: <Categories />,
      },
      {
        path: "/singlePageProduct",
        element: <SinglePageProduct />,
      },
      //*************//
      //Shopping-Cart
      //*************//
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "/finalizeCart",
        element: <FinalizeCart />,
      },
      {
        path: "/payment",
        element: <CartPayment />,
        children: [
          {
            path: "successfulPayment",
            element: <SuccessfulPayment />,
          },
          {
            path: "unsuccessfulPayment",
            element: <UnsuccessfulPayment />,
          },
        ],
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
    errorElement: <NotFound />,
  },
  //*************//
  //Admin-Panel
  //*************//
  {
    path: "/adminPanel",
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <AdminPanelOrders />,
      },
      {
        path: "AdminPanelPrice",
        element: <AdminPanelPrice />,
      },
      {
        path: "adminPanelProducts",
        element: <AdminPanelProducts />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
    errorElement: <NotFound />,
  },
]);

export default routes;
