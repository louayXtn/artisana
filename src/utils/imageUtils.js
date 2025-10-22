export const getImageSrc = (imagePath) =>
  imagePath?.startsWith('http') ? imagePath : `${import.meta.env.VITE_BASE_URL}${imagePath}`;

