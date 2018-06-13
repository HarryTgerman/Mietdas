import React, {Component} from 'react';
import 'react-dates/initialize';
import { DateRangePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import moment from 'moment';
import momentPropTypes from 'react-moment-proptypes';
import firebase from 'firebase';
import {Redirect, NavLink, Link} from 'react-router-dom'
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from 'react-image-gallery';
import Logo from '../../../../img/logo.png'


class MietDetails extends Component{
  constructor (props){
  super(props)
  this.state={
    Gesamtsumme: "Zeitraum auswählen",
    endDate: "",
    startDate: "",
    focusedInput: "",
    loading: false,
    textShort: true,
    vermieterLoading: true,
  }
}



componentWillMount(){
    const url = this.props.location.pathname;
    const ref = url.split('=');
    const cardId = ref[1];
    const urlPromis =  new Promise ((resolve, reject)=>{
    firebase.database().ref().child('app').child('cards')
      .child(cardId)
      .once('value', snap => {
          this.setState ({
            snap: snap.val(),
            cardId: snap.key,
            imageUrl: snap.val().imageUrl,
          },()=>{
            const images =[]
              this.state.snap.imageArr.map(img =>{
                images.push({
                  original: img,
                  thumbnail: img,
                })
              })
              this.setState({
                images: images,
                loading: true,
              })
            if (this.state.numberOfDays == undefined) {this.setState({numberOfDays : "1 Tag", Diff: 1}) }
            firebase.database().ref().child('app').child('users/' +this.state.snap.uid)
            .once('value', snap =>{
              this.setState({
                vermieterLoading: false,
                vermieterUrl: snap.val().url,
              },resolve())
            })
          })
      })
    })

    urlPromis.then(()=>{firebase.auth().onAuthStateChanged((user)=>{

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
  })
  }




        render(){
          moment.locale('de')
          let path = this.props.location.pathname
          return(
              <div>
                		{this.state.loading ?(<div className="wrapper">
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
                            :(<li><a  href="javascript:void(2)"  data-toggle="modal" data-target="#signup">Log-In</a></li>)}
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
                			<div className="clearfix"></div>




                			{/* ================ Listing Detail Full Information ======================= */}
                			<section className="list-detail">
                				<div className="container">
                					<div className="row detailsRow">
                						{/* Start: Listing Detail Wrapper */}
                						<div className="col-md-8 col-sm-8">
                							<div className="detail-wrapper">
                								<div className="detail-wrapper-body">
                									<div className="listing-title-bar">
                										<h3>{this.state.snap.hersteller?(this.state.snap.hersteller+" "):(null)}{this.state.snap.cardHeading}{this.state.snap.gewicht?(" "+this.state.snap.gewicht+"Kg"):(null)}</h3>
                										<div className="row">
                											<a href="#listing-location" className="listing-address col-sm-5">
                												<i className="ti-location-pin mrg-r-5"></i>
                												{this.state.snap.ort}
                											</a>
                											<div className="rating-box col-sm-5 starBox">
                												<div className="detail-list-rating">
                													<i className="fa fa-star"></i>
                													<i className="fa fa-star"></i>
                													<i className="fa fa-star"></i>
                													<i className="fa fa-star"></i>
                													<i className="fa fa-star"></i>
                												</div>
                											</div>
                										</div>
                									</div>
                                  <figure className="img-holder ">
                                    <a><ImageGallery items={this.state.images} showPlayButton={false} className="detailsImg" alt="News"/></a>
                                    <div className="blog-post-date theme-bg">
                											{this.state.snap.cardPreis}€ Pro Tag
                										</div>
                                  </figure>
                								</div>
                							</div>

                							<div className="detail-wrapper">
                								<div className="detail-wrapper-header">
          							         <h4>Technische Daten</h4>
                								</div>
                                <div className="widget-boxed-body">
                                  <div className="side-list">
                                    <div className="reviews-box">
                                    {this.state.snap.gewicht?(<div><div className="detailsCategory col-sm-5 col-md-5">
                                      Gewicht
                                    </div>
                                    <div className="col-sm-5 col-md-5">
                                      <p>{this.state.snap.gewicht} kg</p>
                                    </div></div>):(null)}
                                  {this.state.snap.hersteller?(<div><div className="detailsCategory col-sm-5 col-md-5">
                                      Hersteller
                                    </div>
                                    <div className="col-sm-5 col-md-5">
                                      <p>{this.state.snap.hersteller}</p>
                                    </div></div>):(null)}
                                      <div>
                                        {this.state.snap.laenge?
                                        (<React.Fragment>
                                          <div className="detailsCategory col-sm-5 col-md-5">
                                            Länge
                                          </div>
                                          <div className="col-sm-5 col-md-5">
                                            <p>{this.state.snap.laenge} cm</p>
                                          </div>
                                        </React.Fragment>
                                        ):(null)}
                                        {this.state.snap.materialConLaenge?
                                        (<React.Fragment>
                                          <div className="detailsCategory col-sm-5 col-md-5">
                                            Länge
                                          </div>
                                          <div className="col-sm-5 col-md-5">
                                            <p>{this.state.snap.materialConLaenge} cm</p>
                                          </div>
                                        </React.Fragment>
                                        ):(null)}
                                        {this.state.snap.materialConHoehe?
                                        (<React.Fragment>
                                          <div className="detailsCategory col-sm-5 col-md-5">
                                            Breite
                                          </div>
                                          <div className="col-sm-5 col-md-5">
                                            <p>{this.state.snap.materialConHoehe} cm</p>
                                          </div>
                                        </React.Fragment>
                                        ):(null)}
                                        {this.state.snap.materialConBreite?
                                        (<React.Fragment>
                                          <div className="detailsCategory col-sm-5 col-md-5">
                                            Höhe
                                          </div>
                                          <div className="col-sm-5 col-md-5">
                                            <p>{this.state.snap.materialConBreite} cm</p>
                                          </div>
                                        </React.Fragment>
                                        ):(null)}
                                        {this.state.snap.trog?
                                        (<React.Fragment>
                                          <div className="detailsCategory col-sm-5 col-md-5">
                                            Trog
                                          </div>
                                          <div className="col-sm-5 col-md-5">
                                            <p>{this.state.snap.trog} cm</p>
                                          </div>
                                        </React.Fragment>
                                        ):(null)}
                                        {this.state.snap.abmessungen?
                                        (<React.Fragment>
                                          <div className="detailsCategory col-sm-5 col-md-5">
                                            Abmessungen
                                          </div>
                                          <div className="col-sm-5 col-md-5">
                                            <p>{this.state.snap.abmessungen} cm</p>
                                          </div>
                                        </React.Fragment>
                                        ):(null)}
                                        {this.state.snap.fraese?
                                        (<React.Fragment>
                                          <div className="detailsCategory col-sm-5 col-md-5">
                                            Frästiefe
                                          </div>
                                          <div className="col-sm-5 col-md-5">
                                            <p>{this.state.snap.fraese} cm</p>
                                          </div>
                                        </React.Fragment>
                                        ):(null)}
                                        {this.state.snap.motor?
                                        (<React.Fragment>
                                          <div className="detailsCategory col-sm-5 col-md-5">
                                            Motor
                                          </div>
                                          <div className="col-sm-5 col-md-5">
                                            <p>{this.state.snap.motor}</p>
                                          </div>
                                        </React.Fragment>
                                        ):(null)}
                                        {this.state.snap.schnitttiefe?
                                        (<React.Fragment>
                                          <div className="detailsCategory col-sm-5 col-md-5">
                                            Schnitttiefe
                                          </div>
                                          <div className="col-sm-5 col-md-5">
                                            <p>{this.state.snap.schnitttiefe} cm</p>
                                          </div>
                                        </React.Fragment>
                                        ):(null)}
                                        {this.state.snap.gerauuschpegel?
                                        (<React.Fragment>
                                          <div className="detailsCategory col-sm-5 col-md-5">
                                            Geräuschpegel
                                          </div>
                                          <div className="col-sm-5 col-md-5">
                                            <p>{this.state.snap.gerauuschpegel} dB</p>
                                          </div>
                                        </React.Fragment>
                                        ):(null)}
                                        {this.state.snap.durchmesser?
                                        (<React.Fragment>
                                          <div className="detailsCategory col-sm-5 col-md-5">
                                            Durchmesser
                                          </div>
                                          <div className="col-sm-5 col-md-5">
                                            <p>{this.state.snap.durchmesser} cm</p>
                                          </div>
                                        </React.Fragment>
                                        ):(null)}
                                        {this.state.snap.schnittlaenge?
                                        (<React.Fragment>
                                          <div className="detailsCategory col-sm-5 col-md-5">
                                            Schnittlänge
                                          </div>
                                          <div className="col-sm-5 col-md-5">
                                            <p>{this.state.snap.schnittlaenge} cm</p>
                                          </div>
                                        </React.Fragment>
                                        ):(null)}
                                        {this.state.snap.schnittbreite?
                                        (<React.Fragment>
                                          <div className="detailsCategory col-sm-5 col-md-5">
                                            Schnittbreite
                                          </div>
                                          <div className="col-sm-5 col-md-5">
                                            <p>{this.state.snap.schnittbreite} cm</p>
                                          </div>
                                        </React.Fragment>
                                        ):(null)}
                                        {this.state.snap.bandagenbreite?(
                                        <React.Fragment>
                                          <div className="detailsCategory col-sm-5 col-md-5">
                                            Bandagenbreite
                                          </div>
                                          <div className="col-sm-5 col-md-5">
                                            <p>{this.state.snap.bandagenbreite} cm</p>
                                          </div>
                                        </React.Fragment>):(null)}
                                        {this.state.snap.maxFuellmenge?(
                                        <React.Fragment>
                                          <div className="detailsCategory col-sm-5 col-md-5">
                                            Max. Füllmenge
                                          </div>
                                          <div className="col-sm-5 col-md-5">
                                            <p>{this.state.snap.maxFuellmenge} Liter</p>
                                          </div>
                                        </React.Fragment>):(null)}
                                        {this.state.snap.spannung?(
                                        <React.Fragment>
                                          <div className="detailsCategory col-sm-5 col-md-5">
                                            Spannung
                                          </div>
                                          <div className="col-sm-5 col-md-5">
                                            <p>{this.state.snap.spannung} V</p>
                                          </div>
                                        </React.Fragment>):(null)}
                                        {this.state.snap.einzelschlagstärke?(
                                        <React.Fragment>
                                          <div className="detailsCategory col-sm-5 col-md-5">
                                            Einzelschlagstärke
                                          </div>
                                          <div className="col-sm-5 col-md-5">
                                            <p>{this.state.snap.einzelschlagstärke} </p>
                                          </div>
                                        </React.Fragment>):(null)}
                                        {this.state.snap.aufname?(
                                        <React.Fragment>
                                          <div className="detailsCategory col-sm-5 col-md-5">
                                            Aufname
                                          </div>
                                          <div className="col-sm-5 col-md-5">
                                            <p>{this.state.snap.aufname}</p>
                                          </div>
                                        </React.Fragment>):(null)}
                                        {this.state.snap.bohrdurchmesser?(
                                        <React.Fragment>
                                          <div className="detailsCategory col-sm-5 col-md-5">
                                            Bohrdurchmesser
                                          </div>
                                          <div className="col-sm-5 col-md-5">
                                            <p>{this.state.snap.bohrdurchmesser} cm</p>
                                          </div>
                                        </React.Fragment>):(null)}
                                        {this.state.snap.bohrkrone?(
                                        <React.Fragment>
                                          <div className="detailsCategory col-sm-5 col-md-5">
                                            Bohrkrone
                                          </div>
                                          <div className="col-sm-5 col-md-5">
                                            <p>{this.state.snap.bohrkrone}</p>
                                          </div>
                                        </React.Fragment>):(null)}
                                        {this.state.snap.muldeninhalt?(
                                        <React.Fragment>
                                          <div className="detailsCategory col-sm-5 col-md-5">
                                            Muldeninhalt
                                          </div>
                                          <div className="col-sm-5 col-md-5">
                                            <p>{this.state.snap.muldeninhalt} m³</p>
                                          </div>
                                        </React.Fragment>):(null)}
                                        {this.state.snap.breite?
                                        (<React.Fragment>
                                          <div className="detailsCategory col-sm-5 col-md-5">
                                            Breite
                                          </div>
                                          <div className="col-sm-5 col-md-5">
                                            <p>{this.state.snap.breite} cm</p>
                                          </div>
                                        </React.Fragment>
                                        ):(null)}
                                        {this.state.snap.hoehe?
                                        (<React.Fragment>
                                          <div className="detailsCategory col-sm-5 col-md-5">
                                            Höhe
                                          </div>
                                          <div className="col-sm-5 col-md-5">
                                            <p>{this.state.snap.hoehe} cm</p>
                                          </div>
                                        </React.Fragment>
                                        ):(null)}
                                        {this.state.snap.reichweite?
                                        (<React.Fragment>
                                          <div className="detailsCategory col-sm-5 col-md-5">
                                            Reichweite
                                          </div>
                                          <div className="col-sm-5 col-md-5">
                                            <p>{this.state.snap.reichweite} cm</p>
                                          </div>
                                        </React.Fragment>
                                        ):(null)}
                                        {this.state.snap.schuetthoehe?
                                        (<React.Fragment>
                                          <div className="detailsCategory col-sm-5 col-md-5">
                                            Schütthöhe
                                          </div>
                                          <div className="col-sm-5 col-md-5">
                                            <p>{this.state.snap.schuetthoehe} cm</p>
                                          </div>
                                        </React.Fragment>
                                        ):(null)}
                                      {this.state.snap.grabtiefe?
                                      (<React.Fragment>
                                        <div className="detailsCategory col-sm-5 col-md-5">
                                          Grabtiefe
                                        </div>
                                        <div className="col-sm-5 col-md-5">
                                          <p>{this.state.snap.grabtiefe} cm</p>
                                        </div>
                                      </React.Fragment>
                                      ):(null)}
                                      {this.state.snap.gesamtgewicht?(
                                      <React.Fragment>
                                        <div className="detailsCategory col-sm-5 col-md-5">
                                          Gesamtgewicht
                                        </div>
                                        <div className="col-sm-5 col-md-5">
                                          <p>{this.state.snap.gesamtgewicht} kg</p>
                                        </div>
                                      </React.Fragment>):(null)}
                                      {this.state.snap.arbeitshoehe?(
                                      <React.Fragment>
                                        <div className="detailsCategory col-sm-5 col-md-5">
                                          Arbeitshöhe
                                        </div>
                                        <div className="col-sm-5 col-md-5">
                                          <p>{this.state.snap.arbeitshoehe} kg</p>
                                        </div>
                                      </React.Fragment>):(null)}
                                      {this.state.snap.nutzlast?(
                                      <React.Fragment>
                                        <div className="detailsCategory col-sm-5 col-md-5">
                                          Nutzlast
                                        </div>
                                        <div className="col-sm-5 col-md-5">
                                          <p>{this.state.snap.nutzlast} kg</p>
                                        </div>
                                      </React.Fragment>):(null)}
                                      {this.state.snap.auflaufbremse?(
                                      <React.Fragment>
                                        <div className="detailsCategory col-sm-5 col-md-5">
                                          Auflaufbremse
                                        </div>
                                        <div className="col-sm-5 col-md-5">
                                          <p>{this.state.snap.auflaufbremse}</p>
                                        </div>
                                      </React.Fragment>):(null)}
                                      {this.state.snap.gesamthoeheLadeboard?(
                                      <React.Fragment>
                                        <div className="detailsCategory col-sm-5 col-md-5">
                                          Gesamthöhe Ladeboard
                                        </div>
                                        <div className="col-sm-5 col-md-5">
                                          <p>{this.state.snap.gesamthoeheLadeboard} cm</p>
                                        </div>
                                      </React.Fragment>):(null)}
                                      {this.state.snap.gesamthoeheSpriegel?(
                                      <React.Fragment>
                                        <div className="detailsCategory col-sm-5 col-md-5">
                                          Gesamthöhe Spriegel
                                        </div>
                                        <div className="col-sm-5 col-md-5">
                                          <p>{this.state.snap.gesamthoeheSpriegel} cm</p>
                                        </div>
                                      </React.Fragment>):(null)}
                                      {this.state.snap.gesamtbreite?(
                                      <React.Fragment>
                                        <div className="detailsCategory col-sm-5 col-md-5">
                                          Gesamtbreite
                                        </div>
                                        <div className="col-sm-5 col-md-5">
                                          <p>{this.state.snap.gesamtbreite} cm</p>
                                        </div>
                                      </React.Fragment>):(null)}
                                      {this.state.snap.gesamthoehe?(
                                      <React.Fragment>
                                        <div className="detailsCategory col-sm-5 col-md-5">
                                          Gesamthöhe
                                        </div>
                                        <div className="col-sm-5 col-md-5">
                                          <p>{this.state.snap.gesamthoehe} cm</p>
                                        </div>
                                      </React.Fragment>):(null)}
                                      {this.state.snap.plattform?(
                                      <React.Fragment>
                                        <div className="detailsCategory col-sm-5 col-md-5">
                                          Plattform
                                        </div>
                                        <div className="col-sm-5 col-md-5">
                                          <p>{this.state.snap.plattform} </p>
                                        </div>
                                      </React.Fragment>):(null)}
                                      {this.state.snap.traglast?(
                                      <React.Fragment>
                                        <div className="detailsCategory col-sm-5 col-md-5">
                                          Traglast
                                        </div>
                                        <div className="col-sm-5 col-md-5">
                                          <p>{this.state.snap.traglast} kg</p>
                                        </div>
                                      </React.Fragment>):(null)}
                                      {this.state.snap.antrieb?(
                                      <React.Fragment>
                                        <div className="detailsCategory col-sm-5 col-md-5">
                                          Antrieb
                                        </div>
                                        <div className="col-sm-5 col-md-5">
                                          <p>{this.state.snap.antrieb} </p>
                                        </div>
                                      </React.Fragment>):(null)}
                                      {this.state.snap.abstuetzbreite?(
                                      <React.Fragment>
                                        <div className="detailsCategory col-sm-5 col-md-5">
                                          Abstützbreite
                                        </div>
                                        <div className="col-sm-5 col-md-5">
                                          <p>{this.state.snap.abstuetzbreite} cm</p>
                                        </div>
                                      </React.Fragment>):(null)}
                                      {this.state.snap.abstuetzlaenge?(
                                      <React.Fragment>
                                        <div className="detailsCategory col-sm-5 col-md-5">
                                          Abstützlänge
                                        </div>
                                        <div className="col-sm-5 col-md-5">
                                          <p>{this.state.snap.abstuetzlaenge} cm</p>
                                        </div>
                                      </React.Fragment>):(null)}
                                      {this.state.snap.gesamtlaenge?(
                                      <React.Fragment>
                                        <div className="detailsCategory col-sm-5 col-md-5">
                                          Gesamtlänge
                                        </div>
                                        <div className="col-sm-5 col-md-5">
                                          <p>{this.state.snap.gesamtlaenge} cm</p>
                                        </div>
                                      </React.Fragment>):(null)}
                                      {this.state.snap.innenhoehe?(
                                      <React.Fragment>
                                        <div className="detailsCategory col-sm-5 col-md-5">
                                          Innenhöhe
                                        </div>
                                        <div className="col-sm-5 col-md-5">
                                          <p>{this.state.snap.innenhoehe} cm</p>
                                        </div>
                                      </React.Fragment>):(null)}
                                      {this.state.snap.innenladehoehe?(
                                      <React.Fragment>
                                        <div className="detailsCategory col-sm-5 col-md-5">
                                          Innenladehöhe
                                        </div>
                                        <div className="col-sm-5 col-md-5">
                                          <p>{this.state.snap.innenladehoehe} cm</p>
                                        </div>
                                      </React.Fragment>):(null)}
                                      {this.state.snap.innenbreite?(
                                      <React.Fragment>
                                        <div className="detailsCategory col-sm-5 col-md-5">
                                          Innenbreite
                                        </div>
                                        <div className="col-sm-5 col-md-5">
                                          <p>{this.state.snap.innenbreite} cm</p>
                                        </div>
                                      </React.Fragment>):(null)}
                                      {this.state.snap.innenlaenge?(
                                      <React.Fragment>
                                        <div className="detailsCategory col-sm-5 col-md-5">
                                          Innenlänge
                                        </div>
                                        <div className="col-sm-5 col-md-5">
                                          <p>{this.state.snap.innenlaenge} cm</p>
                                        </div>
                                      </React.Fragment>):(null)}
                                      {this.state.snap.ladehöhe?(
                                      <React.Fragment>
                                        <div className="detailsCategory col-sm-5 col-md-5">
                                          Ladehöhe
                                        </div>
                                        <div className="col-sm-5 col-md-5">
                                          <p>{this.state.snap.ladehöhe} cm</p>
                                        </div>
                                      </React.Fragment>):(null)}
                                      {this.state.snap.hundertkmh?(
                                      <React.Fragment>
                                        <div className="detailsCategory col-sm-5 col-md-5">
                                          100 km/h Zulassung
                                        </div>
                                        <div className="col-sm-5 col-md-5">
                                          <p>{this.state.snap.hundertkmh}</p>
                                        </div>
                                      </React.Fragment>):(null)}
                                      {this.state.snap.arbeitsbreite?(
                                      <React.Fragment>
                                        <div className="detailsCategory col-sm-5 col-md-5">
                                          Arbeitsbreite
                                        </div>
                                        <div className="col-sm-5 col-md-5">
                                          <p>{this.state.snap.arbeitsbreite} cm</p>
                                        </div>
                                      </React.Fragment>):(null)}
                                      {this.state.snap.kraftstoff?(
                                      <React.Fragment>
                                        <div className="detailsCategory col-sm-5 col-md-5">
                                          Kraftstoff
                                        </div>
                                        <div className="col-sm-5 col-md-5">
                                          <p>{this.state.snap.kraftstoff}</p>
                                        </div>
                                      </React.Fragment>):(null)}
                                      {this.state.snap.ruettelkraft?(
                                      <React.Fragment>
                                        <div className="detailsCategory col-sm-5 col-md-5">
                                          Rüttelkraft
                                        </div>
                                        <div className="col-sm-5 col-md-5">
                                          <p>{this.state.snap.ruettelkraft} kN</p>
                                        </div>
                                      </React.Fragment>):(null)}
                                      {this.state.snap.schaufelinhalt?(
                                      <React.Fragment>
                                        <div className="detailsCategory col-sm-5 col-md-5">
                                          Schaufelinhalt
                                        </div>
                                        <div className="col-sm-5 col-md-5">
                                          <p>{this.state.snap.schaufelinhalt} m³</p>
                                        </div>
                                      </React.Fragment>):(null)}
                                      {this.state.snap.laengeDerLadeflaeche?(
                                      <React.Fragment>
                                        <div className="detailsCategory col-sm-5 col-md-5">
                                          Länge der Ladefläche
                                        </div>
                                        <div className="col-sm-5 col-md-5">
                                          <p>{this.state.snap.laengeDerLadeflaeche} cm</p>
                                        </div>
                                      </React.Fragment>):(null)}
                                      {this.state.snap.breiteDerLadeflaeche?(
                                      <React.Fragment>
                                        <div className="detailsCategory col-sm-5 col-md-5">
                                          Breite der Ladefläche
                                        </div>
                                        <div className="col-sm-5 col-md-5">
                                          <p>{this.state.snap.breiteDerLadeflaeche} cm</p>
                                        </div>
                                      </React.Fragment>):(null)}
                                      {this.state.snap.hoeheDerLadeflaeche?(
                                      <React.Fragment>
                                        <div className="detailsCategory col-sm-5 col-md-5">
                                          Höhe der Ladefläche
                                        </div>
                                        <div className="col-sm-5 col-md-5">
                                          <p>{this.state.snap.hoeheDerLadeflaeche} cm</p>
                                        </div>
                                      </React.Fragment>):(null)}
                                      {this.state.snap.laderaumvolumen?(
                                      <React.Fragment>
                                        <div className="detailsCategory col-sm-5 col-md-5">
                                          Laderaumvolumen
                                        </div>
                                        <div className="col-sm-5 col-md-5">
                                          <p>{this.state.snap.laderaumvolumen} m³</p>
                                        </div>
                                      </React.Fragment>):(null)}
                                      {this.state.snap.volumenstrom?(
                                      <React.Fragment>
                                        <div className="detailsCategory col-sm-5 col-md-5">
                                          Volumenstrom
                                        </div>
                                        <div className="col-sm-5 col-md-5">
                                          <p>{this.state.snap.volumenstrom} m³/min</p>
                                        </div>
                                      </React.Fragment>):(null)}
                                      {this.state.snap.leerGewicht?(
                                      <React.Fragment>
                                        <div className="detailsCategory col-sm-5 col-md-5">
                                          Leergewicht
                                        </div>
                                        <div className="col-sm-5 col-md-5">
                                          <p>{this.state.snap.leerGewicht} kg</p>
                                        </div>
                                      </React.Fragment>):(null)}
                                      {this.state.snap.gesamtGewicht?(
                                      <React.Fragment>
                                        <div className="detailsCategory col-sm-5 col-md-5">
                                          Gesamtgewicht
                                        </div>
                                        <div className="col-sm-5 col-md-5">
                                          <p>{this.state.snap.gesamtGewicht} kg</p>
                                        </div>
                                      </React.Fragment>):(null)}
                                      {this.state.snap.transportmasse?(
                                      <React.Fragment>
                                        <div className="detailsCategory col-sm-5 col-md-5">
                                          Transportmaße
                                        </div>
                                        <div className="col-sm-5 col-md-5">
                                          <p>{this.state.snap.transportmasse} </p>
                                        </div>
                                      </React.Fragment>):(null)}
                                      {this.state.snap.sitzplaetze?(
                                      <React.Fragment>
                                        <div className="detailsCategory col-sm-5 col-md-5">
                                          Sitzplätze
                                        </div>
                                        <div className="col-sm-5 col-md-5">
                                          <p>{this.state.snap.sitzplaetze}</p>
                                        </div>
                                      </React.Fragment>):(null)}
                                      {this.state.snap.leistung?(
                                      <React.Fragment>
                                        <div className="detailsCategory col-sm-5 col-md-5">
                                          Leistung
                                        </div>
                                        <div className="col-sm-5 col-md-5">
                                          <p>{this.state.snap.leistung} PS/KW</p>
                                        </div>
                                      </React.Fragment>):(null)}
                                      {this.state.snap.druckbereich?(
                                      <React.Fragment>
                                        <div className="detailsCategory col-sm-5 col-md-5">
                                          Druckbereich
                                        </div>
                                        <div className="col-sm-5 col-md-5">
                                          <p>{this.state.snap.druckbereich} bar</p>
                                        </div>
                                      </React.Fragment>):(null)}
                                      {this.state.snap.anhaengerlastUngebremst?(
                                      <React.Fragment>
                                        <div className="detailsCategory col-sm-5 col-md-5">
                                          Anhängerlast Ungebremst
                                        </div>
                                        <div className="col-sm-5 col-md-5">
                                          <p>{this.state.snap.anhaengerlastUngebremst} kg</p>
                                        </div>
                                      </React.Fragment>):(null)}
                                      {this.state.snap.anhaengerlastGebremst?(
                                      <React.Fragment>
                                        <div className="detailsCategory col-sm-5 col-md-5">
                                          Anhängerlast Gebremst
                                        </div>
                                        <div className="col-sm-5 col-md-5">
                                          <p>{this.state.snap.anhaengerlastGebremst} kg</p>
                                        </div>
                                      </React.Fragment>):(null)}
                                      {this.state.snap.stuetzlast?(
                                      <React.Fragment>
                                        <div className="detailsCategory col-sm-5 col-md-5">
                                          Stützlast
                                        </div>
                                        <div className="col-sm-5 col-md-5">
                                          <p>{this.state.snap.stuetzlast} kg</p>
                                        </div>
                                      </React.Fragment>):(null)}
                                      {this.state.snap.inklAuffahrampen?
                                      (<React.Fragment>
                                        <div className="detailsCategory col-sm-5 col-md-5">
                                          Auffahrampe
                                        </div>
                                        <div className="col-sm-5 col-md-5">
                                          <p>{this.state.snap.inklAuffahrampen}</p>
                                        </div>
                                      </React.Fragment>
                                      ):(null)}
                                      {this.state.snap.inklAnhängerplane?
                                      (<React.Fragment>
                                        <div className="detailsCategory col-sm-5 col-md-5">
                                          Anhängerplane
                                        </div>
                                        <div className="col-sm-5 col-md-5">
                                          <p>{this.state.snap.inklAnhängerplane}</p>
                                        </div>
                                      </React.Fragment>
                                      ):(null)}
                                      {this.state.snap.dreiseitenkipper?
                                      (<React.Fragment>
                                        <div className="detailsCategory col-sm-5 col-md-5">
                                          Dreiseitenkipper
                                        </div>
                                        <div className="col-sm-5 col-md-5">
                                          <p>{this.state.snap.dreiseitenkipper}</p>
                                        </div>
                                      </React.Fragment>
                                      ):(null)}
                                      {this.state.snap.fuehrerschein?(
                                      <React.Fragment>
                                        <div className="detailsCategory col-sm-5 col-md-5">
                                          Führerscheinklasse
                                        </div>
                                        <div className="col-sm-5 col-md-5">
                                          <p>{this.state.snap.fuehrerschein}</p>
                                        </div>
                                      </React.Fragment>):(null)}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="detail-wrapper">
                								<div className="detail-wrapper-header">
          							         <h4>Beschreibung</h4>
                								</div>
                                <div className="widget-boxed-body">
                                  <div className="side-list">
                                    <div className="reviews-box">
                                      <div className="detailsCategory col-sm-5 col-md-5">
                                        Beschreibung
                                      </div>
                                      <div className="col-sm-5 col-md-5">
                                        <p>{this.state.snap.cardDesc} </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            {this.state.snap.rabattStaffelung?(  <div className="detail-wrapper">
                								<div className="detail-wrapper-header">
          							         <h4>Rabattstaffelung</h4>
                								</div>
                                <div className="widget-boxed-body">
                                  <div className="side-list">
                                    <div className="reviews-box">
                                    <div className="detailsCategory col-sm-5 col-md-5">
                                      ab Drei Tagen
                                    </div>
                                    <div className="col-sm-5 col-md-5">
                                      <p>{this.state.snap.rabattStaffelung.dreiTage}%</p>
                                    </div>
                                    <div className="detailsCategory col-sm-5 col-md-5">
                                      ab Fünf Tagen
                                    </div>
                                    <div className="col-sm-5 col-md-5">
                                      <p>{this.state.snap.rabattStaffelung.fünfTage}%</p>
                                    </div>
                                    <div className="detailsCategory col-sm-5 col-md-5">
                                      ab Zehn Tagen
                                    </div>
                                    <div className="col-sm-5 col-md-5">
                                      <p>{this.state.snap.rabattStaffelung.zehnTage}%</p>
                                    </div>
                                    <div className="detailsCategory col-sm-5 col-md-5">
                                      ab 21 Tagen
                                    </div>
                                    <div className="col-sm-5 col-md-5">
                                      <p>{this.state.snap.rabattStaffelung.einundzwanzigTage}%</p>
                                    </div>
                                    </div>
                                  </div>
                                </div>
                              </div>):(null)}

                              <div className="detail-wrapper">
                								<div className="detail-wrapper-header">
          							         <h4>Vermieter</h4>
                								</div>
                                <div className="widget-boxed-body deatilsBody">
                                  <div className="side-list">
                                    <div className="reviews-box">
                                      <div className="review-body">
                                        <div className="detailsCategory col-sm-12 col-md-5">
                                          <div className="review-avatar">
                														<img alt="" src={this.state.vermieterUrl} className=""/>
                													</div>
                                        </div>
                                        <div className="col-sm-12 col-md-5">
                                          <a>{this.state.snap.vermieter}</a>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>


                						</div>
                						{/* End: Listing Detail Wrapper */}

                						{/* Sidebar Start */}
                						<div className="col-md-4 col-sm-12">
                							<div className="sidebar">
                								{/* Start: Book A Reservation */}
                								<div className="widget-boxed ">
                									<div className="widget-boxed-header">
                										<h4><i className="ti-calendar padd-r-10"></i>Datum auswählen</h4>
                									</div>
                                  <div className="widget-boxed-body">
                                    <DateRangePicker
                                          startDate={this.state.startDate} // momentPropTypes.momentObj or null,
                                          endDate={this.state.endDate} // momentPropTypes.momentObj or null,
                                          onDatesChange={({ startDate, endDate }) => {
                                            const startDateString = startDate._d;
                                            const endDateString = endDate._d;
                                            var a = moment(startDateString);
                                            var b = moment(endDateString);
                                           let diff =  b.diff(a, 'days');
                                           let rabatt = 'kein Rabatt';
                                           let  Gesamtsumme = this.state.snap.cardPreis * diff ;
                                           if(this.state.snap.rabattStaffelung){
                                           if (diff >= 3 && diff< 4){  Gesamtsumme = Math.round(Gesamtsumme*((100-this.state.snap.rabattStaffelung.dreiTage)/100)*100)/100;rabatt= this.state.snap.rabattStaffelung.dreiTage+"%"; }
                                           else if (diff >= 5 && diff < 10){Gesamtsumme = Math.round(Gesamtsumme*((100-this.state.snap.rabattStaffelung.fünfTage)/100)*100)/100; rabatt=this.state.snap.rabattStaffelung.fünfTage+"%"}
                                           else if (diff >=10 && diff < 21){Gesamtsumme = Math.round(Gesamtsumme*((100-this.state.snap.rabattStaffelung.zehnTage)/100)*100)/100; rabatt=this.state.snap.rabattStaffelung.zehnTage+"%"}
                                           else if (diff >= 21){Gesamtsumme = Math.round(Gesamtsumme*((100-this.state.snap.rabattStaffelung.einundzwanzigTage)/100)*100)/100; rabatt=this.state.snap.rabattStaffelung.einundzwanzigTage+"%"}
                                           else if(diff < 3){rabatt='kein Rabatt'}}
                                            this.setState({ endDate, startDate,
                                              startDateString: startDateString,
                                              endDateString: endDateString,
                                              numberOfDays: diff+" Tage",
                                              Diff: diff,
                                              rabatt: rabatt,
                                              Gesamtsumme: Gesamtsumme})}} // PropTypes.func.isRequired,
                                          focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                                          onFocusChange={focusedInput => this.setState({ focusedInput }) } // PropTypes.func.isRequired,
                                          endDatePlaceholderText={"Bis"}
                                          startDatePlaceholderText={"Ab"}
                                          displayFormat={"DD/MM/YYYY"}
                                          showDefaultInputIcon={false}
                                      />
                                      <div className="widget-boxed-body">
                                        <div className="side-list">
                                          <ul>
                    												<li>Standort  <span>{this.state.snap.ort}</span></li>
                                            <li>Mietdauer  <span>{this.state.numberOfDays}</span></li>
                    												<li>Preis pro Tag<span>{this.state.snap.cardPreis},00€</span></li>
                                            {this.state.rabatt?(
                                              <li>Rabatt {this.state.numberOfDays}<span className="theme-cl">{this.state.rabatt}</span></li>
                                            ):(null)}
        												            <li><strong>Gesamtsumme <span>{this.state.Gesamtsumme}{this.state.rabatt?('€'):(null)}</span></strong></li>
								                         </ul>
                                        </div>
                                      </div>
                                      <Link  to={{
                                        pathname: `/anfragen/${this.state.cardId}`,
                                        query: {endDate: this.state.endDate,
                                                startDate: this.state.startDate,
                                                startDateString: this.state.startDateString,
                                                endDateString: this.state.endDateString,
                                                numberOfDays: this.state.numberOfDays,
                                                Diff: this.state.Diff,
                                                Gesamtsumme: this.state.Gesamtsumme,
                                                snap : this.state.snap,
                                                browserHistory: path,
                                                cardId: this.state.cardId}
                                                }}>
                                      <a href="#" style={{marginTop: "40px"}} className="btn reservation btn-radius theme-btn full-width mrg-top-10">JETZT RESERVIEREN</a>
                                    </Link>
                                  </div>
                								</div>
                								{/* End: Book A Reservation */}
                						</div>
                					    {/* End: Sidebar Start */}
                					</div>
                				</div>
                        </div>
                			</section>
                			{/* ================ Listing Detail Full Information ======================= */}

                			{/* ================== Login & Sign Up Window ================== */}

                    </div>):(
                      <div className="wrapper">
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
                  			<div className="clearfix"></div>




                  			{/* ================ Listing Detail Full Information ======================= */}
                  			<section className="list-detail">
                  				<div className="container">
                  					<div className="row detailsRow">
                  						{/* Start: Listing Detail Wrapper */}
                  						<div className="col-md-8 col-sm-8">
                  							<div className="detail-wrapper">
                  								<div className="detail-wrapper-body">
                  									<div className="listing-title-bar">
                  										<h3>lade Daten... </h3>
                  										<div className="row">
                  											<a href="#listing-location" className="listing-address col-sm-5">
                  												<i className="ti-location-pin mrg-r-5"></i>
                  												lade Daten...
                  											</a>
                  											<div className="rating-box col-sm-5 starBox">
                  												<div className="detail-list-rating">
                  													<i className="fa fa-star"></i>
                  													<i className="fa fa-star"></i>
                  													<i className="fa fa-star"></i>
                  													<i className="fa fa-star"></i>
                  													<i className="fa fa-star"></i>
                  												</div>
                  											</div>
                  										</div>
                  									</div>
                                    <figure className="img-holder ">
                                      <a><img src="https://firebasestorage.googleapis.com/v0/b/layoutapp-1505919280943.appspot.com/o/images%2Fdefault-compressor.jpeg?alt=media&token=9b215bff-b052-4976-8e59-9279bfe4be88" style={{height:"470px", width: "710px"}}
                                       className="detailsImg" alt="News"/></a>
                                    </figure>
                  								</div>
                  							</div>

                  							<div className="detail-wrapper">
                  								<div className="detail-wrapper-header">
            							         <h4>Technische Daten</h4>
                  								</div>
                                  <div className="widget-boxed-body">
                                    <div className="side-list">
                                      <div className="reviews-box">
                                        <div className="detailsCategory col-sm-5 col-md-5">
                                          Gewicht
                                        </div>
                                        <div className="col-sm-5 col-md-5">
                                          <p>lade Daten...</p>
                                        </div>
                                        <div className="detailsCategory col-sm-5 col-md-5">
                                          Hersteller
                                        </div>
                                        <div className="col-sm-5 col-md-5">
                                          <p>lade Daten... </p>
                                        </div>
                                        <div className="detailsCategory col-sm-5 col-md-5">
                                          Länge
                                        </div>
                                        <div className="col-sm-5 col-md-5">
                                          <p>lade Daten...</p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <div className="detail-wrapper">
                  								<div className="detail-wrapper-header">
            							         <h4>Beschreibung</h4>
                  								</div>
                                  <div className="widget-boxed-body">
                                    <div className="side-list">
                                      <div className="reviews-box">
                                        <div className="detailsCategory col-sm-5 col-md-5">
                                          Beschreibung
                                        </div>
                                        <div className="col-sm-5 col-md-5">
                                          <p>lade Daten... </p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <div className="detail-wrapper">
                  								<div className="detail-wrapper-header">
            							         <h4>Mietbedingungen</h4>
                  								</div>
                                  <div className="widget-boxed-body">
                                    <div className="side-list">
                                      <div className="reviews-box">
                                        <div className="detailsCategory col-sm-5 col-md-5">
                                          Mietbedingungen
                                        </div>
                                      <div className="col-sm-5 col-md-5">
                                          <p>lade Daten...</p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <div className="detail-wrapper">
                  								<div className="detail-wrapper-header">
            							         <h4>Vermieter</h4>
                  								</div>
                                  <div className="widget-boxed-body deatilsBody">
                                    <div className="side-list">
                                      <div className="reviews-box">

                                      </div>
                                    </div>
                                  </div>
                                </div>


                  						</div>
                  						{/* End: Listing Detail Wrapper */}

                  						{/* Sidebar Start */}
                  						<div className="col-md-4 col-sm-12">
                  							<div className="sidebar">
                  								{/* Start: Book A Reservation */}
                  								<div className="widget-boxed ">
                  									<div className="widget-boxed-header">
                  										<h4><i className="ti-calendar padd-r-10"></i>Datum auswählen</h4>
                  									</div>
                                    <div className="widget-boxed-body">

                                        <div className="widget-boxed-body">
                                          <div className="side-list">
                                            <ul>
                      												<li>Standort  <span>...</span></li>
                                              <li>Mietdauer  <span>...</span></li>
                      												<li>Dein Preis <span>...,00€</span></li>
          												            <li>Gesamtsumme <span>...,00€</span></li>
  								                         </ul>
                                          </div>
                                        </div>

                                    </div>
                  								</div>
                  								{/* End: Book A Reservation */}
                  						</div>
                  					    {/* End: Sidebar Start */}
                  					</div>
                  				</div>
                          </div>
                  			</section>
                  			{/* ================ Listing Detail Full Information ======================= */}

                  			{/* ================== Login & Sign Up Window ================== */}

                      </div>)}
              </div>
            )
        }
    }

export default MietDetails;
