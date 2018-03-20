import React, {Component} from 'react';
import firebase from 'firebase';
import {NavLink, Redirect} from 'react-router-dom';
import backgroundImg from '../../../../img/backgroundPayment.jpg';
import moment from 'moment';
import diff from 'moment';


class Reservierung extends Component{
  constructor(props){
    super(props)
    this.handleChange = this.handleChange.bind(this);
    this.state={
      authenticated: false,
      redirect: false,
      detailsRedirect: false,
      redirectProfile: false,
      rabatt: false,
      originalSumme: this.props.location.query.Gesamtsumme,
      value: "Sehr geehrter Vermieter. Ich möchte gerne den Artikel im angegebenen Zeitraum anmieten. Bitte bestätigen Sie meine Anfrage!",
    }
}
handleChange(event) {
   this.setState({value: event.target.value});
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
      })
      }
    })
}
  Mieten(event){
    event.preventDefault;
    const tefNummer = this.numberInput.value;
    const email = this.emailInput.value;
    const messageI = this.messageInput.value;
    const startDate = moment(this.props.location.query.startDate).format("DD-MM-YYYY");
    const endDate = moment(this.props.location.query.endDate).format("DD-MM-YYYY");
    const num = Math.floor((Math.random() * 5000) + 1)


    const anfObj = {
      RechnungsAdresse: this.adresseInput.value,
      cardId: this.props.location.query.cardId,
      name: this.state.name,
      url: this.props.location.query.snap.imageUrl,
      cardHeading: this.props.location.query.snap.cardHeading,
      mietbeginn: startDate,
      mietende: endDate,
      uid: this.state.uid,
      tage: this.props.location.query.numberOfDays,
      umsatz: this.props.location.query.Gesamtsumme,
      num : num,
      nummer: tefNummer,
      email: email,
      new: true,
    }

    firebase.database().ref().child('app').child('users/' + this.state.uid)
    .child('/mitteilung/').child(this.state.name + num)
    .set({ bestätigt: false,
              cardId: this.props.location.query.cardId,
              anfrage: anfObj,
            })
    var currentDate = moment().format("HH-MM")
    const UserRef = firebase.database().ref().child('app')
    .child('users').child(this.state.uid)
    .child("anfragen/" +this.state.name + num);
    UserRef.set({
      RechnungsAdresse: this.adresseInput.value,
      cardId: this.props.location.query.cardId,
      name: this.state.name,
      url: this.props.location.query.snap.imageUrl,
      cardHeading: this.props.location.query.snap.cardHeading,
      mietbeginn: startDate,
      mietende: endDate,
      uid: this.state.uid,
      tage: this.props.location.query.numberOfDays,
      umsatz: this.props.location.query.Gesamtsumme,
      num : num,
      nachricht: {msg:messageI,date: currentDate},
      nummer: tefNummer,
      email: email,
      new: true,
    })
    this.setState({
      redirectProfile: true
    })

  }
        render(){
          if(this.state.redirect == true) {
            alert("Sie müssen sich zuerst einloggen oder registeren")
              return  <Redirect to="/"/>
          }
          if(this.state.redirectProfile == true) {
              return  <Redirect to="/benutzeraccount"/>
            }
        const Rabatt = this.props.location.query.Gesamtsumme*0.25;
        const startDate = moment(this.props.location.query.startDate).format("DD-MM-YYYY");
        const endDate = moment(this.props.location.query.endDate).format("DD-MM-YYYY");
        if(this.props.location.query.numberOfDays < 5){
          this.state.rabatt = false;
        }else{this.state.rabatt = true;
           this.props.location.query.Gesamtsumme = this.state.originalSumme/1.25}
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
                        {/* General Option  */}
                        <div className="detail-wrapper">
                          <div className="detail-wrapper-header">
                            <h4><i className="ti-files theme-cl mrg-r-10"></i>General Information</h4>
                          </div>
                          <div className="detail-wrapper-body">
                            <div className="row mrg-r-10 mrg-l-10">
                              <div className="col-sm-12">
                                <label>Name</label>
                                <input ref={(input) => { this.nameInput = input; }} type="text" placeholder={this.state.name} className="form-control"/>
                              </div>
                              <div className="col-sm-12">
                                <label>Email</label>
                                <input ref={(input) => { this.emailInput = input; }} type="email" className="form-control"/>
                              </div>
                              <div className="col-sm-12">
                                <label>Telefon</label>
                                <input type="text" ref={(input) => { this.numberInput = input; }} className="form-control"/>
                              </div>
                              <div className="col-sm-12">
                                <label>Adresse</label>
                                <input type="text" ref={(input) => { this.adresseInput = input; }} className="form-control"/>
                              </div>
                            </div>
                            <div className="col-sm-12">
                              <label>Adresse</label>
                              <textarea type="textarea" ref={(input) => { this.messageInput = input; }} value={this.state.value} onChange={this.handleChange}  className="form-control"/>
                            </div>
                            <div className="col-sm-6">
                              <a href="#" className="btn theme-btn form-control" style={{marginLeft:"8px" ,marginTop:"15px", marginBottom:"15px"}} onClick={this.Mieten.bind(this)} >unverbindlich Anfragen</a>
                            </div>
                          </div>
                        </div>
                        {/* End General Option  */}
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
                                  <img src={this.props.location.query.snap.imageUrl} className="img-responsive" alt=""/>
                                  <span className="like-listing"><i className="fa fa-heart-o" aria-hidden="true"></i></span>
                                </div>
                                <div className="listing-shot-caption">
                                  <h4>{this.props.location.query.snap.cardHeading}</h4>
                                  <p className="listing-location">{this.props.location.query.snap.standOrt}</p>
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
                                  <li>Ab<strong className="pull-right">{startDate}</strong></li>
                                  <li>Bis<strong className="pull-right">{endDate}</strong></li>
                                </ul>
                              </div>

                              {/* Your Stay */}
                              <div className="booking-price-detail side-list no-border">
                                <h5>Kosten</h5>
                                <ul>
                                  <li>{this.props.location.query.numberOfDays}<strong className="pull-right">{this.state.originalSumme}€</strong></li>
                                  <li>Rabatt( ab 5 Tagen){this.state.rabatt ?(<strong className="pull-right">{this.props.location.query.Gesamtsumme*0.25}€</strong>):(<strong className="pull-right">0€</strong>)}</li>
                                </ul>
                              </div>

                              {/* Total Cost */}
                              <div className="booking-price-detail side-list no-border">
                                <ul>
                                  <li>Endpreis<strong className="theme-cl pull-right">{this.props.location.query.Gesamtsumme}€</strong></li>
                                </ul>
                              </div>

                            </div>

                          </div>
                        </div>
                      </div>

                    </div>
                  </section>
                  {/* ================ End Payment Methode Section ======================= */}

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
            )
        }
    }

export default Reservierung;