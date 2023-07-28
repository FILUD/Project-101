import React, { useState } from 'react';
import ImgSelector from './ImgSelector';

const HomePage: React.FC = () => {
  // Sample data for weapon images (you can replace this with your API data)
  const weaponImages = [
    'https://rerollcdn.com/GENSHIN/UI/weapon_bow.png',
    'https://rerollcdn.com/GENSHIN/UI/weapon_claymore.png',
    'https://rerollcdn.com/GENSHIN/UI/weapon_sword.png',
    'https://rerollcdn.com/GENSHIN/UI/weapon_catalyst.png',
    'https://rerollcdn.com/GENSHIN/UI/weapon_polearm.png',
    'https://rerollcdn.com/GENSHIN/UI/rarity_5.png',
    'https://rerollcdn.com/GENSHIN/Weapons/Blackcliff_Longsword.png',
    // Add more weapon images as needed
  ];

  // State to store the selected weapon image
  const [selectedWeapon, setSelectedWeapon] = useState('');

  // Function to handle the selection of the image
  const handleWeaponSelect = (image: string) => {
    setSelectedWeapon(image);
  };

  return (
    <div>
      <header>
        
      </header>
      <h1>Home Page</h1>
      <center>
      {/* Pass the list of weapon images and the handleWeaponSelect function as props */}
      <ImgSelector images={weaponImages} onSelectImage={handleWeaponSelect} />

      {/* Display the selected weapon image */}
      {selectedWeapon && (
        <div>

          <h2>You selected the weapon with image:</h2>
          <img src={selectedWeapon} alt="Selected Weapon" />
        </div>
      )}
      </center>
    </div>
  );
};

export default HomePage;