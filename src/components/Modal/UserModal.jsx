import { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import {useHistory, useParams} from 'react-router-dom';
import axios from 'axios';
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import Sidebar from "../../pages/sideBar/sideBar";
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


const UserModal =  ()=>{
    const history = useHistory();
//     const {id} = useParams();
//     const [users , setUser] = useState({
//       categoryName:"",
//       categoryPriority:"",
//       id:""
//   })
//   useEffect(()=>{
//     loadCategory();
//   },[])
//   const {categoryName,categoryPriority} = users;
//   const onInputChnage = (e) =>{
//       setUser({...users,[e.target.name]:e.target.value})
//   }

//   const onSubmit = async(e)=>{
//     console.log("41")
//       // e.preventDefault();
//       // await axios.post('http://localhost:4000/category/editCategory',users)
//       // history.push("/")
//   }

//   const loadCategory = async()=>{
//   let result = await axios.get('http://localhost:4000/category/getCategory?id='+id);
//   setUser(result.data)
// }
const {id} = useParams();
   
const [auditDetails,setAuditDetails] = useState ({
  Audit_Link:"",
  AuditeeAcceptationStatus:"",
  AuditorAcceptationStatus:"",
  AuditorpreferredDate:"",
  Date:"",
  NC_Flag:"",
  Scope:"",
  Shift:"",
  auditMethod:"",
  auditTeam:"",
  auditType:"",
  checklist_Link:"",
  _id:"",
  auditee:[],
  auditeeTokens:[],
  auditorTokens:[],
});
const {Audit_Link, AuditeeAcceptationStatus, AuditorAcceptationStatus, AuditorpreferredDate, Date, NC_Flag, Scope, Shift, auditMethod, auditTeam,
  auditType, checklist_Link, _id, auditee, auditeeTokens, auditorTokens   } = auditDetails;
// const onInputchange = e => {
//     setUser({...users,[e.target.name]: e.target.value})
// };

useEffect (() => {
    loadUser();
},[]);

// const onSubmit = async e =>{
//     e.preventDefault();
//     const result = await axios.post('http://localhost:4000/user/update?id='+id,users)
//     history.push("/users")
//     console.log("77",result.data)
// }

const loadUser = async() =>{
    const result = await axios.get('https://96d0-103-68-187-186.ngrok-free.app/audit/getAuditwithId?id='+id);
    setAuditDetails(result.data.data);
    console.log('90', result.data.data);
    console.log("91", auditDetails)
    console.log("92",id)
}
      return (
        <>
        <Sidebar />
            
        <div>
   
        <Box sx={{ ...style, width: 900, marginTop:20 }}> 
          <form >
          <h2 id="parent-modal-title" style={{marginLeft:"70px"}}>Audit Details</h2>
            <div className="row">
                
                <div className="col-md-8">

                <div className="form-group" style={{marginTop:"10px"}}>
                  <label>Date</label>
                  <input type="text" className="form-control" id="Date" name="Date"  value={Date} />
                </div>

                <div className="form-group">
                    <label>ID</label>
                    <input type="text" className="form-control" id="_id" name="_id"  value={_id} />
                </div>

                </div>

                <div className="form-group">
                    <label>Audit Type</label>
                    <input type="text" className="form-control" id="auditType" name="auditType"  value={auditType} />
                </div>

                <div className="form-group">
                    <label>Scope</label>
                    <input type="text" className="form-control" id="Scope" name="Scope"  value={Scope} />
                </div>

                <div className="form-group">
                    <label>Shift</label>
                    <input type="text" className="form-control" id="Shift" name="Shift"  value={Shift} />
                </div>

                <div className="form-group">
                    <label>Audit Team</label>
                    <input type="text" className="form-control" id="auditTeam" name="auditTeam"  value={auditTeam} />
                </div>

                <div className="form-group">
                    <label>auditee</label>
                    <input type="text" className="form-control" id="auditee" name="auditee"  value={auditee} />
                </div>

                <div className="form-group">
                    <label>auditeeTokens</label>
                    <input type="text" className="form-control" id="auditeeTokens" name="auditeeTokens"  value={auditeeTokens} />
                </div>

                <div className="form-group">
                    <label>auditorTokens</label>
                    <input type="text" className="form-control" id="auditorTokens" name="auditorTokens"  value={auditorTokens} />
                </div>
                <div className="form-group">
                    <label>NC_Flag</label>
                    <input type="text" className="form-control" id="NC_Flag" name="NC_Flag"  value={NC_Flag} />
                </div>
                <div className="form-group">
                    <label>Auditor Acceptation Status</label>
                    <input type="text" className="form-control" id="AuditorAcceptationStatus" name="AuditorAcceptationStatus"  value={AuditorAcceptationStatus} />
                </div>
                <div className="form-group">
                    <label>AuditorAcceptationStatus</label>
                    <input type="text" className="form-control" id="AuditorAcceptationStatus" name="AuditorAcceptationStatus"  value={AuditorAcceptationStatus} />
                </div>
                <div className="form-group">
                    <label>Auditor Preferred Date</label>
                    <input type="text" className="form-control" id="AuditorpreferredDate" name="AuditorpreferredDate"  value={AuditorpreferredDate} />
                </div>
                <button style={{backgroundColor:"rgb(169, 25, 25)", borderRadius:"4px", color:"white", padding:"5px", fontSize:"small", width:"14%", height:"5%", marginLeft:"2%" }} 
                  onClick={() => {
                    if (Audit_Link) {
                      window.open(Audit_Link, '_blank');
                    } else {
                      alert('Audit has not been yet uploaded');
                    }
                  }}
                  
                  >
                    View Audit
                  </button>
                
                
                <div className="col-md-4">
                    <button className="btn btn-primary" style={{marginLeft:"5%"}} onClick={()=>{
                          history.push("/")
                    }}>close</button>
                </div>
            </div>
        </form>
        </Box>
    </div>
        </>
      );
    };
  
  export default UserModal