// import { useEffect, useState } from 'react';

// const SmartImage = ({ src, alt, className, ...props }) => {
//   const [supportsWebP, setSupportsWebP] = useState(false);

//   useEffect(() => {
//     const img = new Image();
//     img.onload = () => {
//       if (img.width > 0) setSupportsWebP(true);
//     };
//     img.onerror = () => setSupportsWebP(false);
//     img.src =
//       'data:image/webp;base64,UklGRiIAAABXRUJQVlA4TAYAAAAvAAAAAAfQ//73v/+BiOh/AAA='; // اختبار دعم WebP
//   }, []);

//   const webpSrc = src.replace(/\.(jpg|jpeg|png)$/i, '.webp');

//   return (
//     <picture>
//       {supportsWebP && <source srcSet={webpSrc} type="image/webp" />}
//       <img src={src} alt={alt} className={className} loading="lazy" {...props} />
//     </picture>
//   );
// };

// export default SmartImage;

import { useEffect, useRef, useState } from 'react';

const SmartImage = ({ src, alt, className, style = {}, ...props }) => {
  const imgRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [supportsWebP, setSupportsWebP] = useState(false);

  // التحقق من دعم WebP
  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      if (img.width > 0) setSupportsWebP(true);
    };
    img.onerror = () => setSupportsWebP(false);
    img.src =
      'data:image/webp;base64,UklGRiIAAABXRUJQVlA4TAYAAAAvAAAAAAfQ//73v/+BiOh/AAA=';
  }, []);

  // تفعيل lazy loading باستخدام IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '100px', threshold: 0.1 }
    );

    if (imgRef.current) observer.observe(imgRef.current);

    return () => {
      if (imgRef.current) observer.unobserve(imgRef.current);
    };
  }, []);

  const webpSrc = src.replace(/\.(jpg|jpeg|png)$/i, '.webp');

  return (
    <img
      ref={imgRef}
      src={isVisible ? (supportsWebP ? webpSrc : src) : undefined}
      data-src={src}
      alt={alt}
      className={className}
      
      {...props}
    />
  );
};

export default SmartImage;