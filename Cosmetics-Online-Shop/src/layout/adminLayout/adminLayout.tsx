import { Outlet } from "react-router-dom";
import AdminHeder from "../../components/adminHeder";
import AdminFooter from "../../components/adminFooter";

const AdminLayout = () => {
  return (
    <>
      <AdminHeder />
      <Outlet />
      <AdminFooter />
    </>
  );
};

export default AdminLayout;
