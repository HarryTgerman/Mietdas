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
          if(snap.val() !== null){
            console.log('hier der snap', snap.val());
             let name = snap.val().name
             let time =snap.val().time
             let date =snap.val().date;
            this.setState({
              SenderName:name,
              time: time,
              date: date,
            })
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
          const message = this.state.message[0]
          const keys = Object.keys(message)

          return(
            //chat Übersicht
            <div id="wrapper">

              <div id="page-wrapper" >
                 <div class="row bg-title">
                  <div class="">
                    <h4>Nachrichten</h4>
                  </div>
                </div>

                <div id="page-inner">
                   <div class="row">
                    <div class="col-md-12">
                      <div class="card">
                        <div class="card-header">
                          <div class="left-box">
                            <select class="form-control input-sm">
                            <option value="10">10</option>
                            <option value="25">25</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                            </select>
                          </div>
                          <div class="right-box">
                            <div class="filter-search-box text-right">
                              <input type="search" class="form-control input-sm" placeholder=""/>
                            </div>
                          </div>
                        </div>
                        <div class="inbox-message">
                          <ul>
                            <li>
                              <a href="#messageView">
                                <div class="message-avatar">
                                  <img src="assets/img/img-1.jpg" alt=""/>
                                </div>
                                <div class="message-body">
                                  <div class="message-body-heading">
                                    <h5>Harry Trippel <span class="unread">ungelesen</span></h5>
                                    <span>7 hours ago</span>
                                  </div>
                                  <p>Hello, Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolor....</p>
                                </div>
                              </a>
                            </li>

                            <li>
                              <a href="#messageView">
                                <div class="message-avatar">
                                  <img src="assets/img/img-3.jpg" alt=""/>
                                </div>
                                <div class="message-body">
                                  <div class="message-body-heading">
                                    <h5>Herman Mertke <span class="pending">gelesen</span></h5>
                                    <span>7 hours ago</span>
                                  </div>
                                  <p>Hello, Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolor....</p>
                                </div>
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-sm-9 message_section" id="messageView">
                <div class="row">
                  <div class="new_message_head">
                    <div class="pull-left"><button><i class="fa fa-plus-square-o" aria-hidden="true"></i> New Message</button></div>
                    <div class="pull-right">
                       <div class="dropdown">
                        <button class="dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i class="fa fa-cogs" aria-hidden="true"></i>  Setting
                        <span class="caret"></span>
                        </button>
                        <ul class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenu1">
                        <li><a href="#">Action</a></li>
                        <li><a href="#">Profile</a></li>
                        <li><a href="#">Logout</a></li>
                        </ul>
                      </div>
                    </div>
                  </div>


                   <div class="chat_area">
                     <ul class="list-unstyled" id="chat-scroll">
                       <li class="left clearfix">
                        <span class="chat-img1 pull-left">
                        <img src="https://lh6.googleusercontent.com/-y-MY2satK-E/AAAAAAAAAAI/AAAAAAAAAJU/ER_hFddBheQ/photo.jpg" alt="User Avatar" class="img-circle"/>
                        </span>
                        <div class="chat-body1 clearfix">
                          <p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia.</p>
                          <div class="chat_time pull-right">09:40PM</div>
                        </div>
                      </li>
                      <li class="left clearfix">
                         <span class="chat-img1 pull-left">
                         <img src="https://lh6.googleusercontent.com/-y-MY2satK-E/AAAAAAAAAAI/AAAAAAAAAJU/ER_hFddBheQ/photo.jpg" alt="User Avatar" class="img-circle"/>
                         </span>
                         <div class="chat-body1 clearfix">
                          <p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia.</p>
                          <div class="chat_time pull-right">09:40PM</div>
                         </div>
                      </li>
                      <li class="left clearfix">
                         <span class="chat-img1 pull-left">
                         <img src="https://lh6.googleusercontent.com/-y-MY2satK-E/AAAAAAAAAAI/AAAAAAAAAJU/ER_hFddBheQ/photo.jpg" alt="User Avatar" class="img-circle"/>
                         </span>
                         <div class="chat-body1 clearfix">
                          <p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia.</p>
                          <div class="chat_time pull-right">09:40PM</div>
                         </div>
                      </li>
                      <li class="left clearfix admin_chat">
                         <span class="chat-img1 pull-right">
                         <img src="https://lh6.googleusercontent.com/-y-MY2satK-E/AAAAAAAAAAI/AAAAAAAAAJU/ER_hFddBheQ/photo.jpg" alt="User Avatar" class="img-circle"/>
                         </span>
                         <div class="chat-body1 clearfix">
                          <p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia.</p>
                          <div class="chat_time pull-left">09:40PM</div>
                         </div>
                      </li>
                      <li class="left clearfix admin_chat">
                         <span class="chat-img1 pull-right">
                         <img src="https://lh6.googleusercontent.com/-y-MY2satK-E/AAAAAAAAAAI/AAAAAAAAAJU/ER_hFddBheQ/photo.jpg" alt="User Avatar" class="img-circle"/>
                         </span>
                         <div class="chat-body1 clearfix">
                          <p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia.</p>
                          <div class="chat_time pull-left">09:40PM</div>
                         </div>
                      </li>
                    </ul>
                   </div>

                    <div class="message_write">
                    <textarea class="form-control" placeholder="type a message"></textarea>
                    <div class="clearfix"></div>
                    <div class="chat_bottom"><a href="#" class="pull-left upload_btn"><i class="fa fa-cloud-upload" aria-hidden="true"></i>
                    Add Files</a>
                    <a href="#" class="pull-right btn btn-success">
                    Send</a></div>
                   </div>
                </div>
              </div>

            </div>




            )
        }
    }

export default Chat;
