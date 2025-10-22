import homeImage from '../images/homeImage.jpeg';
// import categoriesImg1 from '../images/categoriesImg1.jpeg';
import categImg2 from '../images/categImg2.png';
// import discountsIcon from '../images/discountsIcon.png';
import categoryImg3 from '../images/categoryImg3.png';
import categoriesImg4 from '../images/categoriesImg4.png'; 
import categImg1 from '../images/categImg1.png';
import myLogo from '../images/myLogo.jpeg';
import "../styles/home.css";
import Aside from '../components/Aside';
import BestProducts from './bestProducts';
import AboutSection from '../components/aboutSection';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { scroller } from 'react-scroll';
import ArtisanStories from '../components/artisanStories'
import ContactTeaser from '../components/contactTeaser'
// import SearchBar from '../components/searchBar';
const Home = ({setCartItems}) => {
  const location = useLocation();
  const navigate = useNavigate()
  useEffect(() => {
    const target = location.state?.scrollTo
    if(target){
      setTimeout(()=>{
        scroller.scrollTo(target,{smooth: true,
        duration: 400,
        offset: -60,})
        navigate(location.pathname,{replace:true, state:{}})
      },400);
    }
  }, [location,navigate]);
return(
  
  <>
    <div className='container-main'>
      {/* <div className='show-in-mobile'>
        <SearchBar/>
      </div> */}
      <Aside />
      <section className="home-page">
        <div className='container'>
          <div className='home-title'>
            <h1 className='hero-title'>
        إكتشف عبق    الأصالة في كل منتج</h1>
            <img src={myLogo} alt="logo" className='home-logo'/>
            <a href="/products" className='shop-button'>تسوق الآن</a>
          </div>
          <div className="hero-section">
            <img src={homeImage} alt="homeImage" />
          </div>
        </div>
        <div className="categories-section">
            <a href="/category/parfums" className="category-box">
              <img src={categImg1}  alt="بخور وعطور" />
            </a>

            <a href="/category/vetments" className="category-box">
              <img src={categImg2} alt="يدوية" />
            </a>

            <a href="category/ceramique" className="category-box">
              <img src={categoryImg3}  alt="discounts"/>
            </a>

            <a href="/category/bags" className="category-box">
              <img src={categoriesImg4}  alt="الحقائب" />
            </a>
        </div>
      </section>
      
    </div>
    <section>
      <BestProducts setCartItems={setCartItems} limit={7} showButton={true}/>
    </section>
    <section id='about'>
      <AboutSection />
    </section>
    <section id='artisanSection'>
      <ArtisanStories />
    </section>
    <section id='contact'>
      <ContactTeaser/>
    </section>
    
    
  </>
);}

export default Home;