import React from 'react'
import '../styles/contactTeaser.css'
import contactTeaserImg from '../images/contactTeaserImg.jpeg'
import { SocialIcon } from 'react-social-icons';
import { useState } from 'react';
import axios from 'axios';
import SmartImage from './SmartImage';
const contactTeaser = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  // const [status, setStatus] = useState('');


    
   const handleSubmit = async (e) => {
    e.preventDefault();
    const confirmed = window.confirm('هل أنت متأكد من إرسال الرسالة؟');
    if(!confirmed) return

    try {
      await axios.post(`${import.meta.env.VITE_BASE_URL}/api/contact`, {
        name: fullName,
        email,
        message,
      });

      // setStatus('✅ تم إرسال الرسالة بنجاح');
      setFullName('');
      setEmail('');
      setMessage('');
      alert('✅تم إرسال الرسالة بنجاح');
    } catch (error) {
      // setStatus('❌ حدث خطأ أثناء الإرسال');
      alert('❌ حدث خطأ أثناء الإرسال')
    }
  };



  return (
    <>
    <section>
      <div className='title-container'>
            <h1>اتصل بنا</h1>
          </div>
      <div className='contactTeaser-container'>
        <SmartImage src={contactTeaserImg} alt="contactTeaserImg" />
        <div className='contactTeaser-content'>
          <div className='contact-sources'>
            <div className='our-link'>
              <h2>اتصل </h2>
              <p>artisantste@gmail.com</p>
              <p>مقرها في<br/> قابس</p>
              
            </div>
            <form onSubmit={handleSubmit} className='contact-form'>
              <label htmlFor="name" >الاسم الكامل</label>
              <input value={fullName} required onChange={(e)=>setFullName(e.target.value)} type="text" id="name" name="name" />

              <label htmlFor="email">البريد الإلكتروني</label>
              <input type="email" required value={email} onChange={(e)=>setEmail(e.target.value)} id="email" name="email" />

              <label htmlFor="message">رسالة</label>
              <textarea required id="message" value={message} onChange={(e)=>setMessage(e.target.value)} name="message" rows="5"></textarea>

              <button type="submit">اتصل بنا</button>
              {/* {status && <p className="status-message">{status}</p>} */}

            </form>
          </div>
        </div>
        <footer className="site-footer">
          <p className='hide-on-mobile'>هنا تنتهي الحكاية، وتبدأ أخرى... شكراً لزيارتك.</p>
          <div className='socialIcons' style={{ display: 'flex', gap: '10px' }}>
                <SocialIcon className='my-social-icon' url="https://www.facebook.com/share/1DPyMR7ZJ3/ " />
                <SocialIcon className='my-social-icon' url="https://www.tiktok.com/@artisanat.tn3?_t=ZM-90ieMHPE2lY&_r=1 " />
                <SocialIcon className='my-social-icon' url="https://www.instagram.com/artisanattn?igsh=bzU5Mm9uYjNieTl1 " />
                <SocialIcon className='my-social-icon' url="https://wa.me/21694643504" />
              </div>
          {/* <p className='creating-place'>قصص الحرفيين | بإخلاص من تونس</p> */}
          <p >2025 by zentaxCode , all rights reserved &copy;</p>
        </footer>
      </div>
    </section>
    </>
  )
}

export default contactTeaser