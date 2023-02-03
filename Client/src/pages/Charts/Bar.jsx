import{Header, LineCharts} from '../../components'
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, Legend, Category, Tooltip, DataLabel, ColumnSeries } from '@syncfusion/ej2-react-charts';
import { useEffect, useState } from 'react';
const columnData = [
    { country: 'UDP', protocol: 46},
    { country: 'TCP',  protocol: 18},
    { country: 'ICMP', protocol: 19},
    { country: 'IP', protocol: 27},
    { country: 'PP', protocol: 12},
  ];
  const primaryxAxis = {
  valueType: 'Category',
  title: 'Protocols',
};

const primaryyAxis = {
  title: 'Protocols',
  minimum: 0,
};
const Bar = () => {
    const [data, setData] =useState([]);
    useEffect(()=>{
        fetch("/proto").then(
            res=>res.json()
        ).then(
            data => {
                setData(data)
            }
        )
    },[])

    return ( 
        <div className='m-4 md:m-10 mt-24 p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl'>
            <Header category="Chart" title='Bar chart' />
            <div className='w-full'>
            <ChartComponent id='charts' primaryXAxis={primaryxAxis} primaryYAxis={primaryyAxis} title='Protocol using'>
            <Inject services={[ColumnSeries, Legend, Tooltip, DataLabel, Category]} />
              <SeriesCollectionDirective>
               {data.length > 0 ?(
                    <SeriesDirective dataSource={data} xName='country' yName='protocol' name='Protocol' type='Column' />
                ):(
                    <SeriesDirective dataSource={columnData} xName='country' yName='protocol' name='Protocol' type='Column' />
                    )}
      </SeriesCollectionDirective>
    </ChartComponent>

            </div>
        </div>
     );
}
 
export default Bar;