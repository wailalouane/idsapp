import { Header, LineCharts } from "../../components";
import { AccumulationChartComponent, AccumulationSeriesCollectionDirective, AccumulationSeriesDirective, AccumulationLegend, PieSeries, AccumulationDataLabel, AccumulationTooltip, Inject } from '@syncfusion/ej2-react-charts';
import { useEffect, useState } from "react";
const variouspiedata = [
    { x: "Attack", y: 40 },
    { x: "Normal", y: 60 }
  ];
const Pie = () => {
    const [data, setData] =useState([]);
    useEffect(()=>{
        fetch("/Aletrs").then(
            res=>res.json()
        ).then(
            data => {
                setData(data)
            }
        )
    },[])
    return ( 
        <div>
            <div className='m-4 md:m-10 mt-24 p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl'>
            <Header category="Pie" title='Pie chart' />
            <div className='w-full'>
            <AccumulationChartComponent id='pie-chart' ref={pie => pie = pie} legendSettings={{
                      visible: true
                     }} enableSmartLabels={true} enableAnimation={true} tooltip={{ enable: true }}>
            <Inject services={[AccumulationLegend, PieSeries, AccumulationDataLabel, AccumulationTooltip]}/>
            <AccumulationSeriesCollectionDirective>
                {data.length > 0 ?(
                    <AccumulationSeriesDirective dataSource={data} xName='x' yName='y' innerRadius='20%' dataLabel={{
                         visible: true, position: 'Outside', name: 'x'
                           }} radius='r'>
                          </AccumulationSeriesDirective>
                          ):(
                            <AccumulationSeriesDirective dataSource={variouspiedata} xName='x' yName='y' innerRadius='20%' dataLabel={{
                                visible: true, position: 'Outside', name: 'x'
                                     }} radius='r'>
                              </AccumulationSeriesDirective>
                )}
              
            </AccumulationSeriesCollectionDirective>
          </AccumulationChartComponent>;

            </div>
        </div>
        </div>
     );
}
 
export default Pie;