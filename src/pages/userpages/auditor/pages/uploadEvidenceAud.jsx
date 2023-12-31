
//NC Evidence upload

import { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import {useHistory, useParams} from 'react-router-dom';
import axios from 'axios';

import MaterialTable from 'material-table-jspdf-fix';
import ALayout from "../Layout/ALayout"; 
import "./uploadEvidenceAud.css"
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
    height:'80%',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };


const UploadEvidenceAud =  ()=>{
    const history = useHistory();

    const {id} = useParams();
    console.log('31', id)

    const [Evidences ,setEvidences] = useState ([]);
    const [selectedFiles, setSelectedFiles] = useState([]);

    //selecting evidences

    const handleFileChange = (event) => {
    setSelectedFiles(event.target.files);
    };

    //uploading evidences

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
                "https://bc6c-103-68-187-186.ngrok-free.app/NcUpload/uploadNcAudit",
                formData
                );
                console.log('95', response);
                setEvidences(response.data);
                console.log('78', Evidences)
                notifySuccess("File Successfully saved")
                
            } catch (err) {
                notifyError("Files couldn't be uploaded");
            }
    };
    
    //sending link of NC evidence and the id of the audit

    const PostLinks = async (e) => {
        e.preventDefault();
        const data = {
            id: id,
            NC_Proof_Link: Evidences
        }
        console.log('90', data);
        try{
            const result = await axios.post(
                "https://bc6c-103-68-187-186.ngrok-free.app/audit/uploadProof",
                data
            );
            console.log('96', result)
            history.push("/auditeetable");
            notifySuccess("Submitted")
        }catch(err){
            notifyError("Couldn't send links");
        }
    };
    const handleClose = async (e) =>{
        history.push("/auditeetable");
      };


      return (
        <>
       
            <ALayout>
   
            <Box sx={{ ...style, width: 900, marginTop:20 }}> 
          <form >
          <span style={{ float: "right", cursor: "pointer" }} onClick={handleClose}>X</span>
          <div className="table" >
            <div className="row_1">
                {/* <div className="downloadNC">
                        <div><label>Download NC form</label></div>
                    
                        <div className="input1"><button 
                            className="btn"
                            onClick={() => {
                                }}>Download </button>
                        </div>
                </div> */}

                       
                <div className="upload1">
                        <h6>Add Evidence</h6>
                        <input type="file" onChange={handleFileChange} multiple/>
                        <button className="btn1"  onClick={handleUpload}>Upload</button>
                </div>
                       
                
                </div>
            

      
                <div className="row_2">
                   
                    <div className="button">   
                            <button className="btn" onClick={PostLinks
                            }>Submit</button>
                    </div> 
                        
                    {/* <div className="button">   
                            <button className="btn" onClick={()=>{
                                  history.push("/")
                            }}>Close</button>
                    </div>  */}
                </div>
           </div>
        </form>
         </Box>
       
        </ALayout>
        </>
      );
    };
  
  export default UploadEvidenceAud