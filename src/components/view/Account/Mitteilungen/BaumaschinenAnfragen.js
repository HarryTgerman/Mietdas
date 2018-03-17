import React, {Component} from 'react';
import firebase from 'firebase'
import {NavLink, Redirect} from 'react-router-dom'
import Logo from '../../../../img/logo.png'
import moment from 'moment'

class BaumaschinenAnfragen extends Component{
  constructor(props){
    super(props)
    this.urlData = this.urlData.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.state ={
      authenticated: false,
      cards: [],
      anfragen: [{}],
      controll: true,
      message: [{}],
      loaded:false,
    }
}


urlData(){
  const url = this.props.location.pathname;
  const ref = url.split('/');
  const uid = ref[2].slice(4);
  const name = ref[3].slice(5);
  const num = ref[4].slice(4)
  firebase.database().ref().child('app').child('users')
    .child(uid).child('anfragen').child(name+num)
    .once('value', snap => {
    const mietbeginn = snap.val().mietbeginn;
    const mietende = snap.val().mietende
    const umsatz = snap.val().umsatz
    const name = snap.val().name
    const date = snap.val().nachricht.date;
    const yName = snap.val().yName
    const cardHeading = snap.val().cardHeading;
        this.setState ({
          refUid: snap.val().uid,
          nameRef: name+num,
          mietbeginn: mietbeginn,
          mietende: mietende,
          umsatz: umsatz,
          yName: yName,
          cardHeading: cardHeading,
          snap: snap.val(),
        },()=>{
        firebase.database().ref().child('app').child('users').child(this.state.refUid).child("anfragen")
        .child(this.state.nameRef).child("nachricht")
        .on('value', snap =>{
          this.setState({
            message:[snap.val()]
          })
        })
      })
    })
}
componentWillMount(){
  this.urlData();
    this.removeAuthListener = firebase.auth().onAuthStateChanged((user)=>{
      const userProfile = firebase.auth().currentUser;
      if(user){
        this.setState({
          authenticated: true,
          name : userProfile.displayName,
          email : userProfile.email,
          uid : userProfile.uid,
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
    var currentDate = moment().format("HH:MM")
    const message = this.messageInput.value;
      firebase.database().ref().child('app').child('users').child(this.state.snap.uid).child("anfragen")
      .child(this.state.nameRef).child("nachricht")
      .push({msg: message,
            name: this.state.name,
            date: currentDate})
      .then(()=>{this.messageInput.value = null})
    }
  }

        render(){
          const message = this.state.message[0]
          const keys = Object.keys(message)

          return(
              <div>
                <div className="navbar navbar-default navbar-fixed navbar-transparent white bootsnav">
                  <div style={{paddingBottom: "0"}}  className="container">
                    <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#navbar-menu">
                      <i className="ti-align-left"></i>
                    </button>

                     {/*Start Header Navigation*/}
                    <div className="navbar-header">
                      <NavLink to="/">
                        <img src={Logo} className="logo logo-display" alt=""/>
                        <img src={Logo} className="logo logo-scrolled" alt=""/>
                      </NavLink>
                    </div>

                     {/*Collect the nav links, forms, and other content for toggling*/}
                    <div className="collapse navbar-collapse" id="navbar-menu">
                      <ul className="nav navbar-nav navbar-center" data-in="fadeInDown" data-out="fadeOutUp">

                      <li className="dropdown">
                        <NavLink to="/mieten" >Mieten</NavLink>
                      </li>
                      <li className="dropdown">
                        <NavLink to="/vermieten" >Vermieten</NavLink>
                      </li>
                        {this.state.authenticated ?(<li className="dropdown">
                            <NavLink to="/logout" >Logout</NavLink>
                          </li>)
                        :(<li><a  href="javascript:void(0)"  data-toggle="modal" data-target="#signup">Log-In</a></li>)}
                      </ul>
                      <ul className="nav navbar-nav navbar-right" data-in="fadeInDown" data-out="fadeOutUp">
                      { this.state.authenticated ?(<li className="no-pd"><NavLink to="/benutzeraccount" className="addlist">
                      {this.state.showPhotoUrl ? (<img src={this.state.photoUrl} className="avater-img" alt=""/>)
                      :(<i className="ti-user"></i>)}{this.state.name}</NavLink></li>)
                      :(null)
                      }
                      </ul>
                    </div>
                     {/*.navbar-collapse*/}
                  </div>
                </div>
                <div className="clearfix"></div>
                <div style={{marginTop: "50px"}}>
                  <div className="container">
                    <h4 >Anfrage für: {this.state.cardHeading}</h4>
                      <div style={{marginTop: "30px"}}>
                        <div className="row">
                          <div className="col-sm-12 col-md-6 widget-boxed">
                            <div className="col-sm-6 col-md-6">
                              <h4>Zeitraum</h4><strong><i className="fa fa-circle-o" aria-hidden="true"></i>
                                {this.state.mietbeginn} bis {this.state.mietende}</strong>
                            </div>
                            <div className="col-sm-6 col-md-6">
                              <h4 >Umsatz</h4><i className="fa fa-circle-o" aria-hidden="true"></i>
                                <a>{this.state.umsatz}€</a>
                            </div>
                            <div className="col-sm-12 col-md-12">
                              <div className="RideDetails-infoLabel">Mieter</div><i className="fa fa-circle-o" aria-hidden="true"></i>
                                <a>{this.state.name}</a>
                            </div>
                          </div>
                          <div className="col-sm-12 col-md-6 widget-boxed">
                          <div className="RideDetails-infoLabel">Miethistory</div>
                          <div className="DetailsTable">
                          <table className="table">
                            <thead>
                              <tr>
                                <th>#</th>
                                <th>Datum</th>
                                <th>Artikel</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>1</td>
                                <td>12.12.17</td>
                                <td>Bagger 12 t</td>
                              </tr>
                              <tr>
                                <td>2</td>
                                <td>14.12.17</td>
                                <td>Bagger 2t</td>
                              </tr>
                            </tbody>
                            </table>
                          </div>
                          </div>
                        </div>
                      </div>
                      <div className="chat">
                      {keys.map((key)=>{
                        const msg = message[key]
                        return(
                          <div className="chatContainer">
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
                </div>
              </div>
            )
        }
    }

export default BaumaschinenAnfragen;
