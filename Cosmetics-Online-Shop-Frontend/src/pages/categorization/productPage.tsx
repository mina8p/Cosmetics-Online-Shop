import  { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProductById } from '../../api/fetchProductsById';  


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

const ProductPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (productId) {
      const loadProduct = async () => {
        try {
          const response = await fetchProductById(productId);
          setProduct(response.data.product); 
        } catch (error) {
          console.error('Error fetching product details:', error);
        }
      };

      loadProduct();
    }
  }, [productId]);

  if (!product) {
    return <div>Loading product details...</div>;
  }

  return (
    <div>
      <h2>{product.name}</h2>
      <img src={`http://localhost:8000/images/products/thumbnails/${product.thumbnail}`} alt={product.name} />
      <p>Price: {product.price}</p>
      <p>Quantity: {product.quantity}</p>
      <p>Brand: {product.brand}</p>
      <p>Description: {product.description}</p>
      <div>
        {product.images.map((image, index) => (
          <img key={index} src={`http://localhost:8000/images/products/${image}`} alt={`Product ${index + 1}`} style={{ width: '100px', height: '100px' }} />
        ))}
      </div>
      
    </div>
  );
};

export default ProductPage;
