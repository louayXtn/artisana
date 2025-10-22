
import { useEffect, useState } from 'react';
import { getUserFromToken } from '../utils/authUtils';
import { useNavigate } from 'react-router-dom';
import '../styles/deletePage.css';
import  fetchWithAuth  from '../utils/fetchWithAuth'; // تأكد أن المسار صحيح
import { getImageSrc } from '../utils/imageUtils';
function DeleteProductPage() {
  const [products, setProducts] = useState([]);
  const user = getUserFromToken();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.isAdmin) {
      navigate('/');
      return;
    }

    fetchWithAuth(`${import.meta.env.VITE_BASE_URL}/api/products`)
      .then(res => {
        if (!res.ok) throw new Error(`فشل في جلب المنتجات: ${res.status}`);
        return res.json();
      })
      .then(data => setProducts(data))
      .catch(err => console.error(err));
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('هل أنت متأكد من حذف هذا الطلب؟')) return;

    try {
      const res = await fetchWithAuth(`${import.meta.env.VITE_BASE_URL}/api/products/${id}`, {
        method: 'DELETE'
      });

      if (!res.ok) {
        throw new Error(`فشل الحذف: ${res.status}`);
      }

      setProducts(prev => prev.filter(p => p._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  //  const getImageSrc = (imagePath) =>
  // imagePath?.startsWith('http') ? imagePath : `${import.meta.env.VITE_BASE_URL}${imagePath}`;

  return (
    <div className="delete-page">
      <h2>🗑️ حذف المنتجات</h2>
      <ul>
        {products.map(product => (
          <li className='product card' key={product._id}>
            <img src={getImageSrc(product.image_path)} alt={product.name} />
            <span>{product.name} </span>
            <span> {product.price} د.ت</span>
            <button onClick={() => handleDelete(product._id)}>حذف</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DeleteProductPage;