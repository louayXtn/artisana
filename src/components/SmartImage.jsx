import { useEffect, useState } from 'react';

const SmartImage = ({ src, alt, className, ...props }) => {
  const [supportsWebP, setSupportsWebP] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      if (img.width > 0) setSupportsWebP(true);
    };
    img.onerror = () => setSupportsWebP(false);
    img.src =
      'data:image/webp;base64,UklGRiIAAABXRUJQVlA4TAYAAAAvAAAAAAfQ//73v/+BiOh/AAA='; // اختبار دعم WebP
  }, []);

  const webpSrc = src.replace(/\.(jpg|jpeg|png)$/i, '.webp');

  return (
    <picture>
      {supportsWebP && <source srcSet={webpSrc} type="image/webp" />}
      <img src={src} alt={alt} className={className} loading="lazy" {...props} />
    </picture>
  );
};

export default SmartImage;