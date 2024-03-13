// import CategoriesWithSubcategories from "./CategoriesWithSubcategories";
// import Categories from "./categories";
// import SubCategories from "./subcategories";



// export default function HomePage() {
  

//   return (
//     <div>
//       {/* <Categories/>
//       <SubCategories/> */}
//       <CategoriesWithSubcategories/>

//       <h1 className="text-3xl font-bold underline">HomePage</h1>

//     </div>
//   );
// }

//////



import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { GetAllProducts } from '../../api/getAllProducts';
import { GetAllCategories } from '../../api/getAllCategories';
import { Product } from '../admin/adminPanelProducts';
import { Category } from './categories';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // بارگیری همه محصولات
    const loadProducts = async () => {
      try {
        const productsData = await GetAllProducts(1); // صفحه 1
        setProducts(productsData.data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    // بارگیری همه دسته‌بندی‌ها
    const loadCategories = async () => {
      try {
        const categoriesData = await GetAllCategories();
        setCategories(categoriesData.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    loadProducts();
    loadCategories();
  }, []);

  
  const renderCategoryProducts = (categoryId: string) => {
    
    const categoryProducts = products.filter((product : Product) => product.category === categoryId).slice(0, 6);

    return categoryProducts.map((product : Product) => (
      <div className='flex'>
      <div key={product._id} className="product-item ">
        <img className='w-20 h-20' src={`http://localhost:8000/images/products/thumbnails/${product.thumbnail}`} alt={product.name} />
        <h3>{product.name}</h3>
        <p>Price: {product.price}</p>
        
        <Link to={`/products/${product._id}`}>View Product</Link>
      </div>
      </div>
    ));
  };

  return (
    <div>
      {categories.map((category : Category) => (
        <div key={category._id}>
          <h2>{category.name}</h2>
          <div className="products-grid flex">{renderCategoryProducts(category._id)}</div>
         
          <Link to={`/categorization/${category._id}`}>See more from {category.name}</Link>
        </div>
      ))}
    </div>
  );
};

export default HomePage;





//////////////////


// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';

// import { fetchProducts } from '../../api/fetchProducts';
// import { GetAllSubcategories } from '../../api/getAllSubcategories';
// import { Product } from '../admin/adminPanelProducts';
// import { Subcategory } from './subcategories';

// const HomePage = () => {
//   const [products, setProducts] = useState([]);
//   const [subcategories, setSubcategories] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const productsData = await fetchProducts(1); 
//         const subcategoriesData = await GetAllSubcategories();
//         setProducts(productsData.data.products);
//         setSubcategories(subcategoriesData.subcategories);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, []);


//   const renderSubcategoryProducts = (subcategoryId: any) => {

//     const filteredProducts = products.filter((product : Product)  => product.subcategory === subcategoryId).slice(0, 6);

//     return filteredProducts.map((product : Product) => (
//       <div key={product._id} className="product-item">
//         <img src={`http://localhost:8000/images/products/${product.thumbnail}`} alt={product.name} />
//         <h3>{product.name}</h3>
//         <p>Price: {product.price}</p>

//         <Link to={`/products/${product._id}`}>View Product</Link>
//       </div>
//     ));
//   };

//   return (
//     <div>
//       {subcategories.map((subcategory : Subcategory) => (
//         <div key={subcategory._id}>
//           <h2>{subcategory.name}</h2>
//           <div className="products-grid">{renderSubcategoryProducts(subcategory._id)}</div>

//           <Link to={`/categorization/${subcategory._id}`}>See more from {subcategory.name}</Link>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default HomePage;

