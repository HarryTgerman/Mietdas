import React, {Component} from 'react';
import PaypalImg from '../../img/paypal.png';
import CreditPng from '../../img/credit.png';
import {NavLink, Redirect} from 'react-router-dom';
import backgroundImg from '../../img/backgroundPayment.jpg';
import firebase from 'firebase';
import Logo from'../../img/logo.png'
import PayPal from'../../img/paypal.png'
import Überweisung from'../../img/text-ueberweisung.png'
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
      redirect: false,
      authenticated: false,
      price: 0,
      paypal: false,
      überweisung: false,
      bar: false,
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
      firebase.database().ref('app/users').child(this.props.location.query.anfrage.ArtikelOwnerId)
      .child('bankData/paypal').once('value', snap=>{
        console.log(snap.val());
        this.setState({
          paypal: snap.val()
        })
      })
      // this.getPaymentMethods()
    }


  // post(path, params, method) {
  //    method = method || "post";
  //
  //    var form = document.createElement("form");
  //    form.setAttribute("method", method);
  //    form.setAttribute("action", path);
  //
  //    for(var key in params) {
  //        if(params.hasOwnProperty(key)) {
  //            var hiddenField = document.createElement("input");
  //            hiddenField.setAttribute("type", "hidden");
  //            hiddenField.setAttribute("name", key);
  //            hiddenField.setAttribute("value", params[key]);
  //
  //            form.appendChild(hiddenField);
  //        }
  //    }
  //
  //    document.body.appendChild(form);
  //    form.submit();
  // }


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
   let merchantReference = this.props.location.query.merchantReference
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
          merchantReference:this.props.location.query.merchantReference, brandCode:this.state.meth.brandCode})
        })
      })

 }


barPayment(){
  let artikelName = this.props.location.query.anfrage.hersteller+" "+this.props.location.query.anfrage.cardHeading +" "+ this.props.location.query.anfrage.gewicht+"Kg"
  artikelName = artikelName.replace('undefined ', '')
  artikelName = artikelName.replace(' undefinedKg', '')
  if(this.state.bar === false){
    alert('Sie müssen die Bedingung Akzeptieren um fortfahren zu können')
    return 0;
  } else {
    firebase.database().ref('app/payments').push({
      vermieterId:this.props.location.query.anfrage.ArtikelOwnerId,
      vermieterEmail:this.props.location.query.anfrage.ArtikelOwnerEmail,
      mieterEmail:this.props.location.query.anfrage.email,
      mieterId:this.state.uid,
      vermieterName: this.props.location.query.anfrage.vermieter,
      mieterName:this.state.name,
      artikelId:this.props.location.query.cardid,
      artikelName:artikelName,
      preis:this.props.location.query.anfrage.umsatz,
      paymentMethod:'barzahlung',
      von:this.props.location.query.anfrage.mietbeginn,
      bis:this.props.location.query.anfrage.mietende,
      bezahlt: false,
      rechnungsAdresse: this.props.location.query.anfrage.RechnungsAdresse,
      telefon: this.props.location.query.anfrage.telefon,
    })
    firebase.database().ref().child('app/users').child(this.props.location.query.anfrage.ArtikelOwnerId).child('anfragen')
    .child(this.props.location.query.merchantReference).update({zahlungImGang: true})
    firebase.database().ref().child('app/users').child(this.state.uid).child('mitteilung')
    .child(this.props.location.query.merchantReference).update({zahlungImGang: true})
    alert('Es wurde ein Mietbestätigung mit allen notwendigen Informationen an deine Email versendet')
    this.setState({redirect: true})
  }
}
paypalPayment(){
  let artikelName = this.props.location.query.anfrage.hersteller+" "+this.props.location.query.anfrage.cardHeading +" "+ this.props.location.query.anfrage.gewicht+"Kg"
  artikelName = artikelName.replace('undefined ', '')
  artikelName = artikelName.replace(' undefinedKg', '')
  if(this.state.paypalAgb  === false){
    alert('Sie müssen die Bedingung Akzeptieren um fortfahren zu können')
    return 0;
  } else {
    firebase.database().ref('app/payments').push({
      vermieterId:this.props.location.query.anfrage.ArtikelOwnerId,
      vermieterEmail:this.props.location.query.anfrage.ArtikelOwnerEmail,
      mieterEmail:this.props.location.query.anfrage.email,
      mieterId:this.state.uid,
      vermieterName: this.props.location.query.anfrage.vermieter,
      mieterName:this.state.name,
      artikelId:this.props.location.query.cardid,
      artikelName:artikelName,
      preis:this.props.location.query.anfrage.umsatz,
      paymentMethod:'PayPal.Me',
      von:this.props.location.query.anfrage.mietbeginn,
      bis:this.props.location.query.anfrage.mietende,
      bezahlt: false,
      rechnungsAdresse: this.props.location.query.anfrage.RechnungsAdresse,
      telefon: this.props.location.query.anfrage.telefon,
    })
    firebase.database().ref().child('app/users').child(this.props.location.query.anfrage.ArtikelOwnerId).child('anfragen')
    .child(this.props.location.query.merchantReference).update({zahlungImGang: true})
    firebase.database().ref().child('app/users').child(this.state.uid).child('mitteilung')
    .child(this.props.location.query.merchantReference).update({zahlungImGang: true})
    alert('Es wurde ein Mietbestätigung mit allen notwendigen Informationen an deine Email versendet')
    window.open("https://"+this.state.paypal,"_blank")
    this.setState({redirect: true})
  }
}
ueberweisungPayment(){
  let artikelName = this.props.location.query.anfrage.hersteller+" "+this.props.location.query.anfrage.cardHeading +" "+ this.props.location.query.anfrage.gewicht+"Kg"
  artikelName = artikelName.replace('undefined ', '')
  artikelName = artikelName.replace(' undefinedKg', '')
  if(this.state.überweisung === false){
    alert('Sie müssen die Bedingung Akzeptieren um fortfahren zu können')
    return 0;
  } else {
    firebase.database().ref().child('app/users').child(this.props.location.query.anfrage.ArtikelOwnerId).child('anfragen')
    .child(this.props.location.query.merchantReference).update({zahlungImGang: true})
    firebase.database().ref().child('app/users').child(this.state.uid).child('mitteilung')
    .child(this.props.location.query.merchantReference).update({zahlungImGang: true})
    firebase.database().ref('app/payments').push({
      vermieterId:this.props.location.query.anfrage.ArtikelOwnerId,
      vermieterEmail:this.props.location.query.anfrage.ArtikelOwnerEmail,
      mieterEmail:this.props.location.query.anfrage.email,
      mieterId:this.state.uid,
      vermieterName: this.props.location.query.anfrage.vermieter,
      mieterName:this.state.name,
      artikelId:this.props.location.query.cardid,
      artikelName:artikelName,
      preis:this.props.location.query.anfrage.umsatz,
      paymentMethod:'Überweisung',
      von:this.props.location.query.anfrage.mietbeginn,
      bis:this.props.location.query.anfrage.mietende,
      bezahlt: false,
      rechnungsAdresse: this.props.location.query.anfrage.RechnungsAdresse,
      telefon: this.props.location.query.anfrage.telefon,
    })
    alert('Es wurde ein Mietbestätigung mit allen notwendigen Informationen an deine Email versendet')
    this.setState({redirect: true})
  }
}




  render(){
    if(this.state.redirect === true) {
        return  <Redirect to="/benutzeraccount"/>
      }

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
                  <h1>Reservieren Sie etzt einfach und unverbindlich</h1>
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
                      <h4><i className="ti-credit-card theme-cl mrg-r-5 "></i>Bezahlmethoden</h4>
                    </div>
                    <div className="detail-wrapper-body">

            {/*this.state.requestPaymentMethods?
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
                    })): (<div className="loader"></div>)}
                     {this.state.loading?(<h4>Lade...</h4>):(null)*/}
                    {this.state.paypal?(<div className="payment-card" onClick={()=>{this.setState({meth:'paypal', loading:true})}} data-toggle="collapse" href="#collapsePaypal" role="button" aria-expanded="false" aria-controls="collapsePaypal">
                       <header className="payment-card-header cursor-pointer collapsed" data-toggle="collapse" data-target="#paypal" aria-expanded="false">
                         <div className="payment-card-title flexbox">
                           <h4>Bezahle mit PayPal.Me</h4>
                         </div>
                         <div className="pull-right">
                           <img src={PayPal} style={{width:"100px", height:"70px"}} className="img-responsive" alt=""/>
                         </div>
                       </header>
                     </div>):(null)}
                    <div className="collapse" id="collapsePaypal">
                      <div className="card card-body">
                        <div className="left" style={{textAlign: "left", padding: "10px"}}>
                        <input type="checkbox" onClick={()=>{  this.setState((prevState)=>{
                        return {paypalAgb: !prevState.paypalAgb};})}}/>
                         <a> Hiermit bestätige ich dass ich den Artikel {this.props.location.query.anfrage.hersteller?(this.props.location.query.anfrage.hersteller+" "):(null)}{this.props.location.query.anfrage.cardHeading}{this.props.location.query.anfrage.gewicht?(" "+this.props.location.query.anfrage.gewicht+"Kg"):(null)}über PayPal.Me bezahle</a>
                         <br/>
                         <button style={{ marginTop: "10px"}} onClick={this.paypalPayment.bind(this)} className="btn theme-btn">mit paypal.me bezahlen</button>
                        </div>
                      </div>
                    </div>
                     <div className="payment-card" onClick={()=>{this.setState({meth:'rechnung', loading:true})}} data-toggle="collapse" href="#collapseRechnung" role="button" aria-expanded="false" aria-controls="collapseRechnung">
                       <header className="payment-card-header cursor-pointer collapsed" data-toggle="collapse" data-target="#paypal" aria-expanded="false">
                         <div className="payment-card-title flexbox">
                           <h4>Überweisung</h4>
                         </div>
                         <div className="pull-right">
                           <img src={Überweisung} style={{width:"100px", height:"70px"}} className="img-responsive" alt=""/>
                         </div>
                       </header>
                     </div>
                     <div className="collapse" id="collapseRechnung">
                       <div className="card card-body">
                         <div className="left"  style={{textAlign: "left", padding: "10px"}}>
                         <input type="checkbox" onClick={()=>{  this.setState((prevState)=>{
                         return {überweisung: !prevState.überweisung};})}}/>
                          <a> Hiermit bestätige ich dass ich den Artikel {this.props.location.query.anfrage.hersteller?(this.props.location.query.anfrage.hersteller+" "):(null)}{this.props.location.query.anfrage.cardHeading}{this.props.location.query.anfrage.gewicht?(" "+this.props.location.query.anfrage.gewicht+"Kg"):(null)} per Überweisung bezahle</a>
                          <br/>
                          <button style={{ marginTop: "10px"}} onClick={this.ueberweisungPayment.bind(this)} className="btn theme-btn">Kontodaten anfordern</button>
                         </div>
                       </div>
                     </div>
                     <div className="payment-card" onClick={()=>{this.setState({meth:'barzahlen', loading:true})}} data-toggle="collapse" href="#collapseBar" role="button" aria-expanded="false" aria-controls="collapseBar">
                       <header className="payment-card-header cursor-pointer collapsed" data-toggle="collapse" data-target="#paypal" aria-expanded="false">
                         <div className="payment-card-title flexbox">
                           <h4>Bar Bezahlen</h4>
                         </div>
                         <div className="pull-right">
                         </div>
                       </header>
                     </div>
                     <div className="collapse" id="collapseBar">
                       <div className="card card-body">
                       <div className="left" style={{textAlign: "left", padding: "10px"}}>
                       <input type="checkbox" onClick={()=>{  this.setState((prevState)=>{
                       return {bar: !prevState.bar};})}}/>
                        <a> Hiermit bestätige ich dass ich den Artikel {this.props.location.query.anfrage.hersteller?(this.props.location.query.anfrage.hersteller+" "):(null)}{this.props.location.query.anfrage.cardHeading}{this.props.location.query.anfrage.gewicht?(" "+this.props.location.query.anfrage.gewicht+"Kg"):(null)} bar vorort bezahle</a>
                        <br/>
                        <button  style={{ marginTop: "10px"}} onClick={this.barPayment.bind(this)} className="btn theme-btn">Auftragsbestätigung anfordern</button>
                       </div>
                       </div>
                     </div>
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
