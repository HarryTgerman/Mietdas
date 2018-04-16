import React, {Component} from 'react';
import firebase from 'firebase';
import moment from 'moment'


class ChatContainer extends Component{
  constructor(props){
    super(props)
    this.sendMessage = this.sendMessage.bind(this);
    this.state={loaded: false}
}



sendMessage(event){
  event.preventDefault()

  let name = this.props.name;
  if(this.messageInput.value != ""){
    var Time = moment().format("HH:MM")
    var Date = moment().format("DD-MM-YY")
    let message = this.messageInput.value;
    firebase.database().ref().child('app').child('users').child(this.props.uid).child('messages').child(this.props.data.key)
    .child('message').push({
      msg: message,
      name: name,
      date: Date,
      time: Time
    })
    .then(()=>{this.messageInput.value = null})
  }
}
        render(){



          return(
              <div>
              {this.props.data?(
            <div>
              <div  className="chat_area">
                <ul  className="list-unstyled" id="chat-scroll">
                  {this.props.chatMessages.map((msg)=>{
                    if(msg.name == this.props.name)
                    {return(
                    <li  className="left clearfix">
                     <div  className="pull-right chat-body1 clearfix">
                       <p>{msg.name}: {msg.msg}</p>
                       <div  className="chat_time pull-right">{msg.time}</div>
                     </div>
                   </li>)}
                   else{
                     return(
                       <li  className="left clearfix">
                        <div  className="pull-left chat-body1 clearfix">
                          <p>{msg.name}: {msg.msg}</p>
                          <div  className="chat_time ">{msg.time}</div>
                        </div>
                      </li>
                     )
                   }
                  })
                }

               </ul>

              </div>
              <form  className="message_write" onSubmit={this.sendMessage}>
                <input  ref={(input) => { this.messageInput = input}} className="form-control" placeholder="schreibe eine Nachricht" />
                <div  className="clearfix"></div>

                <button type="submit" className="pull-right btn btn-success" >Senden</button>
              </form>
             </div>
           ):(null)}
              </div>
            )
        }
    }

export default ChatContainer;
