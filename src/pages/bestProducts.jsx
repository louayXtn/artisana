
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/bestProducts.css";
import { FaShoppingCart } from 'react-icons/fa';
import OrderModal from '../components/OrderModel';
import { Link } from 'react-router-dom';
import { getImageSrc}  from '../utils/imageUtils';
const BestProducts = ({ limit, showButton ,setCartItems }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([]);
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
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BASE_URL}/api/products`)
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error('خطأ في جلب البيانات:', err));
  }, []);

  const filteredProducts = products.filter(
    product => product.description?.trim().toLowerCase() === 'best products'
  );

  // const displayedProducts = limit ? filteredProducts.slice(0, limit) : filteredProducts;
  const displayedProducts = limit ? [...filteredProducts].reverse().slice(0, limit) : filteredProducts;
  
  
  // const getImageSrc = (imagePath) =>
  // imagePath?.startsWith('http') ? imagePath : `${import.meta.env.VITE_BASE_URL}${imagePath}`;

  return (
    <div className="products-wrapper">
      <div className="title-container">
        <h1>قائمة المنتجات الأكثر طلبا</h1>
      </div>

      <div className="products-grid">
        {displayedProducts.map(product => (
          <div key={product._id} className="product-card">
            <Link className='product-display-link' to={`/product/${product._id}`}>
            <img
              src={getImageSrc(product.image_path)}
              alt={product.name}
              className="product-image"
            />
            <h2>{product.name}</h2>
            <p>السعر: {product.price} د.ت</p>
            <div className="rating">
              <span>⭐</span>
              <span>⭐</span>
              <span>⭐</span>
              <span>⭐</span>
              <span>⭐</span>
            </div>
            </Link>
            <button className='buy-btn' onClick={() => setSelectedProduct(product)}>اشتري الآن</button>
            <button className='addTo-cart-btn' onClick={()=>addToCart(product)}><FaShoppingCart size={20} color="#ffffffff" />    أضف للسلة  </button>
          
          </div>
        ))}
        {showButton && (
        <div className="show-all-button product-card" onClick={() => navigate('/bestProducts')}>
          <h2>...عرض المزيد</h2>
        </div>
      )}
      </div>
      {selectedProduct && (
              <OrderModal
                product={selectedProduct}
                onClose={() => setSelectedProduct(null)}
              />
      )}
      
    </div>
  );
};

export default BestProducts;