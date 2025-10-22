import React, { useEffect, useState } from 'react';
import fetchWithAuth  from '../utils/fetchWithAuth'; // تأكد أن الملف موجود
import '../styles/adminMessages.css'; // أنشئ ملف CSS إن أحببت
import { getUserFromToken } from '../utils/authUtils';
import { useNavigate } from 'react-router-dom';
const AdminMessages = () => {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState('');
  const user = getUserFromToken();
  const navigate = useNavigate();
  useEffect(() => {
    if (!user?.isAdmin) {
      navigate('/'); // أو صفحة خطأ
    }
  }, []);
  useEffect(() => {
  fetchWithAuth(`${import.meta.env.VITE_BASE_URL}/api/messages`)
    .then(async res => {
      const data = await res.json();
      // console.log('📦 البيانات المستلمة:', data);

      if (Array.isArray(data)) {
        setMessages(data);
      } else {
        setError('⚠ البيانات المستلمة غير صالحة');
      }
    })
    .catch(err => {
      console.error('❌ خطأ في جلب الرسائل:', err);
      setError('فشل في جلب الرسائل أو ليس لديك صلاحية الوصول');
    });
  }, []);

// }, []);
//   useEffect(() => {
//     fetchWithAuth(`${import.meta.env.VITE_BASE_URL}/api/messages`)
//       .then(setMessages)
//       .catch(err => {
//         console.error(err);
//         setError('❌ فشل في جلب الرسائل أو ليس لديك صلاحية الوصول');
//       });
//   }, []);
const handleDelete = async (id) => {
  try {
    const res = await fetchWithAuth(`${import.meta.env.VITE_BASE_URL}/api/messages/${id}`, {
      method: 'DELETE'
    });

    if (res.ok) {
      setMessages(prev => prev.filter(msg => msg._id !== id));
    } else {
      console.error('❌ فشل في حذف الرسالة');
    }
  } catch (err) {
    console.error('❌ خطأ أثناء الحذف:', err);
  }
};
  return (
    <div className="admin-messages-container">
      <h1>📩 الرسائل الواردة</h1>
      {error && <p className="error">{error}</p>}
      {messages.length === 0 && !error && <p>لا توجد رسائل حالياً.</p>}
      {messages.map((msg, i) => (
        <div key={i} className="message-card">
          <p><strong>الاسم:</strong> {msg.name}</p>
          <p><strong>البريد:</strong> {msg.email}</p>
          <p><strong>الرسالة:</strong> {msg.message}</p>
          <p><strong>تاريخ الإرسال:</strong> {new Date(msg.createdAt).toLocaleString()}</p>
          <button onClick={() => handleDelete(msg._id)} className="delete-button">🗑 حذف</button>

        </div>
      ))}
    </div>
  );
};

export default AdminMessages;