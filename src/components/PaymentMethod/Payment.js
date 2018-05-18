import React, {Component} from 'react';
import PaypalImg from '../../img/paypal.png';
import CreditPng from '../../img/credit.png';
import {NavLink, Redirect} from 'react-router-dom';
import backgroundImg from '../../img/backgroundPayment.jpg';
import firebase from 'firebase';
import Logo from'../../img/logo.png'
import moment from 'moment'
import LogoWhite from'../../img/logo-white.png'
import request from 'request';
import axios from 'axios'






class Payment extends Component{
  constructor(props){
    super(props)
    this.recalcRequest= this.recalcRequest.bind(this)
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



requestHandler(e){
  e.preventDefault

  let key = "10001|C4B9DCF30853F90459D47B5CDDE9031AA0B63A22A48D87DFD264C67917E405F6BEEF46E68B857103B868EF69E6AF30FED1F49F877795A5DB72427BD24F106C8A484D266DCB0688C5B4138FC48B8CA65416F9F48E7BE48CA155AD32063467E9027461479905340AFC07BB721EE937B46CC6C5FB35A81C9F44CFF620862D3CDDF57C9496C25A218198A5081C9BDCDFA339F7444158179C8F141E319C006AFC370EDB3C7A28FBA55909CE663B8CE4BC733931C35E72F53D539BE19F8CACAB85062734269FD923EC49B77451F38991CF26689CFEAE3E26802A7F626914A752154C1C3784EBFD5E49CCA98601304E1140C4FE2C609E2703973D777643C61937B4EA95";

  let options = {

  };

  let cardData = {
        number : '2223 0000 4841 0010',
        cvc : '737',
        holderName : 'Harry Trippel',
        expiryMonth : '10',
        expiryYear : '2020',
        generationtime : '2018-05-08T14:56:29.292+02:00'
                          // 2017-07-17T13:42:40.428+01:00
    };

  let cseInstance = window.adyen.encrypt.createEncryption(key, options, cardData)

  let encryptedInstance = cseInstance.encrypt(cardData);

  console.log(cseInstance, 'das ist cseInstance', encryptedInstance, 'encryptedInstance 2');


}

 //

 getPaymentMethods(e){
   e.preventDefault
   fetch('http://localhost:8888/Backend/payment.php', {
   })
   .then((response) => response.json())
   .then((responseJson)=>
  { this.setState({requestPaymentMethods:responseJson.paymentMethods})
    console.log(responseJson);
  })
 }
 recalcRequest(data){
   let meth = data
   let brandCode = meth.brandCode
   let paymentAmount = this.props.location.query.anfrage.umsatz+"00"
   let merchantReference = this.props.location.query.cardid
   let jsonData = {
						brandCode : brandCode,
						paymentAmount : paymentAmount,
            merchantReference:merchantReference
					};

  request.post({
    headers: {'content-type' : 'application/x-www-form-urlencoded'},
    url:     'http://localhost:8888/Backend/recalcSig.php',
    body:    "data=" + JSON.stringify(jsonData)
  },(err, response, body) => {
    if (err) throw err;
      body = JSON.parse(body)
      console.log(body.merchantSig);
      console.log(body.request);
      this.setState({
        merchantSig: body.merchantSig,
        sessionValidity: body.request.sessionValidity,
        requestPaymentMethods: false,
        showCardDetails:true
      })
    console.log('response: ', response);
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

                      <button type="button" style={{marginBottom:"20px"}} className="btn theme-btn"  onClick={this.getPaymentMethods.bind(this)}>Zahlmethoden</button>

            {this.state.requestPaymentMethods?
              (this.state.requestPaymentMethods.map((meth) =>{
                  return(
                      <div className="payment-card" onClick={()=>{this.setState({meth:meth},this.recalcRequest(meth))}}>
                        <header className="payment-card-header cursor-pointer collapsed" data-toggle="collapse" data-target="#paypal" aria-expanded="false">
                          <div className="payment-card-title flexbox">
                            <h4>{meth.name}</h4>
                          </div>
                          <div className="pull-right">
                            <img src={meth.logos.normal} className="img-responsive" alt=""/>
                          </div>
                        </header>
                      </div>)
                       })): (null)}


                       {this.state.showCardDetails?(
                         <form method="post" action="https://test.adyen.com/hpp/skipDetails.shtml" id="adyenForm" name="adyenForm" target="_parent">
                           <input type="hidden" name="merchantSig" value={this.state.merchantSig} />
                           <input type="hidden" name="sessionValidity" value={this.state.sessionValidity} />
                           <input type="hidden" name="merchantAccount" value="MietDasCOM" />
                           <input type="hidden" name="paymentAmount" value={this.props.location.query.anfrage.umsatz+"00"} />
                           <input type="hidden" name="currencyCode" value="EUR" />
                           <input type="hidden" name="shopperLocale" value="ger_DE" />
                           <input type="hidden" name="skinCode" value="mLIn3bJn" />
                           <input type="hidden" name="merchantReference" value={this.props.location.query.cardid} />
                           <input type="hidden" name="brandCode" value={this.state.meth.brandCode} />
                           <input type="submit" value="Send" />
                           <input type="reset" />
                        </form>
                       ):(null)}


                    </div>
                  </div>
                </div>

                {/* Sidebar */}
                <div className="col-md-4 col-sm-12">
                  <div >
                    {/* Start: Search By Price */}
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
                            <p className="listing-location">{this.props.location.query.anfrage.standOrt}</p>
                          </div>
                        </a>
                      </div>

                      {/* Booking listing or Space Price */}
                      <div className="booking-price padd-15">
                        <h4 className="mrg-bot-20">Zusammenfassung</h4>

                        {/* your Dates */}
                        <div className="booking-price-detail side-list no-border">
                          <h5>Zeitraum</h5>
                          <ul>
                            <li>Mietbeginn<strong className="pull-right">{this.props.location.query.anfrage.mietbeginn}</strong></li>
                            <li>Mietende<strong className="pull-right">{this.props.location.query.anfrage.mietende}</strong></li>
                          </ul>
                        </div>



                        {/* Total Cost */}
                        <div className="booking-price-detail side-list no-border">
                          <ul>
                            <li>{this.props.location.query.anfrage.tage}<strong className="theme-cl pull-right">{this.props.location.query.anfrage.umsatz}€</strong></li>
                          </ul>
                        </div>

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
