
// import { Link ,} from 'react-scroll';
import {NavLink , useLocation , useNavigate} from'react-router-dom';
import '../styles/Navbar.css';
import logo from '../images/logo.png';
import { FaUserCircle, FaShoppingCart,  FaChevronDown} from 'react-icons/fa';
import { useState } from 'react';
import {useSendLogoutMutation} from '../redux/features/auth/authApiSlice'
import Cookies from 'js-cookie';
import{ useEffect } from'react';
import { getUserFromToken } from '../utils/authUtils';
import SearchBar from './searchBar';
import { getImageSrc } from '../utils/imageUtils';
import SmartImage from './SmartImage';
const CartHeader = ({ cartItems, setCartItems }) => {
  
  const [isOpen, setIsOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const toggleDropdown = () => setIsOpen(prev => !prev);
  const toggleCartDropdown = () => {
  if (cartItems.length === 0) return;
  setIsCartOpen(prev => !prev);
};
  const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const removeItem = (id) => {
  setCartItems(prev => {
    return prev
      .map(item =>
        item.id === id
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter(item => item.quantity > 0);
  });
  
};
  const location = useLocation();

  const [user, setUser] = useState(null);
  useEffect(() => {
  const tokenPayload = getUserFromToken();
  setUser(tokenPayload || null);
}, [location]);
  // testt

  useEffect(() => {
  // كل مرة يتغير فيها المسار، نغلق القائمة
  setIsCartOpen(false);
}, [location.pathname]);
  const navigate = useNavigate();
  const goToCartPage = () => {
    navigate('/cart',{state:{cartItems}})
  }
  const [sendLogout] = useSendLogoutMutation();
  // const navigate = useNavigate();
  const handleLogout = () => {
    sendLogout();
    Cookies.remove("accessToken");
    navigate("/");
  };
  
  const maxVisibleItems = 4;
  const visibleItems = cartItems.slice(0, maxVisibleItems);
  const hasMoreItems = cartItems.length > maxVisibleItems;
  const isLoggedIn = !!Cookies.get("accessToken")
  return (
    <div className="cart-header">
      {/* القائمة الشخصية */}
      <div className='profile-dropdown'>
        {isLoggedIn ? (
          <>
            <div onClick={toggleDropdown}>
            <FaUserCircle size={32} color="#333" className='avatar' />
            <FaChevronDown className='chevron-down'  />
            </div>
          
            <div className={`container-profile-dropdown ${isOpen ? 'show' : 'hide'}`}>
              <ul className='list-profile-dropdown'>
                
                


                {user?.isAdmin && (
                <>
                  <li>
                    <ul className="admin-list">
                      <NavLink to="/add-product" className={({ isActive }) => isActive ? 'active' : ''}>➕ إضافة منتج</NavLink>
                      <hr />
                      <NavLink to="/delete-product" className={({ isActive }) => isActive ? 'active' : ''}>🗑 حذف منتج</NavLink>
                      <hr />
                      <NavLink to="/orders" className={({ isActive }) => isActive ? 'active' : ''}> 📦 قائمة الطلبات</NavLink>
                      <hr />
                      <NavLink to="/admin/messages" className={({ isActive }) => isActive ? 'active' : ''}> 📩 الرسائل الواردة</NavLink>
                    </ul>
                  </li>
                </>
              
)}
                <li onClick={handleLogout}>تسجيل الخروج</li>
              </ul>
            </div>
          </>) : null}
      </div>

      {/* أيقونة السلة */}
      <div className="cart-icon-wrapper" onClick={toggleCartDropdown}>
        <FaShoppingCart size={28} color="#555" />
        {totalCount > 0 && (
          <span className="cart-badge">{totalCount}</span>
        )}
      </div>

      {/* القائمة المنسدلة للمنتجات */}
      {isCartOpen && cartItems.length > 0 &&(
        <div className="cart-dropdown">
          <ul className="cart-list">
            {visibleItems.map(item => (
              <li key={item.id} className="cart-item">
                <img src={getImageSrc(item.image_path)} alt={item.name} />
                <span>{item.name} × {item.quantity}</span>
                <button className="remove-btn" onClick={() => removeItem(item.id)}>❌</button>
              </li>
            ))}

            {hasMoreItems && (
              <li className="cart-item more-indicator" style={{ textAlign: "center", color: "#888" }}>
                يوجد المزيد من المنتجات...
              </li>
            )}
          </ul>

          
          <button className="view-cart-btn" onClick={goToCartPage}>
        عرض السلة
          </button>
        </div>
      )}
    </div>
  );
};
const Navbar = ({cartItems,setCartItems}) => {
  const [user, setUser] = useState(null);

  const location = useLocation();

useEffect(() => {
  const tokenPayload = getUserFromToken();
  setUser(tokenPayload || null);
}, [location]);
  const navigate= useNavigate();
  // const location=useLocation();
  const handleHomeClick = ()=>{
    if(location.pathname === '/'){
      window.scrollTo({top:0,behavior:'smooth'})
    }
    else{
      navigate('/')
    }
  }
  const handleAboutClick =()=>{
    navigate('/',{state:{scrollTo:'about'}});
  };
  const handleArtisanStoriesClick =()=>{
    navigate('/',{state:{scrollTo:'artisanSection'}})
  }
   const handleContactClick =()=>{
    navigate('/',{state:{scrollTo:'contact'}});
  };
  return (
    <>
      <nav className="navbar">
        <div className="logo">
          <SmartImage src={logo} alt="Logo" />
        </div>

        <ul className="nav-links">
          <li>
            <a className={location.pathname === '/' ? 'active' : ''} onClick={handleHomeClick}>صفحة رئيسية</a>
            {/* <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>صفحة رئيسية</NavLink> */}
          </li>
          <li>
            <NavLink to="/bestProducts" className={({ isActive }) => isActive ? 'active' : ''}>الأكثر طلبا</NavLink>
          </li>
          <li className='hide-on-mobile'>
            {/* duration={500} smooth={true} offset={-60} to='about' */}
            <a onClick={handleAboutClick} className='about-link'>من نحن</a>
          </li>
           <li className='hide-on-mobile'>
           
            <a onClick={handleArtisanStoriesClick} className='artisanStories-link'>قصص الحرفيين</a>
          </li>
          <li className='contact-link-container'>
            <a onClick={handleContactClick} className='contact-link'>الاتصال</a>
          </li>
           <li  className='hide-on-mobile'>
              <SearchBar/>
            </li>
     
        </ul>

        <CartHeader cartItems={cartItems} setCartItems={setCartItems}/>
      </nav>
      <hr className='section-divider'/>
    </>
  );
};

export default Navbar;