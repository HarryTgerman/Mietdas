import React,  {Component} from 'react';
import {Redirect} from  'react-router-dom';
import firebase from 'firebase'
class Logout extends Component {

constructor(props){
  super(props)
  this.state={
    redirect: false
  }
}

componentWillMount(){
  firebase.auth().signOut()
  .then((user) => {
    this.setState({
      redirect: true
    })
  })
}

      render(){
          if (this.state.redirect === true) {
            return <Redirect to='/' />
          }else {
            return(
            <div style={{textAlign: "center", position: "absolute", top: "25%", left: "50%"}}>
              <h3>Logging out</h3>
            </div>)
          }
      }
  }

export default Logout;
