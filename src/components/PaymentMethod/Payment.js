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

  onToken = (token) => {
    console.log('Token', token);
    fetch('http://localhost:4000/stripe', {
      'method': 'POST',
      'Content-Type': 'application/json',
      'body': JSON.stringify(token),
    }).then(response => {
      response.json().then(data => {
        alert(`We are in business, ${data.email}`);
      });
    });
  }

  render(){
    const onSuccess = (payment) => {
        // Congratulation, it came here means everything's fine!
        const query = this.state.name+this.props.location.query.anfrage.num
        const db = firebase.database().ref('app/').child('users/'+this.state.uid).child('mitteilung').child(query).child('anfrage');
        db.update({
          gemietet:true
        })
        db.child('payment').set({
          paymentMethod: 'paypal',
          address: payment.address,
          paid: payment.paid,
          email: payment.email,
          payerID: payment.payerID,
          paymentID: payment.paymentID,
          paymentToken: payment.paymentToken,
          returnUrl: payment.returnUrl,
        });
        firebase.database().ref('app/').child('users/'+this.state.uid).child('miethistory')
        .push({
          zeitraum:this.props.location.query.anfrage.mietbeginn +" - "+this.props.location.query.anfrage.mietende,
          umsatz:this.props.location.query.anfrage.umsatz,
          artikel:this.props.location.query.anfrage.cardHeading,
          vermieter: this.props.location.query.anfrage.uid,
          mieter: this.state.uid
        })
          firebase.database().ref('app/').child('payments')
          .push({
            zeitraum:this.props.location.query.anfrage.mietbeginn +" - "+this.props.location.query.anfrage.mietende,
            umsatz:this.props.location.query.anfrage.umsatz,
            artikel:this.props.location.query.anfrage.cardHeading,
            vermieter: this.props.location.query.uid,
            mieter: this.state.uid
          })
            console.log("The payment was succeeded!", payment);
            confirmAlert({
              title: 'Herzlichen Glückwunsch',
              message: 'Der Bezahlvorgang war erfolgreich',
              buttons: [
                {
                  label: 'OK',
                }
              ]
            })
            // You can bind the "payment" object's value to your state or props or whatever here, please see below for sample returned data
    }

    const onCancel = (data) => {
        console.log('The payment was cancelled!', data);
        confirmAlert({
          title: 'Cancelled',
          message: 'Der Bezahlvorgang wurde abgebrochen',
          buttons: [
            {
              label: 'OK',
            }
          ]
        })
    }

    const onError = (err) => {
        console.log("Error!", err);
        confirmAlert({
          title: 'Oops!',
          message: 'Bezahlvorgang konnte nicht ausgeführt werden',
          buttons: [
            {
              label: 'OK',
            }
          ]
        })
    }
    let env = 'sandbox'; // you can set here to 'production' for production
    let currency = 'EUR'; // or you can set this value from your props or state

    console.log('Price--->', this.state.price);


    const client = {
        sandbox:    'ASVxgdRzY-cvLI2L_FebsoY13jw7WcKcejImqgtkqOCZd_75lhGtWkRaZdZR9mO1ew5X0sDj6ff6aK2o',
        production: 'Azu.agFazBhPwZk8zKunBXtnXCpaAuorx.BueZUpOEALXd95tl0-burj',
    }
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


                          <PaypalExpressBtn env={env} client={client} currency={currency} total={total} onError={onError} onSuccess={onSuccess} onCancel={onCancel} />
                          {/* <div className="payment-card-body">
                            <div className="row mrg-r-10 mrg-l-10">
                              <div className="col-sm-6">
                                <label>PayPal Name</label>
                                <input type="text" className="form-control"/>
                              </div>
                              <div className="col-sm-6">
                                <label>PayPal Email</label>
                                <input type="email" className="form-control"/>
                              </div>
                              <div className="col-sm-6">
                                <label>Phone No.</label>
                                <input type="email" className="form-control"/>
                              </div>
                              <div className="col-sm-6">
                                <label>Have A Coupon Code?</label>
                                <input type="email" className="form-control"/>
                              </div>
                            </div>
                          </div> */}


                          <StripeCheckout
                            name="Mietdas"
                            amount={99999}
                            currency="EUR"
                            email="kungfupo124@gmail.com"
                            token={this.onToken}
                            stripeKey="pk_test_vdzRSLPDWixdLrN8sUpshLtF"
                          />
                          {/* <div className="payment-card-body">
                              <div className="row mrg-r-10 mrg-l-10">
                              <div className="col-sm-6">
                                <label>Card Holder Name</label>
                                <input type="text" className="form-control" placeholder="Daniel Singh"/>
                              </div>
                              <div className="col-sm-6">
                                <label>Card No.</label>
                                <input type="email" className="form-control" placeholder="1235 4785 4758 1458"/>
                              </div>
                            </div>
                            <div className="row mrg-r-10 mrg-l-10">
                              <div className="col-sm-4 col-md-4">
                                <label>Expire Month</label>
                                <input type="text" className="form-control" placeholder="07"/>
                              </div>
                              <div className="col-sm-4 col-md-4">
                                <label>Expire Year</label>
                                <input type="email" className="form-control" placeholder="2020"/>
                              </div>
                              <div className="col-sm-4 col-md-4">
                                <label>CCV Code</label>
                                <input type="email" className="form-control" placeholder="258"/>
                              </div>
                            </div>
                          </div> */}
                          </div>
                      {/* <div className="text-left">
                        <a href="#" className="btn theme-btn" title="Submit Listing">Confirm Now</a>
                      </div>  */}
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
