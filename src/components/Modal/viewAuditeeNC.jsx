

//Showing auditee NCs

import { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import {useHistory, useParams} from 'react-router-dom';
import axios from 'axios';
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import Sidebar from "../../pages/sideBar/sideBar";
import Layout from "../Layout/Layout";
import "../Modal/UserDetails.css"
import { Padding } from "@mui/icons-material";
import MaterialTable from 'material-table-jspdf-fix';

const style = {
    position: 'absolute',
    top: '40%',
    left: '60%',
    transform: 'translate(-50%, -50%)',
    width: '900px !important',
    bgcolor: 'background.paper',
    heigh:'auto',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };


const ViewAuditeeNC =  ()=>{
    const history = useHistory();

    const {id} = useParams();
    console.log('31', id)
    const [Auditee_NC_Link,setNCLinks] = useState ([]);

    useEffect (() => {
        loadUser();
    },[]);


//getting auditee NC

    const loadUser = async() =>{
        const result = await axios.get('https://b4e2-103-68-187-186.ngrok-free.app/audit/getAuditwithId?id='+id);
        setNCLinks(result.data.data.Auditee_NC_Link);
        //console.log('44', result);
        console.log("45", Auditee_NC_Link)
        //console.log("92",id)
    }

    //downloading NC
    
    const data = Auditee_NC_Link.map((link) => ({
        heading: 'Link',
        value: <button style={{backgroundColor:"rgb(169, 25, 25)", borderRadius:"4px", color:"white", padding:"5px", fontSize:"small"}}
        onClick={() => window.open(link, "_blank")}>View NC</button>,
    }));
    
      const columns = [
        { title: 'Heading', field: 'heading' },
        { title: 'Value', field: 'value' },
      ];

      return (
        <>
       
            <Layout>
                    <MaterialTable
                        style={{
                            margin: '60px 0px 30px 20px',
                            boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
                            borderRadius: '8px',
                            width: '97%',
                        }}
                        title="Auditee NCs"
                        data={data}
                        columns={columns}
                        options={{
                            exportButton: true,
                            exportButtonFieldStyle: {},
                            headerStyle: {
                            backgroundColor: 'rgb(169, 25, 25)',
                            color: '#FFF',
                            },
                            rowStyle: {
                            backgroundColor: 'white',
                            },
                            grouping: false,
                            actionsColumnIndex: -1,
                            pageSizeOptions: [5, 10, 20],
                            search: true,
                            searchFieldStyle: {
                            width: '100%',
                            backgroundColor: '#fff',
                            border: '1px solid #AAA',
                            borderRadius: '4px',
                            paddingLeft: '8px',
                            '::placeholder': {
                                color: 'black',
                                fontStyle: 'italic',
                            },
                            },
                        }}
                />
       
        </Layout>
        </>
      );
    };
  
  export default ViewAuditeeNC