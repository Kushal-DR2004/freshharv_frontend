
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

interface SignupLoginButtonProps {
  tw?: number;  
  th?: number;  
  gap?: number; 
  h?: number;   
  w?: number;   
}


const SingnupLoginButton = ({th , gap , h , w} : SignupLoginButtonProps) => {
    const location = useLocation();
    const navigate = useNavigate();

    const isLoginPage = location.pathname === '/login';
    const isSignupPage = location.pathname === '/signup';
  return (
    <div className={`h-[${th}px]  flex gap-[${gap}px]`}>
        {!isLoginPage && <button 
            className={`w-[${w}px] h-[${h}px] bg-[#4AB814] rounded-[8px] font-bold text-[14px] text-[#121712] hover:bg-green-600 focus:border`} 
            onClick={() => navigate('/login')}>
            Log In
        </button>}
        {!isSignupPage && <button 
            className={`w-[${w}px] h-[${h}px] bg-[#F2F5F0] rounded-[8px] font-bold text-[14px] text-[#121712] hover:bg-gray-200 focus:border`} 
            onClick={() => navigate('/signup')}>
            Sign Up
        </button> } 
    </div>
  )
}

export default SingnupLoginButton