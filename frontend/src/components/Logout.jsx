import { useNavigate} from 'react-router-dom'
export default function Logout(){
    //remove user from local storage
    localStorage.removeItem('user')

    const navigate = useNavigate();

    navigate('/home')


    return(<>
    
    </>)
}