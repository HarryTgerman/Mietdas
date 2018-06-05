import React, {Component} from 'react';
import firebase from 'firebase';
import {Redirect, NavLink} from 'react-router-dom';
//import Bagger from './Components/Bagger'
import Minibagger from './Components/Minibagger'
import Kompaktbagger from './Components/Kompaktbagger'
import Raupenbagger from './Components/Raupenbagger'
import Mobilbagger from './Components/Mobilbagger'
import Raddumper from './Components/Raddumper'
import Kettendumper from './Components/Kettendumper'
import Radlader from './Components/Radlader'
import Stampfer from './Components/Stampfer'
import Vibrationsplatte from './Components/Vibrationsplatte'
import Kippanhänger from './Components/Kippanhänger'
import Motorradanhänger from './Components/Motorradanhänger'
import Stromerzeuger from './Components/Stromerzeuger'
import Bodenfraese from './Components/Bodenfraese'
import Holzhaecksler from './Components/Holzhaecksler'
import Kompressor from './Components/Kompressor'
import SteinTischseage from './Components/SteinTischseage'
import BausteinBandseage from './Components/BausteinBandseage'
import Blocksteinsaege from './Components/Blocksteinsaege'
import Fugenschneider from './Components/Fugenschneider'
import Trennschleifer from './Components/Trennschleifer'
import MaterialContainer from './Components/MaterialContainer'
import Pritschenwagen from './Components/Pritschenwagen'
import Umzugstransporter from './Components/Umzugstransporter'
import Planenanhänger from './Components/Planenanhänger'
import Autotransportanhänger from './Components/Autotransportanhänger'
import Betonglaetter from './Components/Betonglaetter'
import Bohrhammer from './Components/Bohrhammer'
import Abbruchhammer from './Components/Abbruchhammer'
import Erdbohrgeraet from './Components/Erdbohrgeraet'
import Kernbohrmaschiene from './Components/Kernbohrmaschiene'
import Tieflader from './Components/Tieflader'
import Anhänger from './Components/Anhänger'
import Grabenwalze from './Components/Grabenwalze'
import Vibrationswalze from './Components/Vibrationswalze'
import Betoninnenruettler from './Components/Betoninnenruettler'
import Steinsaege from './Components/Steinsaege'
import Betonmischer from './Components/Betonmischer'
import Logo from'../../../img/logo.png'

import PlacesAutocomplete, { geocodeByAddress ,getLatLng } from 'react-places-autocomplete';


class Vermieten extends Component{
  constructor(props){
    super(props)
    this.auth = firebase.database().ref('app').child('users');
    this.state = {
       authenticated: false,
       redirect: false,
       accoutDataRedirect: false,
       bankDataRedirect: false,
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
             if(snapshot.val().bankData == undefined){this.setState({bankDataRedirect: true})}
             if(snapshot.val()){var adresse = snapshot.val().adresse;
             var ort = snapshot.val().ort;
             var telefon = snapshot.val().telefon;
             this.setState({
               address : adresse,
               ort : ort,
               telefon: telefon
             },()=>{
             geocodeByAddress(this.state.ort)
            .then(results =>{
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
           })}else{
             this.setState({
               accoutDataRedirect: true
             })
           }
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
          if(this.state.bankDataRedirect === true) {
            alert('Sie müssen zuerst Ihre Bankdataten ergänzen damit wir Ihnen Ihr Geld überweisen können \nunter Profil->Bankdaten hinzufügen')
            return  <Redirect to="/benutzeraccount"/>
          }
          if(this.state.accoutDataRedirect === true){
            alert('Sie müssen Ihre Daten ergänzen')
            return <Redirect to='/account-erstellen' />
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
                        <img src={logo} className="logo logo-display" alt=""/>
                        <img src={logo} className="logo logo-scrolled" alt=""/>
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

                  <div className="navbar navbar-inverse">
                    <div>

                      <ul className="nav nav-tabs">

                        <li className="dropdown" >
                          <a className="dropdown-toggle" data-toggle="dropdown" href="#">Bagger
                          <span className="caret"></span></a>
                          <ul className="dropdown-menu">
                            <li role="presentation" className=""><a href="#minibagger" aria-controls="minibagger" role="tab" data-toggle="tab">Minibagger</a></li>
                            <li role="presentation" className=""><a href="#kompaktbagger" aria-controls="kompaktbagger" role="tab" data-toggle="tab">Kompaktbagger</a></li>
                            <li role="presentation" className=""><a href="#raupenbagger" aria-controls="raupenbagger" role="tab" data-toggle="tab">Raupenbagger</a></li>
                            <li role="presentation" className=""><a href="#mobilbagger" aria-controls="mobilbagger" role="tab" data-toggle="tab">Mobilbagger</a></li>
                          </ul>
                        </li>
                        <li className="dropdown">
                          <a className="dropdown-toggle" data-toggle="dropdown" href="#">Anhänger
                          <span className="caret"></span></a>
                          <ul className="dropdown-menu">
                            <li role="presentation"><a href="#messages" aria-controls="messages" role="tab" data-toggle="tab">Anhänger</a></li>
                            <li role="presentation" className=""><a href="#kippanhänger" aria-controls="kippanhänger" role="tab" data-toggle="tab">Kippanhänger</a></li>
                            {/*<li role="presentation" className=""><a href="#motorradanhänger" aria-controls="motorradanhänger" role="tab" data-toggle="tab">Motorradanhänger</a></li>*/}
                            {/*<li role="presentation" className=""><a href="#planenanhänger" aria-controls="planenanhänger" role="tab" data-toggle="tab">Planenanhänger</a></li>*/}
                            <li role="presentation" className=""><a href="#autotransportanhänger" aria-controls="autotransportanhänger" role="tab" data-toggle="tab">Autotransportanhänger</a></li>
                            <li role="presentation" className=""><a href="#tieflader" aria-controls="tieflader" role="tab" data-toggle="tab">Tieflader</a></li>
                          </ul>
                        </li>
                        <li className="dropdown">
                          <a className="dropdown-toggle" data-toggle="dropdown" href="#">Radlader
                          <span className="caret"></span></a>
                          <ul className="dropdown-menu">
                            <li role="presentation" className=""><a href="#radlader" aria-controls="radlader" role="tab" data-toggle="tab">Radlader</a></li>
                            <li role="presentation" className=""><a href="#kettendumper" aria-controls="kettendumper" role="tab" data-toggle="tab">Kettendumper</a></li>
                            <li role="presentation" className=""><a href="#raddumper" aria-controls="raddumper" role="tab" data-toggle="tab">Raddumper</a></li>
                           </ul>
                        </li>
                        <li className="dropdown">
                          <a className="dropdown-toggle" data-toggle="dropdown" href="#">Baugeräte
                          <span className="caret"></span></a>
                          <ul className="dropdown-menu">
                            <li role="presentation" className=""><a href="#betoninnenruettler" aria-controls="betoninnenruettler" role="tab" data-toggle="tab">Betoninnenrüttler</a></li>
                            <li role="presentation" className=""><a href="#betonglaeter" aria-controls="betonglaeter" role="tab" data-toggle="tab">Betongläter</a></li>
                            <li role="presentation" className=""><a href="#abbruchhammer" aria-controls="abbruchhammer" role="tab" data-toggle="tab">Abbruchhammer</a></li>
                            <li role="presentation" className=""><a href="#betonmischer" aria-controls="betonmischer" role="tab" data-toggle="tab">Betonmischer</a></li>
                            <li role="presentation" className=""><a href="#bohrhammer" aria-controls="bohrhammer" role="tab" data-toggle="tab">Bohrhammer</a></li>
                            <li role="presentation" className=""><a href="#erdbohrgeraet" aria-controls="erdbohrgeraet" role="tab" data-toggle="tab">Erdbohrgerät</a></li>
                            <li role="presentation" className=""><a href="#kernbohrmaschiene" aria-controls="kernbohrmaschiene" role="tab" data-toggle="tab">Kernbohrmaschiene</a></li>
                           </ul>
                        </li>
                        <li className="dropdown">
                          <a className="dropdown-toggle" data-toggle="dropdown" href="#">Verdichtungstechnik
                          <span className="caret"></span></a>
                          <ul className="dropdown-menu">
                            <li role="presentation" className=""><a href="#stampfer" aria-controls="stampfer" role="tab" data-toggle="tab">Stampfer</a></li>
                            <li role="presentation" className=""><a href="#vibrationsplatte" aria-controls="vibrationsplatte" role="tab" data-toggle="tab">Vibrationsplatte</a></li>
                            <li role="presentation" className=""><a href="#vibrationswalze" aria-controls="vibrationswalze" role="tab" data-toggle="tab">Vibrationswalze</a></li>
                            <li role="presentation" className=""><a href="#grabenwalze" aria-controls="grabenwalze" role="tab" data-toggle="tab">Grabenwalze</a></li>
                           </ul>
                        </li>
                        <li className="dropdown">
                          <a className="dropdown-toggle" data-toggle="dropdown" href="#">Gartengeräte
                          <span className="caret"></span></a>
                          <ul className="dropdown-menu">
                            <li role="presentation" className=""><a href="#bodenfraese" aria-controls="bodenfraese" role="tab" data-toggle="tab">Bodenfräse</a></li>
                            <li role="presentation" className=""><a href="#holzhaecksler" aria-controls="holzhaecksler" role="tab" data-toggle="tab">Holzhäcksler</a></li>
                           </ul>
                        </li>
                        <li className="dropdown">
                          <a className="dropdown-toggle" data-toggle="dropdown" href="#">Sägen & Schneider
                          <span className="caret"></span></a>
                          <ul className="dropdown-menu">
                            <li role="presentation" className=""><a href="#fugenschneider" aria-controls="fugenschneider" role="tab" data-toggle="tab">Fugenschneider</a></li>
                            <li role="presentation" className=""><a href="#trennschleifer" aria-controls="trennschleifer" role="tab" data-toggle="tab">Trennschleifer</a></li>
                            <li role="presentation" className=""><a href="#steinsaege" aria-controls="steinsaege" role="tab" data-toggle="tab">Steinsäge</a></li>
                            <li role="presentation" className=""><a href="#bausteinBandseage" aria-controls="bausteinBandseage" role="tab" data-toggle="tab">Baustein-Bandsäge</a></li>
                            <li role="presentation" className=""><a href="#blocksteinsaege" aria-controls="blocksteinsaege" role="tab" data-toggle="tab">Blocksteinsäge</a></li>
                           </ul>
                        </li>
                        <li className="dropdown">
                          <a className="dropdown-toggle" data-toggle="dropdown" href="#">Raumsysteme
                          <span className="caret"></span></a>
                          <ul className="dropdown-menu">
                            <li role="presentation" className=""><a href="#materialContainer" aria-controls="materialContainer" role="tab" data-toggle="tab">Material Container</a></li>
                           </ul>
                        </li>
                        <li className="dropdown">
                          <a className="dropdown-toggle" data-toggle="dropdown" href="#">Fahrzeuge
                          <span className="caret"></span></a>
                          <ul className="dropdown-menu">
                            <li role="presentation" className=""><a href="#umzugstransporter" aria-controls="umzugstransporter" role="tab" data-toggle="tab">Umzugstransporter</a></li>
                            <li role="presentation" className=""><a href="#pritschenwagen" aria-controls="pritschenwagen" role="tab" data-toggle="tab">Pritschenwagen</a></li>
                         </ul>
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* Tab panes */}
                  <div className="tab-content tabs">
                    <div role="tabpanel" className="tab-pane fade" id="vibrationswalze">
                      <Vibrationswalze user={this.state.uid} address={this.state.address}
                        ort={this.state.ort} telefon={this.state.telefon} email={this.state.email}
                        bundesland={this.state.bundesland} gebiet={this.state.gebiet} vermieter={this.state.name} cords={this.state.cords}/>
                    </div>
                    <div role="tabpanel" className="tab-pane fade" id="betonmischer">
                      <Betonmischer user={this.state.uid} address={this.state.address}
                        ort={this.state.ort} telefon={this.state.telefon} email={this.state.email}
                        bundesland={this.state.bundesland} gebiet={this.state.gebiet} vermieter={this.state.name} cords={this.state.cords}/>
                    </div>
                    <div role="tabpanel" className="tab-pane fade" id="trennschleifer">
                      <Trennschleifer user={this.state.uid} address={this.state.address}
                        ort={this.state.ort} telefon={this.state.telefon} email={this.state.email}
                        bundesland={this.state.bundesland} gebiet={this.state.gebiet} vermieter={this.state.name} cords={this.state.cords}/>
                    </div>
                    <div role="tabpanel" className="tab-pane fade" id="stromerzeuger">
                      <Stromerzeuger user={this.state.uid} address={this.state.address}
                        ort={this.state.ort} telefon={this.state.telefon} email={this.state.email}
                        bundesland={this.state.bundesland} gebiet={this.state.gebiet} vermieter={this.state.name} cords={this.state.cords}/>
                    </div>
                    <div role="tabpanel" className="tab-pane fade" id="steinsaege">
                      <Steinsaege user={this.state.uid} address={this.state.address}
                        ort={this.state.ort} telefon={this.state.telefon} email={this.state.email}
                        bundesland={this.state.bundesland} gebiet={this.state.gebiet} vermieter={this.state.name} cords={this.state.cords}/>
                    </div>
                    <div role="tabpanel" className="tab-pane fade" id="raddumper">
                      <Raddumper user={this.state.uid} address={this.state.address}
                        ort={this.state.ort} telefon={this.state.telefon} email={this.state.email}
                        bundesland={this.state.bundesland} gebiet={this.state.gebiet} vermieter={this.state.name} cords={this.state.cords}/>
                    </div>
                    <div role="tabpanel" className="tab-pane fade" id="pritschenwagen">
                      <Pritschenwagen user={this.state.uid} address={this.state.address}
                        ort={this.state.ort} telefon={this.state.telefon} email={this.state.email}
                        bundesland={this.state.bundesland} gebiet={this.state.gebiet} vermieter={this.state.name} cords={this.state.cords}/>
                    </div>
                    <div role="tabpanel" className="tab-pane fade" id="materialContainer">
                      <MaterialContainer user={this.state.uid} address={this.state.address}
                        ort={this.state.ort} telefon={this.state.telefon} email={this.state.email}
                        bundesland={this.state.bundesland} gebiet={this.state.gebiet} vermieter={this.state.name} cords={this.state.cords}/>
                    </div>
                    <div role="tabpanel" className="tab-pane fade" id="kompressor">
                      <Kompressor user={this.state.uid} address={this.state.address}
                        ort={this.state.ort} telefon={this.state.telefon} email={this.state.email}
                        bundesland={this.state.bundesland} gebiet={this.state.gebiet} vermieter={this.state.name} cords={this.state.cords}/>
                    </div>
                    <div role="tabpanel" className="tab-pane fade" id="kettendumper">
                      <Kettendumper user={this.state.uid} address={this.state.address}
                        ort={this.state.ort} telefon={this.state.telefon} email={this.state.email}
                        bundesland={this.state.bundesland} gebiet={this.state.gebiet} vermieter={this.state.name} cords={this.state.cords}/>
                    </div>
                    <div role="tabpanel" className="tab-pane fade" id="kernbohrmaschiene">
                      <Kernbohrmaschiene user={this.state.uid} address={this.state.address}
                        ort={this.state.ort} telefon={this.state.telefon} email={this.state.email}
                        bundesland={this.state.bundesland} gebiet={this.state.gebiet} vermieter={this.state.name} cords={this.state.cords}/>
                    </div>
                    <div role="tabpanel" className="tab-pane fade" id="holzhaecksler">
                      <Holzhaecksler user={this.state.uid} address={this.state.address}
                        ort={this.state.ort} telefon={this.state.telefon} email={this.state.email}
                        bundesland={this.state.bundesland} gebiet={this.state.gebiet} vermieter={this.state.name} cords={this.state.cords}/>
                    </div>
                    <div role="tabpanel" className="tab-pane fade" id="grabenwalze">
                      <Grabenwalze user={this.state.uid} address={this.state.address}
                        ort={this.state.ort} telefon={this.state.telefon} email={this.state.email}
                        bundesland={this.state.bundesland} gebiet={this.state.gebiet} vermieter={this.state.name} cords={this.state.cords}/>
                    </div>
                    <div role="tabpanel" className="tab-pane fade" id="fugenschneider">
                      <Fugenschneider user={this.state.uid} address={this.state.address}
                        ort={this.state.ort} telefon={this.state.telefon} email={this.state.email}
                        bundesland={this.state.bundesland} gebiet={this.state.gebiet} vermieter={this.state.name} cords={this.state.cords}/>
                    </div>
                    <div role="tabpanel" className="tab-pane fade" id="erdbohrgeraet">
                      <Erdbohrgeraet user={this.state.uid} address={this.state.address}
                        ort={this.state.ort} telefon={this.state.telefon} email={this.state.email}
                        bundesland={this.state.bundesland} gebiet={this.state.gebiet} vermieter={this.state.name} cords={this.state.cords}/>
                    </div>
                    <div role="tabpanel" className="tab-pane fade" id="abbruchhammer">
                      <Abbruchhammer user={this.state.uid} address={this.state.address}
                        ort={this.state.ort} telefon={this.state.telefon} email={this.state.email}
                        bundesland={this.state.bundesland} gebiet={this.state.gebiet} vermieter={this.state.name} cords={this.state.cords}/>
                    </div>
                    <div role="tabpanel" className="tab-pane fade" id="bohrhammer">
                      <Bohrhammer user={this.state.uid} address={this.state.address}
                        ort={this.state.ort} telefon={this.state.telefon} email={this.state.email}
                        bundesland={this.state.bundesland} gebiet={this.state.gebiet} vermieter={this.state.name} cords={this.state.cords}/>
                    </div>
                    <div role="tabpanel" className="tab-pane fade" id="bodenfraese">
                      <Bodenfraese user={this.state.uid} address={this.state.address}
                        ort={this.state.ort} telefon={this.state.telefon} email={this.state.email}
                        bundesland={this.state.bundesland} gebiet={this.state.gebiet} vermieter={this.state.name} cords={this.state.cords}/>
                    </div>
                    <div role="tabpanel" className="tab-pane fade" id="blocksteinsaege">
                      <Blocksteinsaege user={this.state.uid} address={this.state.address}
                        ort={this.state.ort} telefon={this.state.telefon} email={this.state.email}
                        bundesland={this.state.bundesland} gebiet={this.state.gebiet} vermieter={this.state.name} cords={this.state.cords}/>
                    </div>
                    <div role="tabpanel" className="tab-pane fade" id="betoninnenruettler">
                      <Betoninnenruettler user={this.state.uid} address={this.state.address}
                        ort={this.state.ort} telefon={this.state.telefon} email={this.state.email}
                        bundesland={this.state.bundesland} gebiet={this.state.gebiet} vermieter={this.state.name} cords={this.state.cords}/>
                    </div>
                    <div role="tabpanel" className="tab-pane fade" id="betonglaeter">
                      <Betonglaetter user={this.state.uid} address={this.state.address}
                        ort={this.state.ort} telefon={this.state.telefon} email={this.state.email}
                        bundesland={this.state.bundesland} gebiet={this.state.gebiet} vermieter={this.state.name} cords={this.state.cords}/>
                    </div>
                    <div role="tabpanel" className="tab-pane fade" id="bausteinBandseage">
                      <BausteinBandseage user={this.state.uid} address={this.state.address}
                        ort={this.state.ort} telefon={this.state.telefon} email={this.state.email}
                        bundesland={this.state.bundesland} gebiet={this.state.gebiet} vermieter={this.state.name} cords={this.state.cords}/>
                    </div>
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
                    {/*<div role="tabpanel" className="tab-pane fade" id="motorradanhänger">
                      <Motorradanhänger  user={this.state.uid} address={this.state.address}
                        ort={this.state.ort} telefon={this.state.telefon} email={this.state.email}
                        bundesland={this.state.bundesland} gebiet={this.state.gebiet} vermieter={this.state.name} cords={this.state.cords}/>
                    </div>*/}
                    <div role="tabpanel" className="tab-pane fade" id="umzugstransporter">
                      <Umzugstransporter  user={this.state.uid} address={this.state.address}
                        ort={this.state.ort} telefon={this.state.telefon} email={this.state.email}
                        bundesland={this.state.bundesland} gebiet={this.state.gebiet} vermieter={this.state.name} cords={this.state.cords}/>
                    </div>
                    {/*<div role="tabpanel" className="tab-pane fade" id="planenanhänger">
                      <Planenanhänger  user={this.state.uid} address={this.state.address}
                        ort={this.state.ort} telefon={this.state.telefon} email={this.state.email}
                        bundesland={this.state.bundesland} gebiet={this.state.gebiet} vermieter={this.state.name} cords={this.state.cords}/>
                    </div>*/}
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
