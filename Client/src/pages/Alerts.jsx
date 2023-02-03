
import { GridComponent, Search, Toolbar, ColumnsDirective, CoumnDirective, Resize, Sort, ContextMenu, Filter, Page, ExcelExport, Edit, Inject, PdfExport } from "@syncfusion/ej2-react-grids";
import {Header} from '../components'
import { ColumnDirective } from "@syncfusion/ej2-react-charts";
import {ordersGrid, ordersData} from '../data/somedata';
import { useEffect, useState } from "react";

const Alerts = () => {
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
        
        <div className='m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl'>
            <Header category="Page" title="Alerts"/>
            {data.length > 0 ?(
                    <GridComponent dataSource={ordersData} allowPaging allowSorting toolbar={['Search']}>
                    <ColumnsDirective>
                    {ordersGrid.map((item,index)=>(<ColumnDirective key={index} field={item.field} headerText={item.headerText} format={item.format} textAlign= {item.textAlign}  width= {item.width} editType= {item.editType  }/>))}
                    
                    </ColumnsDirective>
                    <Inject services={[Resize, Search,Toolbar ,Sort, ContextMenu, Filter, Page, ExcelExport, Edit, PdfExport]}/>
                </GridComponent>
                ):(
                    
                    <GridComponent dataSource={ordersData} allowPaging allowSorting toolbar={['Search']}>
                   <ColumnsDirective>
                          {ordersGrid.map((item,index)=>(<ColumnDirective key={index} field={item.field} headerText={item.headerText} format={item.format} textAlign= {item.textAlign}  width= {item.width} editType= {item.editType  }/>))}
                    
                    </ColumnsDirective>
                   <Inject services={[Resize, Search,Toolbar ,Sort, ContextMenu, Filter, Page, ExcelExport, Edit, PdfExport]}/>
            </GridComponent>
                )}
            
        </div>
     );
}
 
export default Alerts;