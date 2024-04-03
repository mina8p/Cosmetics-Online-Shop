import { useEffect, useState } from "react";
import {  useParams, useNavigate, useLocation } from "react-router-dom";
import { useQuery } from "react-query";
import queryString from "query-string";
import { GetAllProductsInCategory } from "../../api/getAllProductsInCategory";
import { GetCategoryById } from "../../api/getCategoryById";
import { Product } from "../admin/adminPanelProducts";
import ProductItem from "../../components/products/productItem";

const CategorizationPage = () => {
  const { categoryId } = useParams<{ categoryId: string | undefined }>();
  const location = useLocation();
  const navigate = useNavigate();

  const { page = "1" } = queryString.parse(location.search);
  const [currentPage, setCurrentPage] = useState(parseInt(page as string));
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if (!location.search) {
      navigate(`?page=1`, { replace: true });
    }
  }, [location.search, navigate]);

  useEffect(() => {
    if (categoryId) {
      GetAllProductsInCategory(currentPage, categoryId).then((res) => {
        setTotalPages(Math.ceil(res.total / res.per_page));
      });
    }
  }, [categoryId, currentPage]);

  const { data: categoryName } = useQuery(
    ["categoryName", categoryId],
    () => GetCategoryById(categoryId!).then((res) => res.data.category.name),
    { enabled: !!categoryId }
  );
  const { data: products } = useQuery(
    ["allProductsInCategory", categoryId, currentPage],
    () =>
      GetAllProductsInCategory(currentPage, categoryId!).then(
        (res) => res.data.products
      ),
    { enabled: !!categoryId }
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    navigate(`?page=${page}`);
  };

  if (!categoryName || !products) return <div>Loading...</div>;

  return (
    <div className="m-5 w-full flex flex-col">
      <div className="text-xl font-bold mb-6">{`خانه / ${categoryName}`}</div>
      <div className="grid grid-cols-1 m-auto sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {products.map((product: Product) => (
          <ProductItem key={product._id} product={product} />))}
      </div>
      <div className="pagination flex justify-center items-center mt-4">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`page-item ${
              currentPage === index + 1 ? "active font-bold" : ""
            }`}
            style={{ margin: "0 5px" }}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategorizationPage;
