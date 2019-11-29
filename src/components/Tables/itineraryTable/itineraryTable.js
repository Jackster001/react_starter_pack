import React from 'react';
import '../../components.css';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { withAuthorization } from '../../Session';
import ItineraryRow from "./itineraryRow";
import {getItineraries, addItineraryDay, itineraryChanged, selectItinerary} from '../../../Action/itineraryAction';
class ItineraryTable extends React.Component {
    constructor(props){
        super(props)
        this.state={
          selectedItinerary: {},
          dailyData:[],
          id: "",
          date: new Date(),
          dateSelected: false,
          groupSelected: false
        }
    }
    componentDidUpdate(){
      if(this.props.itineraryChanging){
        this.props.itineraryChanged();
        window.location.reload();
      }
    }
    onChangeDate(event){
      let utcDate= new Date(event.target.value)
      utcDate.setMonth(utcDate.getMonth())
      utcDate = new Date(utcDate.getTime() + utcDate.getTimezoneOffset() * 60000)
      this.setState({...this.state,date: utcDate, dateSelected: true})
    }
    onChangeGroupName (event){
      const selectedGroup = this.props.groups.find(group =>{
        return group.name == event.target.value
      })
      const groupName = selectedGroup.name;
      const groupPin = selectedGroup.pin;
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
        let dailyData = []
        days = dailyData
      }
      this.setState({...this.state, dailyData: days, selectedItinerary: selectedItinerary, id: id, groupSelected:true})
    }
    onAddSchedule(){
      if(!this.state.dateSelected || !this.state.groupSelected){
        return alert("Please select group and date")
      }
      let date = this.state.date;
      let month = date.getMonth()+1;
      let day= date.getDate();
      let year =date.getFullYear();
      let setDate=month+"/"+day+"/"+year
      let dailyData= this.state.selectedItinerary.dailyData
      for(let i=0; i < dailyData.length; i++){
        let compareDate= new Date(dailyData[i].date.seconds*1000)
        let compareMonth = compareDate.getMonth()+1;
        let compareDay= compareDate.getDate();
        let compareYear =compareDate.getFullYear();
        let compareSetDate = compareMonth+"/"+compareDay+"/"+compareYear
        if(setDate === compareSetDate){
          return alert("Schedule for date has already been set. Choose a different date!")
        }
      }
      let id = this.state.id
      let arrDailyData=[]
      for(let i=0; i<dailyData.length;i++){
        arrDailyData.push(dailyData[i])
      }     
      for(let i=0; i<dailyData.length;i++){
        if(date-new Date(dailyData[i].date.seconds*1000)<0){
          let day= {
            activities:{},
            date: date,
            length:0
          }
          arrDailyData.splice(i,0,day);
          i=dailyData.length
        }
        if(i==dailyData.length-1){
          let day= {
            activities:{},
            date: date,
            length:0
          }
          arrDailyData.push(day);
        }
      }   
      if(arrDailyData.length<1){
        let day= {
          activities:{},
          date: date,
          length:0
        }
        arrDailyData.push(day)
      }
      this.props.addItineraryDay(arrDailyData, id)
    }
    render() {
      return (
         <div className="basicTable">
            <div className="filterBox">
                <select id="group_name" name="group_name" onChange={this.onChangeGroupName.bind(this)} required>
                <option disabled selected defaultValue>Group</option>
                    {this.props.groups.map(function(group,i){
                        return (<option value={group.name} key={i}>{group.name}</option>)
                })}
                </select>
                <input className="dateInput" type="date" onChange={this.onChangeDate.bind(this)}/>
                <button className="itineraryButton" onClick={()=>this.onAddSchedule()}>Add New Schedule</button>
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
                let date= new Date(timeObject.seconds*1000);
                let timestamp= date.toLocaleDateString('en-US', {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'})
                return <ItineraryRow 
                  index={i}
                  groupName= {this.state.selectedItinerary.groupName}
                  id= {this.state.id}
                  date= {timestamp}
                  scheduleDate={date}
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
  itineraries: state.itineraryState.itineraries,
  itineraryChanging: state.itineraryState.itineraryChanging
});
 
export default compose(
   connect(
     mapStateToProps,
     {getItineraries, addItineraryDay, itineraryChanged}
   ),withAuthorization(condition)
)(ItineraryTable);