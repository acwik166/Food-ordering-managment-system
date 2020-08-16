import React, { useEffect, useState } from 'react';

const Logout = () => {
  const [isLoggedOut, setIsLoggedOut] = useState(false);

  useEffect(() => {
    fetch('api/v1/users/logout')
      .then((result) => result.json())
      .then((json) => setIsLoggedOut(json.success))
  }, [])

  return (
    <div>
      { isLoggedOut ? 
        <h1>Logged out</h1> :
        <h1>You are not logged in</h1>
      }
    </div>
  )
}

export default Logout;
