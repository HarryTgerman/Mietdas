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
      this.getPaymentMethods()
    }


  post(path, params, method) {
     method = method || "post";

     var form = document.createElement("form");
     form.setAttribute("method", method);
     form.setAttribute("action", path);

     for(var key in params) {
         if(params.hasOwnProperty(key)) {
             var hiddenField = document.createElement("input");
             hiddenField.setAttribute("type", "hidden");
             hiddenField.setAttribute("name", key);
             hiddenField.setAttribute("value", params[key]);

             form.appendChild(hiddenField);
         }
     }

     document.body.appendChild(form);
     form.submit();
  }


 getPaymentMethods(){
   fetch('https://mietdas.de/Backend/payment.php', {
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
    url:     'https://mietdas.de/Backend/recalcSig.php',
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
      }, ()=>{
        this.post('https://test.adyen.com/hpp/skipDetails.shtml', {merchantSig:this.state.merchantSig,sessionValidity:this.state.sessionValidity,
          merchantAccount:"MietDasCOM",paymentAmount:paymentAmount, currencyCode:"EUR", shopperLocale:"ger_DE",skinCode: "mLIn3bJn",
          merchantReference:this.props.location.query.cardid, brandCode:this.state.meth.brandCode})
        })
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


            {this.state.requestPaymentMethods?
              (this.state.requestPaymentMethods.map((meth) =>{
                  return(
                      <div className="payment-card" onClick={()=>{this.setState({meth:meth, loading:true},this.recalcRequest(meth))}}>
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
                     {this.state.loading?(<h4>Lade...</h4>):(null)}
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
