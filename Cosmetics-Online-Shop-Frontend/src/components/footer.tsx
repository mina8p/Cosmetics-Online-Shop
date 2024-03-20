import { Link } from "react-router-dom";
import { GetAllCategories } from "../api/getAllCategories";
import { GetAllSubcategories } from "../api/getAllSubcategories";
import { useQuery } from "react-query";

type Category = {
  _id: string;
  name: string;
  icon: string;
  subcategories?: Subcategory[];
};

type Subcategory = {
  _id: string;
  name: string;
  category: string;
};

export default function Footer() {
  const categoriesQuery = useQuery("categories", GetAllCategories);
  const subcategoriesQuery = useQuery("subcategories", GetAllSubcategories);

  if (categoriesQuery.isLoading || subcategoriesQuery.isLoading) {
    return <div>Loading...</div>;
  }

  if (categoriesQuery.error instanceof Error) {
    return <div>An error occurred: {categoriesQuery.error.message}</div>;
  }

  if (subcategoriesQuery.error instanceof Error) {
    return <div>An error occurred: {subcategoriesQuery.error.message}</div>;
  }

  const categories = categoriesQuery.data?.categories;

  const categoriesWithSubcategories = categories?.map((category: Category) => ({
    ...category,
    subcategories: subcategoriesQuery.data?.subcategories.filter(
      (subcategory: Subcategory) => subcategory.category === category._id
    ),
  }));
  return (
    <footer className="bg-violet-800 text-white p-4">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="flex flex-col">
          <p>دسترسی سریع</p>
          {categoriesWithSubcategories?.map((category: Category) => (
            <div key={category._id} className="p-4">
              <Link
                to={`/categorization/${category._id}`}
                className={`text-lg font-semibold `}
              >
                <div className="flex items-center">
                  {/* <img
                  src={`http://localhost:8000/images/categories/icons/${category.icon}`}
                  alt={category.name}
                  className="w-10 h-10 object-cover rounded-full"
                /> */}
                  {category.name}
                </div>
              </Link>
            </div>
          ))}
        </div>
        <div className="flex mt-4 md:mt-0">
          <p>ارتباط با ما</p>
          {/* <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="mr-4">
          
            <img src="/" alt="Twitter" className="h-6 w-6" />
          </a> */}
          {/* ... more social icons */}
        </div>
      </div>
      <div className="text-center text-sm mt-4 ">
        کلیه حقوق این سایت متعلق به فروشگاه آنلاین لوندر می باشد.
      </div>
    </footer>
  );
}

// flex justify-around items-center border-2 h-20 w-full bg-violet-50 text-center fixed bottom-0
