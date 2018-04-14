import React, {Component} from 'react';
import firebase from 'firebase'
import {NavLink, Redirect} from 'react-router-dom'
import Logo from '../../../../img/logo.png'
import moment from 'moment'

class Chat extends Component{
  constructor(props){
    super(props)
    this.urlData = this.urlData.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.state ={
      authenticated: false,
      controll: true,
      message: [{}],
      loaded:false,
    }
}


urlData(){
firebase.database().ref().child('app/users/').child(this.state.uid).child('messages')
.on('value', snap=>{
  console.log(snap.val());
  this.setState({
    SenderName:snap.val().name,
    time: snap.val().time,
    date: snap.val().date,
  })
})
}
componentWillMount(){
    this.removeAuthListener = firebase.auth().onAuthStateChanged((user)=>{
      const userProfile = firebase.auth().currentUser;
      if(user){
        this.setState({
          authenticated: true,
          name : userProfile.displayName,
          email : userProfile.email,
          uid : userProfile.uid,
        })
        firebase.database().ref().child('app/users/').child(this.state.uid).child('messages')
        .on('value', snap=>{
          console.log(snap.val());
          let name = snap.val().name
           let time =snap.val().time
           let date =snap.val().date;
          this.setState({
            SenderName:name,
            time: time,
            date: date,
          })
        })
      } else {
        this.setState({
          authenticated: false,
        },
        ()=>{
          this.urlData();
          if (this.state.photoUrl == null){this.setState({showPhotoUrl:false})}else {this.setState({showPhotoUrl:true})}}
        )
      }
    })


  }

  sendMessage(event){
    event.preventDefault()
    if(this.messageInput.value != ""){
      var Time = moment().format("HH-MM")
      var Date = moment().format("DD-MM-YY")
    const message = this.messageInput.value;
      firebase.database().ref().child('app').child('users').child(this.state.uid)
      .child(this.state.nameRef).child("nachricht")
      .push({msg: message,
            name: this.state.name,
            date: Date})
      .then(()=>{this.messageInput.value = null})
    }
  }

        render(){
          const message = this.state.message[0]
          const keys = Object.keys(message)

          return(
              <div>

                      <div className="chat">
                      {keys.map((key)=>{
                        const msg = message[key]
                        return(
                          <div className="chatContainer">
                          <p>{this.state.SenderName} {this.state.time} {this.state.date}</p>
                            <a style={{float: "left"}}>{msg.name}</a>
                            <br/>
                            <p>{msg.msg}</p>
                            <span className="time-right">{msg.date}</span>
                            </div>)
                          })
                        }


                        <div className="chatContainer darker">
                          <a style={{float: "right"}}>{this.state.yName}</a>
                          <br/>
                          <p>Hey! Im fine. Thanks for asking!</p>
                          <span className="time-left">11:01</span>
                        </div>

                      </div>
                      <div className="bottomChatt">
                      <form onSubmit={this.sendMessage}>
                        <input ref={(input) => { this.messageInput = input; }} type="text" />
                        <button type="submit">SENDEN</button>
                      </form>
                    </div>

              </div>
            )
        }
    }

export default Chat;
