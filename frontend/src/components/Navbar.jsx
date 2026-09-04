import React from 'react';
// Link is the router-aware version of <a>. Using a normal <a href="/create">
// would trigger a FULL page reload (losing all React state and re-fetching
// everything). Link intercepts the click and just swaps the matched <Route>.
import { Link, useNavigate } from 'react-router-dom';
import { isTokenExpired } from '../utils/auth';

function Navbar() {

  const navigate = useNavigate();
   let user = JSON.parse(localStorage.getItem('user'));
  if (user && isTokenExpired(user.token)) {
    localStorage.removeItem('user');
    user = null;
  }

  const handleLogout = ()=>{
    localStorage.removeItem('user')

    navigate('/login')
  }

  return (
    <>
    <nav className='flex justify-center md:justify-end items-center gap-1 bg-white/80 backdrop-blur-sm shadow-sm px-6 py-4 sticky top-0 z-10'>
      {user && (
        <>
      <Link to="/home" className='no-underline text-slate-700 hover:text-emerald-600 transition-colors duration-200 px-3 py-1.5 rounded-md hover:bg-emerald-50'>All Events</Link>
      <Link to="/create" className='no-underline text-slate-700 hover:text-emerald-600 transition-colors duration-200 px-3 py-1.5 rounded-md hover:bg-emerald-50'>Create Event</Link>
      <span className='text-black'>{user.email}</span>
      <button className='bg-white text-green-500 border-b-green-500 px-6 py-10' onClick={handleLogout}>Logout</button>
        </>
      )}
      
      {!user &&(
        <>
        <div>
        <Link to="/login" className='no-underline text-slate-700 hover:text-emerald-600 transition-colors duration-200 px-3 py-1.5 rounded-md hover:bg-emerald-50'>Login</Link>
        <Link to="/signup" className='no-underline text-slate-700 hover:text-emerald-600 transition-colors duration-200 px-3 py-1.5 rounded-md hover:bg-emerald-50'>Signup</Link>
      </div>
        </>
      )}
    </nav>
    {/* {user && (
      
    )} */}
    
    </>
    
  );
}

export default Navbar;
