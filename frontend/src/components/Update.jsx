import React, { useEffect, useState } from 'react';
// useParams reads the dynamic segment out of the URL.
// App.jsx defined the route as "/update/:id" - whatever comes after
// /update/ in the actual URL shows up here as params.id
import { useParams, useNavigate } from 'react-router-dom';

function Update() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [error, setError] = useState(null);
  const user = JSON.parse(localStorage.getItem('user'));

  // fetch the existing event on mount, using the id pulled from the URL,
  // and pre-fill the form fields with what's already in the database
  useEffect(() => {
    fetch(`http://localhost:5000/${id}`, {headers: {Authorization: `Bearer: ${user.token}`}})
      .then((res) => {
        if (!res.ok) throw new Error(`Request failed: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setTitle(data.title);
        setDescription(data.description);
        setDate(new Date(data.date).toISOString().split('T')[0]);
        setLocation(data.location);
        // setCapacity(data.capacity);
      })
      .catch((err) => console.log(err));
  }, [id]); // re-run if id ever changes



  const handleSubmit = async (e) =>{
    try{
      e.preventDefault();

      if (!user){
      setError('You must be logged in')
      return
    }
      
      const res = await fetch(`http://localhost:5000/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json',
        'Authorization':  `Bearer ${user.token}`
      },
      body: JSON.stringify({ title, description, date, location}),
    })

     if (!res.ok) throw new Error(`Request failed: ${res.status}`);
        // same pattern as Create.jsx - navigate back to the list
        // once the update actually succeeds, not before
        navigate('/home');
    }catch(err){
      console.log(err)
    }
  }

  return (
    <div className='min-h-screen bg-linear-to-br from-slate-50 to-emerald-50 animate-fade-in'>
      <div className='mx-auto max-w-lg px-6 py-10'>
        <div className='bg-white rounded-lg shadow-md p-8'>
          <h2 className='text-2xl font-bold text-slate-800 mb-6'>Update Event</h2>
          <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
            <div>
              <label className='block text-sm font-medium text-slate-600 mb-1'>Title</label>
              <input
                className='w-full bg-slate-50 text-slate-900 p-2 h-10 rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-shadow duration-150'
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div>
              <label className='block text-sm font-medium text-slate-600 mb-1'>Description</label>
              <input
                className='w-full bg-slate-50 text-slate-900 p-2 h-10 rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-shadow duration-150'
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div>
              <label className='block text-sm font-medium text-slate-600 mb-1'>Date</label>
              <input
                className='w-full bg-slate-50 text-slate-900 p-2 h-10 rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-shadow duration-150'
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>

            <div>
              <label className='block text-sm font-medium text-slate-600 mb-1'>Location</label>
              <input
                className='w-full bg-slate-50 text-slate-900 p-2 h-10 rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-shadow duration-150'
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className='mt-2 text-white px-4 py-2 rounded-md bg-emerald-500 w-fit hover:bg-emerald-600 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-150'
            >
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Update;
