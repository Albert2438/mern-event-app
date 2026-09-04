import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Login(){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)

    const navigate = useNavigate();

   const login = async (email, password)=>{
        setIsLoading(true)
        setError(null)
         
        const res = await fetch('http://localhost:5000/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password })
        })

        const json = await res.json()

        if(!res.ok){
            setIsLoading(false)
            setError(json.error)
        }
        if(res.ok){
            // save user to local storage
            localStorage.setItem('user', JSON.stringify(json))
            navigate('/home')
            setIsLoading(false)
        }
        
    }

    const handleSubmit = async (e) =>{
        e.preventDefault()
        
        const data = await login(email, password)
        
    }

    return(<>
    <form className="login min-h-screen bg-linear-to-br from-slate-50 to-emerald-50  rounded-lg shadow-md p-8
    mx-auto max-w-sm bg-slate-50 border-slate-300 focus:ring-2 focus:ring-emerald-400 animate-fade-in" onSubmit={handleSubmit}>
        <h3>Log in</h3>
        <label className='block text-sm font-medium text-slate-600 mb-1'>Email:</label>
        <input className="w-full bg-slate-50 text-slate-900 p-2 h-10 rounded-md border  focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition-shadow duration-150"
            type="email"
            onChange={(e)=> setEmail(e.target.value)} 
            value={email}
        />

        <label className='block text-sm font-medium text-slate-600 mb-1'>Password:</label>
        <input className="w-full bg-slate-50 text-slate-900 p-2 h-10 rounded-md border focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition-shadow duration-150"
            type="password"
            onChange={(e)=> setPassword(e.target.value)} 
            value={password}
        />

        <button className='mt-2 text-white px-4 py-2 rounded-md bg-emerald-500 w-fit hover:bg-emerald-600 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-150' disabled={isLoading }>{isLoading? 'Logging in' : 'Log in'}</button>
        {error && (
            // ? 'Logging in...': 'Log in'
        <div className="animate-pulse text-red-600 bg-red-50 border border-red-200 rounded-md p-2">{error}</div>
    )}
    </form>
    </>)
}