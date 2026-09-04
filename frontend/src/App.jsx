
import React, { Children } from 'react';
// BrowserRouter wraps the app so nested <Route>s know how to read the URL.
// Routes/Route replace the old <Switch> pattern from react-router-dom v5.
import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';

import Navbar from './components/Navbar';
import Create from './components/Create';
import Read from './components/Read';
import Update from "./components/Update"
import Login from './components/Login';
import Signup from './components/Signup';
import ProtectedRoute from './components/ProtectedRoute';
import RedirectIfAuth from './components/RedirectIfAuth';





function App() {
  const user = localStorage.getItem('user')
  return (
    <div className='min-h-screen bg-black text-white min-w-fit'>
      <Router>
      {/* Navbar sits outside <Routes> so it renders on every page,
          instead of being swapped out with the route content. */}
      <Navbar />

      <Routes>
        <Route path="/" element={<ProtectedRoute><Read/></ProtectedRoute>} />
        {/* path="/" -> list view is usually the "home" page for a CRUD app */}
        <Route path="/home" element={<Read />} />

        {/* separate route for the create form */}
        <Route path="/create" element={<Create />} />

        {/* :id is a URL PARAM - Update.jsx reads it with useParams()
            to know WHICH event it's editing. Without this, Update
            wouldn't know which record was clicked on the list page. */}
        <Route path="/update/:id" element={<Update />} />
         <Route 
            path='/login' 
            element={<RedirectIfAuth><Login/></RedirectIfAuth>}  
          />
+        <Route 
            path='/signup' 
            element={<RedirectIfAuth><Signup/></RedirectIfAuth>}/>
      </Routes>
    </Router>
    </div>
    
  );
}

export default App;
