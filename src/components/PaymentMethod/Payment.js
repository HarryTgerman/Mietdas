import React, {Component} from 'react';
import PaypalImg from '../../img/paypal.png';
import CreditPng from '../../img/credit.png';
import {NavLink, Redirect} from 'react-router-dom';
import backgroundImg from '../../img/backgroundPayment.jpg';
import firebase from 'firebase';
import PaypalExpressBtn from 'react-paypal-express-checkout';
import StripeCheckout from 'react-stripe-checkout';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import Logo from'../../img/logo.png'
import LogoWhite from'../../img/logo-white.png'

let total = null;
class Payment extends Component{
  constructor(props){
    super(props)
    // this.ArtikelOwnerId = this.props.query.anfrage.uid
    // this.ArtikelOwnerEmail = this.props.query.anfrage.email
    this.state ={
      authenticated: false,
      price: 0,
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
            price: this.props.location.query.anfrage.umsatz,
          })

      } else {
        this.setState({
          authenticated: false,
        })
        }
      })

  }
  componentWillUpdate(nextProps, nextState) {
   console.log('Will update', nextProps);
   total = nextProps.location.query.anfrage.umsatz;
 }


requestHandler(paymentToken){
  firebase.database().ref('app').child('payments').push(paymentToken)
}
  render(){

    // The form element to encrypt
var form    = document.getElementById('adyen-encrypted-form');
// The public key
var key     =   "your key as retrieved from the Adyen Customer Area Web Service User page";
// Form and encryption options. See adyen.encrypt.simple.html for details
var options = {};
// Bind encryption to the form
window.adyen.encrypt.createEncryptedForm( form, key, options);

    return(
        <div>
          <div className="wrapper">
            <div className="clearfix"></div>

            {/* Start Navigation */}
            <div  className="navbar navbar-default navbar-fixed navbar-transparent white bootsnav">
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
                  { this.state.authenticated ?(<li className="no-pd"><NavLink to="/benutzeraccount" className="addlist"><i className="ti-user"></i>{this.state.name}</NavLink></li>)
                  :(<p></p>)
                  }
                  </ul>
                </div>
                  {/*.navbar-collapse*/}
              </div>
            </div>
            {/* End Navigation */}

            {/* ================ Start Page Title ======================= */}
            <section className="title-transparent page-title" style={{ background:`url(${backgroundImg})`}}>
              <div className="container">
                <div className="title-content">
                  <h1>Reservieren Sie Jetzt einfach und unverbindlich</h1>
                  <div className="breadcrumbs">
                    <a href="#">Wählen Sie Ihre</a>
                    <span className="gt3_breadcrumb_divider"></span>
                    <span className="current">Bezahloption</span>
                  </div>
                </div>
              </div>
            </section>
            <div className="clearfix"></div>
            {/* ================ End Page Title ======================= */}

            {/* ================ Payment Methode Section ======================= */}
            <section className="list-detail">
              <div className="container">

                <div className="col-md-8 col-sm-12">


                  <div className="detail-wrapper">
                    <div className="detail-wrapper-header">
                      <h4><i className="ti-credit-card theme-cl mrg-r-5 "></i>Payment Methode</h4>
                    </div>
                    <div className="detail-wrapper-body">
                      <div className="payment-card">



                          </div>


                      <form method="POST" action="https://test.adyen.com/hpp/skipDetails.shtml" id="adyen-encrypted-form">
                          <input type="text" size="20" data-encrypted-name="number"/>
                          <input type="text" size="20" data-encrypted-name="holderName"/>
                          <input type="text" size="2" data-encrypted-name="expiryMonth"/>
                          <input type="text" size="4" data-encrypted-name="expiryYear"/>
                          <input type="text" size="4" data-encrypted-name="cvc"/>
                          <input type="hidden" value="[generate this server side]" data-encrypted-name="generationtime"/>
                          <input type="submit" value="Pay"/>
                      </form>
                    </div>
                  </div>
                </div>

                {/* Sidebar */}
                <div className="col-md-4 col-sm-12">
                  <div className="widget-boxed padd-0">
                    {/* Booking listing or Space */}
                    <div className="listing-shot grid-style no-shadow border-0 mrg-0">
                      <a href="#">
                        <div className="listing-shot-img">
                          <img src={this.props.location.query.anfrage.url} className="img-responsive" alt=""/>
                          <span className="like-listing"><i className="fa fa-heart-o" aria-hidden="true"></i></span>
                        </div>
                        <div className="listing-shot-caption">
                          <h4>{this.props.location.query.anfrage.cardHeading}</h4>
                          <p className="listing-location">{this.props.location.query.anfrage.adresse}</p>
                        </div>
                      </a>
                    </div>
                    {/* Booking listing or Space Price */}
                    <div className="booking-price padd-15">
                      <h4 className="mrg-bot-20">Zusammenfassung</h4>
                      {/* Days of rent */}
                      <div className="booking-price-detail side-list no-border">
                        <h5>Zeitraum</h5>
                        <ul>
                          <li>Ab<strong className="pull-right">{this.props.location.query.anfrage.mietbeginn}</strong></li>
                          <li>Bis<strong className="pull-right">{this.props.location.query.anfrage.mietende}</strong></li>
                          <li>{this.props.location.query.anfrage.tage}</li>
                        </ul>
                      </div>
                      {/* Total Cost */}
                      <div className="booking-price-detail side-list no-border">
                        <ul>
                          <li>Endpreis<strong className="theme-cl pull-right">{this.props.location.query.anfrage.umsatz}€</strong></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>

      )
    }
  }


export default Payment;
