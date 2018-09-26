import React, {Component} from 'react';
import firebase from 'firebase';
import {NavLink, Redirect} from 'react-router-dom';
import backgroundImg from '../../../../img/backgroundPayment.jpg';
import moment from 'moment';
import diff from 'moment';
import Logo from '../../../../img/logo.png'
import { connect } from 'react-redux';
import { fetchNavbar } from '../../../../actions/navbarAction';



class Reservierung extends Component{
  constructor(props){
    super(props)
    this.handleChange = this.handleChange.bind(this);
    this.state={
      authenticated: false,
      redirect: false,
      redirectProfile: false,
      rabatt: false,
      Gesamtsumme: this.props.location.query.Gesamtsumme,
      value: "Hallo "+this.props.location.query.snap.vermieter+". Ich möchte gerne den Artikel "+this.props.location.query.snap.cardHeading+" im angegebenen Zeitraum anmieten. Bitte bestätige meine Anfrage!",
    }
}

componentWillMount(){
this.props.fetchNavbar(false)

}

handleChange(event) {
   this.setState({value: event.target.value});
 }



loadUser(){
    const uid = this.props.authState.uid;
    firebase.database().ref('app/').child('users/'+uid)
    .on('value', snap => {
        if(snap.val()){
          if(snap.val().anfragen == null){
          this.setState({
            controll: true,
            anfragen: 0,
            cardId: snap.val().cardId,
            url: snap.val().url,
            name: snap.val().name,
            rechnungsadresse:snap.val().rechnungsadresse,
            adresse: snap.val().adresse,
            geboren: snap.val().geburtsDatum,
            mobil: snap.val().mobil,
            telefon: snap.val().telefon,
          })
      }else{
            this.setState({
            rechnungsadresse:snap.val().rechnungsadresse,
            anfragen: snap.val().anfragen,
            cardId: snap.val().cardId,
            url: snap.val().url,
            name: snap.val().name,
            adresse: snap.val().adresse,
            geboren: snap.val().geburtsDatum,
            mobil: snap.val().mobil,
            telefon: snap.val().telefon,
          })
        }

      }

  })
}
  Mieten(event){
    event.preventDefault;
    let hersteller =this.props.location.query.snap.hersteller;
    let gewicht =this.props.location.query.snap.gewicht;
    let timestamp =window.Date.now()

    if (hersteller == undefined){
       hersteller = 'undefined';
    }
    if (gewicht == undefined){
       gewicht = 'undefined';
    }


    const tefNummer = this.numberInput.value;
    const email = this.emailInput.value;
    const message = this.messageInput.value;
    const startDate = moment(this.props.location.query.startDate).format("DD-MM-YYYY");
    const endDate = moment(this.props.location.query.endDate).format("DD-MM-YYYY");
    const num = Math.floor((Math.random() * 5000) + 1)
    let ref = this.props.authState.name.split(' ').join('-') + num
    let randomeKey = ""
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 28; i++){
    randomeKey += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    const anfObj = {
      bestätigt: false,
      RechnungsAdresse: this.rechnungsadresseInput.value,
      cardId: this.props.location.query.cardId,
      name: this.props.authState.name,
      url: this.props.location.query.snap.imageUrl,
      cardHeading: this.props.location.query.snap.cardHeading,
      mietbeginn: startDate,
      mietende: endDate,
      ArtikelOwnerId: this.props.location.query.snap.uid,
      uid: this.props.authState.uid,
      tage: this.props.location.query.numberOfDays,
      umsatz: this.props.location.query.Gesamtsumme,
      num : num,
      nummer: tefNummer,
      ArtikelOwnerEmail: this.props.location.query.snap.email,
      telefon: this.props.location.query.snap.telefon,
      email: email,
      new: true,
      vermieter: this.props.location.query.snap.vermieter,
      hersteller: hersteller,
      gewicht: gewicht,
    }

    firebase.database().ref().child('app').child('users/' + this.porps.authState.uid)
    .child('/mitteilung/').child(ref)
    .set({ bestätigt: false,
              cardId: this.props.location.query.cardId,
              anfrage: anfObj,
              timestamp: timestamp
            })
    firebase.database().ref().child('app').child('users/' + this.props.authState.uid)
    .child('/gestellteAnfragen/').child(ref)
    .set({ cardHeading:this.props.location.query.snap.cardHeading,
            mietbeginn:startDate,
            mietende:endDate,
            email:email
            })
    var Time = moment().format("HH:MM")
    var Date = moment().format("DD-MM-YY")
    const UserRef = firebase.database().ref().child('app')
    .child('users').child(this.props.location.query.snap.uid)
    .child("anfragen/" +ref);
    UserRef.set({
      timestamp: timestamp,
      bestätigt: false,
      RechnungsAdresse: this.rechnungsadresseInput.value,
      cardId: this.props.location.query.cardId,
      name: this.props.authState.name,
      url: this.props.location.query.snap.imageUrl,
      cardHeading: this.props.location.query.snap.cardHeading,
      mietbeginn: startDate,
      mietende: endDate,
      ArtikelOwnerId: this.props.location.query.snap.uid,
      ArtikelOwnerEmail: this.props.location.query.snap.email,
      telefon: this.props.location.query.snap.telefon,
      uid: this.props.authState.uid,
      tage: this.props.location.query.numberOfDays,
      umsatz: this.props.location.query.Gesamtsumme,
      num : num,
      nummer: tefNummer,
      email: email,
      new: true,
      vermieter: this.props.location.query.snap.vermieter,
      hersteller: hersteller,
      gewicht: gewicht,

    })

    firebase.database().ref().child('app').child('messages').push({
      senderUid: this.props.location.query.snap.uid,
      receiverUid:this.props.authState.uid,
      sender: this.props.authState.name,
      receiver: this.props.location.query.snap.vermieter,
      read: false,
      message:{"-AAAAAAAAAAAAAAAAAAAA":{message: message,
                          sender: this.props.authState.name,
                          time: Time,
                          date: Date}
              }
    })

    this.setState({
      redirectProfile: true
    })

  }
        render(){

          if(this.state.redirectProfile === true) {
              return  <Redirect to="/benutzeraccount"/>
            }
            if(this.props.authState.authenticated == false) {
              alert("Du musst dich zuerst einloggen oder registeren")
                return  <Redirect  to={{pathname:`${this.props.location.query.browserHistory}`}}/>
            }
        const startDate = moment(this.props.location.query.startDate).format("DD-MM-YYYY");
        const endDate = moment(this.props.location.query.endDate).format("DD-MM-YYYY");



          return(
              <div>
                <div className="wrapper">

                  {/* End Navigation */}

                  {/* ================ Start Page Title ======================= */}
                  <section className="title-transparent page-title" style={{ background:`url(${backgroundImg})`}}>
                    <div className="container">
                      <div className="title-content">
                        <h1>Reserviere jetzt einfach und unverbindlich</h1>
                        <div className="breadcrumbs">
                          <a href="#">Wähle deine</a>
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
                            <h4><i className="ti-files theme-cl mrg-r-10"></i>Unverbindliche reservierungs Anfrage </h4>
                          </div>
                          <div className="detail-wrapper-body">
                            <div className="row mrg-r-10 mrg-l-10">
                              <div className="col-sm-12">
                                <label>Name</label>
                                <input ref={(input) => { this.nameInput = input; }} type="text" value={this.props.authState.name} className="form-control" />
                              </div>
                              <div className="col-sm-12">
                                <label>Email</label>
                                <input ref={(input) => { this.emailInput = input; }} value={this.props.authState.email} type="email" className="form-control" />
                              </div>
                              <div className="col-sm-12">
                                <label>Telefon</label>
                                <input type="text" ref={(input) => { this.numberInput = input; }} value={this.state.telefon} className="form-control" />
                              </div>
                              <div className="col-sm-12">
                                <label>Rechnungsadresse</label>
                                <input type="text" ref={(input) => { this.rechnungsadresseInput = input; }} value={this.state.rechnungsadresse} className="form-control"/>
                              </div>
                            </div>
                            <div className="col-sm-12">
                              <label>Nachricht</label>
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
                                  <li>{this.props.location.query.numberOfDays}<strong className="pull-right">{this.state.Gesamtsumme}€</strong></li>
                                </ul>
                              </div>

                              {/* Total Cost */}
                              <div className="booking-price-detail side-list no-border">
                                <ul>
                                  <li>Endpreis<strong className="theme-cl pull-right">{this.state.Gesamtsumme}€</strong></li>
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

  const mapStateToProps = state => ({
    authState: state.authState.items
  })

export default connect(mapStateToProps, { fetchNavbar }) (Reservierung);
