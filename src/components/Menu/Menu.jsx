import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import ExploreIcon from "@mui/icons-material/Explore";
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import LogoutIcon from "@mui/icons-material/Logout";
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import "./Menu.css";
import { isAuthenticated, getUser } from "../../utils/auth";
import GroupsIcon from '@mui/icons-material/Groups';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupWorkIcon from '@mui/icons-material/GroupWork';


import Logo from '../../assets/favicon.png'
const Menu = () => {
  
  const history = useHistory();
  const userToken = JSON.parse(localStorage.getItem('user'))?.token;
  const username = JSON.parse(localStorage.getItem('user'))?.username;
  const dept = JSON.parse(localStorage.getItem('user'))?.dept;

  console.log('23',userToken);
  console.log('24',username);
  console.log('26',dept);

  return (
    <div className="feed-menu">
      {/* <img
        src={Logo}
        alt=""
        className="logo"
        onClick={() => history.push("/")}
      /> */}
      <p className="logo-text" style={{color:"black"}}>Admin Panel</p>
      <div className="menu-items">
        <div className="items1">
          <div>
          <p style={{marginBottom:".5rem"}}>Welcome! {userToken}, {username}, Dept. - {dept}</p>
          </div>
        </div>
      <Link to="/dashboard" className="menu-item">
        <div className="items">
          <DashboardIcon />
          &nbsp;&nbsp;<span>Dashboard</span>
          </div>
        </Link>
      <Link to="/" className="menu-item">
        <div className="items">
          <DashboardIcon />
          &nbsp;&nbsp;<span>Admin</span>
          </div>
        </Link>
        <Link to="/posts" className="menu-item">
        <div className="items">
          <PersonIcon />
          &nbsp;&nbsp;<span>Auditor</span>
        </div>
        </Link>
        
        <Link to="/orders" className="menu-item">
        <div className="items">
          <PersonIcon />
          &nbsp;&nbsp;<span>Auditee</span>
          </div>
        </Link>
        <Link to="/addnewChecklist" className="menu-item">
        <div className="items">
          <AddIcon />
          &nbsp;&nbsp;<span>Add new checklist</span>
          </div>
        </Link>
        <Link to="/user/verification" className="menu-item">
        <div className="items">
        <VerifiedUserIcon/>
          &nbsp;&nbsp;<span>Verify new users</span>
          </div>
        </Link>
        
        {/* <Link to="/posts" className="menu-item">
          <ExploreIcon />
          &nbsp;&nbsp;<span>Posts</span>
        </Link>
        <Link to="/explore" className="menu-item">
          <ExploreIcon />
          &nbsp;&nbsp;<span>Category</span>
        </Link>
        <Link to="/Orders" className="menu-item">
          <Diversity3Icon />
          &nbsp;&nbsp;<span>Order Details</span>
        </Link> */}
        
        {isAuthenticated() && (
          <>
            {/* <Link to={`/profile/${getUser().username}`} className="menu-item">
              <PersonIcon />
              &nbsp;&nbsp;<span>Profile</span>
            </Link> */}
            


            {/* <Link to="/PendingOrder" className="menu-item">
              <GroupWorkIcon />
              &nbsp;&nbsp;<span>Pending Order</span>
            </Link> */}
            <div
              className="items"
              onClick={() => {
                localStorage.removeItem("user");
                if (history.location.pathname === "/") {
                  window.location.reload();
                } else {
                  history.push("/login");
                }
              }}
            >
              <LogoutIcon />
              &nbsp;&nbsp;<span>Logout</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Menu;
