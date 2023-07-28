// LoginPage.js
import React, { useEffect, useState } from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { gapi } from 'gapi-script';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

interface LoginPageProps {
  setLoggedIn: (arg0: boolean) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ setLoggedIn }) => {
  const clientId = '72831622081-thqra06krh8p7murespj7d3raettjdfk.apps.googleusercontent.com';
  const [profile, setProfile] = useState<any>(null);
  const navigate = useNavigate(); // Get the navigate function from the hook

  // ------------------------------------------------------- google login --------------------------------------------------------

  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId: clientId,
        scope: '',
      });
    };
    gapi.load("client:auth2", initClient);
  }, []);

  const onSuccess = async (res: any) => {
    try {
      const userData = {
        name: res.profileObj.name,
        email: res.profileObj.email,
      };
  
      const response = await axios.post('http://192.168.1.11:8080/api/gmail', userData);
      console.log('API response:', response.data);
  
      // Proceed with navigation and setLoggedIn as needed
      navigate('/home');
      setLoggedIn(true);
    } catch (error) {
      console.error('API error:', error);
      setLoggedIn(false);
    }
  };

  const onFailure = (res: any) => {
    console.log('failed', res);
    setLoggedIn(false);

  };

  const logOut = () => {
    setProfile(null);
    setLoggedIn(false);

  };


  //----------------------------------------------- form login -----------------------------------------------------

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');


  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3001/api/login', {
        Username: username,
        Password: password,
      });

      // Assuming the API returns a success status (e.g., 200) upon successful login.
      if (response.status === 200) {
        setLoggedIn(true); // Update the state to indicate the user is logged in
        navigate('/home'); // Redirect to the "User" page after successful login
      }
    } catch (error) {
      console.error('Login failed:', error);
      setLoginError('Invalid credentials. Please try again.');
    }
  };



  return (
    <div className='login-container'>
      <div>
        <header>

        </header>
        <center>
          <div className='login-form'>
            <h1>Login</h1>
            <input
              className='login-input'
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              className='login-input'
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <center>
              <button className='login-button' onClick={handleLogin}>Login</button>
              

              <br /><br />
              
              <GoogleLogin
                clientId={clientId}
                buttonText="Sign in with Google"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                isSignedIn={true}
              />
              
              {loginError && <p style={{ color: 'white' }}>{loginError}</p>}

            </center>
          </div>
        </center>
      </div>
    </div>
  );
}

export default LoginPage;
function setLoggedIn(arg0: boolean) {
  throw new Error('Function not implemented.');
}

