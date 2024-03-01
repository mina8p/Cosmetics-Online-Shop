import AdminLogin from "../../components/admin/adminLogin";
import Header from "../../components/header";
import Footer from "../../components/footer";
// import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <>

      <Header />
      <AdminLogin />
      <Footer />
    </>
  );
};

export default AdminLayout;
