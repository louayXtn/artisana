import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/myProducts.css';
import { FaShoppingCart } from 'react-icons/fa';
import OrderModal from '../components/OrderModel';
import { Link } from 'react-router-dom';
import { getImageSrc } from '../utils/imageUtils';
const CategoryProducts = ({ cartItems, setCartItems }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BASE_URL}/api/products`)
  .then(res => res.json())
  .then(data => {
    const filtered = data.filter(p => p.category === categoryName);
    setProducts(filtered);
  });
})
//     fetch(`/api/products?category=${categoryName}`)
//       .then(res => res.json())
//       .then(data => setProducts(data))
//       .catch(err => console.error('خطأ في جلب البيانات:', err));
//   }, [categoryName]);

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
        return [...prev, { id: product._id, name: product.name, price: product.price, image_path: product.image_path, quantity: 1 }];
      }
    });
  };

  return (
    <div className="products-container">
      <h1 className="products-title"> :منتجات طبقًا للـفئة  </h1>
      <div className="products-grid">
        {products.map(product => (
          <div key={product._id} className="product-card">
            <Link className='product-display-link' to={`/product/${product._id}`}>
            <img src={getImageSrc(product.image_path)} alt={product.name}
              className="product-image"
            />
            <h2>{product.name}</h2>
            <p>السعر: {product.price} د.ت</p>
            <div className="rating">
              <span>⭐</span><span>⭐</span><span>⭐</span><span>⭐</span><span>⭐</span>
            </div>
            </Link>
            <button className='buy-btn' onClick={() => setSelectedProduct(product)}>اشتري الآن</button>
            <button className='addTo-cart-btn' onClick={() => addToCart(product)}>
              <FaShoppingCart size={20} color="#ffffffff" /> أضف للسلة
            </button>
          </div>
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

export default CategoryProducts;
