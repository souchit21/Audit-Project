import { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import {useHistory, useParams} from 'react-router-dom';
import axios from 'axios';
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import Sidebar from "../../pages/sideBar/sideBar";
import MaterialTable from 'material-table-jspdf-fix';

import "../Modal/userModal.css"
const style = {
    position: 'absolute',
    top: '30%',
    left: '60%',
    transform: 'translate(-50%, -50%)',
    width: '900px !important',
    bgcolor: 'background.paper',

    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };


const UserDetails =  ()=>{
    const history = useHistory();

    const {id} = useParams();
    console.log('31', id)
    const [userdetails,setUserDetails] = useState ({
        username:"",
        email:"",
        department:"",
        token:"",
        number:"",    
        isAdmin: false,
        isAuditee:false ,
        isAuditor: false,
        SupplierAudit: false,
        AS9100: false,
        MfgProcessFDY: false,
        ProductFDY: false,
        ProductMCshop: false,
        QMS: false,
        verified: false,
        _id:""
    });
    const {username, email, department, token, number, isAdmin, isAuditee, isAuditor, AS9100, MfgProcessFDY,
        ProductFDY, ProductMCshop, QMS, verified, _id } = userdetails;

    useEffect (() => {
        loadUser();
    },[]);



    const loadUser = async() =>{
        const result = await axios.get('https://96d0-103-68-187-186.ngrok-free.app/user/getUserwithUserId?id='+id);
        setUserDetails(result.data.data);
        console.log('59', result.data.data);
        console.log("91", userdetails)
        console.log("92",id)
    }
    // const columns = [
    //     // {title:'Order Id', field:'orderId',render:rowData=><Link  to={`/order/display/${rowData._id}`} target='_blank'>{rowData.orderId}</Link>},
    //     { title: 'Serial no', field: 'tableData.id', render:rowData => { return( <p>{rowData.tableData.id+1}</p> ) } },
    //    // {title:'View user', field:'user', render:rowData=><Link to={`/userdetails/${rowData._id}`}>View</Link>},

    //     {title:'Token Number', field:'token'},
        
     
    //     {title:'Name', field:'username'},
      
    //     {title:'Number', field:'number'},
    //     { title: 'Department', field: 'department'},
    //     {title:'Verification', field:'verified'},
      
    //   ]
      return (
        <>
        <Sidebar />
            
        <div>
        {/* <MaterialTable style={{
            margin: "60px 0px 30px 20px",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
            borderRadius: "8px",
            width: "97%",
        }} 
        title="Details of user" 
        data={userdetails}
        columns={columns}

        options = {{
          exportButton:true,
          exportButtonFieldStyle:{

          },
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
          pageSizeOptions: [5,10, 20],
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
        /> */}
            

        </div>
        </>
      );
    };
  
  export default UserDetails