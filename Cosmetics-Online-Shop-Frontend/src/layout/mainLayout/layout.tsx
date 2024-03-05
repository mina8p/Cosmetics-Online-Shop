import Footer from "../../components/footer";
import Header from "../../components/header";
// import Products from "../../components/products/products";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <>
      <Header />
      {/* <Products /> */}

      <Outlet />
      <Footer />
      
    </>
  );
};

export default RootLayout;
