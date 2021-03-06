import React, {Component} from 'react';
import firebase from 'firebase';
import {Redirect, NavLink} from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchNavbar } from '../../../actions/navbarAction'


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
import LkwArbeitsbühne from './Components/LkwArbeitsbühne'
import SelbstfahrendeScherenbühne from './Components/SelbstfahrendeScherenbühne'
import Teleskopmastbühne from './Components/Teleskopmastbühne'
import GelenkteleskopArbeitsbühne from './Components/GelenkteleskopArbeitsbühne'
import TeleskopArbeitsbühne from './Components/TeleskopArbeitsbühne'
import AnhängerArbeitsbühne from './Components/AnhängerArbeitsbühne'
import GelenkteleskoparbeitsbühneAufGummiketten from './Components/GelenkteleskoparbeitsbühneAufGummiketten'
import Teleskopstapler from './Components/Teleskopstapler'


import PlacesAutocomplete, { geocodeByAddress ,getLatLng } from 'react-places-autocomplete';

const mapStateToProps = state => ({
  authState: state.authState.items
})

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
  this.props.fetchNavbar(false)
}

componentDidMount(){
    if(this.props.authState.authenticated){
         this.auth.child(this.props.authState.uid)
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

    } else {
      this.setState({
        authenticated: false,
        redirect: true,
      },()=>{
        if (this.state.photoUrl == null){this.setState({showPhotoUrl:false})}else {this.setState({showPhotoUrl:true})}
      }
    )
    }

}
onDrop(imageFiles) {

 this.setState({
     imageFiles: imageFiles,
   })
 }
        render(){
          if(this.state.redirect === true) {
            alert('Du musst dich zuerst Registrieren')
            return  <Redirect to="/"/>
          }
          if(this.state.bankDataRedirect === true) {
            alert('Du musst zuerst deine Bankdaten ergänzen damit die Mieter dir Geld überweisen können \nunter Profil->Bankdaten hinzufügen')
            return  <Redirect to="/benutzeraccount"/>
          }
          if(this.state.accoutDataRedirect === true){
            alert('Du musst deine Daten ergänzen')
            return <Redirect to='/account-erstellen' />
            }

          return(
              <div>
              <title>Mietdas  Baugeräte vermieten</title>
        
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
                          <li role="presentation" className=""><a href="#abbruchhammer" aria-controls="abbruchhammer" role="tab" data-toggle="tab">Abbruchhammer</a></li>
                            <li role="presentation" className=""><a href="#betoninnenruettler" aria-controls="betoninnenruettler" role="tab" data-toggle="tab">Betoninnenrüttler</a></li>
                            <li role="presentation" className=""><a href="#betonglaetter" aria-controls="betonglaetter" role="tab" data-toggle="tab">Betonglätter</a></li>
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
                          <a className="dropdown-toggle" data-toggle="dropdown" href="#">Hebetechnik
                          <span className="caret"></span></a>
                          <ul className="dropdown-menu">
                            <li role="presentation" className=""><a href="#lkwArbeitsbühne" aria-controls="lkwArbeitsbühne" role="tab" data-toggle="tab">LKW-Arbeitsbühne</a></li>
                            <li role="presentation" className=""><a href="#selbstfahrendeScherenbühne" aria-controls="selbstfahrendeScherenbühne" role="tab" data-toggle="tab">Selbstfahrende-Scherenbühne</a></li>
                            <li role="presentation" className=""><a href="#teleskopmastbühne" aria-controls="teleskopmastbühne" role="tab" data-toggle="tab">Teleskopmastbühne</a></li>
                            <li role="presentation" className=""><a href="#gelenkteleskopArbeitsbühne" aria-controls="gelenkteleskopArbeitsbühne" role="tab" data-toggle="tab">Gelenkteleskop-Arbeitsbühne</a></li>
                            <li role="presentation" className=""><a href="#teleskopArbeitsbühne" aria-controls="teleskopArbeitsbühne" role="tab" data-toggle="tab">Teleskop-Arbeitsbühne</a></li>
                            <li role="presentation" className=""><a href="#anhängerArbeitsbühne" aria-controls="anhängerArbeitsbühne" role="tab" data-toggle="tab">Anhänger-Arbeitsbühne</a></li>
                            <li role="presentation" className=""><a href="#gelenkteleskoparbeitsbühneAufGummiketten" aria-controls="gelenkteleskoparbeitsbühneAufGummiketten" role="tab" data-toggle="tab">Gelenkteleskoparbeitsbühne auf Gummiketten</a></li>
                            <li role="presentation" className=""><a href="#teleskopstapler" aria-controls="teleskopstapler" role="tab" data-toggle="tab">Teleskopstapler</a></li>
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
                    <div role="tabpanel" className="tab-pane fade" id="teleskopstapler">
                      <Teleskopstapler user={this.props.authState.uid} address={this.state.address}
                        ort={this.state.ort} telefon={this.state.telefon} email={this.props.authState.email}
                        bundesland={this.state.bundesland} gebiet={this.state.gebiet} vermieter={this.props.authState.authenticated} cords={this.state.cords}/>
                    </div>
                    <div role="tabpanel" className="tab-pane fade" id="gelenkteleskoparbeitsbühneAufGummiketten">
                      <GelenkteleskoparbeitsbühneAufGummiketten user={this.props.authState.uid} address={this.state.address}
                        ort={this.state.ort} telefon={this.state.telefon} email={this.props.authState.email}
                        bundesland={this.state.bundesland} gebiet={this.state.gebiet} vermieter={this.props.authState.authenticated} cords={this.state.cords}/>
                    </div>
                    <div role="tabpanel" className="tab-pane fade" id="anhängerArbeitsbühne">
                      <AnhängerArbeitsbühne user={this.props.authState.uid} address={this.state.address}
                        ort={this.state.ort} telefon={this.state.telefon} email={this.props.authState.email}
                        bundesland={this.state.bundesland} gebiet={this.state.gebiet} vermieter={this.props.authState.authenticated} cords={this.state.cords}/>
                    </div>
                    <div role="tabpanel" className="tab-pane fade" id="teleskopArbeitsbühne">
                      <TeleskopArbeitsbühne user={this.props.authState.uid} address={this.state.address}
                        ort={this.state.ort} telefon={this.state.telefon} email={this.props.authState.email}
                        bundesland={this.state.bundesland} gebiet={this.state.gebiet} vermieter={this.props.authState.authenticated} cords={this.state.cords}/>
                    </div>
                    <div role="tabpanel" className="tab-pane fade" id="gelenkteleskopArbeitsbühne">
                      <GelenkteleskopArbeitsbühne user={this.props.authState.uid} address={this.state.address}
                        ort={this.state.ort} telefon={this.state.telefon} email={this.props.authState.email}
                        bundesland={this.state.bundesland} gebiet={this.state.gebiet} vermieter={this.props.authState.authenticated} cords={this.state.cords}/>
                    </div>
                    <div role="tabpanel" className="tab-pane fade" id="teleskopmastbühne">
                      <Teleskopmastbühne user={this.props.authState.uid} address={this.state.address}
                        ort={this.state.ort} telefon={this.state.telefon} email={this.props.authState.email}
                        bundesland={this.state.bundesland} gebiet={this.state.gebiet} vermieter={this.props.authState.authenticated} cords={this.state.cords}/>
                    </div>
                    <div role="tabpanel" className="tab-pane fade" id="selbstfahrendeScherenbühne">
                      <SelbstfahrendeScherenbühne user={this.props.authState.uid} address={this.state.address}
                        ort={this.state.ort} telefon={this.state.telefon} email={this.props.authState.email}
                        bundesland={this.state.bundesland} gebiet={this.state.gebiet} vermieter={this.props.authState.authenticated} cords={this.state.cords}/>
                    </div>
                    <div role="tabpanel" className="tab-pane fade" id="lkwArbeitsbühne">
                      <LkwArbeitsbühne user={this.props.authState.uid} address={this.state.address}
                        ort={this.state.ort} telefon={this.state.telefon} email={this.props.authState.email}
                        bundesland={this.state.bundesland} gebiet={this.state.gebiet} vermieter={this.props.authState.authenticated} cords={this.state.cords}/>
                    </div>
                    <div role="tabpanel" className="tab-pane fade" id="vibrationswalze">
                      <Vibrationswalze user={this.props.authState.uid} address={this.state.address}
                        ort={this.state.ort} telefon={this.state.telefon} email={this.props.authState.email}
                        bundesland={this.state.bundesland} gebiet={this.state.gebiet} vermieter={this.props.authState.authenticated} cords={this.state.cords}/>
                    </div>
                    <div role="tabpanel" className="tab-pane fade" id="betonmischer">
                      <Betonmischer user={this.props.authState.uid} address={this.state.address}
                        ort={this.state.ort} telefon={this.state.telefon} email={this.props.authState.email}
                        bundesland={this.state.bundesland} gebiet={this.state.gebiet} vermieter={this.props.authState.authenticated} cords={this.state.cords}/>
                    </div>
                    <div role="tabpanel" className="tab-pane fade" id="trennschleifer">
                      <Trennschleifer user={this.props.authState.uid} address={this.state.address}
                        ort={this.state.ort} telefon={this.state.telefon} email={this.props.authState.email}
                        bundesland={this.state.bundesland} gebiet={this.state.gebiet} vermieter={this.props.authState.authenticated} cords={this.state.cords}/>
                    </div>
                    <div role="tabpanel" className="tab-pane fade" id="stromerzeuger">
                      <Stromerzeuger user={this.props.authState.uid} address={this.state.address}
                        ort={this.state.ort} telefon={this.state.telefon} email={this.props.authState.email}
                        bundesland={this.state.bundesland} gebiet={this.state.gebiet} vermieter={this.props.authState.authenticated} cords={this.state.cords}/>
                    </div>
                    <div role="tabpanel" className="tab-pane fade" id="steinsaege">
                      <Steinsaege user={this.props.authState.uid} address={this.state.address}
                        ort={this.state.ort} telefon={this.state.telefon} email={this.props.authState.email}
                        bundesland={this.state.bundesland} gebiet={this.state.gebiet} vermieter={this.props.authState.authenticated} cords={this.state.cords}/>
                    </div>
                    <div role="tabpanel" className="tab-pane fade" id="raddumper">
                      <Raddumper user={this.props.authState.uid} address={this.state.address}
                        ort={this.state.ort} telefon={this.state.telefon} email={this.props.authState.email}
                        bundesland={this.state.bundesland} gebiet={this.state.gebiet} vermieter={this.props.authState.authenticated} cords={this.state.cords}/>
                    </div>
                    <div role="tabpanel" className="tab-pane fade" id="pritschenwagen">
                      <Pritschenwagen user={this.props.authState.uid} address={this.state.address}
                        ort={this.state.ort} telefon={this.state.telefon} email={this.props.authState.email}
                        bundesland={this.state.bundesland} gebiet={this.state.gebiet} vermieter={this.props.authState.authenticated} cords={this.state.cords}/>
                    </div>
                    <div role="tabpanel" className="tab-pane fade" id="materialContainer">
                      <MaterialContainer user={this.props.authState.uid} address={this.state.address}
                        ort={this.state.ort} telefon={this.state.telefon} email={this.props.authState.email}
                        bundesland={this.state.bundesland} gebiet={this.state.gebiet} vermieter={this.props.authState.authenticated} cords={this.state.cords}/>
                    </div>
                    <div role="tabpanel" className="tab-pane fade" id="kompressor">
                      <Kompressor user={this.props.authState.uid} address={this.state.address}
                        ort={this.state.ort} telefon={this.state.telefon} email={this.props.authState.email}
                        bundesland={this.state.bundesland} gebiet={this.state.gebiet} vermieter={this.props.authState.authenticated} cords={this.state.cords}/>
                    </div>
                    <div role="tabpanel" className="tab-pane fade" id="kettendumper">
                      <Kettendumper user={this.props.authState.uid} address={this.state.address}
                        ort={this.state.ort} telefon={this.state.telefon} email={this.props.authState.email}
                        bundesland={this.state.bundesland} gebiet={this.state.gebiet} vermieter={this.props.authState.authenticated} cords={this.state.cords}/>
                    </div>
                    <div role="tabpanel" className="tab-pane fade" id="kernbohrmaschiene">
                      <Kernbohrmaschiene user={this.props.authState.uid} address={this.state.address}
                        ort={this.state.ort} telefon={this.state.telefon} email={this.props.authState.email}
                        bundesland={this.state.bundesland} gebiet={this.state.gebiet} vermieter={this.props.authState.authenticated} cords={this.state.cords}/>
                    </div>
                    <div role="tabpanel" className="tab-pane fade" id="holzhaecksler">
                      <Holzhaecksler user={this.props.authState.uid} address={this.state.address}
                        ort={this.state.ort} telefon={this.state.telefon} email={this.props.authState.email}
                        bundesland={this.state.bundesland} gebiet={this.state.gebiet} vermieter={this.props.authState.authenticated} cords={this.state.cords}/>
                    </div>
                    <div role="tabpanel" className="tab-pane fade" id="grabenwalze">
                      <Grabenwalze user={this.props.authState.uid} address={this.state.address}
                        ort={this.state.ort} telefon={this.state.telefon} email={this.props.authState.email}
                        bundesland={this.state.bundesland} gebiet={this.state.gebiet} vermieter={this.props.authState.authenticated} cords={this.state.cords}/>
                    </div>
                    <div role="tabpanel" className="tab-pane fade" id="fugenschneider">
                      <Fugenschneider user={this.props.authState.uid} address={this.state.address}
                        ort={this.state.ort} telefon={this.state.telefon} email={this.props.authState.email}
                        bundesland={this.state.bundesland} gebiet={this.state.gebiet} vermieter={this.props.authState.authenticated} cords={this.state.cords}/>
                    </div>
                    <div role="tabpanel" className="tab-pane fade" id="erdbohrgeraet">
                      <Erdbohrgeraet user={this.props.authState.uid} address={this.state.address}
                        ort={this.state.ort} telefon={this.state.telefon} email={this.props.authState.email}
                        bundesland={this.state.bundesland} gebiet={this.state.gebiet} vermieter={this.props.authState.authenticated} cords={this.state.cords}/>
                    </div>
                    <div role="tabpanel" className="tab-pane fade" id="abbruchhammer">
                      <Abbruchhammer user={this.props.authState.uid} address={this.state.address}
                        ort={this.state.ort} telefon={this.state.telefon} email={this.props.authState.email}
                        bundesland={this.state.bundesland} gebiet={this.state.gebiet} vermieter={this.props.authState.authenticated} cords={this.state.cords}/>
                    </div>
                    <div role="tabpanel" className="tab-pane fade" id="bohrhammer">
                      <Bohrhammer user={this.props.authState.uid} address={this.state.address}
                        ort={this.state.ort} telefon={this.state.telefon} email={this.props.authState.email}
                        bundesland={this.state.bundesland} gebiet={this.state.gebiet} vermieter={this.props.authState.authenticated} cords={this.state.cords}/>
                    </div>
                    <div role="tabpanel" className="tab-pane fade" id="bodenfraese">
                      <Bodenfraese user={this.props.authState.uid} address={this.state.address}
                        ort={this.state.ort} telefon={this.state.telefon} email={this.props.authState.email}
                        bundesland={this.state.bundesland} gebiet={this.state.gebiet} vermieter={this.props.authState.authenticated} cords={this.state.cords}/>
                    </div>
                    <div role="tabpanel" className="tab-pane fade" id="blocksteinsaege">
                      <Blocksteinsaege user={this.props.authState.uid} address={this.state.address}
                        ort={this.state.ort} telefon={this.state.telefon} email={this.props.authState.email}
                        bundesland={this.state.bundesland} gebiet={this.state.gebiet} vermieter={this.props.authState.authenticated} cords={this.state.cords}/>
                    </div>
                    <div role="tabpanel" className="tab-pane fade" id="betoninnenruettler">
                      <Betoninnenruettler user={this.props.authState.uid} address={this.state.address}
                        ort={this.state.ort} telefon={this.state.telefon} email={this.props.authState.email}
                        bundesland={this.state.bundesland} gebiet={this.state.gebiet} vermieter={this.props.authState.authenticated} cords={this.state.cords}/>
                    </div>
                    <div role="tabpanel" className="tab-pane fade" id="betonglaetter">
                      <Betonglaetter user={this.props.authState.uid} address={this.state.address}
                        ort={this.state.ort} telefon={this.state.telefon} email={this.props.authState.email}
                        bundesland={this.state.bundesland} gebiet={this.state.gebiet} vermieter={this.props.authState.authenticated} cords={this.state.cords}/>
                    </div>
                    <div role="tabpanel" className="tab-pane fade" id="bausteinBandseage">
                      <BausteinBandseage user={this.props.authState.uid} address={this.state.address}
                        ort={this.state.ort} telefon={this.state.telefon} email={this.props.authState.email}
                        bundesland={this.state.bundesland} gebiet={this.state.gebiet} vermieter={this.props.authState.authenticated} cords={this.state.cords}/>
                    </div>
                    <div role="tabpanel" className="tab-pane fade in active" id="minibagger">
                      <Minibagger user={this.props.authState.uid} address={this.state.address}
                        ort={this.state.ort} telefon={this.state.telefon} email={this.props.authState.email}
                        bundesland={this.state.bundesland} gebiet={this.state.gebiet} vermieter={this.props.authState.authenticated} cords={this.state.cords}/>
                    </div>
                    <div role="tabpanel" className="tab-pane fade" id="kompaktbagger">
                      <Kompaktbagger  user={this.props.authState.uid} address={this.state.address}
                        ort={this.state.ort} telefon={this.state.telefon} email={this.props.authState.email}
                        bundesland={this.state.bundesland} gebiet={this.state.gebiet} vermieter={this.props.authState.authenticated} cords={this.state.cords}/>
                    </div>
                    <div role="tabpanel" className="tab-pane fade" id="raupenbagger">
                      <Raupenbagger  user={this.props.authState.uid} address={this.state.address}
                        ort={this.state.ort} telefon={this.state.telefon} email={this.props.authState.email}
                        bundesland={this.state.bundesland} gebiet={this.state.gebiet} vermieter={this.props.authState.authenticated} cords={this.state.cords}/>
                    </div>
                    <div role="tabpanel" className="tab-pane fade" id="mobilbagger">
                      <Mobilbagger  user={this.props.authState.uid} address={this.state.address}
                        ort={this.state.ort} telefon={this.state.telefon} email={this.props.authState.email}
                        bundesland={this.state.bundesland} gebiet={this.state.gebiet} vermieter={this.props.authState.authenticated} cords={this.state.cords}/>
                    </div>

                    <div role="tabpanel" className="tab-pane fade" id="radlader">
                      <Radlader  user={this.props.authState.uid} address={this.state.address}
                        ort={this.state.ort} telefon={this.state.telefon} email={this.props.authState.email}
                        bundesland={this.state.bundesland} gebiet={this.state.gebiet} vermieter={this.props.authState.authenticated} cords={this.state.cords}/>
                    </div>
                    <div role="tabpanel" className="tab-pane fade" id="stampfer">
                      <Stampfer  user={this.props.authState.uid} address={this.state.address}
                        ort={this.state.ort} telefon={this.state.telefon} email={this.props.authState.email}
                        bundesland={this.state.bundesland} gebiet={this.state.gebiet} vermieter={this.props.authState.authenticated} cords={this.state.cords}/>
                    </div>
                    <div role="tabpanel" className="tab-pane fade" id="vibrationsplatte">
                      <Vibrationsplatte  user={this.props.authState.uid} address={this.state.address}
                        ort={this.state.ort} telefon={this.state.telefon} email={this.props.authState.email}
                        bundesland={this.state.bundesland} gebiet={this.state.gebiet} vermieter={this.props.authState.authenticated} cords={this.state.cords}/>
                    </div>
                    <div role="tabpanel" className="tab-pane fade" id="kippanhänger">
                      <Kippanhänger  user={this.props.authState.uid} address={this.state.address}
                        ort={this.state.ort} telefon={this.state.telefon} email={this.props.authState.email}
                        bundesland={this.state.bundesland} gebiet={this.state.gebiet} vermieter={this.props.authState.authenticated} cords={this.state.cords}/>
                    </div>
                    {/*<div role="tabpanel" className="tab-pane fade" id="motorradanhänger">
                      <Motorradanhänger  user={this.props.authState.uid} address={this.state.address}
                        ort={this.state.ort} telefon={this.state.telefon} email={this.props.authState.email}
                        bundesland={this.state.bundesland} gebiet={this.state.gebiet} vermieter={this.props.authState.authenticated} cords={this.state.cords}/>
                    </div>*/}
                    <div role="tabpanel" className="tab-pane fade" id="umzugstransporter">
                      <Umzugstransporter  user={this.props.authState.uid} address={this.state.address}
                        ort={this.state.ort} telefon={this.state.telefon} email={this.props.authState.email}
                        bundesland={this.state.bundesland} gebiet={this.state.gebiet} vermieter={this.props.authState.authenticated} cords={this.state.cords}/>
                    </div>
                    {/*<div role="tabpanel" className="tab-pane fade" id="planenanhänger">
                      <Planenanhänger  user={this.props.authState.uid} address={this.state.address}
                        ort={this.state.ort} telefon={this.state.telefon} email={this.props.authState.email}
                        bundesland={this.state.bundesland} gebiet={this.state.gebiet} vermieter={this.props.authState.authenticated} cords={this.state.cords}/>
                    </div>*/}
                    <div role="tabpanel" className="tab-pane fade" id="autotransportanhänger">
                      <Autotransportanhänger  user={this.props.authState.uid} address={this.state.address}
                        ort={this.state.ort} telefon={this.state.telefon} email={this.props.authState.email}
                        bundesland={this.state.bundesland} gebiet={this.state.gebiet} vermieter={this.props.authState.authenticated} cords={this.state.cords}/>
                    </div>

                    <div role="tabpanel" className="tab-pane fade" id="tieflader">
                      <Tieflader  user={this.props.authState.uid} address={this.state.address}
                        ort={this.state.ort} telefon={this.state.telefon} email={this.props.authState.email}
                        bundesland={this.state.bundesland} gebiet={this.state.gebiet} vermieter={this.props.authState.authenticated} cords={this.state.cords}/>
                    </div>

                    <div role="tabpanel" className="tab-pane fade" id="messages">
                      <Anhänger user={this.props.authState.uid} address={this.state.address}
                        ort={this.state.ort} telefon={this.state.telefon} email={this.props.authState.email}
                        bundesland={this.state.bundesland} gebiet={this.state.gebiet} vermieter={this.props.authState.authenticated} cords={this.state.cords}/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
            )
        }
    }

export default connect(mapStateToProps, { fetchNavbar })(Vermieten);
