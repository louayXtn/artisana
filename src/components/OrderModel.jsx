
import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import '../styles/OrderModel.css';

export default function OrderModal({ product, items, total, onClose , setCartItems=()=>{} }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const confirmed = window.confirm('هل أنت متأكد من تقديم الطلب؟');
    if(!confirmed) return

    const orderItems = product
      ? [{ name: product.name, quantity: 1 ,imagePath: product.image_path}]
      : (items || []).map(i => ({ name: i.name, quantity: i.quantity,imagePath: i.image_path }));

    const orderTotal = product ? product.price : total;

    const orderData = {
      customer: { name, phone, address },
      items: orderItems,
      total: orderTotal
    };

    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });
      if(!response.ok){
        throw new Error(`فشل في إرسال الطلب: ${response.status} - ${response.statusText}`)
      }

      alert('✅  تم إرسال الطلب و سنتصل بك قريبا لتأكيد ');
      setCartItems([]);
      onClose();
    } catch (err) {
      alert('❌ فشل في إرسال الطلب');
      console.error(err);
    }
    // setCartItems([]);
    // onClose();
  };

  return createPortal(
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>{product ?` شراء ${product.name}` : 'شراء كل المنتجات في السلة'}</h3>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="الاسم الكامل" value={name} onChange={(e) => setName(e.target.value)} required />
          <input type="number" placeholder="الهاتف" value={phone} onChange={(e) => setPhone(e.target.value)} required />
          <input type="text" placeholder="العنوان" value={address} onChange={(e) => setAddress(e.target.value)} required />
          <button type="submit">تأكيد الطلب</button>
          <button type="button" onClick={onClose}>إلغاء</button>
        </form>
      </div>
    </div>,
    document.getElementById('modal-root')
);
}