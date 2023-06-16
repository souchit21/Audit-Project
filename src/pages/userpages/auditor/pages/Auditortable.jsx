import { useEffect, useState } from "react";
import SearchBar from "material-ui-search-bar";
import { useHistory, useParams,Link } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import ALayout from "../Layout/ALayout"; 
// import "./Profile.css";
// import _ from 'lodash';
// import CategoriesModal from "../../components/Modal/CategoriesModal";
// import EditCategoriesModal from "../../components/Modal/EditCategoriesModal";
// // import UserModal from "../../components/Modal/USerModal";
import axios from 'axios'
import { notifyError } from "../../../../utils/notifyToasts";
import FileUploadModal from "./FileUploadModal ";
// import './image'
// import SelectFileButton from "./image";
// import { Button } from "bootstrap";
// import { post } from "jquery";
import MaterialTable from 'material-table-jspdf-fix';
//import DateSelectionModal from "../DateSelectionModal";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const pageSize = 10;
const AuditorTable = () => {
  const history = useHistory();
  // const api_url = process.env.REACT_APP_api_url;

  const [auditDetails,setAuditDetails] = useState([]);




  const userToken = JSON.parse(localStorage.getItem('user'))?.token;
  console.log('9',userToken);
  const tokenArray = [];
  tokenArray.push(parseInt(userToken, 10));
  console.log('26', tokenArray);

  useEffect (() => {
      PostToken();
  },[]);

  const PostToken = async(e)=>{
    // e.preventDefault();
    console.log('34', tokenArray)
    try{
    const result = await axios.get('https://8204-103-68-187-186.ngrok-free.app/audit/getCombinedDataWithAuditorToken?auditeeToken='+[tokenArray]);
    setAuditDetails(result.data)
    console.log("38",result);
    }
    catch(err){
      notifyError('no audit found');
    }
  }
  const renderStatusDropdown = rowData => {
    return (
      <>
      <select
        value={rowData.AuditorAcceptationStatus}
        onChange={event => handleStatusChange(event, rowData)}
      >
        <option >Select an option</option>
        <option value="Accept">Accept</option>
        <option value="REJECTED">Not available</option>
      </select>
      </>
    );
  }

  const handleStatusChange = async(event, rowData) => {
    const {value} = event.target;
    rowData.AuditorAcceptationStatus  = value;
    // const data = {
    //   id: rowData._id,
    //   status: value
    // };
    const result = await axios.post('https://8204-103-68-187-186.ngrok-free.app/audit/editAuditofAuditor',{
      id: rowData._id,
      AuditorAcceptationStatus:value,
      //AuditorpreferredDate:selectedDate
    });
    console.log('96', result);
    
    window.location.reload();
    
  };

  const [selectedDate, setSelectedDate] = useState("");
  const handlePreferredDateChange = async(date, rowData) =>{
    setSelectedDate(date);
    
    console.log('89',date);
    //console.log('90',rowData);
    if(rowData.AuditorAcceptationStatus==="REJECTED"){
    const dresult = await axios.post('https://8204-103-68-187-186.ngrok-free.app/audit/editAuditofAuditor1',{
      id: rowData._id,
      AuditorpreferredDate:date
    });
    console.log('100', dresult)
    console.log('101', selectedDate);
  }
  else{
    alert('you have already accepted the date')
  }
  }

  
  

 
  const columns = [
    // {title:'Order Id', field:'orderId',render:rowData=><Link  to={`/order/display/${rowData._id}`} target='_blank'>{rowData.orderId}</Link>},
    { title: 'Serial no', field: 'tableData.id', render:rowData => { return( <p>{rowData.tableData.id+1}</p> ) } },
    // {title:'Order placed Date & Time', field:'createdAt',render: rowData => moment(rowData.createdAt).format("DD-MM-YYYY HH:mm:ss")},
    {title:'Audit Type', field:'auditType'},
    
    
    // {title:'Delivery Address', field:'deliveryAddress[0]'},
    // {title:'Auditor Name', field:'auditorId.username'},
   // {title:'Auditee Name', field:'auditeeId.username'},
    {title:'Date', field:'Date'},
    // {title:'Status', field:'Astatus'},
    {title: 'Link to checklist', field:'checklist_Link',
    render: rowData => (
      <button style={{backgroundColor:"rgb(169, 25, 25)", borderRadius:"4px", color:"white", padding:"5px", fontSize:"small" }} onClick={() => window.open(rowData.checklist_Link, '_blank')}>
        View Checklist
      </button>
    )
   },
    { title: 'Status', field: 'AuditorAcceptationStatus', render: renderStatusDropdown }, 
    {
      title: 'Preferred Date',
      field: 'preferredDate',
      render: rowData => (
        <DatePicker
          
          onChange={date => handlePreferredDateChange(date, rowData)}
          selected={selectedDate}
          dateFormat="dd/MM/yyyy"
          placeholderText="dd-mm-yyyy"
          />
        // <input type="date" name="date" value={selectedDate} onChange={}
    
      
      ),
    },   
    {title:'Upload Audit', field:'Audit file', render:rowData=><Link to={`/uploadAudit/${rowData._id}`}><button style={{backgroundColor:"rgb(169, 25, 25)", borderRadius:"4px", color:"white", padding:"5px", fontSize:"small" }} >Upload audit</button></Link>},
    {title:'Link to audit', field:'Audit_Link', 
    render: rowData => (
      <button style={{backgroundColor:"rgb(169, 25, 25)", borderRadius:"4px", color:"white", padding:"5px", fontSize:"small" }} onClick={() => window.open(rowData.Audit_Link, '_blank')}>
        View Audit
      </button>
    )},
    // {title:'End Date', field:'auditEndDate'},   
    // {title:'Scope', field:'scope'},

    // {title:'Buyer Number', field:'number'},
    // {title:'Seller Name', field:'seller_name'},
    // {title:'Product Name', field:'product_name'},
    //{title:'Status', field:'deliveryStatus',render:rowData=><Link to={`/order/update/${rowData._id}`}>{rowData.deliveryStatus}</Link>},
    // {
    //   title: 'Status',
    //   field: 'deliveryStatus',
    //   render: renderDeliveryStatus,
    // },
  ]

  
  

    // window.location.replace('/posts');

   return (
    <ALayout>
      
      <div className="container">

        <MaterialTable style={{
            margin: "40px 0px 30px 20px",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
            borderRadius: "8px",
            width: "97%",
        }} 
        title="List of Audits as Auditor" 
        data={auditDetails}
        columns={columns}

        options = {{
          exportButton:true,
          exportButtonFieldStyle:{

          },
          sorting: true,
          headerStyle: {
            backgroundColor: ' rgb(169, 25, 25)',
            color: '#FFF'
          },
          rowStyle: {
            backgroundColor: 'white',
          },
          // selection: true,
          // filtering: true,  
          grouping: false,
          actionsColumnIndex: -1,
          pageSizeOptions: [5,10, 20,50,100, 200, 500, 1000],
          search: true,
          searchFieldStyle: {
            width: '100%',
            backgroundColor: '#fff',
            border: '1px solid #AAA',
            borderRadius: '4px',
            paddingLeft: '8px',
            '::placeholder': {
              color: 'black',
              fontStyle: 'italic'
            }
          },
        }}
        />

      </div>
    </ALayout>
    
  );
};

export default AuditorTable;
