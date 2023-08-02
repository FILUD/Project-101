import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Welcome.css';

function Welcome() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const name = queryParams.get('name');

  // useEffect to trigger the reload only once when the component mounts
  useEffect(() => {
    const hasReloaded = localStorage.getItem('hasReloaded');

    if (!hasReloaded) {
      localStorage.setItem('hasReloaded', 'true');
      window.location.reload();
    }
  }, []);

  return (
    <div className='body-welcome'>
      <div className='container-welcome'>
        <div className='text-welcome'>Welcome, <br/><strong>{name}</strong></div>
        <button className='button-start'>
          <Link to='/home'>
            <p className='text-btn-start'>Let's get started</p>
          </Link>
        </button>
      </div>
      <img className='img-welcome' src='bg/home.png' alt="Welcome"></img>
    </div>
  );
}

export default Welcome;
