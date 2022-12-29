
import { GridComponent, ColumnsDirective, CoumnDirective, Resize, Sort, ContextMenu, Filter, Page, ExcelExport, Edit, Inject } from "@syncfusion/ej2-react-grids";
import {ordersData, contextMenuItems, ordersGrid} from '../data/dummy';
import {Header} from '../components'
import { ColumnDirective } from "@syncfusion/ej2-react-charts";

const Orders = () => {
    return ( 
        
        <div className='m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl'>
            <Header category="Page" title="Orders"/>
            <GridComponent dataSource={ordersData}>
                <ColumnsDirective>
                <ColumnDirective headerText= 'Image' textAlign= 'Center'width= '120'/>
    
                <ColumnDirective field='OrderItems'  headerText='Item' textAlign= 'Center'  width= '150' editType= 'dropdownedit'/>
                <ColumnDirective field='CustomerName' headerText='Customer Name' textAlign= 'Center'  width= '150'  />
                <ColumnDirective field='TotalAmount' headerText='Total Amount' format= 'C2' textAlign= 'Center'  width= '150' editType= 'numericedit'/>
                <ColumnDirective field='Status' headerText='Status' textAlign= 'Center'  width= '120' />
                <ColumnDirective field='OrderID'/>
                <ColumnDirective field='Location'/>
                </ColumnsDirective>
            </GridComponent>
        </div>
     );
}
 
export default Orders;