import React, {Component} from 'react';
import PaypalImg from '../../img/paypal.png';
import CreditPng from '../../img/credit.png';
import {NavLink, Redirect} from 'react-router-dom';
import backgroundImg from '../../img/backgroundPayment.jpg';
import firebase from 'firebase';
import Logo from'../../img/logo.png'
import moment from 'moment'
import LogoWhite from'../../img/logo-white.png'
import axios from 'axios'






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
 }


requestHandler(e){
  e.preventDefault

  // The form element to encrypt
  let paymentForm    = document.getElementById('adyen-encrypted-form');
  // The public key
  let key = "10001|C4B9DCF30853F90459D47B5CDDE9031AA0B63A22A48D87DFD264C67917E405F6BEEF46E68B857103B868EF69E6AF30FED1F49F877795A5DB72427BD24F106C8A484D266DCB0688C5B4138FC48B8CA65416F9F48E7BE48CA155AD32063467E9027461479905340AFC07BB721EE937B46CC6C5FB35A81C9F44CFF620862D3CDDF57C9496C25A218198A5081C9BDCDFA339F7444158179C8F141E319C006AFC370EDB3C7A28FBA55909CE663B8CE4BC733931C35E72F53D539BE19F8CACAB85062734269FD923EC49B77451F38991CF26689CFEAE3E26802A7F626914A752154C1C3784EBFD5E49CCA98601304E1140C4FE2C609E2703973D777643C61937B4EA95";
  // Form and encryption options. See adyen.encrypt.simple.html for details
  let options = {};
  // Bind encryption to the form
  let cseInstance = window.adyen.encrypt.createEncryption(key, options, paymentForm)

  fetch('/api/payment', {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(paymentForm)
})


}


  render(){

let timeStemp = moment().format('YYYY-MM-DDThh:mm:ss.sssTZD');
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


                      <form onSubmit={this.requestHandler.bind(this)}  id="adyen-encrypted-form">
                          <input type="text" size="20" data-encrypted-name="number" placeholder="number"/>
                          <input type="text" size="20" data-encrypted-name="holderName" placeholder="holderName"/>
                          <input type="text" size="20" data-encrypted-name="expiryMonth" placeholder="expiryMonth"/>
                          <input type="text" size="14" data-encrypted-name="expiryYear" placeholder="expiryYear"/>
                          <input type="text" size="14" data-encrypted-name="cvc" placeholder="cvc"/>
                          <input type="hidden" value={timeStemp} data-encrypted-name="generationtime"/>
                          <input type="submit" value="Pay"/>
                      </form>
                    </div>
                  </div>
                </div>

                {/* Sidebar */}
                <div className="col-md-4 col-sm-12">
                  <div className="widget-boxed padd-0">
                    {/* Booking listing or Space */}

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
