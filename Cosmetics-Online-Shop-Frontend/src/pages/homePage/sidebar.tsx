
import { Link } from 'react-router-dom';
import { GetAllCategories } from '../../api/getAllCategories';
import { GetAllSubcategories } from '../../api/getAllSubcategories';
import { useQuery } from 'react-query';

type Category = {
  _id: string;
  name: string;
  subcategories?: Subcategory[]; 
};

type Subcategory = {
  _id: string;
  name: string;
  category: string;
};

const Sidebar = () => {



const categoriesQuery = useQuery('categories', GetAllCategories);
const subcategoriesQuery = useQuery('subcategories', GetAllSubcategories);

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
    subcategories: subcategoriesQuery.data?.subcategories.filter((subcategory: Subcategory) => subcategory.category === category._id),
  }));

  return (
    <div className="sidebar">
      {categoriesWithSubcategories?.map((category: Category) => (
        <div key={category._id}>
          <Link to={`/categorization/${category._id}`}>{category.name}</Link>
          <ul>
          {category.subcategories?.map((subcategory: Subcategory) => (
              <li key={subcategory._id}>
                <Link to={`/subcategorization/${subcategory._id}`}>{subcategory.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
