import React from 'react';
import '../../components.css';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { withAuthorization } from '../../Session';
import {editItinerary, itineraryChanged} from '../../../Action/itineraryAction';
class ItineraryEdit extends React.Component{
    constructor(props){
        super(props);
        this.state={
            id:this.props.itineraryHead.id,
            groupName: this.props.itineraryHead.groupName,
            schedule:[...this.props.selectedItinerary.activities],
            date: this.props.selectedItinerary.date
        }
    }
    componentDidMount(){
        let date= new Date(this.state.date.seconds*1000)
        let timestamp= date.toLocaleDateString('en-US', {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'})
        this.setState({date:timestamp})
    }
    render(){
        return(
            <div>
                <br/><br/><br/><br/>
                <div className="add_Table_Styles">
                    <div className="editFormHeading"><h1>Schedule Management</h1></div>
                    <form className="add_form">
                        <label htmlFor="group_name"><b>Group Name: </b></label>
                        <input value={this.state.groupName} readonly disabled/>
                        <label htmlFor="ItineraryDate"><b>Date: </b></label>
                        <input value={this.state.date} readonly disabled></input>
                        <br/><br/>
                        <p><u><b>Schedule</b></u></p>
                        <table>
                            <thead>
                                <th>Time</th>
                                <th>Description</th>
                                <th>Remove</th>
                            </thead>
                            <tbody>
                                {this.state.schedule.map(scheduleItem=>{
                                    return (
                                        <tr>
                                            <td></td>
                                            {scheduleItem.description}
                                            <hr/>
                                        </tr>
                                        
                                    )
                                })}
                            </tbody>
                        </table>
                    </form>
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => ({
    selectedItinerary : state.itineraryState.selectedItinerary,
    itineraryHead: state.itineraryState.itineraryHead
});
const condition = authUser => !!authUser;
export default compose(
    connect(
      mapStateToProps,
      {editItinerary, itineraryChanged}
    ),withAuthorization(condition)
)(ItineraryEdit);