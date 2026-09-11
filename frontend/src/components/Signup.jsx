import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Eye, EyeOff } from "lucide-react"



export default function Signup(){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
     const [showPassword, setShowPassword] = useState(false)

    const navigate = useNavigate();

// Password generator suggestion
// rule (needs at least: 1 lowercase, 1 uppercase, 1 number, 1 symbol, 8+ chars)
function generatePassword(length = 12) {
  const lowercase = 'abcdefghijklmnopqrstuvwxyz'
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const numbers = '0123456789'
  const symbols = '!@#$%^&*'
  const all = lowercase + uppercase + numbers + symbols

  // guarantee one of each required type first, so a random draw
  // can't accidentally skip a category and fail validation
  let password =
    lowercase[Math.floor(Math.random() * lowercase.length)] +
    uppercase[Math.floor(Math.random() * uppercase.length)] +
    numbers[Math.floor(Math.random() * numbers.length)] +
    symbols[Math.floor(Math.random() * symbols.length)]

  // fill the rest of the length with random characters from the full pool
  for (let i = password.length; i < length; i++) {
    password += all[Math.floor(Math.random() * all.length)]
  }

  // shuffle - otherwise the first 4 characters would ALWAYS be
  // lowercase, uppercase, number, symbol in that exact order
  return password.split('').sort(() => Math.random() - 0.5).join('')
}


    const handleSuggestPassword = () => {
          const suggested = generatePassword()
          setPassword(suggested)
          // reveal it automatically - no point suggesting a password
          // the user can't actually see
          setShowPassword(true)
        }

    const signup = async (email, password)=>{
        setIsLoading(true)
        setError(null)
         
        const res = await fetch(`${import.meta.env.VITE_API_URL}/signup`, {
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
        
        const data = await signup(email, password)
        
    }

    return(<>
    <form className="signup min-h-screen bg-linear-to-br from-slate-50 to-emerald-50 bg-white rounded-lg shadow-md p-8 
    mx-auto max-w-sm  border-slate-300 focus:ring-2 focus:ring-emerald-400 animate-fade-in . " onSubmit={handleSubmit}>
        <h3>Sign up</h3>
        <label className='block text-sm font-medium text-slate-600 mb-1'>Email:</label>
        <input className="w-full bg-slate-50 text-slate-900 p-2 h-10 rounded-md border focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition-shadow duration-150"
            type="email"
            onChange={(e)=> setEmail(e.target.value)} 
            value={email}
        />

        <label className='block text-sm font-medium text-slate-600 mb-1'>Password:</label>
        {/* relative wrapper lets the eye icon sit ON TOP of the input,
            positioned absolutely within this container */}
        <div className="relative">
          <input className="w-full bg-slate-50 text-slate-900 p-2 pr-10 h-10 rounded-md border focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition-shadow duration-150"
              type={showPassword ? "text" : "password"}
              onChange={(e)=> setPassword(e.target.value)} 
              value={password}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
           className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        <button
          type="button"
          onClick={handleSuggestPassword}
          className="text-xs text-emerald-600 hover:text-emerald-700 underline w-fit"
        >
            Suggest a strong password
        </button>
          

        <button className='mt-2 text-white px-4 py-2 rounded-md bg-emerald-500 w-fit hover:bg-emerald-600 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-150' disabled={isLoading}> {isLoading ? 'Signing up': 'Sign up'} </button>
        {/* ? 'Logging in': 'Log in' */}
        {error && (
            <div className="animate-pulse text-red-600 bg-red-50 border border-red-200 rounded-md p-2">
                {error}
            </div>
        )}
    </form>
    </>)
}