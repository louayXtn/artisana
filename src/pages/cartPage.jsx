import {useState ,useEffect, use} from 'react';
import '../styles/cartPage.css';
import OrderModal from '../components/OrderModel';
import { getImageSrc } from '../utils/imageUtils';
import { useNavigate } from 'react-router-dom';

const CartPage = ({ cartItems, setCartItems }) => {
  
  const [showModal, setShowModal]=useState()
  const navigate = useNavigate();
  useEffect(() => {
    if (cartItems.length === 0) {
      navigate('/');
    }
  }, [cartItems, navigate]);
  const removeItem = (id) => {
    setCartItems(prev =>
      prev
        .map(item =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter(item => item.quantity > 0)
    );
  };
  const total = cartItems.reduce((sum,item)=> sum + item.price * item.quantity, 0)
  return (
    <div className="cart-page">
      <h1> سلة المشتريات : </h1>
      {cartItems.length === 0 ? (
        <p>السلة فارغة.</p>
      ) : (
        <div className="cart-items-grid">
          {cartItems.map(item => (
            <div key={item.id} className="cart-item-card">
             <img src={getImageSrc(item.image_path)} alt={item.name} 
                className="cart-item-image"
              />
              <h2>{item.name}</h2>
              <p>السعر: {item.price} د.ت</p>
              <p>الكمية: {item.quantity}</p>
              <button className="remove-btn" onClick={() => removeItem(item.id)}>❌ إزالة</button>
            </div>
          ))}
        </div>
      )}
    {cartItems.length > 0 && (
            <div className='total-container'>
              <p className="cart-total">الإجمالي: {total} د.ت</p>
              <button className="buy-all-btn" onClick={() => setShowModal(true)}>🧺 شراء الكل</button>
            </div>
          )}
    {showModal && (
  <OrderModal
    items={cartItems}
    total={total}
    onClose={() => setShowModal(false)
    }
    setCartItems={setCartItems}
  />
)}
    </div>
  );
};

export default CartPage;