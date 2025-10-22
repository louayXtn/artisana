import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/searchBar.css'
import { getImageSrc } from '../utils/imageUtils';
const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const navigate = useNavigate();
  const dropdownRef = useRef();

  useEffect(() => {
    if (query.trim() === '') {
      setResults([]);
      return;
    }

    const delayDebounce = setTimeout(() => {
      axios.get(`${import.meta.env.VITE_BASE_URL}/api/products/search?q=${query}`)
        .then(res => setResults(res.data))
        .catch(err => console.error(err));
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  const handleSelect = (id) => {
    setQuery('');
    setResults([]);
    navigate(`/product/${id}`);
  };

  // إغلاق الـ dropdown عند الضغط خارجًا
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setResults([]);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="search-bar" ref={dropdownRef}>
      <input
        type="text"
        placeholder="🔍 ابحث عن منتج..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {results.length > 0 && (
        <ul className="search-dropdown">
          {results.map(product => (
            <li key={product._id} onClick={() => handleSelect(product._id)}>
              <img src={getImageSrc(product.image_path)} alt={product.name} />
              <div>
                <p>{product.name}</p>
                <p>{product.price} د.ت</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;