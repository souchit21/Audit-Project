
//Login Page

import { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { notifyError } from "../../utils/notifyToasts";
import {} from "react-toastify";
import axios from 'axios';
import { createTheme, TextField, ThemeProvider } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { doesPropertyExist } from "../../utils/doesPropertyExist";
// import amico from "../../assets/amico.svg";
import amico from "../../assets/menon-menon-01.jpg";
import "./Login.css";
// require('dotenv').config();
// require('dotenv').config();
// const abc = process.env.REACT_APP_api_url;
// console.log("15",abc)

const theme = createTheme({
  palette: {
    primary: {
      main: "#82869A",
    },
  },
});

const useStyles = makeStyles({
  root: {
    fontFamily: "DM Sans",
  },
  textField: {
    width: "100%",
    height: "30%",
    marginBottom: "1.5rem",
    color: "textPrimary",
    
  },
});

const Login = () => {
  const classes = useStyles();
  const history = useHistory();
  const initialState = {
    token: "",
    password: "",
  };
  const [loginData, setLoginData] = useState(initialState);
  const [token, setToken] = useState({
    text: "",
    error: false,
  });
  const [password, setPassword] = useState({
    text: "",
    error: false,
  });


  const handleInputChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };


  const login = async (e) => {
    e.preventDefault();

   

    setToken({ ...token, error: false });
    setPassword({ ...password, error: false });
    

    try {
      let url = 'https://b4e2-103-68-187-186.ngrok-free.app/user/login';    //api for login 
       let data=await axios.post(url, {
        token:loginData.token,
        password:loginData.password,
      });
       console.log('165',data);
      if(data){
        console.log('151',data)
        // const data = await res.json();
        if (data.data.status === "success") {
          
          const userData = {
            username: data.data.loggedInuser.username,
            token: data.data.loggedInuser.token,
            dept: data.data.loggedInuser.department,
            accesstoken: data.data.accessToken,
            profile_id: data.data.loggedInuser._id
            // pic: doesPropertyExist("pic", data.profile) ? data.profile.pic : null,
            // savedProjects: temp,
          };
          console.log('107', userData)
          localStorage.setItem("user", JSON.stringify(userData));
          console.log('166',data)
          if(data.data.loggedInuser.isAdmin===true) history.push("/");
          else if(data.data.loggedInuser.isAuditor===true || data.data.loggedInuser.isAuditee===true) history.push("/auditortable");
          else{
            notifyError("you are not authourized");
          }
        } else {
          // toggleLoading(type, false);
          notifyError(data.message);
        }
      }
 
    } catch (err) {
      // toggleLoading(type, false);
      notifyError("wrong Credentials");
    }
  };

  return (
  
    <ThemeProvider theme={theme} >
        <link rel="stylesheet" href="https://fontawesome.com/icons/user?f=classic&s=solid&pc=%23eaa353" />
      

      <div className={`signin-wrapper ${classes.root}`} >
        {/* <div className="left-signin-part">
          <img src={amico} alt="" style={{ width: "100%", height: "100%" }} />
        </div> */}
        <div className="right-signin-part">
          <div className="signin-heading"><h3>Login</h3></div>
          <div className="signin-subheading">Welcome to <span style={{color:"red"}}>Audit Portal!</span></div>
          <form className="signin-form" onSubmit={(e) => login(e)}>
            <div className="tokenField">
      
            <input
              placeholder="Token Number"
              name="token"
              type="text"
              className="field"
              // variant="standard"
              // className={classes.textField}
              required
              // disabled={loginData. || guestLoading}
              value={loginData.number}
              onChange={handleInputChange}
            />
            </div>
            
            <div className="passwordField">
            <input
              placeholder="Password"
              name="password"
              type="password"
              className="field"
              // variant="standard"
              // className={classes.textField}
              required
              // disabled={loginData. }
              value={loginData.password}
              onChange={handleInputChange}
            />
            </div>
            
            <button
              type="submit"
              className="signin-submit-btn"
              
            >
              {/* {!loginData. ? "Sign In" : "Loading..."} */}
              Login
              {/* <i className="logo">::before</i> */}
            </button>
          </form>
          <div className ="alternate" >
            Don't have an account?{" "}
            <Link to="/signup" className="link-to-signup">
              Sign up
            </Link>
            </div>
            {/* <button
              className={`login-test-btn $ {
                loginData. || guestLoading ? "btn-disabled" : ""
              }`}
              onClick={(e) => login(e, true)}
              disabled={loginData.}
            >
              {!guestLoading ? "Login with test credentials" : "Loading..."}
            </button> */}
          </div> 
      
      </div>
    </ThemeProvider>
  );
};

export default Login;
