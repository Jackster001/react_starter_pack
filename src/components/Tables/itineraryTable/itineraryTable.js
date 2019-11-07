import React from 'react';
import '../../components.css';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { withAuthorization } from '../../Session';
import ItineraryRow from "./itineraryRow";
class ItineraryTable extends React.Component {
    constructor(props){
        super(props)
        this.state={
          selectedItinerary: {},
          dailyData:[],
          id: ""
          
        }
        
    }
    componentDidMount(){
      console.log(this.props.itineraries)
    }
    onChangeGroupName (event){
      const selectedGroup = this.props.groups.find(group =>{
        return group.name == event.target.value
      })
      const groupName= selectedGroup.name;
      const groupPin= selectedGroup.pin;
      let selectedItinerary = this.props.itineraries.find(itinerary =>{
        return itinerary.groupName == groupName && itinerary.groupPin == groupPin
      })
      let days= []
      let id=''
      if(selectedItinerary){
        days = selectedItinerary.dailyData.map( day =>{
        let obj=Object.assign({}, day)
        return obj
        })
        id= selectedItinerary.id;
      }
      else{
        let dailyData=[]
        days = dailyData
      }

      console.log(selectedItinerary)
      return this.setState({...this.state, dailyData: days, selectedItinerary: selectedItinerary, id: id})
    }
    render() {
      return (
         <div className="basicTable">
            <div className="filterBox">
                <select id="group_name" name="group_name" onChange={this.onChangeGroupName.bind(this)} required>
                <option disabled selected defaultValue>Group</option>
                    {this.props.groups.map(function(group){
                        return (<option value={group.name}>{group.name}</option>)
                })}
                </select>
            </div>
            <br/><br/>
            <table className="table1 table-dark" border="1" cellSpacing="0">
             <thead className="TableHead">
               <tr>
                <th>Group</th>
                <th>Date</th>
                <th>Schedule</th>
                <th>Edit</th>
               </tr>
             </thead>
            <tbody>
              {this.state.dailyData.map((day, i)=>{
                let timeObject = Object.assign({},day.date);
                console.log(day.activities)
                let date= new Date(timeObject.seconds*1000);
                let timestamp= date.toLocaleDateString('en-US', {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'})
                return <ItineraryRow 
                  index={i}
                  groupName= {this.state.selectedItinerary.groupName}
                  id= {this.state.id}
                  date= {timestamp}
                  activities ={day.activities}
                  length={day.length}
                />
              })}
              </tbody>
            </table>
         </div>
      );
   }
}

const condition = authUser => !!authUser;

const mapStateToProps = state => ({
  groups: state.groupState.groups,
  itineraries: state.itineraryState.itineraries
});
 
export default compose(
   connect(
     mapStateToProps,
     {}
   ),withAuthorization(condition)
)(ItineraryTable);