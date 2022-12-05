import { Stacked, Pie, Button, LineChart, SparkLine } from '../components';

import { earningData, medicalproBranding, recentTransactions, weeklyStats, dropdownData, SparklineAreaData, ecomPieChartData } from '../data/dummy';
import { useStateContext } from '../contexts/ContextProvider';
import background from "../data/bgsec.jpg";


const Ecommerce = () => {
    return ( 
        <div className='mt-12'>
            <div className='flex flex-wrap lg:flex-nowrap justify-center'>
                <div style={{ 
                  backgroundImage: `url(${background})`,
                 }
                }
                
                 
                 className=' bg-white dark:text-gray-200 dark:bg-secondary-dark-bg h-44 rounded-xl w-full lg:w-80 p-8 pt-9 m-3 bg-hero-pattern bg-no-repeat bg-cover bg-center' >
                    
                 <div className='flex justify-between items-center'>
                    <div>
                        <p className='font-bold text-gray-400'>
                            Attacks this mounth
                        </p>
                        <p className='text-2xl'>
                            1200 Attack
                        </p>
                    </div>
                 </div>

                <div className="mt-6">
                    <Button color="white"
                    bgColor="blue"
                    text="Start"
                    borderRadius="10px"
                    size="md"
                    />

                </div>

                </div>

            </div>
            Ecommerce
        </div>
     );
}
 
export default Ecommerce
