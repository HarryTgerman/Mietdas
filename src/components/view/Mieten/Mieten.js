import React, {Component} from 'react';
import HomeMap from './Map/HomeMap'
import {AppMap} from './Map/Mapcomponent'
import PlacesAutocomplete, { geocodeByAddress ,getLatLng } from 'react-places-autocomplete';
import Listing from './Listing/Listing'
import firebase from 'firebase'
import Logo from '../../../img/logo.png'
import {NavLink, Redirect,Link} from 'react-router-dom'
import Select from 'react-select';


class Mieten extends Component{
  constructor(props){
    super(props)
    this.Ref = firebase.database().ref().child('app').child('cards');
    this.state = {
      authenticated: false,
      redirect: false,
      registerRedirect:false,
      center: {lat:49.3173858, lng:8.4365679},
      position: {lat:49.3173858, lng:8.4365679},
      address: "",
      gebiet: "",
      cards: [],
      markers : [],
      selectValue:  { value: '', label: 'wähle/tippe Kategorie' },
    };
    this.onChange = (address) => this.setState({ address })
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
          })

        } else {
          this.setState({
            authenticated: false,
          },()=>{if (this.state.photoUrl == null){this.setState({showPhotoUrl:false})}else {this.setState({showPhotoUrl:true})}}
          )
        }
      })
      if(this.props.location.pathname.length > 8){this.handleFormSubmit()}


    }

    handleChange(event) {
       this.setState({cityValue: event.target.value});
     }


    clickLi = (selectValue) => {
   this.setState({ selectValue });
   console.log(`Selected: ${selectValue.label}`);
 }


 handleFormSubmit = () => {
   const url = this.props.location.pathname;
   const ref = url.split('=');
   const strCity = ref[1];
   const city = strCity.replace(/\/type/i, "")
   const type = ref[2]
   this.setState({type:type})
   let whenGeoCode = geocodeByAddress(city)
   .then(results =>{
     getLatLng(results[0])
     .then(latLng =>{
       this.setState({
           center: latLng,
           position: latLng
           })
       })
     .catch(error => console.error('Error', error))
     this.setState({
       gebiet: this.state.address,
       address:   this.state.cityValue,
     })
     const res = results[0]
     let arr =  res.formatted_address.split(",")
     let ort = arr[0]

     console.log(results[0]);
     this.setState({
       ort: ort,
       gebiet: res.address_components[1].long_name,
     })
   })


whenGeoCode.then(() =>{
         let previousCards = this.state.cards
         const previousMarker = this.state.markers;
         let lat = this.state.center.lat - 0.1
         let searchCords = this.state.center.lat + this.state.center.lng;
         firebase.database().ref().child('app').child('cards').child(type).orderByChild('cords/lat').startAt(lat).limitToFirst(100)
          .once('value', snap => {
            console.log("hier die Liste", snap.val());
            snap.forEach(childSnapshot =>{
              previousMarker.push({
               id: childSnapshot.key,
               kategorie: childSnapshot.val().kategorie,
               standOrt: childSnapshot.val().ort,
               cardHeading: childSnapshot.val().cardHeading,
               cardBewertung: childSnapshot.val().bewertung,
               cardImage: childSnapshot.val().imageUrl,
               latitude: childSnapshot.val().cords.lat,
               longitude: childSnapshot.val().cords.lng,
               price: childSnapshot.val().cardPreis,
               key: snap.key,
                })
              previousCards.push ({
                kategorie: childSnapshot.val().kategorie,
                id: childSnapshot.key,
                cardDesc: childSnapshot.val().cardDesc,
                cardPreis: childSnapshot.val().cardPreis,
                cardHeading: childSnapshot.val().cardHeading,
                cardBewertung: childSnapshot.val().bewertung,
                cardImage: childSnapshot.val().imageUrl,
                standOrt: childSnapshot.val().ort,
                gewicht: childSnapshot.val().gewicht,
                snap: childSnapshot.val(),
              })
            })
            previousCards.map(i => {
              i.snap.cords = i.snap.cords.lat + i.snap.cords.lng;
            })
            previousCards = previousCards.sort(function(a, b){
              return Math.abs(searchCords-a.snap.cords) - Math.abs(searchCords-b.previousCards.snap.cords);
           });
            this.setState ({
              kat: this.state.selectValue.label,
              cards: previousCards,
              markers: previousMarker
            })
          })

       })
}

  handleFormSubmit1 = (e) => {
    e.preventDefault();
    if (this.state.selectValue.value == "") {
        const alert = "wählen Sie ein Kategorie aus"
        this.setState({alert: alert, showAlert: true})
        return 0
      }else {this.setState({alert: "", showAlert: false})}

    if(this.state.markers && this.state.cards != null){
    this.setState({
      markers:[],
      cards:[]
    })
  }
  let whenGeoCode = geocodeByAddress(this.state.cityValue)
  .then(results =>{
    getLatLng(results[0])
    .then(latLng =>{
      this.setState({
          center: latLng,
          position: latLng
          })
      })
    .catch(error => console.error('Error', error))
    this.setState({
      gebiet: this.state.address,
      address:   this.state.cityValue,
    })
    const res = results[0]
    let arr =  res.formatted_address.split(",")
    let ort = arr[0]

    console.log(results[0]);
    this.setState({
      ort: ort,
      gebiet: res.address_components[1].long_name,
    })
  })


whenGeoCode.then(() =>{
      let previousCards = this.state.cards
      const previousMarker = this.state.markers;
      let lat = this.state.center.lat - 0.1
      let searchCords = this.state.center.lat + this.state.center.lng;
      firebase.database().ref().child('app').child('cards').child(this.state.selectValue.value).orderByChild('cords/lat').startAt(lat).limitToFirst(100)
       .once('value', snap => {
         snap.forEach(childSnapshot =>{
           previousMarker.push({
             kategorie: childSnapshot.val().kategorie,
             id: childSnapshot.key,
             standOrt: childSnapshot.val().ort,
             cardHeading: childSnapshot.val().cardHeading,
             cardBewertung: childSnapshot.val().bewertung,
             cardImage: childSnapshot.val().imageUrl,
             latitude: childSnapshot.val().cords.lat,
             longitude: childSnapshot.val().cords.lng,
             price: childSnapshot.val().cardPreis,
             key: snap.key,
             })
           previousCards.push ({
             id: childSnapshot.key,
             kategorie: childSnapshot.val().kategorie,
             cardPreis: childSnapshot.val().cardPreis,
             cardHeading: childSnapshot.val().cardHeading,
             cardBewertung: childSnapshot.val().bewertung,
             cardImage: childSnapshot.val().imageUrl,
             standOrt: childSnapshot.val().ort,
             gewicht: childSnapshot.val().gewicht,
             snap: childSnapshot.val(),
           })
         })
         previousCards.map(i => {
           i.snap.cords = i.snap.cords.lat + i.snap.cords.lng;
         })
         previousCards = previousCards.sort(function(a, b){
           return Math.abs(searchCords-a.snap.cords) - Math.abs(searchCords-b.snap.cords);
        });
         this.setState ({
           kat: this.state.selectValue.label,
           cards: previousCards,
           markers: previousMarker
         })
       })
    })

}




      render(){
        if (this.state.redirect === true) {
          return <Redirect to='/benutzeraccount' />
        }else if (this.state.registerRedirect === true) {
          return <Redirect to='/account-erstellen' />
        }
        const { selectedOption } = this.state;
    const value = selectedOption && selectedOption.value

          return(
              <div>
                <div>
                <div className="wrapper">
                    {/* Start Navigation */}
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
                            <NavLink to="/so-geht-mieten">So geht mieten</NavLink>
                          </li>
                          <li className="dropdown">
                            <NavLink to="/mieten" >Mieten</NavLink>
                          </li>
                          <li className="dropdown">
                            <NavLink to="/vermieten" >Vermieten</NavLink>
                          </li>
                            {this.state.authenticated ?(<li className="dropdown">
                                <NavLink to="/logout" >Logout</NavLink>
                              </li>)
                            :(<li><a  href="javascript:void(1)"  data-toggle="modal" data-target="#signup">Log-In</a></li>)}
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
                    {/* End Navigation */}
                    <div className="clearfix">


                    {/* ================ Search listing With Filter Option ======================= */}
                    <div  style={{marginTop: "60px"}}>
                      <div className="container-fluid">
                        <div  className="col-md-8 col-sm-5">

                          {/* Filter Option */}
                          <div className="row">

                            <div s className="col-md-12 col-sm-12 no-padd">
                              <h3>Finde deine Baumaschinen in deiner Umgebung</h3>
                              <p>Suche nach Ort und Kategorie</p>
                            </div>

                            <form className="form-verticle " onSubmit={this.handleFormSubmit1.bind(this)}>
                            {
                              this.state.showAlert ?
                               (<div ref="alert" className="alert alert-danger" role="alert">
                                  <strong>Achtung</strong> {this.state.alert}
                                </div>)
                              :(null)
                            }
                              <div className="row mrg-0">
                                <div className="col-md-5 col-sm-12 col-xs-12 no-padd">
                                  <input type="text" className="form-control left-radius" ref={(input) => { this.cityInput = input}} onChange={this.handleChange.bind(this)} placeholder="Ort..."/>
                                </div>
                                <div  className="col-md-5 col-sm-12 col-xs-12 no-padd" >

                                <Select
                                    className="form-control"
                                    name="form-field-name"
                                    value={value}
                                    onChange={this.clickLi.bind(this)}
                                    placeholder={this.state.selectValue.label}
                                    options={[

                                      { value: '', label: <strong>BAGGER</strong>},
                                      { value: 'minibagger', label: 'Minibagger' },
                                      { value: 'kompaktbagger', label: 'Kompaktbagger' },
                                      { value: 'raupenbagger', label: 'Raupenbagger' },
                                      { value: 'mobilbagger', label: 'Mobilbagger' },
                                      { value: '', label: <strong>RADLADER</strong>},
                                      { value: 'radlader', label: 'Radlader' },
                                      { value: 'kettendumper', label: 'Kettendumper' },
                                      { value: 'raddumper', label: 'Raddumper' },
                                      { value: '', label: <strong>ANHÄNGER :</strong>},
                                      { value: 'anhänger', label: 'Anhänger' },
                                      { value: 'kippanhänger', label: 'Kippanhänger' },
                                      { value: 'planenanhänger', label: 'Planenanhänger' },
                                      { value: 'autotransportanhänger', label: 'Autotransportanhänger' },
                                      { value: 'tieflader', label: 'Tieflader' },
                                      { value: '', label: <strong>BAUGERÄTE :</strong>},
                                      { value: 'abbruchhammer', label: 'Abbruchhammer' },
                                      { value: 'betonglaetter', label: 'Betonglätter' },
                                      { value: 'betoninnenruettler', label: 'Betoninnenrüttler' },
                                      { value: 'betonmischer', label: 'Betonmischer' },
                                      { value: 'bohrhammer', label: 'Bohrhammer' },
                                      { value: 'erdbohrgeraet', label: 'Erdbohrgerät' },
                                      { value: 'kernbohrmaschiene', label: 'Kernbohrmaschiene' },
                                      { value: '', label: <strong>VERDICHTUNGSTECHNIK</strong>},
                                      { value: 'stampfer', label: 'Stampfer' },
                                      { value: 'vibrationsplatte', label: 'Vibrationsplatte' },
                                      { value: 'grabenwalze', label: 'Grabenwalze' },
                                      { value: 'vibrationswalze', label: 'Vibrationswalze' },
                                      { value: '', label: <strong>LANDSCHAFTSTECHNIK</strong>},
                                      { value: 'bodenfraese', label: 'Bodenfräse' },
                                      { value: 'holzhaecksler', label: 'Holzhäcksler' },
                                      { value: '', label: <strong>SÄGEN UND SCHNEIDER</strong>},
                                      { value: 'trennschleifer', label: 'Trennschleifer' },
                                      { value: 'bausteinBandseage', label: 'Baustein Bandsäge' },
                                      { value: 'blocksteinsaege', label: 'Blocksteinsäge' },
                                      { value: 'fugenschneider', label: 'Fugenschneider' },
                                      { value: 'steinsaege', label: 'Steinsäge' },
                                      { value: '', label: <strong>RAUMSYSTEME</strong>},
                                      { value: 'materialContainer', label: 'Materialcontainer' },
                                      { value: '', label: <strong>FAHRZEUGE</strong>},
                                      { value: 'pritschenwagen', label: 'Pritschenwagen' },
                                      { value: 'umzugstransporter', label: 'Umzugstransporter' },
                                      { value: '', label: <strong>HEBETECHNIK</strong>},
                                      { value: 'teleskopstapler', label: 'Teleskopstapler' },
                                      { value: 'teleskopmastbühne', label: 'Teleskopmastbühne' },
                                      { value: 'teleskopArbeitsbühne', label: 'Teleskop-Arbeitsbühne' },
                                      { value: 'selbstfahrendeScherenbühne', label: 'Selbstfahrende Scherenbühne' },
                                      { value: 'gelenkteleskoparbeitsbühneAufGummiketten', label: 'Gelenkteleskoparbeitsbühne auf Gummiketten' },
                                      { value: 'lkwArbeitsbühne', label: 'LKW Arbeitsbühne' },
                                      { value: 'gelenkteleskopArbeitsbühne', label: 'Gelenkteleskop-Arbeitsbühne' },

                                 ]}
                                  />
                                </div>
              					        <div className="col-md-2 col-sm-12 col-xs-12 no-padd" >
              						        <button style={{padding: "15px 40px", width: "100%"}} type="submit" className="btn theme-btn">Suche</button>
                                </div>
                              </div>
                            </form>
                          </div>


                          {/* All Listing */}
                          <div className="row mrg-bot-20">
                            <div className="col-md-12">
                              <h5>{this.state.cards.length} Ergebnisse {this.state.kat?('für '+this.state.kat):(null)}</h5>
                            </div>
                          </div>

                          <div  className="row">
                            {/* Single Listing- */}
                            <Listing gebiet={this.state.gebiet} cards={this.state.cards} />
                          </div>

                        </div>

                        {/* Sidebar Map */}
                            <HomeMap markers={this.state.markers} gebiet={this.state.gebiet} center={this.state.center} position={this.state.position}/>
                            {/*<AppMap center={this.state.center} gebiet={this.state.gebiet} position={this.state.position}/>*/}

                      </div>
                    </div>
                    {/* ================ End Search listing With Filter Option  ======================= */}


                    {/* ================== Login & Sign Up Window ================== */}

                </div>
              </div>
            </div>
          </div>


            )
        }
    }

export default Mieten;
