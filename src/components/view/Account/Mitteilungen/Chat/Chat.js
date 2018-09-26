import React, {Component} from 'react';
import firebase from 'firebase'
import moment from 'moment'
import ChatContainer from './ChatContainer'
import {Redirect} from 'react-router-dom'
import { connect } from 'react-redux'

const mapStateToProps = state => ({
  authState: state.authState.items
})

class Chat extends Component{
  constructor(props){
    super(props)
    this.getChats = this.getChats.bind(this)
    this.getChatData= this.getChatData.bind(this)
    this.state ={
      authenticated: false,
      controll: true,
      loaded:false,
      data: false,
      messages: [],
      chatMessages:[],
      showMessages: false,
      showInbox: false,
    }
}

componentDidMount(){
    this.getChats()
  }

getChats(){
  firebase.database().ref().child('app/').child('messages').orderByChild('receiverUid').equalTo(this.props.authState.uid)
  .once('child_added', snap=>{

    if(snap.val()){
         const message = {
         receiver: snap.val().receiver,
         senderUid: snap.val().senderUid,
         uid: this.props.authState.uid,
         read: snap.val().read,
         SenderName:snap.val().sender,
         time: snap.val().time,
         date: snap.val().date,
         message: snap.val().message,
         key: snap.key,
       }

     this.setState(prevState =>({messages: [message, ...prevState.messages], loaded: true,showMessages:true}))

 }else{
   console.log('snap ist null');
 }
})
firebase.database().ref().child('app/').child('messages').orderByChild('senderUid').equalTo(this.props.authState.uid)
.once('child_added', snap=>{

if(snap.val()){
     const message = {
     receiver: snap.val().receiver,
     senderUid: snap.val().senderUid,
     uid: this.props.authState.uid,
     read: snap.val().read,
     SenderName:snap.val().sender,
     time: snap.val().time,
     date: snap.val().date,
     message: snap.val().message,
     key: snap.key,
   }

 this.setState(prevState =>({messages: [message, ...prevState.messages], loaded: true,showMessages:true}))

}
})

}



getChatData(data){
  let query = data
  let chatMessages = []
  firebase.database().ref().child('app/messages/').child(query).update({
    read:true
  })
  firebase.database().ref().child('app/messages/').child(query).child('message')
    .orderByKey()
    .limitToLast(50)
    .on('child_added', snap=>{
    const message = {
    msg: snap.val().message,
    name: snap.val().sender,
    date: snap.val().date,
    read: snap.val().read,
    time:snap.val().time,
    messages: snap.val().message,
    key: snap.key,};
  this.setState(prevState =>({chatMessages: [message, ...prevState.chatMessages]}))
    })

}

        render(){


          return(
            //chat Übersicht
            <div>
            {this.state.showInbox?(
                <div  className="row">
                  <button type="button" onClick={()=>{this.setState({showInbox:false, data: null,showMessages: true, chatMessages: [], messages: []},this.getChats)}} style={{float:"right", marginRight:"20px", marginBottom:"40px"}} className="btn theme-btn">Nachrichten Anzeigen</button>
                  <ChatContainer data={this.state.data} chatMessages={this.state.chatMessages} uid={this.props.authState.uid} name={this.props.authState.name}/>
                </div>):(null
          )}
{this.state.showMessages?(<div  className="card">
                        <div  className="card-header">

                          <div  className="right-box">

                          </div>

                        </div>
                        <div  className="inbox-message">
                          <ul>

                                  {this.state.messages.map((msg)=>{
                                    let lastMessage= msg.message[Object.keys(msg.message)[Object.keys(msg.message).length - 1]]
                                    let start = lastMessage.date +" "+lastMessage.time
                                    var name;
                                    let hours = moment(start, "DD-MM-YY,hh:mm").fromNow()
                                    if(this.props.name == msg.SenderName ){
                                      name = msg.receiver
                                    }else {
                                      name=msg.SenderName
                                    }
                                    return(
                                    <li style={{cursor: "pointer"}} onClick={()=>{this.setState({data:msg, showInbox:true, showMessages: false},this.getChatData(msg.key))}}>
                                      <a>
                                        <div  className="message-avatar">
                                          <img src="assets/img/img-3.jpg" alt=""/>
                                        </div>
                                        <div  className="message-body">
                                        <span className="pull-right">{hours}</span>

                                          <div  className="message-body-heading">
                                            <h5>{name}{msg.read ? (<span  className="pending">gelesen</span>):<span  className="unread">ungelesen</span>}</h5>
                                          </div>
                                          <p>{lastMessage.message}</p>

                                        </div>
                                      </a>
                                    </li>)
                                  })
                                }
                            {this.state.data?(<p>{this.state.data.SenderName}</p>):(null)}
                          </ul>
                        </div>
                      </div>):(null)}
                      {this.state.loaded?(null):(<h3>Du hast noch keine Nachrichten empfangen</h3>)}

            </div>




            )
        }
    }

export default connect(mapStateToProps, null) (Chat);
