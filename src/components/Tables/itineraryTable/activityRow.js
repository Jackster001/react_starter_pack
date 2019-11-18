import React from 'react';
import '../../components.css';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import withAuthorization from '../../Session/withAuthorization';

class ActivityRow extends React.PureComponent{
    constructor(props){
        super(props);
        this.state={
            selected : {}, 
            show:false,
            listShow:false,
            showList: "",
            tourGuides:[],
            leadChaperones:[],
            radioSelected: "",
            targetList:[],
            avaliableTourGuides:[],
            avaliableLeadChaperones:[],
            assignedTourGuide:{},
            assignedLeadChaperone:{}
        }
    }
    render(){
        return(
            <tr>
                <td>
                    {this.props.time} 
                </td>
                <td>      
                    {this.props.activity}          
                </td>
            </tr>
        )
    }
}

const mapStateToProps = state => ({
});
const condition = authUser => !!authUser;
export default compose(
    connect(
      mapStateToProps,
      {}
    ),withAuthorization(condition)
)(ActivityRow);