import { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import {useHistory, useParams} from 'react-router-dom';
import axios from 'axios';
import MaterialTable from 'material-table-jspdf-fix';
import ALayout from "../Layout/ALayout";
import { Padding } from "@mui/icons-material";
import { notifyError } from "../../../../utils/notifyToasts"; 
import { notifySuccess } from "../../../../utils/notifyToasts"; 

const style = {
    position: 'absolute',
    top: '25%',
    left: '60%',
    transform: 'translate(-50%, -50%)',
    width: '900px !important',
    bgcolor: 'background.paper',
    height:'50%',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
    justifyContent:'center',
    alignItems: 'center'
  };


const UploadAuditeeNC_Aud =  ()=>{
    const history = useHistory();

    const {id} = useParams();
    console.log('31', id)
    const [Auditee_NC_LINKS,setNC_LINKS] = useState ([]);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const handleFileChange = (event) => {
    setSelectedFiles(event.target.files);
    };

    const handleUpload = async (e) => {
            e.preventDefault();
            const formData = new FormData();
            console.log('85', selectedFiles)
            for (let i = 0; i < selectedFiles.length; i++) {
                formData.append("files", selectedFiles[i]);
            }
            console.log('88', formData);
            try {
                const response = await axios.post(
                "https://00a6-103-68-187-186.ngrok-free.app/NcUpload/uploadNcAudit",
                formData
                );
                console.log('95', response);
                setNC_LINKS(response.data);
                console.log('78', Auditee_NC_LINKS)
                notifySuccess("Successfully Uploaded")
                
            } catch (err) {
                notifyError("Files couldn't be uploaded");
            }
    };
    const PostLinks = async (e) => {
        e.preventDefault();
        const data = {
            id: id,
            Auditee_NC_Link: Auditee_NC_LINKS
        }
        console.log('90', data);
        try{
            const result = await axios.post(
                "https://00a6-103-68-187-186.ngrok-free.app/audit/uploadAuditeeNcform",
                data
            );
            console.log('96', result)
            notifySuccess("Successfully Uploaded")

        }catch(err){
            notifyError("Couldn't send links");
        }
    };
    const handleClose = async (e) =>{
        history.push("/");
      };


      return (
        <>
       
            <ALayout>
   
            <Box sx={{ ...style , marginTop:20 }}> 
          
          {/* <span style={{ float: "right", cursor: "pointer" }} onClick={handleClose}>X</span> */}
          <div className="table" >
            <div className="row_1">
                <div className="downloadNC">
                        <div style={{marginRight:'63%'}}><label>Download NC form</label></div>
                    
                        <div className="input1"><button 
                            className="btn-nc"
                            onClick={() => {
                                }}>Download </button>
                        </div>
                </div>

                       
                <div className="upload-1">
                        <h6 style={{marginRight:'2%'}}>Add NC file</h6>
                        <input type="file" onChange={handleFileChange} multiple/>
                        <button className="btn-1"  onClick={handleUpload}>Upload</button>
                </div>
                       
                
                </div>
            

      
                <div className="row_2">
                   
                    <div className="button">   
                            <button className="btn-2" onClick={PostLinks
                            }>Submit</button>
                    </div> 
                </div>
           </div>
        
         </Box>
       
        </ALayout>
        </>
      );
    };
  
  export default UploadAuditeeNC_Aud