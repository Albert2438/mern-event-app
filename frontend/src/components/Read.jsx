import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Read() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('user'));


  // runs once on mount ([] dependency array) to load the list
  useEffect(() => {
    const loadEvents = async ()=>{
      try{
        const res = await fetch('http://localhost:5000/',{
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        });
        if(!res.ok) throw new Error(`Request failed :${res.status}`)
        const data = await res.json();
      setEvents(data)
      }catch(err){
        console.log(err);
      }finally{
        setLoading(false)
      }
    }

    if(user){
      loadEvents();
    }
    

  }, [user]);

  

  const handleDelete =  async (id) => {
    try{
      const res = await fetch(`http://localhost:5000/${id}`, { method: 'DELETE', headers:{'Authorization': `Bearer ${user.token}`} });
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      //     // re-filter local state instead of re-fetching from the server -
    //     // cheaper, and keeps the UI snappy
      setEvents(events.filter((event) => event._id !== id));
    }catch(err){
      console.log(err);
    }
  };

  return (
    <div className='min-h-screen bg-linear-to-br from-slate-50 to-emerald-50 animate-fade-in'>
      <div className='mx-auto max-w-5xl px-6 py-10'>
        <h2 className='text-2xl font-bold text-slate-800 mb-6'>Events</h2>
        {events.length === 0 ? (
          <p className='text-slate-500 bg-white rounded-lg shadow-sm p-6 text-center'>No events yet</p>
        ): (
          <div className='bg-white rounded-lg shadow-md overflow-hidden'>
            <table className='w-full'>
              <thead>
                <tr className='bg-slate-50 text-left text-sm text-slate-600 border-b border-slate-200'>
                  <th className='px-4 py-3'>Title</th>
                  <th className='px-4 py-3'>Date</th>
                  <th className='px-4 py-3'>Location</th>
                  <th className='px-4 py-3'>Actions</th>
                </tr>
              </thead>
              <tbody>
                {events.map((event) => (
                  <tr key={event._id} className='text-black border-b border-slate-100 last:border-0 hover:bg-emerald-50/50 transition-colors duration-150'>
                    <td className='px-4 py-3'>{event.title}</td>
                    <td className='px-4 py-3'>{new Date(event.date).toISOString().split('T')[0]}</td>
                    <td className='px-4 py-3'>{event.location}</td>
                    <td className='px-4 py-3'>
                      {/*
                        navigate() with a template string builds the URL param
                        that App.jsx's route "/update/:id" is waiting for.
                        Update.jsx will read this id back out with useParams().

                        This is a case where useNavigate is used INSTEAD of Link -
                        either works for a plain click, but navigate() is the one
                        you reach for when navigation needs to happen conditionally
                        or after some logic runs first (e.g. only navigate if a
                        confirm dialog returns true).
                      */}
                      <button
                        className='rounded-md bg-emerald-500 text-white px-3 py-1.5 text-sm font-medium mr-2 hover:bg-emerald-600 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-150'
                        onClick={() => navigate(`/update/${event._id}`)}
                      >
                        Edit
                      </button>
                      <button
                        className='rounded-md bg-red-100 text-red-700 px-3 py-1.5 text-sm font-medium hover:bg-red-200 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-150'
                        onClick={() => handleDelete(event._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Read;
