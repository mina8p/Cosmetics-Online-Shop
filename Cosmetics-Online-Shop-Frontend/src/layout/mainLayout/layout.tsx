import Footer from "../../components/footer";
import Header from "../../components/header";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/navbar";
// import { GetAllCategories } from "../../api/getAllCategories";

const RootLayout = () => {
  return (
    <>
      <Header />
      <Navbar />
      {/* <GetAllCategories /> */}
      <Outlet />
      <Footer />
    </>
  );
};

export default RootLayout;
