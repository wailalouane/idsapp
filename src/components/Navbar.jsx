import { AiOutlineMenu } from 'react-icons/ai';
import { FiShoppingCart } from 'react-icons/fi';
import { BsChatLeft } from 'react-icons/bs';
import { RiNotification3Line } from 'react-icons/ri';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import avatar from '../data/avatar.jpg';
import { Cart, Chat, Notification, UserProfile } from '.';
import { useStateContext } from '../contexts/ContextProvider';
import { useEffect } from 'react';

const NavButton = ({ title, customFunc, icon, color, dotColor }) => (
    <TooltipComponent content={title} position='BottomCenter'>
        <button type="button" onClick={customFunc} style ={{color}} 
        className="relative text-xl rounded-full p-3 hover:bg-light-gray">
            <span style={{background: dotColor}}
            className='absolute inline-flex rounded-full h-2 w-2 right-2 top-2 '>
                </span>
                {icon}

            

        </button>

    </TooltipComponent>
);

const Navbar = () => {
    const { currentColor, activeMenu, setActiveMenu, handleClick, isClicked, screenSize, setScreenSize} = useStateContext();
    const handleActiveMenu=()=>setActiveMenu(!activeMenu);
    useEffect(()=>{
        const handleResize=()=>setScreenSize(window.innerWidth);
        window.addEventListener('resize', handleResize);
        handleResize();
        return()=> window.removeEventListener('resize',handleResize);
    },[]);
    useEffect(() => {
        if (screenSize <= 900) {
          setActiveMenu(false);
        } else {
          setActiveMenu(true);
        }
      }, [screenSize]);
    return ( 
        <div className='flex justify-between p-2 md:mx-6 relative'>
            <NavButton title="Menu" customFunc={handleActiveMenu}   color='blue' icon={<AiOutlineMenu />} />
           
            <div className='flex'>
                <NavButton title ='Notifications' dotColor='#03C9D7' customFunc={() => handleClick('Notification')} color='blue' icon={<RiNotification3Line/>} />

            {isClicked.Notification && <Notification/>}
            </div>
            navbar
        </div>
     );
}
 
export default Navbar;