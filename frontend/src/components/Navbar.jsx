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
    <nav className='flex flex-wrap justify-center md:justify-end items-center gap-2 bg-white/80 backdrop-blur-sm shadow-sm px-4 sm:px-6 py-3 sticky top-0 z-10'>
      {user && (
        <>
      <Link to="/home" className='no-underline text-sm sm:text-base text-slate-700 hover:text-emerald-600 transition-colors duration-200 px-2.5 sm:px-3 py-1.5 rounded-md hover:bg-emerald-50'>All Events</Link>
      <Link to="/create" className='no-underline text-sm sm:text-base text-slate-700 hover:text-emerald-600 transition-colors duration-200 px-2.5 sm:px-3 py-1.5 rounded-md hover:bg-emerald-50'>Create Event</Link>
      <span className='hidden sm:inline text-black text-sm truncate max-w-[160px]'>{user.email}</span>
      <button className='bg-white text-green-500 border-b-2 border-b-green-500 px-3 py-1.5 text-sm sm:text-base hover:bg-emerald-50 rounded-md transition-colors duration-200' onClick={handleLogout}>Logout</button>
        </>
      )}
      
      {!user &&(
        <>
        <div className='flex flex-wrap justify-center md:justify-end items-center gap-2 bg-white/80 backdrop-blur-sm shadow-sm px-4 sm:px-6 py-3 sticky top-0 z-10 flex gap-1'>
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
