// GoogleLoginButton.tsx
import React from 'react';
import { GoogleLogin, GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import axios from 'axios';

interface GoogleLoginButtonProps {
  onSuccess: (profile: any) => void; // Define a callback prop
  onFailure: (error: any) => void;
}

const GoogleLoginButton: React.FC<GoogleLoginButtonProps> = ({ onSuccess, onFailure }) => {
  const clientId = '936930992538-6pkkdh1hf45lacko0scjo0oh2gtc3jam.apps.googleusercontent.com'; // Replace with your actual client ID

  const handleSuccess = async (res: GoogleLoginResponse | GoogleLoginResponseOffline) => {
    try {
      let userData = {};

      if ('profileObj' in res) {
        userData = {
          name: res.profileObj.name,
          email: res.profileObj.email,
          profileImageUrl: res.profileObj.imageUrl,
        };
      }

      const response = await axios.post('http://localhost:8080/api/gmail', userData);
      console.log('API response:', response.data);

      onSuccess(userData); // Call the callback prop with the profile data
    } catch (error) {
      console.error('API error:', error);
      onFailure(error);
    }
  };

  const handleFailure = (error: any) => {
    console.log('failed', error);
    onFailure(error);
  };

  return (
    <GoogleLogin
      clientId={clientId}
      buttonText="Sign in with Google"
      onSuccess={handleSuccess}
      onFailure={handleFailure}
      className='btn-google'
      cookiePolicy={'single_host_origin'}
      isSignedIn={true}
    />
  );
};

export default GoogleLoginButton;
