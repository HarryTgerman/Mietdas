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
      selectValue:  { value: '', label: 'wähle Kategorie' },
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
         const previousCards = this.state.cards
         const previousMarker = this.state.markers;
         let lat = this.state.center.lat - 0.1
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
                imageArr: childSnapshot.val().imageArr,
                gewicht: childSnapshot.val().gewicht,
                grabtiefe: childSnapshot.val().grabtiefe,
                transportbreite: childSnapshot.val().transportbreite,
                transporthoehe: childSnapshot.val().transporthoehe,
                snap: childSnapshot.val(),
              })
              this.setState ({
                cards: previousCards,
                markers: previousMarker
              })
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
      const previousCards = this.state.cards
      const previousMarker = this.state.markers;
      let lat = this.state.center.lat - 0.1
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
             cardDesc: childSnapshot.val().cardDesc,
             cardPreis: childSnapshot.val().cardPreis,
             cardHeading: childSnapshot.val().cardHeading,
             cardBewertung: childSnapshot.val().bewertung,
             cardImage: childSnapshot.val().imageUrl,
             standOrt: childSnapshot.val().ort,
             imageArr: childSnapshot.val().imageArr,
             gewicht: childSnapshot.val().gewicht,
             grabtiefe: childSnapshot.val().grabtiefe,
             transportbreite: childSnapshot.val().transportbreite,
             transporthoehe: childSnapshot.val().transporthoehe,
             snap: childSnapshot.val(),
           })
           this.setState ({
             cards: previousCards,
             markers: previousMarker
           })
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
                              <h3>Finde deine Baumaschinen deiner Umgebung</h3>
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
                                      { value: 'bagger', label: 'Bagger' },
                                      { value: 'bagger', label: 'Minibagger' },
                                      { value: 'bagger', label: 'Radlader' },
                                      { value: 'bagger', label: 'Raupenbagger' },
                                      { value: 'bagger', label: 'Radbagger' },
                                      { value: 'verdichtungstechnik', label: 'Verdichtungstechnik' },
                                      { value: 'verdichtungstechnik', label: 'Stampfer' },
                                      { value: 'verdichtungstechnik', label: 'Rüttelplatten' },
                                      { value: 'anhänger', label: 'Anhänger' },
                                      { value: 'anhänger', label: 'Baumaschinenanhänger' },
                                      { value: 'anhänger', label: 'Planenanhänger' },
                                      { value: 'anhänger', label: 'Kofferanhänger' },
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
                              <h5>{this.state.cards.length} Ergebnisse</h5>
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
