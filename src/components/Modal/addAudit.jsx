//page to add new audit plan


import { useEffect, useState, useRef  } from "react";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import {useHistory, useParams} from 'react-router-dom';
import axios from 'axios';
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import Sidebar from "../../pages/sideBar/sideBar";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
// import { LocalizationProvider } from '@mui/x-date-pickers';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { format } from 'date-fns';
import { notifyError } from "../../utils/notifyToasts";
import { notifySuccess } from "../../utils/notifyToasts";

import "./addAudit.css";
const style = {
    position: 'absolute',
    top: '10%',
    left: '30%',
    right: '20%',
    height: '50%',
    // transform: 'translate(-50%, -50%)',
    width: '50% !important',
    bgcolor: 'background.paper',

    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };

const AddAudit =  ()=>{
   
 

  const history = useHistory();
  // Use the `history` object as needed


 //Uploading new audit plan

  const [selectedFile, setSelectedFile] = useState("");
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  //sending file 
  
  const handleUpload = async(e) => {
    e.preventDefault();
    console.log("156",selectedFile)
    const formData = new FormData();
    formData.append('file', selectedFile);
    //console.log('156', [...formData.entries()]);
    try{
      const file1 = await axios.post('https://af25-103-68-187-186.ngrok-free.app/audit/convertXlsxToJsonAndStorefinal',formData);
      console.log('161', file1)
      history.push("/");
      notifySuccess("Successfully Uploaded")
    }catch (err) {
      // toggleLoading(type, false);
      notifyError("not uploaded");
    }
  };
    
    

  const handleClose = async (e) =>{
    history.push("/");
  };


      return (
        <>
        <Sidebar />
            
        <div>
        <Box sx={{ ...style}}> 
          <form>
          <h3 id="parent-modal-title" style={{justifyContent: "center"}}>Add new audit plan 
          <span style={{ float: "right", cursor: "pointer" }} onClick={handleClose}>×</span>
          </h3>
          <div>
            <input type="file" style={{}} onChange={handleFileChange} />
            <button className="add-audit"  onClick={handleUpload}>Upload</button>
          </div>
          </form>
        </Box>
        
        </div>    
          {/* <div>
          
            <div className="input">
                <label className="labelclass"> 
                Auditor name:
                </label>
                    {/* <input
                        type="text"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={handleSearchTermChange}
                    /> */}
                {/* <input
                    type="text"
                    value={auditor}
                    
                    onChange={() => {}}
                /> */}
                {/* <select value={auditorId} name="auditorId" onChange={handleOptionChange}>
                    <option value="">Select an option</option>
                    {options1.map((option) => (
                    <option key={option._id} value={option._id}>
                        {option.username}
                    </option>
                     
                    ))}
                </select> */}
{/*                 
            </div>
            <div className="input">
                <label className="labelclass">
                Auditee name:
                </label> */}
                {/* </label>
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={handleSearchTermChange}
                    /> */}
                {/* <input
                    type="text"
                    value={auditor}
                    
                    onChange={() => {}}
                /> */}
                {/* <select value={auditeeId} name="auditeeId" onChange={handleOptionChange}>
                    <option value="">Select an option</option>
                    {options2.map((option) => (
                    <option key={option._id} value={option._id}>
                        {option.username}
                    </option>
                     
                    ))}
                </select> 
            </div>
            <div className="input">
                <label className="labelclass">Audit Name</label>
                <input type="text" className="form-control" id="auditName" name="auditName"  value={auditName} onChange={e=>onInputchange(e)}/>
            </div>
            <div className="input">
              <div className="date-start">
                <label className="labelclass"> Start Date</label>
              {/* <FontAwesomeIcon icon={faCalendarAlt} className="date-picker-icon" /> */}
                  {/* <DatePicker 
                    className="date-picker"
                    selected={selectedDate1}
                    onChange={date => handleDate1(date)}
                    dateFormat="dd-MM-yyyy"
                    placeholderText="dd-mm-yyyy"
                  />
              </div>
              <div className="date-end">
                  <label className="labelclass"> End Date</label>
                  {/* <FontAwesomeIcon icon={faCalendarAlt} className="date-picker-icon" /> */}
                  {/* <DatePicker
                    className="date-picker"
                    selected={selectedDate2}
                    onChange={date => handleDate2(date)}
                    dateFormat="dd-MM-yyyy"
                    placeholderText="dd-mm-yyyy"
                  />
              </div>
            </div> */}
           
            {/* <div className="input">
                <label className="labelclass">Audit Start Date</label>
                <input type="date" className="form-control" id="auditStartDate" name="auditStartDate"  value={auditStartDate} onChange={e=>onInputchange(e)}/>
                
                <label className="labelclass">Audit End Date</label>
                <input type="date" className="form-control" id="auditEndDate" name="auditEndDate"  value={auditEndDate} onChange={e=>onInputchange(e)}/>
            </div> */}
            {/* <div className="input">
                <label className="labelclass">Scope</label>
                <input type="text" className="form-control" id="scope" name="scope"  value={scope} onChange={e=>onInputchange(e)}/>
            </div>
            <div className="input">
                <label className="labelclass">Shift</label>
                <input type="number" className="form-control" id="shift" name="shift"  value={shift} onChange={e=>onInputchange(e)}/>
            </div>
            <div className="input">
                <label className="labelclass">Audit Mehod</label>
                <input type="text" className="form-control" id="AuditMethod" name="AuditMethod"  value={AuditMethod} onChange={e=>onInputchange(e)}/>
            </div>
            <div className="input">
                <label className="labelclass">Audit Type</label>
                <select value={auditType} name="auditType" onChange={handleOptionChange}>
                    <option value="">Select an option</option>
                    <option value="System Audit">System Audit</option>
                    <option value="Manufacturing Process Audit">Manufacturing Process Audit</option>
                    <option value="Product Audit">Product Audit</option>
                </select> 
                {/* <input type="text" className="form-control" id="auditType" name="auditType"  value={auditType} onChange={e=>onInputchange(e)}/> */}
            {/* </div>
            <div className="input">
                <label className="labelclass">Audit Criteria</label>
                <input type="text" className="form-control" id="AuditCriteria" name="AuditCriteria"  value={AuditCriteria} onChange={e=>onInputchange(e)}/>
            </div>
            
        </div> 
        <div><button className="add-audit" type="submit" onClick={addaudit}>Add audit</button></div> 
        <br />  */}
       
        </>
      );
    };
  
  export default AddAudit;