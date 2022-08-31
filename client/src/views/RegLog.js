import React from 'react';
import Registration from '../components/Registration';
import Login from '../components/Login';

const RegLog = (props) => {
  const { setIsLoggedIn } = props;

  return (
    <div className="mb-2">
      <h1 className="bg-secondary text-info fw-light">
        The Home to Reel Feels!
      </h1>
      <div className="d-flex">
        <Registration />
        <Login setIsLoggedIn={setIsLoggedIn} />
      </div>
    </div>
  );
};

export default RegLog;
