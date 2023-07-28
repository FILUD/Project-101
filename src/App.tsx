import React, { useEffect, useState } from 'react';
import { gapi } from 'gapi-script';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ErrorPage from './pages/ErrorPage';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';

import Navigation from './components/Navigation';
import axios from 'axios';

function App() {
  // Client ID from Google API
  const clientId = '72831622081-thqra06krh8p7murespj7d3raettjdfk.apps.googleusercontent.com';

  const [loggedIn, setLoggedIn] = useState(false);

  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId: clientId,
        scope: '',
      });
    };
    gapi.load('client:auth2', initClient);
  }, []);

  const onSuccess = (res: any) => {
    setProfile(res.profileObj);
    console.log('success', res);
  };

  const onFailure = (res: any) => {
    console.log('failed', res);
  };

  const logOut = () => {
    setProfile(null);
  };

  //---------------------------------------- img select ---------------------------------------------------------

    // State to store the fetched data from API
    const [characters, setCharacters] = useState([]);

    useEffect(() => {
      // Fetch data from your API
      const fetchData = async () => {
        try {
          const response = await axios.get('https://characterapi.ticwoc.repl.co/characters');
          setCharacters(response.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData();
    }, []);
  
    // State to store the user-selected weapon
    const [selectedWeapon, setSelectedWeapon] = useState('');
  
    // Function to handle the user's selection
    const handleWeaponSelect = (image: React.SetStateAction<string>) => {
      setSelectedWeapon(image);
    };

    //-------------------------------------------------------------------------------------------------------------

  return (
    <div>
      <header>

      </header>
      <BrowserRouter>
        <div>
          <Navigation />
          <Routes>

            <Route path="/" element={<Navigate to="/login" />} />

            <Route path="/login" element={<LoginPage setLoggedIn={setLoggedIn} />} />

            {loggedIn ? (
              <>
            <Route path="/home" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/myprofile" element={<ProfilePage />} />
            <Route path="*" element={<Navigate to="/login" />} />
            </>
            ) : (
              <Route path="*" element={<Navigate to="/login" />} /> 
              )}
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );

}

export default App;
