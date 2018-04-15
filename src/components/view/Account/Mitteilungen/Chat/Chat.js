import React, {Component} from 'react';
import firebase from 'firebase'
import moment from 'moment'
import ChatContainer from './ChatContainer'
class Chat extends Component{
  constructor(props){
    super(props)
    this.sendMessage = this.sendMessage.bind(this);
    this.state ={
      authenticated: false,
      controll: true,
      loaded:false,
      messages: [{}],
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
        firebase.database().ref().child('app/users/').child(this.state.uid).child('messages')
        .on('value', snap=>{
          if(snap.val() !== null){
             snap.forEach(childSnapshot => {
               messages.push({
               read: childSnapshot.val().read,
               SenderName:childSnapshot.val().name,
               time: childSnapshot.val().time,
               date: childSnapshot.val().date,
               message: childSnapshot.val().message,
               key: childSnapshot.key,
             })
           })
       this.setState({messages: messages, loaded:true})
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
            let { messages } = this.state
            let keys = Object.keys(messages)

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
                                    return(
                                    <li onClick={()=>{this.setState({data:msg, showInbox:false})}}>
                                      <a>
                                        <div  className="message-avatar">
                                          <img src="assets/img/img-3.jpg" alt=""/>
                                        </div>
                                        <div  className="message-body">
                                          <div  className="message-body-heading">
                                            <h5>{msg.SenderName}{msg.read ? (<span  className="pending">gelesen</span>):<span  className="unread">ungelesen</span>}</h5>
                                            <span>7 hours ago</span>
                                          </div>
                                          <p>Hier ist die Message</p>
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
                      {this.state.showInbox?(null):(<button type="button" onClick={()=>{this.setState({showInbox:true, data: null})}} style={{float:"right", marginRight:"20px", marginBottom:"40px"}} className="btn theme-btn">Nachricht Anzeigen</button>)} 
                        <ChatContainer data={this.state.data}/>
                      </div>
                </div>






                    <div  className="message_write">
                    <textarea  className="form-control" placeholder="type a message"></textarea>
                    <div  className="clearfix"></div>
                    <div  className="chat_bottom"><a href="#"  className="pull-left upload_btn"><i  className="fa fa-cloud-upload" aria-hidden="true"></i>
                    Add Files</a>
                    <a href="#"  className="pull-right btn btn-success">
                    Send</a></div>
                   </div>
                </div>
              </div>

            </div>




            )
        }
    }

export default Chat;
