import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, DateTime, Legend, Tooltip, LineSeries } from "@syncfusion/ej2-react-charts";
import { lineCustomSeries, LinePrimaryYAxis, LinePrimaryXAxis } from "../../data/dummy";
const LineChats = () => {
    return ( 
        <ChartComponent
        id="line-chart"
        height="420px"
        primaryXAxis={LinePrimaryXAxis}
        primaryYAxis={LinePrimaryYAxis}
        tooltip={{enable: true}}
        
        >

            <Inject services={[LineSeries, DateTime, Legend, Tooltip]}/>
            <SeriesCollectionDirective>
                {lineCustomSeries.map((item, index)=><SeriesDirective key={index}{...item}/>)}
            </SeriesCollectionDirective>
        </ChartComponent>
    
    );
}
 
export default LineChats;