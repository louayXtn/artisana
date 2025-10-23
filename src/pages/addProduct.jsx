import { getUserFromToken } from '../utils/authUtils';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from "react";
import  fetchWithAuth  from '../utils/fetchWithAuth'; // تأكد أن المسار صحيح
import '../styles/addProduct.css'
export default function AddProduct() {
  const user = getUserFromToken();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.isAdmin) {
      navigate('/'); // أو صفحة خطأ
    }
  }, []); const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("category", category);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("image", image);

    try {
      const res = await fetchWithAuth(`${import.meta.env.VITE_BASE_URL}/api/products`, {
        method: "POST",
        // headers: {
        //   // Authorization:` Bearer ${localStorage.getItem("token")}`, // أو من context
        // },
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        alert("✅ المنتج تم إضافته بنجاح");
        setCategory("")
        setDescription("")
        setName("")
        setImage(null)
        setPrice("")

      } else {
        alert("❌ خطأ: " + data.message);
      }
    } catch (err) {
      console.error(err);
      alert("❌ فشل الاتصال بالسيرفر");
    }
  };

  return (
    <div className='add-product'>
      <h2>إضافة منتج جديد</h2>
      {/* نموذج الإضافة هنا */}
       <form onSubmit={handleSubmit}>
      <input type="text" placeholder="الاسم" value={name} onChange={(e) => setName(e.target.value)} />
      <input type="text" placeholder="الفئة" value={category} onChange={(e) => setCategory(e.target.value)} />
      <input type="number" placeholder="السعر" value={price} onChange={(e) => setPrice(e.target.value)} />
      <textarea placeholder="الوصف" value={description} onChange={(e) => setDescription(e.target.value)} />
      <input type="file" onChange={(e) => setImage(e.target.files[0])} />
      <button type="submit">إرسال</button>
    </form>
    </div>
  );
}