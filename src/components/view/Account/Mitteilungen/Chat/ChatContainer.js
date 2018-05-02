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
  firebase.database().ref().child('app/messages/').child(this.props.data.key).update({
    read:false
  })
  let name = this.props.name;
  if(this.messageInput.value != ""){
    var Time = moment().format("HH:mm")
    var Date = moment().format("DD-MM-YY")
    let message = this.messageInput.value;
    firebase.database().ref().child('app').child('messages').child(this.props.data.key).child('message')
    .push({
      message: message,
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
              <div  className="row chat_area">
                <ul  className="list-unstyled" id="chat-scroll">
                  {this.props.chatMessages.slice(0).reverse().map((msg)=>{
                    if(msg.name == this.props.name)
                    {return(
                    <li  key={msg.key} className="pull-right col-sm-12 col-md-12  clearfix">
                     <div  className="pull-right chat-body1 clearfix">
                       <p>{msg.name}: {msg.msg}</p>
                       <div  className="chat_time pull-right">{msg.time}</div>
                     </div>
                   </li>)}
                   else{
                     return(
                       <li  key={msg.key} className="pull-left col-sm-12 col-md-12  clearfix">
                        <div  className="pull-left chat-body1 clearfix">
                          <p>{msg.name}: {msg.msg}</p>
                          <div  className="chat_time pull-left">{msg.time}</div>
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
