import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, DateTime, Legend, SplineAreaSeries } from "@syncfusion/ej2-react-charts";
import { areaCustomSeries, AreaPrimaryYAxis, AreaPrimaryXAxis } from "../../data/dummy";
import{Header} from '../../components'
const Area = () => {
    return ( 
        <div>
            <Header category="Chart" title='Area Chart' />
            <ChartComponent
            id="area-chart"
            height="420px" 
            primaryXAxis={AreaPrimaryXAxis}
            primaryYAxis={AreaPrimaryYAxis}
            tooltip={{enable: true}}
            
            >

                <Inject services={[SplineAreaSeries, DateTime, Legend]}/>
                <SeriesCollectionDirective>
                    {areaCustomSeries.map((item, index)=><SeriesDirective key={index}{...item}/>)}
                </SeriesCollectionDirective>
            </ChartComponent>    
        </div>
        
     );
}
 
export default Area;