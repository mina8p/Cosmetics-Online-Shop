import {
  createBrowserRouter,
  // RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom";
import RootLayout from "../layout/mainLayout/layout";
import AdminLayout from "../layout/adminLayout/adminLayout";
import AdminPanel from "../components/admin/adminPanel";

// import AdminLogin from "../components/admin/adminLogin";

const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<RootLayout />} />

      {/* <Route path="/AllProduct" element={<RootLayout />} /> */}

      <Route path="/Admin" element={<AdminLayout />} />
      <Route path="/AdminPanel" element={<AdminPanel />} />
    </Route>
  )
);

export default routes;
