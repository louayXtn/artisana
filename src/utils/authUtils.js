import Cookies from 'js-cookie';

// export function getUserFromToken() {
//   const token = Cookies.get('accessToken');
//   if (!token) return null;

//   try {
//     const payload = JSON.parse(atob(token.split('.')[1]));
//     return payload; // يحتوي على isAdmin وغيره
//   } catch (err) {
//     console.error('فشل في فك التوكن:', err);
//     return null;
//   }
// }
export function getUserFromToken() {
    

  const token = Cookies.get('accessToken');
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.userInfo; // ← هذا يرجع مباشرة { isAdmin, userId }
  } catch (err) {
    console.error('فشل في فك التوكن:', err);
    return null;
  }
  
}