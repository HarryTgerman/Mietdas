import React, {Component} from 'react';



class ChatContainer extends Component{
  constructor(props){
    super(props)

}

        render(){
          return(
              <div>
              {this.props.data?(
              <div  className="chat_area">
                <ul  className="list-unstyled" id="chat-scroll">
                  <li  className="left clearfix">
                   <span  className="chat-img1 pull-left">
                   <img src="https://lh6.googleusercontent.com/-y-MY2satK-E/AAAAAAAAAAI/AAAAAAAAAJU/ER_hFddBheQ/photo.jpg" alt="User Avatar"  className="img-circle"/>
                   </span>
                   <div  className="chat-body1 clearfix">
                     <p>{this.props.data.SenderName}</p>
                     <div  className="chat_time pull-right">09:40PM</div>
                   </div>
                 </li>
                 <li  className="left clearfix">
                    <span  className="chat-img1 pull-left">
                    <img src="https://lh6.googleusercontent.com/-y-MY2satK-E/AAAAAAAAAAI/AAAAAAAAAJU/ER_hFddBheQ/photo.jpg" alt="User Avatar"  className="img-circle"/>
                    </span>
                    <div  className="chat-body1 clearfix">
                     <p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia.</p>
                     <div  className="chat_time pull-right">09:40PM</div>
                    </div>
                 </li>
                 <li  className="left clearfix">
                    <span  className="chat-img1 pull-left">
                    <img src="https://lh6.googleusercontent.com/-y-MY2satK-E/AAAAAAAAAAI/AAAAAAAAAJU/ER_hFddBheQ/photo.jpg" alt="User Avatar"  className="img-circle"/>
                    </span>
                    <div  className="chat-body1 clearfix">
                     <p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia.</p>
                     <div  className="chat_time pull-right">09:40PM</div>
                    </div>
                 </li>
                 <li  className="left clearfix admin_chat">
                    <span  className="chat-img1 pull-right">
                    <img src="https://lh6.googleusercontent.com/-y-MY2satK-E/AAAAAAAAAAI/AAAAAAAAAJU/ER_hFddBheQ/photo.jpg" alt="User Avatar"  className="img-circle"/>
                    </span>
                    <div  className="chat-body1 clearfix">
                     <p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia.</p>
                     <div  className="chat_time pull-left">09:40PM</div>
                    </div>
                 </li>
                 <li  className="left clearfix admin_chat">
                    <span  className="chat-img1 pull-right">
                    <img src="https://lh6.googleusercontent.com/-y-MY2satK-E/AAAAAAAAAAI/AAAAAAAAAJU/ER_hFddBheQ/photo.jpg" alt="User Avatar"  className="img-circle"/>
                    </span>
                    <div  className="chat-body1 clearfix">
                     <p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia.</p>
                     <div  className="chat_time pull-left">09:40PM</div>
                    </div>
                 </li>
               </ul>
              </div>):(null)}
              </div>
            )
        }
    }

export default ChatContainer;
