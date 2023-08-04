import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import './HomePage.css';

type Character = {
  id: string;
  image: string;
  weapon: string;
};

const HomePage: React.FC = () => {
  const [characterData, setCharacterData] = useState<Character[]>([]);
  const [selectedCharacters, setSelectedCharacters] = useState<string[]>([]);
  const navigate = useNavigate();

  // Fetch random character data from the API and shuffle it
  useEffect(() => {
    fetch('https://characterapi.ticwoc.repl.co/characters')
      .then((response) => response.json())
      .then((data) => {
        // Shuffle the character data before setting it in the state
        setCharacterData(shuffleArray(data));
      });
  }, []);

  // Function to shuffle an array in place
  const shuffleArray = (array: Character[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  // Function to handle character selection
  const handleCharacterSelection = (characterId: string) => {
    setSelectedCharacters((prevSelected) => {
      if (prevSelected.includes(characterId)) {
        return prevSelected.filter((id) => id !== characterId);
      } else {
        if (prevSelected.length < 10) {
          return [...prevSelected, characterId];
        } else {
          return prevSelected;
        }
      }
    });
  };

  // Show popup when selected == 10
  const SelectedSuccess = () => {
    Swal.fire({
      position: 'top',
      icon: 'success',
      title: 'Selected 10 items, Click next below to proceed',
      showConfirmButton: false,
      timer: 3000
    });
  };

  useEffect(() => {
    if (selectedCharacters.length === 10) {
      SelectedSuccess();
    }
  }, [selectedCharacters]);

  // Function to handle the page navigation event (beforeunload)
  const handlePageNavigation = (e: BeforeUnloadEvent) => {
    if (selectedCharacters.length > 0) {
      e.preventDefault();
      e.returnValue = 'You have unsaved changes. Are you sure you want to leave?';

      // Display the confirmation alert
      Swal.fire({
        title: 'Are you sure?',
        text: 'You have unsaved changes. Are you sure you want to leave?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, leave the page!'
      }).then((result) => {
        if (result.isConfirmed) {
          // If the user confirms, allow page navigation
          window.removeEventListener('beforeunload', handlePageNavigation);
          window.history.back();
        }
      });
    }
  };

  // Attach the beforeunload event listener
  useEffect(() => {
    window.addEventListener('beforeunload', handlePageNavigation);

    return () => {
      window.removeEventListener('beforeunload', handlePageNavigation);
    };
  }, [selectedCharacters]);

  // Function to handle navigation when the button is clicked
  const handleNavigation = () => {
    if (selectedCharacters.length < 10) {
      Swal.fire('Warning', 'Please select 10 characters before proceeding.', 'warning');
    } else {
      // Construct query params and navigate to the desired page
      const queryParams = selectedCharacters.map((characterId) => `character=${characterId}`).join('&');
      navigate(`/home/2?${queryParams}`);
    }
  };

  return (
    <div>
      {/* Header */}
      <header></header>

      <center>
        <br />
        <br />
        <p className="text-01-home">Select 10 descriptions that you consider <strong>most like you</strong></p>
        <br />

        <div className="item-grid">
          {/* Display character items */}
          {characterData.map((character) => (
            <div className="item-wrapper" key={character.id}>
              <img
                className={`item ${selectedCharacters.includes(character.id) ? 'checked' : 'default'}`}
                src={character.image}
                alt={character.weapon}
                onClick={() => handleCharacterSelection(character.id)}
              />
              {selectedCharacters.includes(character.id) && (
                <img
                  className="logo-check"
                  src="/logo/check.png"
                  alt="Checkmark"
                />
              )}
            </div>
          ))}

          {/* Placeholder divs for grid layout */}
          <div></div> <div></div> <div></div> <div></div> <div></div> <div></div>

          {/* Next button */}
          <div className="div-button-next">
            <span className="text-next" onClick={handleNavigation}><strong>Next ➤</strong></span>
          </div>
        </div>

        <br />

        <center>
          {/* Background */}
          <div className="background">
            {selectedCharacters.map((characterId) => {
              const character = characterData.find((c) => c.id === characterId);
              return character ? (
                <div key={characterId}>
                  {/* You can display selected character information here */}
                </div>
              ) : null;
            })}
          </div>
        </center>
      </center>
    </div>
  );
};

export default HomePage;
