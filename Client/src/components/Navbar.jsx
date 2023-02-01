import { AiOutlineMenu } from 'react-icons/ai';
import { RiNotification3Line } from 'react-icons/ri';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { Notification} from '.';
import { useStateContext } from '../contexts/ContextProvider';
import { useEffect } from 'react';
import { useState } from 'react';

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
    const [showModal, setShowModal]= useState(false);
    const handleOnClose=()=>setShowModal(false);
    
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
           
            <div>
                {//  <NavButton title ='Notifications' dotColor='#03C9D7'  color='blue' icon={<RiNotification3Line/>} onClick={()=>console.log("here")}/>}
                }
                <button className='relative text-xl rounded-full p-3 hover:bg-light-gray' onClick={() => setShowModal(true)}>
                   
                    <RiNotification3Line color="blue"/>
                </button>
                <Notification onClose={handleOnClose} visible={showModal}/>
            </div>
            
        </div>
     );
}
 
export default Navbar;