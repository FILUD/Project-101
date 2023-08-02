import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { gapi } from 'gapi-script';
import './Scrollab.css';

const Scrollab: React.FC = () => {
  const [profile, setProfile] = useState<any>(null);
  const [value, setValue] = useState(0);
  const clientId = '72831622081-thqra06krh8p7murespj7d3raettjdfk.apps.googleusercontent.com';

  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId: clientId,
        scope: '',
      });
    };
    gapi.load("client:auth2", initClient);
  }, []);

  const onSuccess = (res: any) => {
    setProfile(res.profileObj);
    console.log('success', res);
  };

  const logOut = () => {
    setProfile(null);
  };

  const handleChange = (newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className='contianer'>
      <br />
      <button className="image-button">
        <Link to="/home">
          <img className='image-button-img' src="/icon/icon-home.png" alt="Home" />
        </Link>
      </button>
      <button className="image-bell">
        <Link to="/">
          <img className='image-bell-img' src="/icon/blue-notification-bell-icon.png" alt="Notification Bell" />
        </Link>
      </button>
      {profile && profile.imageUrl ? (
        <button className='none-bg'>
          <Link className='none-bg' to="/myprofile">
            <div className="container-profile">
              <img className='img-profile' src={profile.imageUrl} alt='user profile' />
              <div className="text-email">{profile.email}</div>
            </div>
          </Link>
        </button>
      ) : (
        <GoogleLogin
          clientId={clientId}
          buttonText="Sign in with Google"
          onSuccess={onSuccess}
          className='btn-google'
          cookiePolicy={'single_host_origin'}
          isSignedIn={true}
        />
      )}
      <br />
    </div>

  );
};

export default Scrollab;
