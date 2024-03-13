// export default function Categorization () {
//     return (
//       <h1 className="text-3xl font-bold underline">
//        categorization
//       </h1>
//     )
//   }

  ///////////


import  { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { GetAllProducts } from '../../api/getAllProducts';
import { Product } from '../admin/adminPanelProducts';
import Sidebar from '../homePage/sidebar';

const CategorizationPage = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [products, setProducts] = useState<Product[]>([]);

  


  useEffect(() => {
    const loadAllProducts = async () => {
      try {
        const allProductsData = await GetAllProducts(1);  
       
        const filteredProducts = allProductsData.data.products.filter(
          (product: Product) => product.category === categoryId
        );
        setProducts(filteredProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    loadAllProducts();
  }, [categoryId]);

  return (
    <div>
       <Sidebar />
      <h1>Products for Category ID: {categoryId}</h1>
      <div className="products-grid">
        {products.map((product) => (
          <div key={product._id} className="product-item">
            <img className='w-20 h-20' src={`http://localhost:8000/images/products/thumbnails/${product.thumbnail}`} alt={product.name} />
            <h3>{product.name}</h3>
            <p>Price: {product.price}</p>
            <Link to={`/products/${product._id}`}>View Product</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategorizationPage;

