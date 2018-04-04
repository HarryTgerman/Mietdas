import React, {Component} from 'react';
import HomeMap from './Map/HomeMap'
import {AppMap} from './Map/Mapcomponent'
import PlacesAutocomplete, { geocodeByAddress ,getLatLng } from 'react-places-autocomplete';
import Listing from './Listing/Listing'
import firebase from 'firebase'
import Logo from '../../../img/logo.png'
import {NavLink, Redirect,Link} from 'react-router-dom'
import Select from 'react-select';

const facebookProvider = new firebase.auth.FacebookAuthProvider()

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

      if(this.props.location.query === undefined){
        return null
      }else{
        this.setState({cityValue:this.props.location.query.city},()=>{this.handleFormSubmit()})
      }

    }

    handleChange(event) {
       this.setState({cityValue: event.target.value});
     }


    clickLi = (selectValue) => {
   this.setState({ selectValue });
   console.log(`Selected: ${selectValue.label}`);
 }


  handleFormSubmit = () => {

  let whenGeoCode = geocodeByAddress(this.state.cityValue)
    .then(results =>{
      const res = results[0]
      this.setState({
        gebiet: res.address_components[1].long_name
      })
    })
    geocodeByAddress(this.state.cityValue)
    .then(results =>  getLatLng(results[0]))
    .then(latLng =>{
      this.setState({
          center: latLng,
          position: latLng
      })
       console.log('Success', latLng)}
       )
    .catch(error => console.error('Error', error))
    this.setState({
      gebiet: this.state.address,
      address:   this.state.cityValue,
    })

whenGeoCode.then(() =>{
          const previousCards = this.state.cards
          const previousMarker = this.state.markers;
          firebase.database().ref().child('app').child('cards').child(this.props.location.query.kategorie).orderByChild('gebiet').equalTo(this.state.gebiet)
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
    if(this.state.markers && this.state.cards != null){
    this.setState({
      markers:[],
      cards:[]
    })
  }
  let whenGeoCode = geocodeByAddress(this.state.cityValue)
  .then(results =>{
    const res = results[0]
    this.setState({
      gebiet: res.address_components[1].long_name
    })
  })
  geocodeByAddress(this.state.cityValue)
  .then(results =>  getLatLng(results[0]))
  .then(latLng =>{
    this.setState({
        center: latLng,
        position: latLng
    })
     console.log('Success', latLng)}
     )
  .catch(error => console.error('Error', error))
  this.setState({
    gebiet: this.state.address,
    address:   this.state.cityValue,
  })

whenGeoCode.then(() =>{
      const previousCards = this.state.cards
      const previousMarker = this.state.markers;
      firebase.database().ref().child('app').child('cards').child(this.state.selectValue.value).orderByChild('gebiet').equalTo(this.state.gebiet)
       .once('value', snap => {
         console.log("hier die Liste", snap.val());
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



authWithFacebook(){
  let whenFacebookAuth = firebase.auth().signInWithPopup(facebookProvider)
    .then((result, error) => {
      if (error) {
        alert(error)
      } else {
      }
    })
    whenFacebookAuth.then(() =>{ window.location.reload()})
}


signIn(){
const email = this.userNameInput.value;
const password = this.passwordInput.value;

let whenSignIn = firebase.auth().signInWithEmailAndPassword(email, password).catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // [START_EXCLUDE]
        if (errorCode === 'auth/wrong-password') {
          alert('Falsches Passwort');
        } else {
          alert(errorMessage);
        }
        console.log(error)
      })
  whenSignIn.then(() =>{ window.location.reload()})
    }

register(){


const email = this.emailInput.value;
const password = this.createPassword.value;
let whenRegister = firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
      var errorMessage = error.message;
      // [START_EXCLUDE]
      if (errorCode === 'auth/weak-password') {
        alert('Das Password ist zu schwach');
      } else {
        alert(errorMessage);
      }
      console.log(error);
      // [END_EXCLUDE]
    });
  // ...
  whenRegister
  .then(()=>{ this.setState({registerRedirect:true})
  })

}

registerWithFacebook(){
  let whenFacebookAuth = firebase.auth().signInWithPopup(facebookProvider)
    .then((result, error) => {
      if (error) {
        alert(error)
      } else {
        this.setState({ authenticated: true})
      }
    })
    whenFacebookAuth.then(() =>{ this.setState({registerRedirect:true})
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
                    {/* End Navigation */}
                    <div className="clearfix">


                    {/* ================ Search listing With Filter Option ======================= */}
                    <div  style={{marginTop: "60px"}}>
                      <div className="container-fluid">
                        <div  className="col-md-8 col-sm-5">

                          {/* Filter Option */}
                          <div className="row">

                            <div s className="col-md-12 col-sm-12 nopadding">
                              <h3>What are you looking For?</h3>
                              <p>Search by keywords, category, location & filters</p>
                            </div>

                            <form className="form-verticle " onSubmit={this.handleFormSubmit1.bind(this)}>
                              <div className="row mrg-0">
                                <div style={{paddingRight:"0"}}  className="col-md-5 col-sm-5">
                                  <input type="text" className="form-control left-radius" ref={(input) => { this.cityInput = input}} onChange={this.handleChange.bind(this)} placeholder="Ort..."/>
                                </div>
                                <div style={{paddingLeft:"0"}} className="col-md-5 col-sm-5 nopadding" >

                                <Select
                                    className="form-control"
                                    name="form-field-name"
                                    value={value}
                                    onChange={this.clickLi.bind(this)}
                                    placeholder={this.state.selectValue.label}
                                    options={[
                                      { value: 'Bagger', label: 'Bagger' },
                                      { value: 'Bagger', label: 'Minibagger' },
                                      { value: 'Bagger', label: 'Radlader' },
                                      { value: 'Bagger', label: 'Raupenbagger' },
                                      { value: 'Bagger', label: 'Radbagger' },
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
              					        <div className="col-md-2 col-sm-2" style={{marginLeft: "-30px"}} >
              						        <button style={{padding: "15px 40px"}} type="submit" className="btn theme-btn">Suche</button>
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
                    <div className="modal fade" id="signup" tabindex="-1" role="dialog" aria-labelledby="myModalLabel2" aria-hidden="true">
                      <div className="modal-dialog">
                        <div className="modal-content">
                          <div className="modal-body">
                            <div className="tab" role="tabpanel">
                             {/*Nav tabs*/}
                            <ul className="nav nav-tabs" role="tablist">
                              <li role="presentation" className="active"><a href="#login" role="tab" data-toggle="tab">Log dich ein</a></li>
                              <li role="presentation"><a href="#register" role="tab" data-toggle="tab">Registriere dich</a></li>
                            </ul>
                             {/*Tab panes*/}
                            <div className="tab-content" id="myModalLabel2">
                              <div role="tabpanel" className="tab-pane fade in active" id="login">
                                <img src="assets/img/logo.png" className="img-responsive" alt="" />
                                <div className="subscribe wow fadeInUp">
                                  <form className="form-inline" >
                                    <div className="col-sm-12">
                                      <div className="form-group">
                                        <input type="email"  name="email" className="form-control" placeholder="E-mail"  ref={(input) => { this.userNameInput = input; }} required=""/>
                                        <input type="password" name="password" className="form-control"  placeholder="Passwort" ref={(input) => { this.passwordInput = input; }} required=""/>
                                        <div className="center">
                                        <button  type = "button" className="btn btn-midium btn-primary btn-radius width-200" style={{borderRadius: "50px", width: "200px"}} onClick={this.authWithFacebook}>
                                          Log-In mit Facebook
                                        </button>
                                        <button type="button" id="login-btn" onClick={this.signIn} className="btn btn-midium theme-btn btn-radius width-200"> Login </button>
                                        </div>
                                      </div>
                                    </div>
                                  </form>
                                </div>
                              </div>

                              <div role="tabpanel" className="tab-pane fade" id="register">
                              <img src="assets/img/logo.png" className="img-responsive" alt="" />
                                <form className="form-inline"  >
                                  <div className="col-sm-12">
                                    <div className="form-group">
                                      <input type="email"  name="email" className="form-control" placeholder="Deine Email" ref={(input) => { this.emailInput = input; }} required=""/>
                                      <input type="password"  name="password" className="form-control" placeholder="Passwort" ref={(input) => { this.createPassword = input; }} required=""/>
                                      <div className="center">
                                      <button  type = "button" className="btn btn-midium btn-primary btn-radius width-200" style={{borderRadius: "50px", width: "200px"}} onClick={this.registerWithFacebook}>
                                        Log-In mit Facebook
                                      </button>
                                      <button   type = "button" onClick={this.register} className="btn btn-midium theme-btn btn-radius width-200"> Registriere Dich </button>
                                      </div>
                                    </div>
                                  </div>
                                </form>
                              </div>
                            </div>
                          </div>
                        </div>
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

export default Mieten;
