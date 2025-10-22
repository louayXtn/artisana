
import React, { useEffect, useState } from 'react';
import '../styles/myProducts.css';
import { FaShoppingCart } from 'react-icons/fa';
import OrderModal from '../components/OrderModel';
import { Link } from 'react-router-dom';
import { getImageSrc } from '../utils/imageUtils';

const MyProducts = ({cartItems,setCartItems}) => {

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
  useEffect(() => {
    fetch(`${import.meta.env.VITE_BASE_URL}/api/products`)
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error('خطأ في جلب البيانات:', err));
  }, []);


  return (
      <div className="products-container">
        <h1 className="products-title">قائمة المنتجات</h1>
        <div className="products-grid">
          {products.map(product => (
            
              <div key={product._id} className="product-card">
                <Link className='product-display-link' to={`/product/${product._id}`}>
                 <img className='product-image' src={getImageSrc(product.image_path)} alt={product.name} />
                {/* <img
                  src={`${import.meta.env.VITE_BASE_URL}${product.image_path}`}
                  alt={product.name}
                  className="product-image"
                /> */}
                <h2>{product.name}</h2>
                {/* <p>الفئة: {product.category}</p> */}
                <p>السعر: {product.price} د.ت</p>
                {/* icon star */}
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

            //  end of product card
            
          ))}
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

export default MyProducts;