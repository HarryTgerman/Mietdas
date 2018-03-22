import React, {Component} from 'react';
import firebase from 'firebase';
import {Redirect, NavLink} from 'react-router-dom';
import Bagger from './Bagger'
import PlacesAutocomplete, { geocodeByAddress ,getLatLng } from 'react-places-autocomplete';


class Vermieten extends Component{
  constructor(props){
    super(props)
    this.auth = firebase.database().ref('app').child('users');
    this.state = {
       authenticated: false,
       redirect: false,
    }
}

componentWillMount(){
  firebase.auth().onAuthStateChanged((user)=>{
    const userProfile = firebase.auth().currentUser;


    if(user){
      this.setState(
        {
        authenticated: true,
        name : userProfile.displayName,
        email : userProfile.email,
        uid : userProfile.uid,
      },()=>{
         this.auth.child(this.state.uid)
           .on('value', snapshot => {
             var adresse = snapshot.val().address;
             var ort = snapshot.val().ort;
             var telefon = snapshot.val().telefon;
             var festnetz = snapshot.val().number;

             this.setState({
               address : adresse,
               ort : ort,
               telefon: telefon,
             },()=>{
             geocodeByAddress(this.state.ort)
            .then(results =>{
              console.log(results[0]);
              const res = results[0];
              this.setState({
                bundesland: res.address_components[3].long_name,
                gebiet: res.address_components[1].long_name
              })
            })
            geocodeByAddress(this.state.address)
             .then(results => getLatLng(results[0]))
             .then(latLng =>{
               this.setState({
                   cords: latLng
                 })
               }
             )
           })
         })
      }
    )

    } else {
      this.setState({
        authenticated: false,
        redirect: true,
      },()=>{
        if (this.state.photoUrl == null){this.setState({showPhotoUrl:false})}else {this.setState({showPhotoUrl:true})}
      }
    )
    }
  })

}
onDrop(imageFiles) {

 this.setState({
     imageFiles: imageFiles,
   })
 }
        render(){
          if(this.state.redirect === true) {
            alert
            return  <Redirect to="/"/>
          }
          return(
              <div>
                <div className="wrapper">
                  <div className="container">
                    <div className="navbar navbar-default navbar-fixed navbar-transparent white bootsnav">
                      <div style={{paddingBottom: "0"}}  className="container">
                        <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#navbar-menu">
                          <i className="ti-align-left"></i>
                        </button>

                       {/*Start Header Navigation*/}
                        <div className="navbar-header">
                          <NavLink to="/">
                            <img src="../assets/img/logo.png" className="logo logo-display" alt=""/>
                            <img src="../assets/img/logo.png" className="logo logo-scrolled" alt=""/>
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
                          { this.state.authenticated ?(<li className="no-pd"><NavLink to="/benutzeraccount" className="addlist"><i className="ti-user"></i>{this.state.name}</NavLink></li>)
                          :(<p></p>)
                          }
                          </ul>
                        </div>
                       {/*.navbar-collapse*/}
                  </div>
                </div>
                {/* Tab Style 1 */}
                <div style={{marginTop: "70px"}} className=" col-md-12 col-sm-12">
                  <div className="tab style-2" role="tabpanel">
                    {/* Nav tabs */}
                    <ul className="nav nav-tabs" role="tablist">
                      <li role="presentation" className="active"><a href="#home" aria-controls="home" role="tab" data-toggle="tab">Bagger</a></li>
                      <li role="presentation"><a href="#profile" aria-controls="profile" role="tab" data-toggle="tab">Rüttelplatten</a></li>
                      <li role="presentation"><a href="#messages" aria-controls="messages" role="tab" data-toggle="tab">Anhänger</a></li>
                    </ul>
                    {/* Tab panes */}
                    <div className="tab-content tabs">
                      <div role="tabpanel" className="tab-pane fade in active" id="home">
                        <Bagger user={this.state.uid} address={this.state.address}
                          ort={this.state.ort} telefon={this.state.mobil} email={this.state.email}
                          bundesland={this.state.bundesland} gebiet={this.state.gebiet} vermieter={this.state.name} cords={this.state.cords}/>
                      </div>
                      <div role="tabpanel" className="tab-pane fade" id="profile">
                        <h3>Section 2</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras nec urna aliquam, ornare eros vel, malesuada lorem. Nullam faucibus lorem at eros consectetur lobortis. Maecenas nec nibh congue, placerat sem id, rutrum velit. Phasellus porta enim at facilisis condimentum. Maecenas pharetra dolor vel elit tempor pellentesque sed sed eros. Aenean vitae mauris tincidunt, imperdiet orci semper, rhoncus ligula. Vivamus scelerisque.</p>
                      </div>
                      <div role="tabpanel" className="tab-pane fade" id="messages">
                        <h3>Section 3</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras nec urna aliquam, ornare eros vel, malesuada lorem. Nullam faucibus lorem at eros consectetur lobortis. Maecenas nec nibh congue, placerat sem id, rutrum velit. Phasellus porta enim at facilisis condimentum. Maecenas pharetra dolor vel elit tempor pellentesque sed sed eros. Aenean vitae mauris tincidunt, imperdiet orci semper, rhoncus ligula. Vivamus scelerisque.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
            )
        }
    }

export default Vermieten;
