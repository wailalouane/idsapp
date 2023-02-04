
import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {FiSettings} from 'react-icons/fi';
import{TooltipComponent} from '@syncfusion/ej2-react-popups'
import { Navbar, SideBar } from './components';
import {Alerts,  Calender, Stacked, Pyramid, Line, Area, Bar, Pie, Financial, ColorPicker, ColorMapping, Editor, Home } from './pages';
import {useStateContext} from './contexts/ContextProvider';
function App() {
  const {activeMenu} =useStateContext();
  //const activeMenu =true;
  
  return (
    <div>
      
      <BrowserRouter>
        <div className='flex relative dark:bg-main-dark-bg'>
          <div className='fixed right-4 bottom-4' style={{zIndex:'1000'}}>
           <TooltipComponent content="Settings" position='top'>
              <button type='button' className='text-3xl p-3 hover:drop-shadow-xl hover:bg-light-gray text-white' style={{background:'blue',borderRadius:'50%'}}>
                <FiSettings/>
              </button>

            
            </TooltipComponent>
          </div>
          {activeMenu ? (
            <div className='w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white'>
              <SideBar/>
            </div>
          ):(
            <div className='w-0 dark:bg-secondary-dark-bg'>
              <SideBar/>
            </div>
          )
        }
        <div className={
          `dark:bg-main-bg bg-main-bg min-h-screen w-full ${activeMenu ? 'md:ml-72' :'flex-2' }`
          
        }>
          <div className='fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full'>
            <Navbar/>

          </div>

        
        <div>
        <Routes>
                {/* dashboard  */}
                <Route path='/' element={(<Home/>)}/> 
                <Route path="/Home" element={(<Home />)} />
                <Route path="/Alerts" element={(<Alerts />)} />

                {/* pages  */}
                

                {/* apps  */}
                
                
                <Route path="/Calendar" element={<Calender />} />
                

                {/* charts  */}
                <Route path="/line" element={<Line />} />
                <Route path="/area" element={<Area />} />
                <Route path="/bar" element={<Bar />} />
                <Route path="/pie" element={<Pie />} />
                
                
                
                <Route path="/stacked" element={<Stacked />} />

              </Routes>
        
          
        </div>
        </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;