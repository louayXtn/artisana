import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { getUserFromToken } from '../utils/authUtils';
import { useNavigate } from 'react-router-dom';
import "../styles/ordersPage.css"; // أنشئ هذا الملف لتنسيق الصفحة
import fetchWithAuth from '../utils/fetchWithAuth';
import { getImageSrc } from '../utils/imageUtils';
const OrdersPage = () => {
    const user = getUserFromToken();
  const navigate = useNavigate(); 
  useEffect(() => {
    if (!user?.isAdmin) {
      navigate('/'); // أو صفحة خطأ
    }
  }, []); 

  const [orders, setOrders] = useState([]);
  const token = Cookies.get('accessToken');
  // جلب الطلبات من السيرفر
  const fetchOrders = async () => {
    try {
      const res = await fetchWithAuth(`${import.meta.env.VITE_BASE_URL}/api/admin/orders`)

      //   ,{
      //   headers: { authorization: `Bearer ${token}` }
      // });
      if (!res.ok) throw new Error('فشل في جلب الطلبات');
      const data = await res.json();
    
      setOrders(data);
    } catch (err) {
      console.error('❌ فشل في جلب الطلبات:', err);
    }
  };

  // حذف طلب من قاعدة البيانات
  const deleteOrder = async (orderId) => {
    if (!window.confirm('هل أنت متأكد من حذف هذا الطلب؟')) return;

    try {
      await fetchWithAuth(`${import.meta.env.VITE_BASE_URL}/api/admin/orders/${orderId}`, {
        method: 'DELETE',
        // headers: { authorization: `Bearer ${token}` }
      });
      setOrders(prev => prev.filter(order => order._id !== orderId));
    } catch (err) {
      console.error('❌ فشل في حذف الطلب:', err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="orders-container">
      <h1>📦 قائمة الطلبات</h1>
      {orders.length === 0 ? (
        <p>لا توجد طلبات حالياً.</p>
      ) : (
        <div className="orders-grid">
          {orders.map(order => (
            <div key={order._id} className="order-card">
              <h3>👤 {order.customer.name}</h3>
              <p>📞 {order.customer.phone}</p>
              <p>📍 {order.customer.address}</p>
              <hr />
              {order.items.map((item, index) => (
                <div key={index} className="order-item">
                  {/* <img src={item.image_path} alt={item.name} 
                    className="order-image"
                  /> */}
                   <img className="order-image" src={getImageSrc(item.imagePath)} alt={item.name} />
                  <div>
                    <h4>{item.name}</h4>
                    {/* <p>💰 السعر: {item.price} د.ت</p> */}
                    <p>🔢 الكمية: {item.quantity}</p>
                  </div>
                </div>
              ))}
              <p className="order-total">💰 السعر الإجمالي: {order.total} د.ت</p>
              <button className="delete-btn" onClick={() => deleteOrder(order._id)}>🗑 حذف الطلب</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;