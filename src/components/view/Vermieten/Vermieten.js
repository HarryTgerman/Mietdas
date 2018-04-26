import React, {Component} from 'react';
import firebase from 'firebase';
import {Redirect, NavLink} from 'react-router-dom';
//import Bagger from './Bagger'
import Minibagger from './Minibagger'
import Kompaktbagger from './Kompaktbagger'
import Raupenbagger from './Raupenbagger'
import Mobilbagger from './Mobilbagger'
//import Raddumper from './Raddumper'
//import Kettendumper from './Kettendumper'
import Radlader from './Radlader'
import Stampfer from './Stampfer'
import Vibrationsplatte from './Vibrationsplatte'
import Kippanhänger from './Kippanhänger'
import Motorradanhänger from './Motorradanhänger'
//import Stromerzeuger from './Stromerzeuger'
//import Bodenfraese from './Bodenfraese'
//import Holzhaecksler from './Holzhaecksler'
//import Kompressor from './Kompressor'
//import SteinTischseage from './SteinTischseage'
//import BausteinBandseage from './BausteinBandseage'
//import Blocksteinsaege from './Blocksteinsaege'
//import Fugenschneider from './Fugenschneider'
//import Trennschleifer from './Trennschleifer'
//import MaterialContainer from './MaterialContainer'
//import Pritschenwagen from './Pritschenwagen'
import Umzugstransporter from './Umzugstransporter'
import Planenanhänger from './Planenanhänger'
import Autotransportanhänger from './Autotransportanhänger'
//import Betonglaeter from './Betonglaeter'
//import Bohrhammer from './Bohrhammer'
//import Abbruchhammer from './Abbruchhammer'
//import Erdbohrgeraet from './Erdbohrgeraet'
//import Kernbohrmaschiene from './Kernbohrmaschiene'
import Tieflader from './Tieflader'
import Verdichtungstechnik from './Verdichtungstechnik'
import Anhänger from './Anhänger'

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
             console.log(snapshot.val());
             this.setState({
               address : adresse,
               ort : ort,
               telefon: telefon
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
            alert('Sie müssen sich zuerst Registrieren')
            return  <Redirect to="/"/>
          }
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
              <div className="container">
              <div style={{marginTop: "70px"}} className=" col-md-12 col-sm-12">
                <div className="tab style-2" role="tabpanel">
                  {/* Nav tabs */}

                  <div className="nav nav-tabs" role="tablist">
                    <div className="dropdown">
                       <button className="btn btn-default nav " type="button" data-toggle="dropdown">Bagger
                       <span className="caret"></span></button>
                       <ul className="dropdown-menu">
                         <li role="presentation" className=""><a href="#minibagger" aria-controls="minibagger" role="tab" data-toggle="tab">Minibagger</a></li>
                         <li role="presentation" className=""><a href="#kompaktbagger" aria-controls="kompaktbagger" role="tab" data-toggle="tab">Kompaktbagger</a></li>
                         <li role="presentation" className=""><a href="#raupenbagger" aria-controls="raupenbagger" role="tab" data-toggle="tab">Raupenbagger</a></li>
                         <li role="presentation" className=""><a href="#mobilbagger" aria-controls="mobilbagger" role="tab" data-toggle="tab">Mobilbagger</a></li>
                       </ul>
                     </div>

                     <div className="dropdown">
                        <button className="btn btn-default btn btn-default nav" type="button" data-toggle="dropdown">Anhänger
                        <span className="caret"></span></button>
                        <ul className="dropdown-menu">
                          <li role="presentation"><a href="#messages" aria-controls="messages" role="tab" data-toggle="tab">Anhänger</a></li>
                          <li role="presentation" className=""><a href="#kippanhänger" aria-controls="kippanhänger" role="tab" data-toggle="tab">Kippanhänger</a></li>
                          <li role="presentation" className=""><a href="#motorradanhänger" aria-controls="motorradanhänger" role="tab" data-toggle="tab">Motorradanhänger</a></li>
                          <li role="presentation" className=""><a href="#planenanhänger" aria-controls="planenanhänger" role="tab" data-toggle="tab">Planenanhänger</a></li>
                          <li role="presentation" className=""><a href="#autotransportanhänger" aria-controls="autotransportanhänger" role="tab" data-toggle="tab">Autotransportanhänger</a></li>
                          <li role="presentation" className=""><a href="#tieflader" aria-controls="tieflader" role="tab" data-toggle="tab">Tieflader</a></li>
                        </ul>
                      </div>

                      <div className="dropdown">
                         <button className="btn btn-default btn btn-default nav" type="button" data-toggle="dropdown">Baugeräte
                         <span className="caret"></span></button>
                         <ul className="dropdown-menu">
                           <li role="presentation" className=""><a href="#stampfer" aria-controls="stampfer" role="tab" data-toggle="tab">Stampfer</a></li>
                           <li role="presentation" className=""><a href="#vibrationsplatte" aria-controls="vibrationsplatte" role="tab" data-toggle="tab">Vibrationsplatte</a></li>
                           <li role="presentation"><a href="#profile" aria-controls="profile" role="tab" data-toggle="tab">Verdichtungstechnik</a></li>
                         </ul>
                       </div>

                       <div className="dropdown">
                          <button className="btn btn-default btn btn-default nav" type="button" data-toggle="dropdown">Fahrzeuge
                          <span className="caret"></span></button>
                          <ul className="dropdown-menu">
                            <li role="presentation" className=""><a href="#radlader" aria-controls="radlader" role="tab" data-toggle="tab">Radlader</a></li>
                            <li role="presentation" className=""><a href="#umzugstransporter" aria-controls="umzugstransporter" role="tab" data-toggle="tab">Umzugstransporter</a></li>
                          </ul>
                        </div>

                  </div>

                  {/* Tab panes */}
                  <div className="tab-content tabs">
                    <div role="tabpanel" className="tab-pane fade in active" id="minibagger">
                      <Minibagger user={this.state.uid} address={this.state.address}
                        ort={this.state.ort} telefon={this.state.telefon} email={this.state.email}
                        bundesland={this.state.bundesland} gebiet={this.state.gebiet} vermieter={this.state.name} cords={this.state.cords}/>
                    </div>
                    <div role="tabpanel" className="tab-pane fade" id="kompaktbagger">
                      <Kompaktbagger  user={this.state.uid} address={this.state.address}
                        ort={this.state.ort} telefon={this.state.telefon} email={this.state.email}
                        bundesland={this.state.bundesland} gebiet={this.state.gebiet} vermieter={this.state.name} cords={this.state.cords}/>
                    </div>
                    <div role="tabpanel" className="tab-pane fade" id="raupenbagger">
                      <Raupenbagger  user={this.state.uid} address={this.state.address}
                        ort={this.state.ort} telefon={this.state.telefon} email={this.state.email}
                        bundesland={this.state.bundesland} gebiet={this.state.gebiet} vermieter={this.state.name} cords={this.state.cords}/>
                    </div>
                    <div role="tabpanel" className="tab-pane fade" id="mobilbagger">
                      <Mobilbagger  user={this.state.uid} address={this.state.address}
                        ort={this.state.ort} telefon={this.state.telefon} email={this.state.email}
                        bundesland={this.state.bundesland} gebiet={this.state.gebiet} vermieter={this.state.name} cords={this.state.cords}/>
                    </div>

                    <div role="tabpanel" className="tab-pane fade" id="radlader">
                      <Radlader  user={this.state.uid} address={this.state.address}
                        ort={this.state.ort} telefon={this.state.telefon} email={this.state.email}
                        bundesland={this.state.bundesland} gebiet={this.state.gebiet} vermieter={this.state.name} cords={this.state.cords}/>
                    </div>
                    <div role="tabpanel" className="tab-pane fade" id="stampfer">
                      <Stampfer  user={this.state.uid} address={this.state.address}
                        ort={this.state.ort} telefon={this.state.telefon} email={this.state.email}
                        bundesland={this.state.bundesland} gebiet={this.state.gebiet} vermieter={this.state.name} cords={this.state.cords}/>
                    </div>
                    <div role="tabpanel" className="tab-pane fade" id="vibrationsplatte">
                      <Vibrationsplatte  user={this.state.uid} address={this.state.address}
                        ort={this.state.ort} telefon={this.state.telefon} email={this.state.email}
                        bundesland={this.state.bundesland} gebiet={this.state.gebiet} vermieter={this.state.name} cords={this.state.cords}/>
                    </div>
                    <div role="tabpanel" className="tab-pane fade" id="kippanhänger">
                      <Kippanhänger  user={this.state.uid} address={this.state.address}
                        ort={this.state.ort} telefon={this.state.telefon} email={this.state.email}
                        bundesland={this.state.bundesland} gebiet={this.state.gebiet} vermieter={this.state.name} cords={this.state.cords}/>
                    </div>
                    <div role="tabpanel" className="tab-pane fade" id="motorradanhänger">
                      <Motorradanhänger  user={this.state.uid} address={this.state.address}
                        ort={this.state.ort} telefon={this.state.telefon} email={this.state.email}
                        bundesland={this.state.bundesland} gebiet={this.state.gebiet} vermieter={this.state.name} cords={this.state.cords}/>
                    </div>
                    <div role="tabpanel" className="tab-pane fade" id="umzugstransporter">
                      <Umzugstransporter  user={this.state.uid} address={this.state.address}
                        ort={this.state.ort} telefon={this.state.telefon} email={this.state.email}
                        bundesland={this.state.bundesland} gebiet={this.state.gebiet} vermieter={this.state.name} cords={this.state.cords}/>
                    </div>
                    <div role="tabpanel" className="tab-pane fade" id="planenanhänger">
                      <Planenanhänger  user={this.state.uid} address={this.state.address}
                        ort={this.state.ort} telefon={this.state.telefon} email={this.state.email}
                        bundesland={this.state.bundesland} gebiet={this.state.gebiet} vermieter={this.state.name} cords={this.state.cords}/>
                    </div>
                    <div role="tabpanel" className="tab-pane fade" id="autotransportanhänger">
                      <Autotransportanhänger  user={this.state.uid} address={this.state.address}
                        ort={this.state.ort} telefon={this.state.telefon} email={this.state.email}
                        bundesland={this.state.bundesland} gebiet={this.state.gebiet} vermieter={this.state.name} cords={this.state.cords}/>
                    </div>

                    <div role="tabpanel" className="tab-pane fade" id="tieflader">
                      <Tieflader  user={this.state.uid} address={this.state.address}
                        ort={this.state.ort} telefon={this.state.telefon} email={this.state.email}
                        bundesland={this.state.bundesland} gebiet={this.state.gebiet} vermieter={this.state.name} cords={this.state.cords}/>
                    </div>
                    <div role="tabpanel" className="tab-pane fade" id="profile">
                      <Verdichtungstechnik user={this.state.uid} address={this.state.address}
                        ort={this.state.ort} telefon={this.state.telefon} email={this.state.email}
                        bundesland={this.state.bundesland} gebiet={this.state.gebiet} vermieter={this.state.name} cords={this.state.cords}/>
                    </div>
                    <div role="tabpanel" className="tab-pane fade" id="messages">
                      <Anhänger user={this.state.uid} address={this.state.address}
                        ort={this.state.ort} telefon={this.state.telefon} email={this.state.email}
                        bundesland={this.state.bundesland} gebiet={this.state.gebiet} vermieter={this.state.name} cords={this.state.cords}/>
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
