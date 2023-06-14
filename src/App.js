import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
import Feed from "./pages/Feed/Feed";
import Profile from "./pages/Profile/Profile";
import SingleProject from "./pages/SingleProject/ProjectWithComments";
import Create from "./pages/Create/Create";
import Edit from "./pages/Edit/Edit";
import ExploreAll from "./pages/ExploreAll/ExploreAll";
import Users from "./pages/Users/Users.jsx";
import Posts from "./pages/Posts/Posts.jsx";
import AuditorTable from "./pages/userpages/auditor/pages/Auditortable";
import AuditeeTable from "./pages/userpages/auditor/pages/Auditeetable";
import  Auditor from "../src/pages/userpages/auditor/auditor";
import  Auditee from "../src/pages/userpages/auditee/auditee";

// import Orders from "./pages/Orders/OrderDetails";
import Order from "./pages/Order/Order.jsx"
import Clients from "./pages/Clients/Clients";
import Saved from "./pages/Saved/Saved";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import ViewAllUsers from "./components/ViewAllUsers/ViewAllUsers";
import EditCategoriesModal from "./components/Modal/EditCategoriesModal";
import UserModal from "./components/Modal/UserModal";
import AddAudit from "./components/Modal/addAudit";                                                           
import EditPostModal from "./components/Modal/EditPostModal";
import AddnewChecklist from "./pages/addnewchecklist/addnewChecklist";
import DisplayPostModal from "./components/Modal/DisplayPostModal";
import DisplayOrderModal from "./components/Modal/DisplayOrderModal";
import DisplayUserModal from "./components/Modal/DisplayUserModal";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { isAuthenticated } from "./utils/auth";

function App() {
  return (
    <Router>
      <ToastContainer />
      
      <Switch>
        <Route path="/signup">
          {isAuthenticated() ? <Redirect to="/" /> : <Signup />}
        </Route>
        <Route path="/login">
          {isAuthenticated() ? <Redirect to="/" /> : <Login />}
        </Route>
        <PrivateRoute path="/profile/:username" component={Profile} />
        <PrivateRoute path="/projects/:id" component={SingleProject} />
        <PrivateRoute path="/create" component={Create} />
        <PrivateRoute path="/edit/:id" component={Edit} />
        <PrivateRoute path="/explore" component={ExploreAll} />
        <PrivateRoute path="/users" component={Users} />
        <PrivateRoute path="/posts" component={Posts} />
        <PrivateRoute path="/auditor" component={Auditor} />
        <PrivateRoute path="/auditortable" component={AuditorTable} />
        <PrivateRoute path="/auditeetable" component={AuditeeTable} />
        <PrivateRoute path="/addnewChecklist" component={AddnewChecklist} />
        {/* <PrivateRoute path="/auditee" component={Auditee} /> */}
  
        {/* <PrivateRoute path="/order" component={Orders} /> */}
        <PrivateRoute path="/Orders" component={Order} />
        <PrivateRoute path="/clients" component={Clients} />
        <PrivateRoute path="/saved" component={Saved} />
        <PrivateRoute exact path="/" component={Feed} />
        <PrivateRoute exact path="/category/edit/:id" component={EditCategoriesModal}/>
        <PrivateRoute exact path="/category/delete/:id" component={EditCategoriesModal}/>
        <PrivateRoute exact path="/user/update/:id" component={UserModal}/>
        <PrivateRoute exact path="/addAudit" component={AddAudit}/>
        <PrivateRoute exact path="/post/update/:id" component={EditPostModal}/>
        <PrivateRoute exact path="/user/display/:id" component={DisplayUserModal}/>
        <PrivateRoute exact path="/post/display/:id" component={DisplayPostModal}/>
        <PrivateRoute exact path="/order/display/:id" component={DisplayOrderModal}/>
        <PrivateRoute path="/active-users" component={ViewAllUsers} />
        <Route path="*">
          <PageNotFound />  
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
