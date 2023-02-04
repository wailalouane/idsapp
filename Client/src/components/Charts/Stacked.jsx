import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, Legend, Category, StackingColumnSeries, Tooltip } from "@syncfusion/ej2-react-charts";
import { useEffect, useState } from "react";

import { stackedCustomSeries, stackedPrimaryXAxis, stackedPrimaryYAxis } from "../../data/somedata";
const Stacked = ({width, height}) => {
    const [data, setData] =useState([]);
    useEffect(()=>{
        const sse= new EventSource('/protocols')
        function handleStream(e){
            
            setData (e.data)
        }
        sse.onmessage=e=>{handleStream(e)}

        sse.onerror=e=>{
            sse.close()
        }
        return ()=>{
            sse.close()
        }
    },)

    return ( 
        <ChartComponent
        width={width}
        height={height}
        id="stack chart"
        primaryXAxis={stackedPrimaryXAxis}
        primaryYAxis={stackedPrimaryYAxis}
        chartArea={{border: {width: 0}}}
        tooltip={{enable: true}}
        legendSettings={{background: 'white'}}
        >
            <Inject services={[Legend, Category, StackingColumnSeries, Tooltip]}/>
            <SeriesCollectionDirective>
                {data.length > 0 ?(
                    data.map((item, index) => <SeriesDirective key={index}{...item}/>)
                ):(
                    
                    stackedCustomSeries.map((item, index) => <SeriesDirective key={index}{...item}/>)
                )}
                
            </SeriesCollectionDirective>
        </ChartComponent>   
     );
}
 
export default Stacked;