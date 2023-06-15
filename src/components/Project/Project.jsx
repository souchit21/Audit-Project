import { useState, useEffect } from "react";
import MaterialTable from 'material-table-jspdf-fix';
import * as React from 'react';
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  updateUpvoteCount,
  setSavedProjects,
  projectSelector,
} from "../../slices/project.slice";
import { StyledMenu } from "../StyledMenu/StyledMenu";
import CommentSection from "../CommentSection/CommentSection";
// import MenuItem from "@mui/material/MenuItem";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { BiCommentDetail } from "react-icons/bi";
import { MdBookmarkBorder, MdBookmark } from "react-icons/md";
import upvotefilled from "../../assets/upvotefilled.svg";
import upvoteoutlined from "../../assets/upvoteoutlined.svg";
import "./Project.css";
import { isAuthenticated, getUser } from "../../utils/auth";
import { getDate } from "../../utils/date";
import { baseUrl } from "../../utils/constants";
import {
  notifySuccess,
  notifyError,
  notifyInfo,
} from "../../utils/notifyToasts";
import { doesPropertyExist } from "../../utils/doesPropertyExist";
///////
import { CircularProgress } from "@mui/material";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import { red } from '@mui/material/colors';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { FcSalesPerformance, FcCollect, FcLibrary, FcCollaboration } from "react-icons/fc";
import Divider from '@mui/material/Divider';
import ArticleIcon from '@mui/icons-material/Article';
import Badge from '@mui/material/Badge';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import PropTypes from 'prop-types';
import ImageIcon from '@mui/icons-material/Image';
import TagIcon from '@mui/icons-material/Tag';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ReportIcon from '@mui/icons-material/Report';
import FormContainer from "../Modal/FormContainer";
import axios from 'axios';
import Sidebar from "../../pages/sideBar/sideBar";
// import { MenuItem,Select, FormControl } from '@material-ui/core';


import Layout from "../../components/Layout/Layout";
const Project = ({ project }) => {
  const theme = useTheme();
  const history = useHistory();
  const dispatch = useDispatch();
  const [auditDetails,setAuditDetails] = useState([]);
  const [pagination , setPagination] = useState();
  const [currentPage , setCurrentPage] = useState(1);
  const [query,setQuery]= useState();
  const [deliveryStatuses, setDeliveryStatuses] = useState([
    { value: 'Accepted', label: 'Accepted' },
    { value: 'Pending', label: 'Pending' },
    { value: 'In-Progress', label: 'In-Progress' },
    { value: 'Delivered', label: 'Delivered' },
    { value: 'Declined', label: 'Declined' },
  ]);
  useEffect(()=>{
    loadCategories();
  },[]);
  
  const loadCategories = async()=>{
     try{
      const result = await axios.get("https://d88d-103-68-187-186.ngrok-free.app/audit/getCombinedData");
      setAuditDetails(result.data);
      console.log('90', auditDetails);
     }catch(err){
      notifyError('No audits to show');
     }

      // setPagination(_(result.data.getorders).slice(0).take(pageSize).value())
      
  }
  //console.log("91",auditDetails)

  // const styles = {
  //   Accepted: {color: 'green'},
  //   Delivered: { color: 'green' },
  //   Pending: { color: 'orange' },
  //   "In-Progress": { color: 'blue' },
  //   default: { color: 'red' },
  // };

  // const handleDeliveryStatusChange = (event, rowData) => {
  //   const data = {
  //     id: rowData._id,
  //     deliveryStatus: event.target.value
  //   };

  //   axios
  //     .put(`http://localhost:9955/payment/updateOrderAdmin?id=${data.id}&deliveryStatus=${data.deliveryStatus}`)
  //     .then(result => {
  //       setOrders(result.data.orders);
  //       window.location.reload();
  //     })
  //     .catch(error => {
  //       console.error(error);
  //     });
  // };

  // const renderDeliveryStatus = (rowData) => {
  //   const currentStyle = styles[rowData.deliveryStatus] || styles.default;
  //   return (
  //     <Select
  //       value={rowData.deliveryStatus}
  //       onChange={(event) => handleDeliveryStatusChange(event, rowData)}
  //       style={currentStyle}
  //     >
  //       {deliveryStatuses.map((status) => (
  //         <MenuItem key={status.value} value={status.value} style={styles[status.value] || styles.default}>
  //           {status.label}
  //         </MenuItem>
  //       ))}
  //     </Select>
  //   );
  // };
  
  
  

  const columns = [
    // {title:'Order Id', field:'orderId',render:rowData=><Link  to={`/order/display/${rowData._id}`} target='_blank'>{rowData.orderId}</Link>},
    { title: 'Serial no', field: 'tableData.id', render:rowData => { return( <p>{rowData.tableData.id+1}</p> ) } },
    // {title:'Order placed Date & Time', field:'createdAt',render: rowData => moment(rowData.createdAt).format("DD-MM-YYYY HH:mm:ss")},
    {title:'Date', field:'Date'},
    // {title:'Scope', field:'Scope'},
    // {title:'Audit Type', field:'auditType'},
    
    // {title:'Delivery Address', field:'deliveryAddress[0]'},
    {title:'Auditor Name', field:'auditTeam'},
    {title:'Auditee Name', field:'auditee',
     render: rowData => (
      <p>{rowData.auditee.join(', ')}</p>
    )
    },
    {title: 'Link to Audit', field:'auditLink'},
    {   title:'Auditor Status', 
        field:'AuditorAcceptationStatus',
        // render: rowData => {
        //   // Logic to determine the dynamic value based on rowData
        //   const dynamicValue; // Replace this with your logic
        //   if(rowData==false) dynamicValue = 'A'
          
        //   // Return the dynamic value to be displayed in the cell
        //   return <p>{dynamicValue}</p>;
        // }
  },
    {title:'Auditee Status', field:'AuditeeAcceptationStatus'},
    
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

 
  // console.log("253",users)
  return (
     
     
         
      <div>
        
        <FormContainer/>
        <div style={{ height: "600px", width:"1200px", overflow: "auto", marginLeft:"10px", marginRight: "10px"}}>
        <MaterialTable style={{
            margin: "60px 20px 30px 20px",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
            borderRadius: "8px",
            width: "100%",
        }} 
        title="Audits" 
        data={auditDetails}
        columns={columns}

        options = {{
          exportButton:true,
          exportButtonFieldStyle:{

          },
          cellStyle: {
            fontWeight: 'normal', // Change the font weight here
            fontSize: '15px',
          },
          sorting: true,
          headerStyle: {
            backgroundColor: ' rgb(169, 25, 25)',
            color: '#FFF',
            fontSize: '16px'
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
      </div>
  );
  
  

};

export default Project;
