import React, { useEffect, useState } from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { gapi } from 'gapi-script';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LoginPage.css';

interface LoginPageProps {
  setLoggedIn: (arg0: boolean) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ setLoggedIn }) => {
  const clientId = '936930992538-6pkkdh1hf45lacko0scjo0oh2gtc3jam.apps.googleusercontent.com';
  const [profile, setProfile] = useState<any>(null);
  const navigate = useNavigate(); // Get the navigate function from the hook

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

      const response = await axios.post('http://localhost:8080/api/gmail', userData);
      console.log('API response:', response.data);

      navigate(`/welcome?name=${encodeURIComponent(res.profileObj.name)}`);
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

  const [loginError, setLoginError] = useState('');

  return (
    <div className='bg-color'>
      <div className='login-container'>
        <img className='img-bg-login' src='/bg/bg-loginpage.png' />
        <div className='login-form'>
          <center>
            <GoogleLogin
              className='google-button'
              clientId={clientId}
              buttonText="Sign in with Google"
              onSuccess={onSuccess}
              onFailure={onFailure}
              cookiePolicy={'single_host_origin'}
              isSignedIn={true}
            />
          </center>
          {loginError && <p style={{ color: 'white' }}>{loginError}</p>}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
