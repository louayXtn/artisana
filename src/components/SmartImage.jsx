const SmartImage = ({ src, alt, className, ...props }) => {
  const webpSrc = src.replace(/\.(jpg|jpeg|png)$/i, '.webp');

  return (
    <picture>
      <source srcSet={webpSrc} type="image/webp" />
      <img src={src} alt={alt} className={className} loading="lazy" {...props} />
    </picture>
  );
};

export default SmartImage;