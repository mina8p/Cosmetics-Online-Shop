import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
  Routes,
} from "react-router-dom";
import RootLayout from "../layout/mainLayout/layout";
import AdminLayout from "../layout/adminLayout/adminLayout";
// import AdminLogin from "../components/admin/adminLogin";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route >
      
      <Route path="/" element={<RootLayout />} />
      
      <Route path="/Admin" element={<AdminLayout />} />
    </Route>
    
  )
);

export default router;



