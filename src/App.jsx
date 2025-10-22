
import './styles/App.css';
import { useState } from 'react';
import Navbar from './components/Navbar';
// import Aside from './components/Aside';
import AppRouter from './router';

function App() {
  const [cartItems, setCartItems] = useState([]);
  return (
    <>
        <Navbar setCartItems={setCartItems} cartItems={cartItems} />
      {/* <div className="main-layout">
        <Aside /> */}
        <AppRouter cartItems={cartItems} setCartItems={setCartItems}/>
      {/* </div> */}
    </>
  );
}

export default App;

