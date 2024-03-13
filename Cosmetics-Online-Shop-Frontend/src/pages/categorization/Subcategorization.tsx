import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { GetAllProducts } from '../../api/getAllProducts';
import { Product } from '../admin/adminPanelProducts';

const SubcategorizationPage = () => {
  const { subcategoryId } = useParams<{ subcategoryId: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const response = await GetAllProducts(1); 
      
        const filteredProducts = response.data.products.filter(
          (product: Product) => product.subcategory === subcategoryId
        );
        setProducts(filteredProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [subcategoryId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Products for Subcategory ID: {subcategoryId}</h1>
      <div className="products-grid">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product._id} className="product-item">
              <img src={`http://localhost:8000/images/products/thumbnails/${product.thumbnail}`} alt={product.name} />
              <h3>{product.name}</h3>
              <p>Price: {product.price}</p>
              <Link to={`/products/${product._id}`}>View Product</Link>
            </div>
          ))
        ) : (
          <p>No products found in this subcategory.</p>
        )}
      </div>
    </div>
  );
};

export default SubcategorizationPage;
