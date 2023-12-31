

//Audit upload page

import {  useState} from "react";
import ALayout from "../Layout/ALayout";
import axios from "axios";
import { Box } from "@mui/material";
import { notifyError, notifySuccess } from "../../../../utils/notifyToasts";
import { useHistory, useParams } from 'react-router-dom';
const style = {
    position: 'absolute',
    top: '10%',
    left: '30%',
    right: '20%',
    height: '42%',
    // transform: 'translate(-50%, -50%)',
    width: '50% !important',
    bgcolor: 'background.paper',

    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };

const FileUploadModal = () => {
    const {id} = useParams();
    console.log('26', id);
    const history = useHistory();

    const [selectedFile, setSelectedFile] = useState("");
    const [auditDetails, setAuditDetails] = useState({
        id: id,
        Audit_Link:""
    })

    //selecting file
    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
      };
    
      //uploading the audit

      const handleUpload = async(e) => {
        e.preventDefault();
        console.log("39",selectedFile)
        const formData = new FormData();
        formData.append('file', selectedFile);
        //console.log('63', [formData]);
        
        try{
          const response = await axios.post('https://bc6c-103-68-187-186.ngrok-free.app/fileUpload/uploadChecklistAudit',formData);
          console.log('46', response);
          auditDetails.Audit_Link = response.data;
          console.log('48', auditDetails.Audit_Link)
          notifySuccess('File successfully saved')
           //history.push("/auditortable");
        }catch(err){
          notifyError("File couldn't upload");
        }
      };
      //sending audit id and audit link

      const submit = async(e)=>{
        e.preventDefault();
        const result = await axios.post('https://bc6c-103-68-187-186.ngrok-free.app/audit/editAuditform',auditDetails);
        console.log("55",result);
         history.push("/auditeetable")
        notifySuccess('File successfully uploaded')

      };
      const handleClose = async (e) =>{
        // history.push("/posts");
      };
      return (
        <ALayout>
          
        <div className="container">
        <Box sx={{ ...style}}> 
             <div className="upload">
                    <form >
                    <h5 id="parent-modal-title" >Add audit file
                    {/* <span style={{ float: "right", cursor: "pointer" }} onClick={handleClose}>×</span> */}
                    </h5>
                    <div>
                        <input type="file" style={{}} onChange={handleFileChange} />
                        <button className="add-checklist"  onClick={handleUpload}>Upload</button>
                    </div>
                    </form>
              </div>
              <div><button className="submit-btn" type="submit" onClick={submit}>Submit</button></div>
              </Box>
    </div>
  </ALayout>
 );
  };
export default FileUploadModal