import React, {Component} from 'react';
import HomeMap from './Map/HomeMap'
import {AppMap} from './Map/Mapcomponent'
import PlacesAutocomplete, { geocodeByAddress ,getLatLng } from 'react-places-autocomplete';
import {NavLink} from 'react-router-dom'
import Listing from './Listing/Listing'
import firebase from 'firebase'


class Mieten extends Component{
  constructor(props){
    super(props)
    this.Ref = firebase.database().ref().child('app').child('cards');
    this.state = {
      center: {lat:49.3173858, lng:8.4365679},
      position: {lat:49.3173858, lng:8.4365679},
      address: "",
      gebiet: "",
      cards: [
      ],

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
          },()=>{
            if(this.props.location.query === undefined){
              return null
            }else{
              this.setState({cityValue:this.props.location.query.city},()=>{this.handleFormSubmit()})
            }
          })

        } else {
          this.setState({
            authenticated: false,
          },()=>{if (this.state.photoUrl == null){this.setState({showPhotoUrl:false})}else {this.setState({showPhotoUrl:true})}}
          )
        }
      })

    }

    handleChange(event) {
       this.setState({cityValue: event.target.value});
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
      address:   this.state.cityValue
    })

    this.setState({
        cityValue: "",
        cards: []
      })
whenGeoCode.then(() =>{
          const previousCards = this.state.cards
          firebase.database().ref().child('app').child('cards').orderByChild('gebiet').equalTo(this.state.gebiet)
           .once('value', snap => {
             console.log("hier die Liste", snap.val());
             snap.forEach(childSnapshot =>{
               previousCards.push ({
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
                 cards: previousCards
               })
             })
           })
        })
  }



        render(){
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
                            <img src="assets/img/logo.png" className="logo logo-display" alt=""/>
                            <img src="assets/img/logo.png" className="logo logo-scrolled" alt=""/>
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

                            <form className="form-verticle" >
                              <div className="row mrg-0">
                                <div className="col-md-5 col-sm-5">
                                  <input type="text" className="form-control left-radius" onChange={this.handleChange.bind(this)} placeholder="Keywords.."/>
                                </div>

                                <div className="col-md-5 col-sm-5 nopadding" >
                                  <select className="form-control" data-live-search="true">
                                    <option data-tokens="ketchup mustard">Choose Category</option>
                                    <option data-tokens="mustard">Burger, Shake and a Smile</option>
                                    <option data-tokens="frosting">Sugar, Spice and all things nice</option>
                                  </select>
                                </div>
              					        <div className="col-md-2 col-sm-2" style={{marginLeft: "-30px"}} >
              						        <button style={{padding: "15px 40px"}} type="button" onClick={this.handleFormSubmit} className="btn theme-btn">Search Place</button>
                                </div>

                              </div>
                            </form>
                          </div>

                          {/* All Listing */}
                          <div className="row mrg-bot-20">
                            <div className="col-md-12">
                              <h5>70 result Found</h5>
                            </div>
                          </div>

                          <div className="row">
                            {/* Single Listing- */}
                            <Listing gebiet={this.state.gebiet} cards={this.state.cards}/>
                          </div>

                        </div>

                        {/* Sidebar Map */}
                            <HomeMap/>
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
                            {/* Nav tabs */}
                            <ul className="nav nav-tabs" role="tablist">
                              <li role="presentation" className="active"><a href="#login" role="tab" data-toggle="tab">Sign In</a></li>
                              <li role="presentation"><a href="#register" role="tab" data-toggle="tab">Sign Up</a></li>
                            </ul>
                            {/* Tab panes */}
                            <div className="tab-content" id="myModalLabel2">
                              <div role="tabpanel" className="tab-pane fade in active" id="login">
                                <img src="assets/img/logo.png" className="img-responsive" alt="" />
                                <div className="subscribe wow fadeInUp">
                                  <form className="form-inline" method="post">
                                    <div className="col-sm-12">
                                      <div className="form-group">
                                        <input type="email"  name="email" className="form-control" placeholder="Username" required=""/>
                                        <input type="password" name="password" className="form-control"  placeholder="Password" required=""/>
                                        <div className="center">
                                        <button type="submit" id="login-btn" className="btn btn-midium theme-btn btn-radius width-200"> Login </button>
                                        </div>
                                      </div>
                                    </div>
                                  </form>
                                </div>
                              </div>

                              <div role="tabpanel" className="tab-pane fade" id="register">
                              <img src="assets/img/logo.png" className="img-responsive" alt="" />
                                <form className="form-inline" method="post">
                                  <div className="col-sm-12">
                                    <div className="form-group">
                                      <input type="text"  name="email" className="form-control" placeholder="Your Name" required=""/>
                                      <input type="email"  name="email" className="form-control" placeholder="Your Email" required=""/>
                                      <input type="email"  name="email" className="form-control" placeholder="Username" required=""/>
                                      <input type="password" name="password" className="form-control"  placeholder="Password" required=""/>
                                      <div className="center">
                                      <button type="submit" id="subscribe" className="btn btn-midium theme-btn btn-radius width-200"> Create Account </button>
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
