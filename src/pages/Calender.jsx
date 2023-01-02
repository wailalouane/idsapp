import { ScheduleComponent } from '@syncfusion/ej2-react-schedule';
import {Header} from '../components'
import  {Day,Week, WorkWeek, Month, Agenda, Resize, DragAndDrop, Inject} from "@syncfusion/ej2-react-schedule";

const Calender = () => {
    return ( 
        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
            <Header category="App" title="Calendar"/>
            <ScheduleComponent height='650px'>
                <Inject services={[Day,Week, WorkWeek, Month, Agenda, Resize, DragAndDrop]}/>
            </ScheduleComponent> 
        </div>
     );
}
 
export default Calender;