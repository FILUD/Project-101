import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import swal from 'sweetalert';
import './ResultPage.css'

type Character = {
  id: string;
  weapon: string;
};

const ResultPage: React.FC = () => {
  const [characterData, setCharacterData] = useState<Character[]>([]);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const characterIds: string[] = queryParams.getAll('character');
  const [showResult, setShowResult] = useState(false);
  const [userRating, setUserRating] = useState<string>('');


  

  useEffect(() => {
    fetch('https://characterapi.ticwoc.repl.co/characters')
      .then((response) => response.json())
      .then((data) => setCharacterData(data));

      swal("Result", "Here are the weapon percentages!", "success");
      setTimeout(() => {
        setShowResult(true);
      }, 3000);
    }, []);

  const calculateWeaponPercentage = () => {
    const selectedCharactersData = characterData.filter((character) =>
      characterIds.includes(character.id)
    );

    const weaponsCount: { [weapon: string]: number } = {};

    selectedCharactersData.forEach((character) => {
      weaponsCount[character.weapon] = (weaponsCount[character.weapon] || 0) + 1;
    });

    const totalSelected = selectedCharactersData.length;
    const weaponPercentages: { [weapon: string]: number } = {};

    for (const weapon in weaponsCount) {
      weaponPercentages[weapon] = (weaponsCount[weapon] / totalSelected) * 100;
    }

    return weaponPercentages;
  };

  const weaponPercentages = calculateWeaponPercentage();
  
  

  return (
    <div>
      <center className='header-text'>
        <h1>Result</h1>
      </center>
      {Object.entries(weaponPercentages).map(([weapon, percentage]) => (
        <></>
      ))}
      <div className='grid-item'>
        <div className='container-item'>
          <img className='item-img' src="/icon/eagle.png" alt="eagle" />
          <p className='text-result'>Falcon:<strong> {weaponPercentages['Falcon']?.toFixed(2) || '0'}%</strong></p>
        </div>
        <div className='container-item'>
          <img className='item-img' src="/icon/cow.png" alt="cow" />
          <p className='text-result'>Cow:<strong> {weaponPercentages['Cow']?.toFixed(2) || '0'}%</strong></p>
        </div>
        <div className='container-item'>
          <img className='item-img' src="/icon/bear.png" alt="bear" />
          <p className='text-result'>Bear:<strong> {weaponPercentages['Bear']?.toFixed(2) || '0'}%</strong></p>
        </div>
        <div className='container-item'>
          <img className='item-img' src="/icon/rat.png" alt="rat" />
          <p className='text-result'>Rat:<strong> {weaponPercentages['Rat']?.toFixed(2) || '0'}%</strong></p>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;
