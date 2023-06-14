import { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import {useHistory, useParams} from 'react-router-dom';
import axios from 'axios';
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import Sidebar from "../../pages/sideBar/sideBar";
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
   
const [users,setUser] = useState ({
  username:"",
  email:"",
  isAdmin:"",
  isPrivate:"",
  modelNumber:"",
  mobile:"",
  selling:"",
  status:"",
  googleId:"",
  appVersion:""
});
const { username,email,isAdmin,isPrivate,modelNumber,mobile,selling,status,googleId,appVersion} = users;
const onInputchange = e => {
    setUser({...users,[e.target.name]: e.target.value})
};

// useEffect (() => {
//     loadUser();
// },[]);

const onSubmit = async e =>{
    e.preventDefault();
    const result = await axios.post('http://localhost:4000/user/update?id='+id,users)
    history.push("/users")
    console.log("77",result.data)
}

const loadUser = async() =>{
    const result = await axios.get('http://localhost:4000/user/getUser?id='+id);
    setUser(result.data.user);
    console.log(users.Sidebar)
    console.log("84",result)
    console.log("85",id)
   
}
      return (
        <>
        <Sidebar />
            
        <div>
    <form>
        <Box sx={{ ...style, width: 900 }}> 
          <form >
          <h2 id="parent-modal-title" style={{marginLeft:"70px"}}>Edit User</h2>
            <div className="row">
                <div className="col-md-1">
                </div>
                <div className="col-md-8">
                <div className="form-group" style={{marginTop:"120px"}}>
                <label>User Name</label>
                <input type="text" className="form-control" id="username" name="username" placeholder="Enter User Name" value={username} onChange={e=>onInputchange(e)}/>
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input type="text" className="form-control" id="email" name="email" placeholder="Enter Email Id" value={email} onChange={e=>onInputchange(e)}/>
                </div>
                </div>
                <div className="form-group" style={{marginLeft:"90px"}}>
                <label>isAdmin</label>
                <input type="text" className="form-control" id="isAdmin" name="isAdmin" placeholder="Admin status" value={isAdmin} onChange={e=>onInputchange(e)}/>
                </div>

                <div className="form-group" style={{marginLeft:"90px"}}>
                <label>AppVersion</label>
                <input type="text" className="form-control" id="appVersion" name="appVersion" placeholder="App Version" value={appVersion} onChange={e=>onInputchange(e)}/>
                </div>

                <div className="form-group" style={{marginLeft:"90px"}}>
                <label>isPrivate</label>
                <input type="text" className="form-control" id="isPrivate" name="isPrivate" placeholder="Privacy Status" value={isPrivate} onChange={e=>onInputchange(e)}/>
                </div>

                <div className="form-group" style={{marginLeft:"90px"}}>
                <label>Device model</label>
                <input type="text" className="form-control" id="modelNumber" name="modelNumber" placeholder="Device Model" value={modelNumber} onChange={e=>onInputchange(e)}/>
                </div>

                <div className="form-group" style={{marginLeft:"90px"}}>
                <label>Mobile Number</label>
                <input type="text" className="form-control" id="mobile" name="mobile" placeholder="Mobile Number" value={mobile} onChange={e=>onInputchange(e)}/>
                </div>

                <div className="form-group" style={{marginLeft:"90px"}}>
                <label>isSelling</label>
                <input type="text" className="form-control" id="selling" name="selling" placeholder="isSelling" value={selling} onChange={e=>onInputchange(e)}/>
                </div>

                <div className="form-group" style={{marginLeft:"90px"}}>
                <label>Status</label>
                <input type="text" className="form-control" id="status" name="status" placeholder="Status" value={status} onChange={e=>onInputchange(e)}/>
                </div>

                <div className="form-group" style={{marginLeft:"90px"}}>
                <label>GoogleId</label>
                <input type="text" className="form-control" id="googleId" name="googleId" placeholder="GoogleId" value={googleId} onChange={e=>onInputchange(e)}/>
                </div>
                
                <div className="col-md-4"></div>
                <div className="col-md-3"></div>
                
                <div className="col-md-4">
                    <button type="submit" className="btn btn-warning" style={{marginLeft:"74px"}} onClick= {onSubmit}>Update</button>
                    <button className="btn btn-primary" style={{marginLeft:"2px"}} onClick={()=>{
                          history.push("/users")
                    }}>close</button>
                </div>
            </div>
        </form>
        </Box>
      </form>
    </div>
        </>
      );
    };
  
  export default UserModal