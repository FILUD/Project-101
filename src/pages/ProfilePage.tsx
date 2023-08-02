// LoginPage.js
import React, { useEffect, useState } from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { gapi } from 'gapi-script';
import './ProfilePage.css'
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const clientId = '72831622081-thqra06krh8p7murespj7d3raettjdfk.apps.googleusercontent.com';

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

  const onSuccess = (res: any) => {
    setProfile(res.profileObj);
    console.log('success', res);
  };

  const onFailure = (res: any) => {
    console.log('failed', res);
  };

  const logOut = () => {
    setProfile(null);
    navigate('/login');
    localStorage.removeItem('hasReloaded');
    window.location.reload();
  };

  return (
    <div className="area">
      <header>

      </header>
      <center>
        <div className='pro-container box'>
          <h2>My Profile</h2>
          
          <br /> <br />

          {profile ? (
            <div className='z-index'>
              <img className='img-pro' src={profile.imageUrl} alt='user image' />
              <br />
              <br />

              <p>Name : <strong>{profile.name}</strong></p>
              <p>Email : <strong>{profile.email}</strong></p>
              <br /><br /><br />
              <br />
              <GoogleLogout
                clientId={clientId}
                buttonText="ㅤLog outㅤ"
                className='btn-google'
                onLogoutSuccess={logOut}
              />

            </div>
          ) : (
            <GoogleLogin
              clientId={clientId}
              buttonText="Sign in with Google"
              onSuccess={onSuccess}
              className='btn-google'
              onFailure={onFailure}
              cookiePolicy={'single_host_origin'}
              isSignedIn={true}
            />
          )}
        </div>
        <div>
          <ul className="circles">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div>
      </center>
    </div>

  );
}

export default ProfilePage;
