import React, { useState } from 'react';
// useNavigate gives you a FUNCTION (commonly named `navigate`) you call
// imperatively - e.g. after an async action finishes - to change routes.
// This is different from <Link>, which only navigates on a click.
import { useNavigate } from 'react-router-dom';



function Create() {
  // controlled inputs - date starts empty, per what you decided earlier,
  // since the browser's <input type="date"> expects/returns "YYYY-MM-DD" as a string
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [error, setError] = useState(null);
  

  // calling useNavigate() gives back the navigate function itself.
  // this call has to happen inside the component (it's a hook),
  // NOT inside handleSubmit - hooks can't be called inside other functions.
  const navigate = useNavigate();
  
  const user = JSON.parse(localStorage.getItem('user'));
  const handleSubmit = (e) => {
    e.preventDefault(); // stop the browser's default full-page form submit

    if (!user){
      setError('You must be logged in')
      return
    }
    // unlike axios, fetch does NOT automatically stringify the body
    // or set the Content-Type header - both have to be done by hand,
    // or the backend will receive an unparsed/empty req.body
    fetch(`${import.meta.env.VITE_API_URL}/`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization':  `Bearer ${user.token}` },
      body: JSON.stringify({ title, description, date, location}),
    })
      .then((res) => {
        // fetch does NOT reject on 4xx/5xx responses like axios does -
        // it only rejects on network failure. So an actual HTTP error
        // (400, 500 etc.) lands here as a "successful" promise unless
        // you check res.ok yourself.
        if (!res.ok) throw new Error(`Request failed: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        console.log(data);
        // THIS is the useNavigate payoff: once the POST resolves
        // successfully, send the user back to the list page.
        // '/' matches the Route in App.jsx that renders Read.jsx.
        navigate('/home');
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50 animate-fade-in'>
      <div className='mx-auto max-w-lg px-6 py-10'>
        <div className='bg-white rounded-lg shadow-md p-8'>
          <h2 className='text-2xl font-bold text-slate-800 mb-6'>Create Event</h2>
          <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
            <div>
              <label htmlFor='title' className='block text-sm font-medium text-slate-600 mb-1'>Title</label>
              <input
                className='w-full bg-slate-50 text-slate-900 p-2 h-10 rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition-shadow duration-150'
                id='title'
                type="text"
                required
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor='description' className='block text-sm font-medium text-slate-600 mb-1'>Description</label>
              <input
                className='w-full bg-slate-50 text-slate-900 p-2 h-10 rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition-shadow duration-150'
                id='description'
                type="text"
                required
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor='date' className='block text-sm font-medium text-slate-600 mb-1'>Date</label>
              <input
                className='w-full bg-slate-50 text-slate-900 p-2 h-10 rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition-shadow duration-150'
                id='date'
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor='location' className='block text-sm font-medium text-slate-600 mb-1'>Location</label>
              <input
                className='w-full bg-slate-50 text-slate-900 p-2 h-10 rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition-shadow duration-150'
                id='location'
                type="text"
                required
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            <button
              className='mt-2 text-white px-4 py-2 rounded-md bg-emerald-500 w-fit hover:bg-emerald-600 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-150'
              type="submit"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Create;
