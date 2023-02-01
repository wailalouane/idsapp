import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, DateTime, Legend, SplineAreaSeries } from "@syncfusion/ej2-react-charts";
import { areaCustomSeries, areaPrimaryYAxis, areaPrimaryXAxis } from "../../data/dummy";
import{Header} from '../../components'
const Area = () => {
    return ( 
        <div className="m-4 md:m-10 mt-24 p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl">
            <Header category="Chart" title='Area Chart' />
            <ChartComponent
            id="area-chart"
            height="420px" 
            primaryXAxis={areaPrimaryXAxis}
            primaryYAxis={areaPrimaryYAxis}
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