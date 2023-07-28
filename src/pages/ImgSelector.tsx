import React, { useState } from 'react';

interface ImageSelectorProps {
  images: string[];
  onSelectImage: (image: string) => void;
}

const ImageSelector: React.FC<ImageSelectorProps> = ({ images, onSelectImage }) => {
  const [selectedImage, setSelectedImage] = useState('');

  const handleImageClick = (image: string) => {
    setSelectedImage(image);
    onSelectImage(image);
  };

  return (
    <div>
        <center>
      <h2>Choose the most selected weapon:</h2>
      <div>
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Weapon ${index}`}
            onClick={() => handleImageClick(image)}
            style={{
              border: selectedImage === image ? '2px solid red' : 'none',
              cursor: 'pointer',
            }}
          />
        ))}
      </div>
      </center>
    </div>
  );
};

export default ImageSelector;
