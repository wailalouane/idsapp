import { AiFillAlert, AiFillBuild, AiFillWarning } from "react-icons/ai";
import { HiOutlineRefresh } from "react-icons/hi";



export const notifData=[
    {
        NotifID: 1,
        NotifTitle: 'Customizing your theme',
        NotifText: 'If you need to use a one-off divide-{color} value ',
        NotifDate:'jul 23, 2021 at 09:15 AM'
    },
    {
        NotifID: 2,
        NotifTitle: 'Customizing your theme',
        NotifText: 'If you need to use a one-off divide-{color} value',
        NotifDate:'jul 23, 2021 at 09:15 AM'
    },
    {
        NotifID: 3,
        NotifTitle: 'Customizing your theme',
        NotifText: 'If you need to use a one-off divide-{color} value',
        NotifDate:'jul 23, 2021 at 09:15 AM'
    }
];




export const earningData = [
    {
      icon: <AiFillAlert />,
      amount: '4,369',
      percentage: '+23%',
      title: 'Alert',
      iconColor: 'rgb(252, 3, 3)',
      iconBg: 'rgb(254, 201, 15)',
      pcColor: 'green-600',
    },
    {
      icon: <AiFillBuild />,
      amount: '39,354',
      percentage: '-4%',
      title: 'Critical',
      iconColor: '#fc8c03',
      iconBg: '#E5FAFB',
      pcColor: 'red-600',
    },
  
    {
      icon: <AiFillWarning />,
      amount: '423,39',
      percentage: '+38%',
      title: 'Warning',
      iconColor: '#160be3',
      iconBg: 'rgb(255, 244, 229)',
  
      pcColor: 'green-600',
    },
    {
      icon: <HiOutlineRefresh />,
      amount: '39,354',
      percentage: '-12%',
      title: 'Others',
      iconColor: 'rgb(0, 194, 146)',
      iconBg: 'rgb(235, 250, 242)',
      pcColor: 'red-600',
    },
];

// this for the stacks in the first page
export const stackedPrimaryXAxis = {
    majorGridLines: { width: 0 },
    minorGridLines: { width: 0 },
    majorTickLines: { width: 0 },
    minorTickLines: { width: 0 },
    interval: 1,
    lineStyle: { width: 0 },
    labelIntersectAction: 'Rotate45',
    valueType: 'Category',
  };

export const stackedPrimaryYAxis = {
    lineStyle: { width: 0 },
    minimum: 100,
    maximum: 400,
    interval: 100,
    majorTickLines: { width: 0 },
    majorGridLines: { width: 1 },
    minorGridLines: { width: 1 },
    minorTickLines: { width: 0 },
    labelFormat: '{value}',
};



// data for the stack in the first  page  the xname and yname send is as it is 
  export const stackedCustomSeries = [
  
    {
      dataSource:[
        { x: 'Jan', y: 111.1 },
        { x: 'Feb', y: 127.3 },
        { x: 'Mar', y: 143.4 },
        { x: 'Apr', y: 159.9 },
        { x: 'May', y: 159.9 },
        { x: 'Jun', y: 159.9 },
        { x: 'July', y: 159.9 },
      ],
      xName: 'x',
      yName: 'y',
      name: 'Alerts',
      type: 'StackingColumn',
      background: 'blue',
  
    },
  
    {
      dataSource: [
        { x: 'Jan', y: 111.1 },
        { x: 'Feb', y: 127.3 },
        { x: 'Mar', y: 143.4 },
        { x: 'Apr', y: 159.9 },
        { x: 'May', y: 159.9 },
        { x: 'Jun', y: 159.9 },
        { x: 'July', y: 159.9 },
      ],
      xName: 'x',
      yName: 'y',
      name: 'Fake',
      type: 'StackingColumn',
      background: 'red',
  
    },
  
  ];



  // this data ta3 tableau ta3 alerts 
  export const ordersGrid = [
    {
      field: 'NumPacket',
      headerText: 'Numero de packet',
      width: '150',
      textAlign: 'Center',
    },
    {
      field: 'ProtocolType',
      headerText: 'Protocol type',
      width: '150',
      textAlign: 'Center',
    },
    {
      field: 'Services',
      headerText: 'Services',
      textAlign: 'Center',
      width: '150',
    },
    {
      headerText: 'Type',
      field: 'Type',
      textAlign: 'Center',
      width: '120',
    },
    {
      field: 'AttackType',
      headerText: 'Type of attack',
      width: '120',
      textAlign: 'Center',
    },
  
    
  ];

// this is how data is expected to be sended 
  export const ordersData = [
    {
      AttackType: "Dos",
      ProtocolType: "ICMP",
  
      Services: "50",
      
      Type: 'anomalie',
      NumPacket: '1',
    },
    {
        AttackType: "R2L",
        ProtocolType: 'IP',
    
        Services: "32",
        
        Type: 'normal',
        NumPacket: '4',
      },{
        AttackType: "U2R",
        ProtocolType: 'UDP',
    
        Services: "53",
        
        Type: 'attack',
        NumPacket: '2',
      },{
        AttackType: "Probe",
        ProtocolType: 'UDP',
    
        Services: "46",
        
        Type: 'normal',
        NumPacket: '3',
      },
]
