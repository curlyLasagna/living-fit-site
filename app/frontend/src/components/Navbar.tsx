import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

const Navbar = () => {
  const [userName, setUserName] = useState(null);

  useEffect(() => {
    const token = Cookies.get('living_fit_token');
    if (!token) {
      console.log('No token found');
      return;
    }
    const { userId } = jwtDecode(token)

    if (token) {
      fetch(`http://localhost:3000/api/user/${userId}`, {
        method: 'GET',
        credentials: 'include',
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to fetch user data');
          }
          return response.json();
        })
        .then((data) => {
          console.log('User data:', data);
          setUserName(data.fname);
        })
        .catch((error) => {
          console.error('Error fetching user data:', error);
        });
    }
  }, []);

  const handleSignOut = async () => {
    try {
      const token = Cookies.get('living_fit_token');

      if (!token) {
        console.error('No authentication token found');
        window.location.href = '/';
        return;
      }

      // Call the logout endpoint
      const response = await fetch('http://localhost:3000/api/user/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include'
      });

      if (response.ok) {
        // Remove the cookie
        Cookies.remove('living_fit_token');
        // Redirect to home page
        window.location.href = '/';
        console.log('Successfully logged out');
      } else {
        console.error('Logout failed:', await response.text());
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <div className="navbar shadow-sm bg-gray-50">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex="0" role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
          </div>
          <ul
            tabIndex="0"
            className="menu menu-sm dropdown-content rounded-box z-1 mt-3 w-52 p-2 shadow">
            <li><a href="#">Item 1</a></li>
            <li>
              <a href="#">Parent</a>
              <ul className="p-2">
                <li><a href="#">Hampstead</a></li>
                <li><a href="#">Glen Burnie</a></li>
                <li><a href="#">Middle River</a></li>
              </ul>
            </li>
            <li><a href="#">Item 3</a></li>
          </ul>
        </div>
        <a className="btn btn-ghost text-xl" href="/">Living Fit Club</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li><a href="#">About</a></li>
          <li>
            <details>
              <summary>Locations</summary>
              <ul className="p-2">
                <li><a href="#">Hampstead</a></li>
                <li><a href="#">Glen Burnie</a></li>
                <li><a href="#">Middle River</a></li>
              </ul>
            </details>
          </li>
          <li><a href="#">Careers</a></li>
        </ul>
      </div>
      <div className="navbar-end">
        {userName ? (
          <div className="flex items-center">
            <span className="mr-4">Hello, {userName}</span>
            <a href="/user" className="btn btn-ghost mr-2">Dashboard</a>
            <button onClick={handleSignOut} className="btn btn-primary">Sign Out</button>
          </div>
        ) : (
          <>
            {console.log('No user logged in')}
            <a className="btn btn-primary mr-2" href="/signup">Join Now</a>
            <a href="/login" className="btn btn-primary">Log in</a>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;