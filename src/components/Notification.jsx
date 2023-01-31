import {notifData} from '../data/somedata' 
const Notification = ({visible, onClose}) => {
    const handleOnClose=(e)=>{
        if(e.target.id==='container') onClose();
    }
    if(!visible) return null;
    return ( 
        <div id='container' onClick={handleOnClose} className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center'>
            <div className="bg-gray-300 px-10 py-4 rounded-md text-gray-900 w-1/2">
            <h2 className="text-2xl font-bold mb-3">Notification</h2>
            <ul className="list-disc  divide-y divide-black">

                
                    {notifData.map((item)=>(
                        <div key={item.NotifID}>
                            <li className="py-2 ">
                                <p className="font-bold">{item.NotifTitle}</p>
                                {item.NotifText}
                                <div className="text-xs text-gray-600">
                                    {item.NotifDate}
                                            
                                </div>
                            </li>
                        </div>
                    ))}
            </ul>
            </div>
            
        </div>
     );
}
 
export default Notification;