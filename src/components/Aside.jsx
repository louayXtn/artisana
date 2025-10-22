

import { useState } from 'react';
import { Link } from 'react-router-dom';
import "../styles/aside.css";

const categories = [
  { name: "الحقائب التقليدية", icon: "👜", slug: "bags" },
  { name: "البخور والعطور", icon: "🪔", slug: "parfums" },
  { name: "الفخار والخزف", icon: "🏺", slug: "ceramique" },
  { name: "النسيج والمفروشات", icon: "🧶", slug: "tapisserie" },
  { name: "الإكسسوارات والمجوهرات", icon: "💍", slug: "bijoux" },
  { name: "الملابس التقليدية", icon: "👗", slug: "vetments" },
  { name: "الزينة والديكور", icon: "🖼️", slug: "decoration" },
  { name: "منتجات طبيعية", icon: "🧼", slug: "naturels" }
];

const Aside = () => {
  const [showList, setShowList] = useState(true);
  const [isOpen, setIsOpen] = useState(true);
  const toggleList = () => {
    setShowList(prev => !prev);
    setIsOpen(prev => !prev);
  };

  return (
    <div className='aside-container'>

      <div className={`categories-header ${isOpen ? 'open' : ''}`}>
        <h3 className='categories'>الفئات</h3>
        <button className="menu-icon" onClick={toggleList}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>
      </div>
      <div className={`category-wrapper ${showList ? 'open' : 'closed'}`}>
        <ul className="artisanat-categories">
          {categories.map(cat => (
            <li key={cat.slug}>
              <Link to={`/category/${cat.slug}`} className="category-link">
                {cat.icon} {cat.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Aside;