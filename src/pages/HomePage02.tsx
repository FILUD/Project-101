import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import './HomePage.css';
import Swal from 'sweetalert2'

type Character = {
  id: string;
  image: string;
  weapon: string;
};

const HomePage2: React.FC = () => {
  const [characterData, setCharacterData] = useState<Character[]>([]);
  const [selectedCharacters, setSelectedCharacters] = useState<string[]>([]);
  const location = useLocation();
  const navigate = useNavigate();

  // Fetch character data from the API and shuffle it
  useEffect(() => {
    fetch('https://characterapi.ticwoc.repl.co/characters')
      .then((response) => response.json())
      .then((data) => {
        setCharacterData(shuffleArray(data));
      });
  }, []);

  const shuffleArray = (array: Character[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };



  //--------------------------- selecting alert when need change page -------------------------------------

  const SelectedSuccess = () => {
    Swal.fire({
      position: 'top',
      icon: 'success',
      title: 'Selected 5 item, Click next on below',
      showConfirmButton: false,
      timer: 1500
    })
  }

  React.useEffect(() => {
    if (selectedCharacters.length === 5) {
      SelectedSuccess();
    }
  }, [selectedCharacters]);

  // Function to handle character selection
  const handleCharacterSelection = (characterId: string) => {
    setSelectedCharacters((prevSelected) => {
      if (prevSelected.includes(characterId)) {
        return prevSelected.filter((id) => id !== characterId);
      } else {
        if (prevSelected.length < 5) {
          return [...prevSelected, characterId];
        } else {
          return prevSelected;
        }
      }
    });
  };

  const handleNavigation = () => {
    if (selectedCharacters.length < 5) {
      swal("Warning", "Please select 5 choices before proceeding.", "warning");
    } else {
      const queryParams = selectedCharacters.map((characterId) => `character=${characterId}`).join('&');
      navigate(`/result?${queryParams}`);
    }
  };

  return (
    <div>
      <header></header>
      <center>
        <br />
        <br />
        <p className='text-01-home'>Select 5 descriptions that you consider <strong>least like you</strong></p>
        <br />
        <div className="item-grid">
          {characterData.map((character) => (
            <div className="item-wrapper" key={character.id}>
              <img
                className={`item ${selectedCharacters.includes(character.id) ? 'checked' : 'default'}`}
                src={character.image}
                onClick={() => handleCharacterSelection(character.id)}
              />
              {selectedCharacters.includes(character.id) && (
                <img
                  className="logo-check"
                  src="/logo/check.png" /* Use the relative path to your checkmark image */
                  alt="Checkmark"
                />
              )}
            </div>
          ))}
          <div></div> <div></div> <div></div> <div></div> <div></div> <div></div>
          <div className="div-button-next">
            <span className='text-next' onClick={handleNavigation}><strong>Result {'➤'}</strong></span>
          </div>
        </div>
        <br />

        <center>
          <div className='background'>
            {selectedCharacters.map((characterId) => {
              const character = characterData.find((c) => c.id === characterId);
              return character ? (
                <div key={characterId}>

                </div>
              ) : null;
            })}
          </div>
        </center>
      </center>
    </div>
  );
};

export default HomePage2;
