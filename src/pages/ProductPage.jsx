import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/product.css'
import OrderModal from '../components/OrderModel';
import { FaShoppingCart } from 'react-icons/fa';
import { getImageSrc } from '../utils/imageUtils';
function ProductPage({setCartItems}) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
    const addToCart = (product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product._id);
      if (existing) {
        return prev.map(item =>
          item.id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
         return [...prev, { id: product._id, name: product.name, price:product.price, image_path:product.image_path,quantity: 1 }];
      }
    });
  };
  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BASE_URL}/api/products/${id}`)
      .then(res => setProduct(res.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!product) return <p>جاري التحميل...</p>;

  return (
    <div className="product-page">
      <div className='product'>
      <img src={getImageSrc(product.image_path)}alt={product.name} />
      <h2>{product.name}</h2>
      <p>{product.price} د.ت</p>
      
        <button className='buy-btn' onClick={() => setSelectedProduct(product)}>اشتري الآن</button>
        <button className='addTo-cart-btn' onClick={()=>addToCart(product)}><FaShoppingCart size={20} color="#ffffffff" />    أضف للسلة  </button>
      </div>
      {selectedProduct && (
              <OrderModal
                product={selectedProduct}
                onClose={() => setSelectedProduct(null)}
              />
      )}
    </div>
  );
}

export default ProductPage;