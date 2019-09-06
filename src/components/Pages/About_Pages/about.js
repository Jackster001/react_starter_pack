import React from 'react';
import '../../components.css';
import { withAuthorization } from '../../Session';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import {getAbout, updateAbout, aboutChanged, aboutReceived} from '../../../Action/aboutAction'
class About extends React.Component {
   constructor(props){
      super(props);
      this.state={
         id:this.props.about.id,
         About: this.props.about.About,
         facebook: this.props.about.facebook,
         twitter: this.props.about.twitter,
         website: this.props.about.website
      }
   }
   componentDidMount(){
      this.props.getAbout();
   }
   componentDidUpdate(){
      if(this.props.aboutGetting){
         this.props.aboutReceived();
         this.setState({About: this.props.about.About,
         facebook: this.props.about.facebook,
         website: this.props.about.website,
         twitter: this.props.about.twitter
      })
      }
      console.log(this.props.aboutChanging)
      if(this.props.aboutChanging){
         this.props.aboutChanged();
         window.location.reload();
      }
   }
   onChangeAbout(event){
      return(
         this.setState({About:event.target.value
      })
   )}
   onChangeAbout(event){
      return(this.setState({About:event.target.value})
   )}
   onChangeWebsite(event){
      return(this.setState({website:event.target.value})
   )}
   onChangeFacebook(event){
      return(this.setState({facebook:event.target.value})
   )}
   onChangeTwitter(event){
      return(this.setState({twitter:event.target.value})
   )}
   editAbout(){
      let about={
         id: this.state.id,
         About: this.state.About,
         website:this.state.website,
         twitter: this.state.twitter,
         facebook: this.state.facebook
      }
      this.props.updateAbout(about)
   }
   render() {
      return (
      <div className="App">
         <div><br/><br/><br/>
            <div className="add_Table_Styles">
            <div className="editFormHeading"><h1>About Us</h1></div>
               <form className="add_form">
                  <div className="formTextField">
                     <label htmlFor="about"><b>About Us: </b></label>
                     <textarea className="addTextArea" name="about" placeholder={this.state.About} onChange={this.onChangeAbout.bind(this)}></textarea><br/><br/>
                  </div>
                  <label htmlFor="website"><b>Website: </b></label>
                  <input type="text" name="website" placeholder={this.state.website} onChange={this.onChangeWebsite.bind(this)}></input>
                  <label htmlFor="website"><b>Facebook: </b></label>
                  <input type="text" name="website" placeholder={this.state.facebook} onChange={this.onChangeFacebook.bind(this)}></input>
                  <label htmlFor="website"><b>Twitter: </b></label>
                  <input type="text" name="website" placeholder={this.state.twitter} onChange={this.onChangeTwitter.bind(this)}></input><br/><br/>
                  <button type="button" className="update_Button" onClick={()=>this.editAbout()}>Update About</button>
               </form>
            </div>
         </div>
      </div>
      );
   }
}

const condition = authUser => !!authUser;

const mapStateToProps = state => ({ 
   about: state.aboutState.about,
   aboutChanging:state.aboutState.aboutChanging,
   aboutGetting: state.aboutState.aboutGetting
});
export default compose(
   connect(
      mapStateToProps,
     {getAbout, updateAbout, aboutChanged, aboutReceived}
   ),withAuthorization(condition)
)(About);