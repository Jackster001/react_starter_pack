import React from 'react';
import '../../components.css';
import { withAuthorization } from '../../Session';
import GroupTable from "../../Tables/groupTable/groupTable";
import * as ROUTES from '../../../constants/routes';
import { Link} from 'react-router-dom';
class Groups extends React.Component {

   render() {
      return (
         <div className="App">
         <div>
            <br/>
             <div className="userTable">
            <center>
               <h1>Group Management</h1>
               <Link to={ROUTES.GROUP_ADD}><button className="addNew">Add New Group</button></Link>
            </center><br/><br/>
               <GroupTable/>
            </div>
         </div>
      </div>
      );
   }
}
const condition = authUser => !!authUser;
export default withAuthorization(condition)(Groups)