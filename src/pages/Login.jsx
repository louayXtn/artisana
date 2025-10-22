// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import '../styles/loginForm.css'; // Optional: for styling

// export default function LoginForm() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // TODO: Replace with real authentication logic
//     if (email === 'admin@example.com' && password === '123456') {
//       navigate('/dashboard');
//     } else {
//       alert('Invalid credentials');
//     }
//   };

//   return (
//     <div className="login-container">
//       <form className="login-form" onSubmit={handleSubmit}>
//         <h2>تسجيل الدخول</h2>

//         <label htmlFor="email">البريد الإلكتروني</label>
//         <input
//           type="email"
//           id="email"
//           placeholder="example@email.com"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />

//         <label htmlFor="password">كلمة المرور</label>
//         <input
//           type="password"
//           id="password"
//           placeholder="••••••••"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />

//         <button type="submit">دخول</button>
//         <p className="signup-link">
//           ليس لديك حساب؟ <a href="/signup">إنشاء حساب</a>
//         </p>
//       </form>
//     </div>
//   );
// }
import LoginForm from '../components/loginForm'
import '../styles/loginForm.css'
const Login = () => {
  return (
    <div>
      <h3>welcome back</h3>
      <LoginForm />
    </div>
  )
}
export default Login