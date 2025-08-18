

import LoginNavbar from '../components/LoginNavbar';
import SiteFooter from '../components/SiteFooter';
import { Outlet } from 'react-router-dom';
import HomeNavbar from '../components/HomeNavbar';
import { useLocation } from 'react-router-dom';


const MainLayout = () => {
 
  const location = useLocation();
  const locationPath = location.pathname;
  const isUserLogin = locationPath === '/login' || locationPath == '/signup' || locationPath == '/';

  return (
    <div className="min-h-screen flex flex-col select-none cursor-default"  contentEditable="false">
      {!isUserLogin ? <HomeNavbar/> : <LoginNavbar />}

      <main className="flex-grow min-h-screen max-w-[1280px] mx-auto ">
        <Outlet />
      </main>
     <div className='max-w-[1280px] mx-auto'>
        <SiteFooter />
     </div>
      
    </div>
  );
};

export default MainLayout;
