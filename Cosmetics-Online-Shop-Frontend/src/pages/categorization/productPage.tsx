import { useRef } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { fetchProductById } from "../../api/fetchProductsById";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

type Product = {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  brand: string;
  description: string;
  thumbnail: string;
  images: string[];
  category: {
    _id: string;
    name: string;
    icon: string;
  };
  subcategory: {
    _id: string;
    name: string;
  };
};

////////////////
const NextArrow = ({ onClick }: { onClick?: () => void }) => (
  <button
    onClick={onClick}
    className="absolute top-1/2 -right-6 -translate-y-1/2 z-10 text-xl   text-black p-2 rounded-full font-bold"
    style={{ display: "block" }}
  >
    &gt;
  </button>
);

const PrevArrow = ({ onClick }: { onClick?: () => void }) => (
  <button
    onClick={onClick}
    className="absolute top-1/2 -left-6 -translate-y-1/2 z-10 text-xl  text-black p-2 rounded-full font-bold"
    style={{ display: "block" }}
  >
    &lt;
  </button>
);
////////////////////////
const ProductPage = () => {
  const sliderRef = useRef<Slider>(null);
  const { productId } = useParams<{ productId: string }>();

  const {
    data: product,
    isLoading,
    error,
  } = useQuery<Product, Error>(
    ["product", productId],
    () =>
      fetchProductById(productId!).then((response) => response.data.product),
    {
      enabled: !!productId,
    }
  );

  if (isLoading) return <div>Loading product details...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;
  if (!product) return <div>Product not found</div>;

  ///////////////
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    rtl: true,
  };
  //////////////////////
  return (
    <div className="flex flex-col items-center mx-10 ">
      <div className="mt-5">
        {`${product.category.name} / ${product.subcategory.name}`}
      </div>
      <div className="flex flex-col items-center my-6 lg:flex-row lg:gap-96 ">
        <div className="w-96 p-6 shadow ">
          <Slider className="" ref={sliderRef} {...sliderSettings}>
            {product.images.map((image, index) => (
              <img
                key={index}
                src={`http://localhost:8000/images/products/images/${image}`}
                alt={`Product ${index + 1}`}
              />
            ))}
            <img
              src={`http://localhost:8000/images/products/thumbnails/${product.thumbnail}`}
              alt={product.name}
            />
          </Slider>
        </div>

        <div className="m-5 w-96 flex flex-col items-center shadow p-10">
          <div>
            <h2>{product.name}</h2>
            <p className="text-left ">
              {product.price} {"تومان"}
            </p>
          </div>

          <div className="">
            <button className="w-80  bg-purple-500 text-white rounded-3xl hover:bg-purple-700 focus:outline-none font-medium text-sm px-5 py-2.5 text-center mt-1">
              افزودن به سبد خرید
            </button>
          </div>
        </div>
      </div>

      <div
        id=""
        className="w-full  shadow border border-violet-400  space-y-2  p-10 mb-5 text-gray-400"
      >
        <h2>توضیحات محصول</h2>
        <h2>{product.name}</h2>

        {/* <p>Quantity: {product.quantity}</p> */}
        <p>برند: {product.brand}</p>

        <div
          className=""
          dangerouslySetInnerHTML={{ __html: product.description }}
        ></div>
      </div>
    </div>
  );
};

export default ProductPage;

