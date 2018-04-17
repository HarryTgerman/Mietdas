import React, {Component} from 'react';
import firebase from 'firebase'
import moment from 'moment'
import ChatContainer from './ChatContainer'
class Chat extends Component{
  constructor(props){
    super(props)
    this.getChatData= this.getChatData.bind(this)
    this.state ={
      authenticated: false,
      controll: true,
      loaded:false,
      messages: [],
      chatMessages:[],
      showInbox: true,
    }
}




componentWillMount(){
    let messages = []
    this.removeAuthListener = firebase.auth().onAuthStateChanged((user)=>{
      const userProfile = firebase.auth().currentUser;
      if(user){
        this.setState({
          authenticated: true,
          name : userProfile.displayName,
          email : userProfile.email,
          uid : userProfile.uid,
        })
        firebase.database().ref().child('app/').child('messages').orderByChild('receiverUid').equalTo(this.state.uid)
        .on('child_added', snap=>{

          if(snap.val() !== null){
               const message = {
               senderUid: snap.val().senderUid,
               uid: this.state.uid,
               read: snap.val().read,
               SenderName:snap.val().name,
               time: snap.val().time,
               date: snap.val().date,
               message: snap.val().message,
               key: snap.key,
             }

           this.setState(prevState =>({messages: [message, ...prevState.messages]}))

       }else{
         console.log('snap ist null');
       }
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
    name: snap.val().name,
    date: snap.val().date,
    read: snap.val().read,
    time:snap.val().time,
    messages: snap.val().message,
    key: snap.key,};
  this.setState(prevState =>({chatMessages: [message, ...prevState.chatMessages]}))
    })

}

        render(){
          var now  = moment().format();
          var then = "02/09/2013 14:20:30";




          return(
            //chat Übersicht
            <div id="wrapper">

                <div id="page-inner">
                   <div  className="row">
                    <div  className="col-md-12">
{this.state.showInbox?(<div  className="card">
                        <div  className="card-header">

                          <div  className="right-box">
                            <div  className="filter-search-box text-right">
                              <input type="search"  className="form-control input-sm" placeholder=""/>
                            </div>
                          </div>
                        </div>
                        <div  className="inbox-message">
                          <ul>

                                  {this.state.messages.map((msg)=>{
                                    let lastMessage= msg.message[Object.keys(msg.message)[Object.keys(msg.message).length - 1]]
                                    return(
                                    <li style={{cursor: "pointer"}} onClick={()=>{this.setState({data:msg, showInbox:false},this.getChatData(msg.key))}}>
                                      <a>
                                        <div  className="message-avatar">
                                          <img src="assets/img/img-3.jpg" alt=""/>
                                        </div>
                                        <div  className="message-body">
                                          <div  className="message-body-heading">
                                            <h5>{msg.SenderName}{msg.read ? (<span  className="pending">gelesen</span>):<span  className="unread">ungelesen</span>}</h5>

                                          </div>
                                          {
                                            ()=>{var then = this.msg.date + " " + this.msg.time
                                            var ms = moment(now,"DD/MM/YYYY HH:mm:ss").diff(moment(then,"DD/MM/YYYY HH:mm:ss"));
                                            var d = moment.duration(ms);
                                            var s = Math.floor(d.asHours()) + moment.utc(ms).format(":mm:ss")
                                              return (<span>{s} Stunden {d} Tage her></span>)}
                                          }
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
                    </div>
                    <div  className="col-md-12 col-sm-12 message_section" id="messageView">
                      <div  className="row">
                      {this.state.showInbox?(null):(
                        <button type="button" onClick={()=>{this.setState({showInbox:true, data: null})}} style={{float:"right", marginRight:"20px", marginBottom:"40px"}} className="btn theme-btn">Nachricht Anzeigen</button>)}
                        <ChatContainer data={this.state.data} chatMessages={this.state.chatMessages} uid={this.state.uid} name={this.state.name}/>
                      </div>
                </div>







                </div>
              </div>

            </div>




            )
        }
    }

export default Chat;
