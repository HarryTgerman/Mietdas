import React, {Component} from 'react';
import firebase from 'firebase';
import {Redirect, NavLink, Link} from 'react-router-dom'
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from 'react-image-gallery';
import Logo from '../../../../img/logo.png'
import update from 'react-addons-update'; // ES6


class MashineDetails extends Component{
  constructor (props){
  super(props)
  this.state={
    editBeschreibung:true,
    bearbeiten:true,
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
            urlId: cardId,
            cardId: snap.key,
            imageUrl: snap.val().imageUrl
          },()=>{
            const images =[{original:this.state.imageUrl, thumbnail:this.state.imageUrl}]
              this.state.snap.imageArr.map(img =>{
                images.push({
                  original: img,
                  thumbnail: img,
                })
              })
              this.setState({
                images: images
              })
            if (this.state.numberOfDays == undefined) {this.setState({numberOfDays : "1 Tag", Diff: 1}) }
            firebase.database().ref().child('app').child('users/' +this.state.snap.uid)
            .once('value', snap =>{
              this.setState({
                vermieterLoading: false,
                vermieter: snap.val().name,
                vermieterUrl: snap.val().url,
                loading: true,
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

toggle(){
  this.setState((prevState)=>{
    return {löschen: !prevState.löschen, showBankData: true};
  });
}
löschen(){
  this.state.snap.imageArr.map((i) =>{
       var desertRef = firebase.storage().refFromURL(i)
       desertRef.delete().then(function() {
       }).catch(function(error) {
       });
  })
  this.setState({
    load:true
  },()=>{

      firebase.database().ref('app').child('cards').child(this.state.urlId).remove()
  })
}
saveArtikel(){
  firebase.database().ref('app').child('cards').child(this.state.urlId).update(this.state.snap)
  this.setState({bearbeiten:true})
}
saveBeschreibung(){
  firebase.database().ref('app').child('cards').child(this.state.urlId).child('cardDesc').set(this.state.snap.cardDesc)
  this.setState({editBeschreibung:true})
}

handleInklAnhängerplane(e){
  this.setState({ snap: { ...this.state.snap, inklAnhängerplane: e.target.value} });
}

handleDreiseitenkipper(e){
  this.setState({ snap: { ...this.state.snap, dreiseitenkipper: e.target.value} });
}
handleInklAuffahrampen(e){
  this.setState({ snap: { ...this.state.snap, inklAuffahrampen: e.target.value} });
}

handleBeschreibung(e){
  this.setState({ snap: { ...this.state.snap, cardDesc: e.target.value} });
}
handleGewicht(e){
  this.setState({ snap: { ...this.state.snap, gewicht: e.target.value} });
}
handleHersteller(e){
  this.setState({ snap: { ...this.state.snap, hersteller: e.target.value} })
}
handleLaenge(e){
  this.setState({ snap: { ...this.state.snap, laenge: e.target.value} })
}
handleTrog(e){
  this.setState({ snap: { ...this.state.snap, trog: e.target.value} })
}
handleAbmessungen(e){
  this.setState({ snap: { ...this.state.snap, abmessungen: e.target.value} })
}
handleFraese(e){
  this.setState({ snap: { ...this.state.snap, fraese: e.target.value} })
}
handleMotor(e){
  this.setState({ snap: { ...this.state.snap, motor: e.target.value} })
}
handleSchnitttiefe(e){
  this.setState({ snap: { ...this.state.snap, schnitttiefe: e.target.value} })
}
handleGerauuschpegel(e){
  this.setState({ snap: { ...this.state.snap, gerauuschpegel: e.target.value} })
}
handleDurchmesser(e){
  this.setState({ snap: { ...this.state.snap, durchmesser: e.target.value} })
}
handleSchnittlaenge(e){
  this.setState({ snap: { ...this.state.snap, schnittlaenge: e.target.value} })
}
handleSchnittbreite(e){
  this.setState({ snap: { ...this.state.snap, schnittbreite: e.target.value} })
}
handleBandagenbreite(e){
  this.setState({ snap: { ...this.state.snap, bandagenbreite: e.target.value} })
}
handleMaxFuellmenge(e){
  this.setState({ snap: { ...this.state.snap, maxFuellmenge: e.target.value} })
}
handleSpannung(e){
  this.setState({ snap: { ...this.state.snap, spannung: e.target.value} })
}
handleEinzelschlagstärke(e){
  this.setState({ snap: { ...this.state.snap, einzelschlagstärke: e.target.value} })
}
handleAufname(e){
  this.setState({ snap: { ...this.state.snap, aufname: e.target.value} })
}
handleBohrdurchmesser(e){
  this.setState({ snap: { ...this.state.snap, bohrdurchmesser: e.target.value} })
}
handleBohrkrone(e){
  this.setState({ snap: { ...this.state.snap, bohrkrone: e.target.value} })
}
handleMuldeninhalt(e){
  this.setState({ snap: { ...this.state.snap, muldeninhalt: e.target.value} })
}
handleBreite(e){
  this.setState({ snap: { ...this.state.snap, breite: e.target.value} })
}
handleHoehe(e){
  this.setState({ snap: { ...this.state.snap, hoehe: e.target.value} })
}
handleReichweite(e){
  this.setState({ snap: { ...this.state.snap, reichweite: e.target.value} })
}
handleSchuetthoehe(e){
  this.setState({ snap: { ...this.state.snap, schuetthoehe: e.target.value} })
}
handleGrabtiefe(e){
  this.setState({ snap: { ...this.state.snap, grabtiefe: e.target.value} })
}
handleGesamtgewicht(e){
  this.setState({ snap: { ...this.state.snap, gesamtgewicht: e.target.value} })
}
handleNutzlast(e){
  this.setState({ snap: { ...this.state.snap, nutzlast: e.target.value} })
}
handleAuflaufbremse(e){
  this.setState({ snap: { ...this.state.snap, auflaufbremse: e.target.value} })
}
handleGesamthoeheLadeboard(e){
  this.setState({ snap: { ...this.state.snap, gesamthoeheLadeboard: e.target.value} })
}
handleArbeitshoehe(e){
  this.setState({ snap: { ...this.state.snap, arbeitshoehe: e.target.value} })
}
handleGesamthoeheSpriegel(e){
  this.setState({ snap: { ...this.state.snap, gesamthoeheSpriegel: e.target.value} })
}
handleGesamtbreite(e){
  this.setState({ snap: { ...this.state.snap, gesamtbreite: e.target.value} })
}
handleAbstuetzlaenge(e){
  this.setState({ snap: { ...this.state.snap, abstuetzlaenge: e.target.value} })
}
handleAbstuetzbreite(e){
  this.setState({ snap: { ...this.state.snap, abstuetzbreite: e.target.value} })
}
handleTransportmasse(e){
  this.setState({ snap: { ...this.state.snap, transportmasse: e.target.value} })
}
handleHubhoehe(e){
  this.setState({ snap: { ...this.state.snap, hubhoehe: e.target.value} })
}
handleAntrieb(e){
  this.setState({ snap: { ...this.state.snap, antrieb: e.target.value} })
}
handleTraglast(e){
  this.setState({ snap: { ...this.state.snap, traglast: e.target.value} })
}
handlePlattform(e){
  this.setState({ snap: { ...this.state.snap, plattform: e.target.value} })
}
handleGesamthoehe(e){
  this.setState({ snap: { ...this.state.snap, gesamthoehe: e.target.value} })
}
handleGesamtlaengeesamtbreite(e){
  this.setState({ snap: { ...this.state.snap, gesamtlaenge: e.target.value} })
}
handleInnenhoehe(e){
  this.setState({ snap: { ...this.state.snap, innenhoehe: e.target.value} })
}
handleInnenladehoehe(e){
  this.setState({ snap: { ...this.state.snap, innenladehoehe: e.target.value} })
}
handleInnenbreite(e){
  this.setState({ snap: { ...this.state.snap, innenbreite: e.target.value} })
}
handleInnenlaenge(e){
  this.setState({ snap: { ...this.state.snap, innenlaenge: e.target.value} })
}
handleLadehöhe(e){
  this.setState({ snap: { ...this.state.snap, ladehöhe: e.target.value} })
}
handleHundertkmh(e){
  this.setState({ snap: { ...this.state.snap, hundertkmh: e.target.value} })
}
handleArbeitsbreite(e){
  this.setState({ snap: { ...this.state.snap, arbeitsbreite: e.target.value} })
}
handleKraftstoff(e){
  this.setState({ snap: { ...this.state.snap, kraftstoff: e.target.value} })
}
handleRuettelkraft(e){
  this.setState({ snap: { ...this.state.snap, ruettelkraft: e.target.value} })
}
handleSchaufelinhalt(e){
  this.setState({ snap: { ...this.state.snap, schaufelinhalt: e.target.value} })
}
handleLaengeDerLadeflaeche(e){
  this.setState({ snap: { ...this.state.snap, laengeDerLadeflaeche: e.target.value} })
}
handleBreiteDerLadeflaeche(e){
  this.setState({ snap: { ...this.state.snap, breiteDerLadeflaeche: e.target.value} })
}
handleHoeheDerLadeflaeche(e){
  this.setState({ snap: { ...this.state.snap, hoeheDerLadeflaeche: e.target.value} })
}
handleLaderaumvolumen(e){
  this.setState({ snap: { ...this.state.snap, laderaumvolumen: e.target.value} })
}
handleVolumenstrom(e){
  this.setState({ snap: { ...this.state.snap, volumenstrom: e.target.value} })
}
handleLeergewicht(e){
  this.setState({ snap: { ...this.state.snap, leergewicht: e.target.value} })
}
handleGesamtGewicht(e){
  this.setState({ snap: { ...this.state.snap, gesamtGewicht: e.target.value} })
}
handleSitzplaetze(e){
  this.setState({ snap: { ...this.state.snap, sitzplaetze: e.target.value} })
}
handleLeistung(e){
  this.setState({ snap: { ...this.state.snap, leistung: e.target.value} })
}
handleDruckbereich(e){
  this.setState({ snap: { ...this.state.snap, druckbereich: e.target.value} })
}
handleAnhaengerlastUngebremst(e){
  this.setState({ snap: { ...this.state.snap, anhaengerlastUngebremst: e.target.value} })
}
handleAnhaengerlastGebremst(e){
  this.setState({ snap: { ...this.state.snap, anhaengerlastGebremst: e.target.value} })
}
handleStuetzlast(e){
  this.setState({ snap: { ...this.state.snap, stuetzlast: e.target.value} })
}
handleFuehrerschein(e){
  this.setState({ snap: { ...this.state.snap, fuehrerschein: e.target.value} })
}




        render(){
          let path = this.props.location.pathname
          if (this.state.load){
            window.scrollTo(0, 0)
            return <Redirect to="/benutzeraccount"/>
          }
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

                      {this.state.load?(<div className="loader"></div>):(null)}


                			{/* ================ Listing Detail Full Information ======================= */}
                			<section className="list-detail">
                				<div className="container">
                					<div className="row detailsRow">
                						{/* Start: Listing Detail Wrapper */}
                						<div className="col-md-12 col-sm-12">
                							<div className="detail-wrapper">

                								<div className="detail-wrapper-body">
                									<div className="listing-title-bar">
                                  {this.state.löschen?(<div><a onClick={this.toggle.bind(this)} style={{margin:"0"}} className="editProfile">abbrechen</a><a> </a><a onClick={this.löschen.bind(this)} style={{margin:"0"}} className="editProfile">löschen</a></div>):
                                  (<a onClick={this.toggle.bind(this)} style={{margin:"0"}} className="editProfile" >Artikel löschen</a>)}
                										<h3>{this.state.snap.cardHeading}</h3>
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
                                  <figure  className="img-holder ">
                                    <a><ImageGallery  items={this.state.images} showPlayButton={false} className="detailsImg" alt="News"/></a>
                                    <div className="blog-post-date theme-bg">
                											{this.state.snap.cardPreis}€ Pro Tag
                										</div>
                                  </figure>
                								</div>
                							</div>
                              <div className="editProfile">
                              <a className="editProfile" onClick={()=>{  this.setState((prevState)=>{
                                  return {bearbeiten: !prevState.bearbeiten};
                                })}}>{this.state.bearbeiten?("bearbeiten"):("abbrechen")}</a><a> </a>
    {this.state.bearbeiten?(null):(<a className="editProfile" onClick={this.saveArtikel.bind(this)}>speichern</a>)}
                            </div>
                							<div className="detail-wrapper">
                								<div className="detail-wrapper-header">
          							         <h4>Technische Daten</h4>
                								</div>

                                <div className="widget-boxed-body">
                                  <div className="side-list">
                                    {this.state.bearbeiten?(<div className="reviews-box">
                                      <div className="detailsCategory col-sm-5 col-md-5">
                                        Gewicht
                                      </div>
                                      <div className="col-sm-5 col-md-5">
                                        <p>{this.state.snap.gewicht} kg</p>
                                      </div>
                                      <div className="detailsCategory col-sm-5 col-md-5">
                                        Hersteller
                                      </div>
                                      <div className="col-sm-5 col-md-5">
                                        <p>{this.state.snap.hersteller}</p>
                                      </div>
                                      <div>
                                        {this.state.snap.laenge?
                                        (<React.Fragment>
                                          <div className="detailsCategory col-sm-5 col-md-5">
                                            Länge
                                          </div>
                                          <div className="col-sm-5 col-md-5">
                                            <p>{this.state.snap.laenge} mm</p>
                                          </div>
                                        </React.Fragment>
                                        ):(null)}
                                        {this.state.snap.trog?
                                        (<React.Fragment>
                                          <div className="detailsCategory col-sm-5 col-md-5">
                                            Trog
                                          </div>
                                          <div className="col-sm-5 col-md-5">
                                            <p>{this.state.snap.trog} mm</p>
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
                                            <p>{this.state.snap.fraese} mm</p>
                                          </div>
                                        </React.Fragment>
                                        ):(null)}
                                        {this.state.snap.inklAuffahrampen?
                                        (<React.Fragment>
                                          <div className="detailsCategory col-sm-5 col-md-5">
                                            Frästiefe
                                          </div>
                                          <div className="col-sm-5 col-md-5">
                                            <p>{this.state.snap.inklAuffahrampen} mm</p>
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
                                            <p>{this.state.snap.schnitttiefe} mm</p>
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
                                            <p>{this.state.snap.durchmesser} mm</p>
                                          </div>
                                        </React.Fragment>
                                        ):(null)}
                                        {this.state.snap.schnittlaenge?
                                        (<React.Fragment>
                                          <div className="detailsCategory col-sm-5 col-md-5">
                                            Schnittlänge
                                          </div>
                                          <div className="col-sm-5 col-md-5">
                                            <p>{this.state.snap.schnittlaenge} mm</p>
                                          </div>
                                        </React.Fragment>
                                        ):(null)}
                                        {this.state.snap.schnittbreite?
                                        (<React.Fragment>
                                          <div className="detailsCategory col-sm-5 col-md-5">
                                            Schnittbreite
                                          </div>
                                          <div className="col-sm-5 col-md-5">
                                            <p>{this.state.snap.schnittbreite} mm</p>
                                          </div>
                                        </React.Fragment>
                                        ):(null)}
                                        {this.state.snap.bandagenbreite?(
                                        <React.Fragment>
                                          <div className="detailsCategory col-sm-5 col-md-5">
                                            Bandagenbreite
                                          </div>
                                          <div className="col-sm-5 col-md-5">
                                            <p>{this.state.snap.bandagenbreite} mm</p>
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
                                            <p>{this.state.snap.bohrdurchmesser} mm</p>
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
                                            <p>{this.state.snap.breite} mm</p>
                                          </div>
                                        </React.Fragment>
                                        ):(null)}
                                        {this.state.snap.hoehe?
                                        (<React.Fragment>
                                          <div className="detailsCategory col-sm-5 col-md-5">
                                            Höhe
                                          </div>
                                          <div className="col-sm-5 col-md-5">
                                            <p>{this.state.snap.hoehe} mm</p>
                                          </div>
                                        </React.Fragment>
                                        ):(null)}
                                        {this.state.snap.reichweite?
                                        (<React.Fragment>
                                          <div className="detailsCategory col-sm-5 col-md-5">
                                            Reichweite
                                          </div>
                                          <div className="col-sm-5 col-md-5">
                                            <p>{this.state.snap.reichweite} mm</p>
                                          </div>
                                        </React.Fragment>
                                        ):(null)}
                                        {this.state.snap.schuetthoehe?
                                        (<React.Fragment>
                                          <div className="detailsCategory col-sm-5 col-md-5">
                                            Schütthöhe
                                          </div>
                                          <div className="col-sm-5 col-md-5">
                                            <p>{this.state.snap.schuetthoehe} mm</p>
                                          </div>
                                        </React.Fragment>
                                        ):(null)}
                                      {this.state.snap.grabtiefe?
                                      (<React.Fragment>
                                        <div className="detailsCategory col-sm-5 col-md-5">
                                          Grabtiefe
                                        </div>
                                        <div className="col-sm-5 col-md-5">
                                          <p>{this.state.snap.grabtiefe} mm</p>
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
                                          <p>{this.state.snap.gesamthoeheLadeboard} mm</p>
                                        </div>
                                      </React.Fragment>):(null)}
                                      {this.state.snap.gesamthoeheSpriegel?(
                                      <React.Fragment>
                                        <div className="detailsCategory col-sm-5 col-md-5">
                                          Gesamthöhe Spriegel
                                        </div>
                                        <div className="col-sm-5 col-md-5">
                                          <p>{this.state.snap.gesamthoeheSpriegel} mm</p>
                                        </div>
                                      </React.Fragment>):(null)}
                                      {this.state.snap.gesamtbreite?(
                                      <React.Fragment>
                                        <div className="detailsCategory col-sm-5 col-md-5">
                                          Gesamtbreite
                                        </div>
                                        <div className="col-sm-5 col-md-5">
                                          <p>{this.state.snap.gesamtbreite} mm</p>
                                        </div>
                                      </React.Fragment>):(null)}
                                      {this.state.snap.abstuetzlaenge?(
                                      <React.Fragment>
                                        <div className="detailsCategory col-sm-5 col-md-5">
                                          Abstüzlänge
                                        </div>
                                        <div className="col-sm-5 col-md-5">
                                          <p>{this.state.snap.abstuetzlaenge} mm</p>
                                        </div>
                                      </React.Fragment>):(null)}
                                      {this.state.snap.abstuetzbreite?(
                                      <React.Fragment>
                                        <div className="detailsCategory col-sm-5 col-md-5">
                                          Abstüzbreite
                                        </div>
                                        <div className="col-sm-5 col-md-5">
                                          <p>{this.state.snap.abstuetzbreite} mm</p>
                                        </div>
                                      </React.Fragment>):(null)}
                                      {this.state.snap.transportmasse?(
                                      <React.Fragment>
                                        <div className="detailsCategory col-sm-5 col-md-5">
                                          Transportmaße
                                        </div>
                                        <div className="col-sm-5 col-md-5">
                                          <p>{this.state.snap.transportmasse} mm</p>
                                        </div>
                                      </React.Fragment>):(null)}
                                      {this.state.snap.hubhoehe?(
                                      <React.Fragment>
                                        <div className="detailsCategory col-sm-5 col-md-5">
                                          Hubhöhe
                                        </div>
                                        <div className="col-sm-5 col-md-5">
                                          <p>{this.state.snap.hubhoehe} mm</p>
                                        </div>
                                      </React.Fragment>):(null)}
                                      {this.state.snap.antrieb?(
                                      <React.Fragment>
                                        <div className="detailsCategory col-sm-5 col-md-5">
                                          Antrieb
                                        </div>
                                        <div className="col-sm-5 col-md-5">
                                          <p>{this.state.snap.antrieb} mm</p>
                                        </div>
                                      </React.Fragment>):(null)}
                                      {this.state.snap.traglast?(
                                      <React.Fragment>
                                        <div className="detailsCategory col-sm-5 col-md-5">
                                          Traglast
                                        </div>
                                        <div className="col-sm-5 col-md-5">
                                          <p>{this.state.snap.traglast} mm</p>
                                        </div>
                                      </React.Fragment>):(null)}
                                      {this.state.snap.plattform?(
                                      <React.Fragment>
                                        <div className="detailsCategory col-sm-5 col-md-5">
                                          Plattform
                                        </div>
                                        <div className="col-sm-5 col-md-5">
                                          <p>{this.state.snap.plattform} mm</p>
                                        </div>
                                      </React.Fragment>):(null)}
                                      {this.state.snap.gesamthoehe?(
                                      <React.Fragment>
                                        <div className="detailsCategory col-sm-5 col-md-5">
                                          Gesamthöhe
                                        </div>
                                        <div className="col-sm-5 col-md-5">
                                          <p>{this.state.snap.gesamthoehe} mm</p>
                                        </div>
                                      </React.Fragment>):(null)}
                                      {this.state.snap.arbeitshoehe?(
                                      <React.Fragment>
                                        <div className="detailsCategory col-sm-5 col-md-5">
                                          Arbeitshöhe
                                        </div>
                                        <div className="col-sm-5 col-md-5">
                                          <p>{this.state.snap.arbeitshoehe} mm</p>
                                        </div>
                                      </React.Fragment>):(null)}
                                      {this.state.snap.gesamtlaenge?(
                                      <React.Fragment>
                                        <div className="detailsCategory col-sm-5 col-md-5">
                                          Gesamtlänge
                                        </div>
                                        <div className="col-sm-5 col-md-5">
                                          <p>{this.state.snap.gesamtlaenge} mm</p>
                                        </div>
                                      </React.Fragment>):(null)}
                                      {this.state.snap.innenhoehe?(
                                      <React.Fragment>
                                        <div className="detailsCategory col-sm-5 col-md-5">
                                          Innenhöhe
                                        </div>
                                        <div className="col-sm-5 col-md-5">
                                          <p>{this.state.snap.innenhoehe} mm</p>
                                        </div>
                                      </React.Fragment>):(null)}
                                      {this.state.snap.innenladehoehe?(
                                      <React.Fragment>
                                        <div className="detailsCategory col-sm-5 col-md-5">
                                          Innenladehöhe
                                        </div>
                                        <div className="col-sm-5 col-md-5">
                                          <p>{this.state.snap.innenladehoehe} mm</p>
                                        </div>
                                      </React.Fragment>):(null)}
                                      {this.state.snap.inklAnhängerplane?(
                                      <React.Fragment>
                                        <div className="detailsCategory col-sm-5 col-md-5">
                                          Innenladehöhe
                                        </div>
                                        <div className="col-sm-5 col-md-5">
                                          <p>{this.state.snap.inklAnhängerplane} mm</p>
                                        </div>
                                      </React.Fragment>):(null)}
                                      {this.state.snap.innenbreite?(
                                      <React.Fragment>
                                        <div className="detailsCategory col-sm-5 col-md-5">
                                          Innenbreite
                                        </div>
                                        <div className="col-sm-5 col-md-5">
                                          <p>{this.state.snap.innenbreite} mm</p>
                                        </div>
                                      </React.Fragment>):(null)}
                                      {this.state.snap.innenlaenge?(
                                      <React.Fragment>
                                        <div className="detailsCategory col-sm-5 col-md-5">
                                          Innenlänge
                                        </div>
                                        <div className="col-sm-5 col-md-5">
                                          <p>{this.state.snap.innenlaenge} mm</p>
                                        </div>
                                      </React.Fragment>):(null)}
                                      {this.state.snap.ladehöhe?(
                                      <React.Fragment>
                                        <div className="detailsCategory col-sm-5 col-md-5">
                                          Ladehöhe
                                        </div>
                                        <div className="col-sm-5 col-md-5">
                                          <p>{this.state.snap.ladehöhe} mm</p>
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
                                          <p>{this.state.snap.arbeitsbreite} mm</p>
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
                                          <p>{this.state.snap.laengeDerLadeflaeche} mm</p>
                                        </div>
                                      </React.Fragment>):(null)}
                                      {this.state.snap.breiteDerLadeflaeche?(
                                      <React.Fragment>
                                        <div className="detailsCategory col-sm-5 col-md-5">
                                          Breite der Ladefläche
                                        </div>
                                        <div className="col-sm-5 col-md-5">
                                          <p>{this.state.snap.breiteDerLadeflaeche} mm</p>
                                        </div>
                                      </React.Fragment>):(null)}
                                      {this.state.snap.hoeheDerLadeflaeche?(
                                      <React.Fragment>
                                        <div className="detailsCategory col-sm-5 col-md-5">
                                          Höhe der Ladefläche
                                        </div>
                                        <div className="col-sm-5 col-md-5">
                                          <p>{this.state.snap.hoeheDerLadeflaeche} mm</p>
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
                                      {this.state.snap.leergewicht?(
                                      <React.Fragment>
                                        <div className="detailsCategory col-sm-5 col-md-5">
                                          Leergewicht
                                        </div>
                                        <div className="col-sm-5 col-md-5">
                                          <p>{this.state.snap.leergewicht} kg</p>
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
                                      {this.state.snap.dreiseitenkipper?(
                                      <React.Fragment>
                                        <div className="detailsCategory col-sm-5 col-md-5">
                                          Anhängerlast Gebremst
                                        </div>
                                        <div className="col-sm-5 col-md-5">
                                          <p>{this.state.snap.dreiseitenkipper} kg</p>
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
                                    </div>):





                                    (<div className="reviews-box">
                                      <div className="detailsCategory col-sm-5 col-md-5">
                                        Gewicht
                                      </div>
                                      <div className="col-sm-5 col-md-5">
                                        <input type="text" className="form-control" onChange={this.handleGewicht.bind(this)} value={this.state.snap.gewicht} />
                                      </div>
                                      <div className="detailsCategory col-sm-5 col-md-5">
                                        Hersteller
                                      </div>
                                      <div className="col-sm-5 col-md-5">
                                        <input type="text" className="form-control" onChange={this.handleHersteller.bind(this)} value={this.state.snap.hersteller}/>
                                      </div>
                                      <div>
                                        {this.state.snap.laenge?
                                        (<React.Fragment>
                                          <div className="detailsCategory col-sm-5 col-md-5">
                                            Länge
                                          </div>
                                          <div className="col-sm-5 col-md-5">
                                            <input type="text" className="form-control" onChange={this.handleLaenge.bind(this)} value={this.state.snap.laenge} />
                                          </div>
                                        </React.Fragment>
                                        ):(null)}
                                        {this.state.snap.trog?
                                        (<React.Fragment>
                                          <div className="detailsCategory col-sm-5 col-md-5">
                                            Trog
                                          </div>
                                          <div className="col-sm-5 col-md-5">
                                            <input type="text" className="form-control" onChange={this.handleTrog.bind(this)} value={this.state.snap.trog} />
                                          </div>
                                        </React.Fragment>
                                        ):(null)}
                                        {this.state.snap.abmessungen?
                                        (<React.Fragment>
                                          <div className="detailsCategory col-sm-5 col-md-5">
                                            Abmessungen
                                          </div>
                                          <div className="col-sm-5 col-md-5">
                                            <input type="text" className="form-control" onChange={this.handleAbmessungen.bind(this)} value={this.state.snap.abmessungen} />
                                          </div>
                                        </React.Fragment>
                                        ):(null)}
                                        {this.state.snap.fraese?
                                        (<React.Fragment>
                                          <div className="detailsCategory col-sm-5 col-md-5">
                                            Frästiefe
                                          </div>
                                          <div className="col-sm-5 col-md-5">
                                            <input type="text" className="form-control" onChange={this.handleFraese.bind(this)} value={this.state.snap.fraese} />
                                          </div>
                                        </React.Fragment>
                                        ):(null)}
                                        {this.state.snap.motor?
                                        (<React.Fragment>
                                          <div className="detailsCategory col-sm-5 col-md-5">
                                            Motor
                                          </div>
                                          <div className="col-sm-5 col-md-5">
                                            <input type="text" className="form-control" onChange={this.handleMotor.bind(this)} value={this.state.snap.motor}/>
                                          </div>
                                        </React.Fragment>
                                        ):(null)}
                                        {this.state.snap.schnitttiefe?
                                        (<React.Fragment>
                                          <div className="detailsCategory col-sm-5 col-md-5">
                                            Schnitttiefe
                                          </div>
                                          <div className="col-sm-5 col-md-5">
                                            <input type="text" className="form-control" onChange={this.handleSchnitttiefe.bind(this)} value={this.state.snap.schnitttiefe} />
                                          </div>
                                        </React.Fragment>
                                        ):(null)}
                                        {this.state.snap.gerauuschpegel?
                                        (<React.Fragment>
                                          <div className="detailsCategory col-sm-5 col-md-5">
                                            Geräuschpegel
                                          </div>
                                          <div className="col-sm-5 col-md-5">
                                            <input type="text" className="form-control" onChange={this.handleGerauuschpegel.bind(this)} value={this.state.snap.gerauuschpegel} />
                                          </div>
                                        </React.Fragment>
                                        ):(null)}
                                        {this.state.snap.durchmesser?
                                        (<React.Fragment>
                                          <div className="detailsCategory col-sm-5 col-md-5">
                                            Durchmesser
                                          </div>
                                          <div className="col-sm-5 col-md-5">
                                            <input type="text" className="form-control" onChange={this.handleDurchmesser.bind(this)} value={this.state.snap.durchmesser} />
                                          </div>
                                        </React.Fragment>
                                        ):(null)}
                                        {this.state.snap.schnittlaenge?
                                        (<React.Fragment>
                                          <div className="detailsCategory col-sm-5 col-md-5">
                                            Schnittlänge
                                          </div>
                                          <div className="col-sm-5 col-md-5">
                                            <input type="text" className="form-control" onChange={this.handleSchnittlaenge.bind(this)} value={this.state.snap.schnittlaenge} />
                                          </div>
                                        </React.Fragment>
                                        ):(null)}
                                        {this.state.snap.schnittbreite?
                                        (<React.Fragment>
                                          <div className="detailsCategory col-sm-5 col-md-5">
                                            Schnittbreite
                                          </div>
                                          <div className="col-sm-5 col-md-5">
                                            <input type="text" className="form-control" onChange={this.handleSchnittbreite.bind(this)} value={this.state.snap.schnittbreite} />
                                          </div>
                                        </React.Fragment>
                                        ):(null)}
                                        {this.state.snap.bandagenbreite?(
                                        <React.Fragment>
                                          <div className="detailsCategory col-sm-5 col-md-5">
                                            Bandagenbreite
                                          </div>
                                          <div className="col-sm-5 col-md-5">
                                            <input type="text" className="form-control" onChange={this.handleBandagenbreite.bind(this)} value={this.state.snap.bandagenbreite} />
                                          </div>
                                        </React.Fragment>):(null)}
                                        {this.state.snap.maxFuellmenge?(
                                        <React.Fragment>
                                          <div className="detailsCategory col-sm-5 col-md-5">
                                            Max. Füllmenge
                                          </div>
                                          <div className="col-sm-5 col-md-5">
                                            <input type="text" className="form-control" onChange={this.handleMaxFuellmenge.bind(this)} value={this.state.snap.maxFuellmenge} />
                                          </div>
                                        </React.Fragment>):(null)}
                                        {this.state.snap.spannung?(
                                        <React.Fragment>
                                          <div className="detailsCategory col-sm-5 col-md-5">
                                            Spannung
                                          </div>
                                          <div className="col-sm-5 col-md-5">
                                            <input type="text" className="form-control" onChange={this.handleSpannung.bind(this)} value={this.state.snap.spannung} />
                                          </div>
                                        </React.Fragment>):(null)}
                                        {this.state.snap.einzelschlagstärke?(
                                        <React.Fragment>
                                          <div className="detailsCategory col-sm-5 col-md-5">
                                            Einzelschlagstärke
                                          </div>
                                          <div className="col-sm-5 col-md-5">
                                            <input type="text" className="form-control" onChange={this.handleEinzelschlagstärke.bind(this)} value={this.state.snap.einzelschlagstärke} />
                                          </div>
                                        </React.Fragment>):(null)}
                                        {this.state.snap.aufname?(
                                        <React.Fragment>
                                          <div className="detailsCategory col-sm-5 col-md-5">
                                            Aufname
                                          </div>
                                          <div className="col-sm-5 col-md-5">
                                            <input type="text" className="form-control" onChange={this.handleAufname.bind(this)} value={this.state.snap.aufname}/>
                                          </div>
                                        </React.Fragment>):(null)}
                                        {this.state.snap.bohrdurchmesser?(
                                        <React.Fragment>
                                          <div className="detailsCategory col-sm-5 col-md-5">
                                            Bohrdurchmesser
                                          </div>
                                          <div className="col-sm-5 col-md-5">
                                            <input type="text" className="form-control" onChange={this.handleBohrdurchmesser.bind(this)} value={this.state.snap.bohrdurchmesser} />
                                          </div>
                                        </React.Fragment>):(null)}
                                        {this.state.snap.bohrkrone?(
                                        <React.Fragment>
                                          <div className="detailsCategory col-sm-5 col-md-5">
                                            Bohrkrone
                                          </div>
                                          <div className="col-sm-5 col-md-5">
                                            <input type="text" className="form-control" onChange={this.handleBohrkrone.bind(this)} value={this.state.snap.bohrkrone}/>
                                          </div>
                                        </React.Fragment>):(null)}
                                        {this.state.snap.muldeninhalt?(
                                        <React.Fragment>
                                          <div className="detailsCategory col-sm-5 col-md-5">
                                            Muldeninhalt
                                          </div>
                                          <div className="col-sm-5 col-md-5">
                                            <input type="text" className="form-control" onChange={this.handleMuldeninhalt.bind(this)} value={this.state.snap.muldeninhalt} />
                                          </div>
                                        </React.Fragment>):(null)}
                                        {this.state.snap.breite?
                                        (<React.Fragment>
                                          <div className="detailsCategory col-sm-5 col-md-5">
                                            Breite
                                          </div>
                                          <div className="col-sm-5 col-md-5">
                                            <input type="text" className="form-control" onChange={this.handleBreite.bind(this)} value={this.state.snap.breite} />
                                          </div>
                                        </React.Fragment>
                                        ):(null)}
                                        {this.state.snap.hoehe?
                                        (<React.Fragment>
                                          <div className="detailsCategory col-sm-5 col-md-5">
                                            Höhe
                                          </div>
                                          <div className="col-sm-5 col-md-5">
                                            <input type="text" className="form-control" onChange={this.handleHoehe.bind(this)} value={this.state.snap.hoehe} />
                                          </div>
                                        </React.Fragment>
                                        ):(null)}
                                        {this.state.snap.reichweite?
                                        (<React.Fragment>
                                          <div className="detailsCategory col-sm-5 col-md-5">
                                            Reichweite
                                          </div>
                                          <div className="col-sm-5 col-md-5">
                                            <input type="text" className="form-control" onChange={this.handleReichweite.bind(this)} value={this.state.snap.reichweite} />
                                          </div>
                                        </React.Fragment>
                                        ):(null)}
                                        {this.state.snap.schuetthoehe?
                                        (<React.Fragment>
                                          <div className="detailsCategory col-sm-5 col-md-5">
                                            Schütthöhe
                                          </div>
                                          <div className="col-sm-5 col-md-5">
                                            <input type="text" className="form-control" onChange={this.handleSchuetthoehe.bind(this)} value={this.state.snap.schuetthoehe} />
                                          </div>
                                        </React.Fragment>
                                        ):(null)}
                                      {this.state.snap.grabtiefe?
                                      (<React.Fragment>
                                        <div className="detailsCategory col-sm-5 col-md-5">
                                          Grabtiefe
                                        </div>
                                        <div className="col-sm-5 col-md-5">
                                          <input type="text" className="form-control" onChange={this.handleGrabtiefe.bind(this)} value={this.state.snap.grabtiefe} />
                                        </div>
                                      </React.Fragment>
                                      ):(null)}
                                      {this.state.snap.gesamtgewicht?(
                                      <React.Fragment>
                                        <div className="detailsCategory col-sm-5 col-md-5">
                                          Gesamtgewicht
                                        </div>
                                        <div className="col-sm-5 col-md-5">
                                          <input type="text" className="form-control" onChange={this.handleGesamtgewicht.bind(this)} value={this.state.snap.gesamtgewicht} />
                                        </div>
                                      </React.Fragment>):(null)}
                                      {this.state.snap.nutzlast?(
                                      <React.Fragment>
                                        <div className="detailsCategory col-sm-5 col-md-5">
                                          Nutzlast
                                        </div>
                                        <div className="col-sm-5 col-md-5">
                                          <input type="text" className="form-control" onChange={this.handleNutzlast.bind(this)} value={this.state.snap.nutzlast} />
                                        </div>
                                      </React.Fragment>):(null)}
                                      {this.state.snap.auflaufbremse?(
                                      <React.Fragment>
                                        <div className="detailsCategory col-sm-5 col-md-5">
                                          Auflaufbremse
                                        </div>
                                        <div className="col-sm-5 col-md-5">
                                          <input type="text" className="form-control" onChange={this.handleAuflaufbremse.bind(this)} value={this.state.snap.auflaufbremse}/>
                                        </div>
                                      </React.Fragment>):(null)}
                                      {this.state.snap.gesamthoeheLadeboard?(
                                      <React.Fragment>
                                        <div className="detailsCategory col-sm-5 col-md-5">
                                          Gesamthöhe Ladeboard
                                        </div>
                                        <div className="col-sm-5 col-md-5">
                                          <input type="text" className="form-control" onChange={this.handleGesamthoeheLadeboard.bind(this)} value={this.state.snap.gesamthoeheLadeboard} />
                                        </div>
                                      </React.Fragment>):(null)}
                                      {this.state.snap.arbeitshoehe?(
                                      <React.Fragment>
                                        <div className="detailsCategory col-sm-5 col-md-5">
                                          Arbeitshöhe
                                        </div>
                                        <div className="col-sm-5 col-md-5">
                                          <input type="text" className="form-control" onChange={this.handleArbeitshoehe.bind(this)} value={this.state.snap.arbeitshoehe} />
                                        </div>
                                      </React.Fragment>):(null)}
                                      {this.state.snap.gesamthoeheSpriegel?(
                                      <React.Fragment>
                                        <div className="detailsCategory col-sm-5 col-md-5">
                                          Gesamthöhe Spriegel
                                        </div>
                                        <div className="col-sm-5 col-md-5">
                                          <input type="text" className="form-control" onChange={this.handleGesamthoeheSpriegel.bind(this)} value={this.state.snap.gesamthoeheSpriegel} />
                                        </div>
                                      </React.Fragment>):(null)}
                                      {this.state.snap.gesamtbreite?(
                                      <React.Fragment>
                                        <div className="detailsCategory col-sm-5 col-md-5">
                                          Gesamtbreite
                                        </div>
                                        <div className="col-sm-5 col-md-5">
                                          <input type="text" className="form-control" onChange={this.handleGesamtbreite.bind(this)} value={this.state.snap.gesamtbreite} />
                                        </div>
                                      </React.Fragment>):(null)}
                                      {this.state.snap.abstuetzlaenge?(
                                      <React.Fragment>
                                        <div className="detailsCategory col-sm-5 col-md-5">
                                          Abstützlänge
                                        </div>
                                        <div className="col-sm-5 col-md-5">
                                          <input type="text" className="form-control" onChange={this.handleAbstuetzlaenge.bind(this)} value={this.state.snap.abstuetzlaenge} />
                                        </div>
                                      </React.Fragment>):(null)}
                                      {this.state.snap.abstuetzbreite?(
                                      <React.Fragment>
                                        <div className="detailsCategory col-sm-5 col-md-5">
                                          Abstüzbreite
                                        </div>
                                        <div className="col-sm-5 col-md-5">
                                          <input type="text" className="form-control" onChange={this.handleAbstuetzbreite.bind(this)} value={this.state.snap.abstuetzbreite} />
                                        </div>
                                      </React.Fragment>):(null)}
                                      {this.state.snap.transportmasse?(
                                      <React.Fragment>
                                        <div className="detailsCategory col-sm-5 col-md-5">
                                          Transportmaße
                                        </div>
                                        <div className="col-sm-5 col-md-5">
                                          <input type="text" className="form-control" onChange={this.handleTransportmasse.bind(this)} value={this.state.snap.transportmasse} />
                                        </div>
                                      </React.Fragment>):(null)}
                                      {this.state.snap.hubhoehe?(
                                      <React.Fragment>
                                        <div className="detailsCategory col-sm-5 col-md-5">
                                          Hubhöhe
                                        </div>
                                        <div className="col-sm-5 col-md-5">
                                          <input type="text" className="form-control" onChange={this.handleHubhoehe.bind(this)} value={this.state.snap.hubhoehe} />
                                        </div>
                                      </React.Fragment>):(null)}
                                      {this.state.snap.antrieb?(
                                      <React.Fragment>
                                        <div className="detailsCategory col-sm-5 col-md-5">
                                          Antrieb
                                        </div>
                                        <div className="col-sm-5 col-md-5">
                                          <input type="text" className="form-control" onChange={this.handleAntrieb.bind(this)} value={this.state.snap.antrieb} />
                                        </div>
                                      </React.Fragment>):(null)}
                                      {this.state.snap.traglast?(
                                      <React.Fragment>
                                        <div className="detailsCategory col-sm-5 col-md-5">
                                          Traglast
                                        </div>
                                        <div className="col-sm-5 col-md-5">
                                          <input type="text" className="form-control" onChange={this.handleTraglast.bind(this)} value={this.state.snap.traglast} />
                                        </div>
                                      </React.Fragment>):(null)}
                                      {this.state.snap.plattform?(
                                      <React.Fragment>
                                        <div className="detailsCategory col-sm-5 col-md-5">
                                          Plattform
                                        </div>
                                        <div className="col-sm-5 col-md-5">
                                          <input type="text" className="form-control" onChange={this.handlePlattform.bind(this)} value={this.state.snap.plattform} />
                                        </div>
                                      </React.Fragment>):(null)}
                                      {this.state.snap.gesamthoehe?(
                                      <React.Fragment>
                                        <div className="detailsCategory col-sm-5 col-md-5">
                                          Gesamthöhe
                                        </div>
                                        <div className="col-sm-5 col-md-5">
                                          <input type="text" className="form-control" onChange={this.handleGesamthoehe.bind(this)} value={this.state.snap.gesamthoehe} />
                                        </div>
                                      </React.Fragment>):(null)}
                                      {this.state.snap.gesamtlaenge?(
                                      <React.Fragment>
                                        <div className="detailsCategory col-sm-5 col-md-5">
                                          Gesamtlänge
                                        </div>
                                        <div className="col-sm-5 col-md-5">
                                          <input type="text" className="form-control" onChange={this.handleGesamtlaenge.bind(this)} value={this.state.snap.gesamtlaenge} />
                                        </div>
                                      </React.Fragment>):(null)}
                                      {this.state.snap.innenhoehe?(
                                      <React.Fragment>
                                        <div className="detailsCategory col-sm-5 col-md-5">
                                          Innenhöhe
                                        </div>
                                        <div className="col-sm-5 col-md-5">
                                          <input type="text" className="form-control" onChange={this.handleInnenhoehe.bind(this)} value={this.state.snap.innenhoehe} />
                                        </div>
                                      </React.Fragment>):(null)}
                                      {this.state.snap.innenladehoehe?(
                                      <React.Fragment>
                                        <div className="detailsCategory col-sm-5 col-md-5">
                                          Innenladehöhe
                                        </div>
                                        <div className="col-sm-5 col-md-5">
                                          <input type="text" className="form-control" onChange={this.handleInnenladehoehe.bind(this)} value={this.state.snap.innenladehoehe} />
                                        </div>
                                      </React.Fragment>):(null)}
                                      {this.state.snap.innenbreite?(
                                      <React.Fragment>
                                        <div className="detailsCategory col-sm-5 col-md-5">
                                          Innenbreite
                                        </div>
                                        <div className="col-sm-5 col-md-5">
                                          <input type="text" className="form-control" onChange={this.handleInnenbreite.bind(this)} value={this.state.snap.innenbreite} />
                                        </div>
                                      </React.Fragment>):(null)}
                                      {this.state.snap.innenlaenge?(
                                      <React.Fragment>
                                        <div className="detailsCategory col-sm-5 col-md-5">
                                          Innenlänge
                                        </div>
                                        <div className="col-sm-5 col-md-5">
                                          <input type="text" className="form-control" onChange={this.handleInnenlaenge.bind(this)} value={this.state.snap.innenlaenge} />
                                        </div>
                                      </React.Fragment>):(null)}
                                      {this.state.snap.ladehöhe?(
                                      <React.Fragment>
                                        <div className="detailsCategory col-sm-5 col-md-5">
                                          Ladehöhe
                                        </div>
                                        <div className="col-sm-5 col-md-5">
                                          <input type="text" className="form-control" onChange={this.handleLadehöhe.bind(this)} value={this.state.snap.ladehöhe} />
                                        </div>
                                      </React.Fragment>):(null)}
                                      {this.state.snap.hundertkmh?(
                                      <React.Fragment>
                                        <div className="detailsCategory col-sm-5 col-md-5">
                                          100 km/h Zulassung
                                        </div>
                                        <div className="col-sm-5 col-md-5">
                                          <input type="text" className="form-control" onChange={this.handleHundertkmh.bind(this)} value={this.state.snap.hundertkmh}/>
                                        </div>
                                      </React.Fragment>):(null)}
                                      {this.state.snap.arbeitsbreite?(
                                      <React.Fragment>
                                        <div className="detailsCategory col-sm-5 col-md-5">
                                          Arbeitsbreite
                                        </div>
                                        <div className="col-sm-5 col-md-5">
                                          <input type="text" className="form-control" onChange={this.handleArbeitsbreite.bind(this)} value={this.state.snap.arbeitsbreite} />
                                        </div>
                                      </React.Fragment>):(null)}
                                      {this.state.snap.kraftstoff?(
                                      <React.Fragment>
                                        <div className="detailsCategory col-sm-5 col-md-5">
                                          Kraftstoff
                                        </div>
                                        <div className="col-sm-5 col-md-5">
                                          <input type="text" className="form-control" onChange={this.handleKraftstoff.bind(this)} value={this.state.snap.kraftstoff}/>
                                        </div>
                                      </React.Fragment>):(null)}
                                      {this.state.snap.ruettelkraft?(
                                      <React.Fragment>
                                        <div className="detailsCategory col-sm-5 col-md-5">
                                          Rüttelkraft
                                        </div>
                                        <div className="col-sm-5 col-md-5">
                                          <input type="text" className="form-control" onChange={this.handleRuettelkraft.bind(this)} value={this.state.snap.ruettelkraft} />
                                        </div>
                                      </React.Fragment>):(null)}
                                      {this.state.snap.schaufelinhalt?(
                                      <React.Fragment>
                                        <div className="detailsCategory col-sm-5 col-md-5">
                                          Schaufelinhalt
                                        </div>
                                        <div className="col-sm-5 col-md-5">
                                          <input type="text" className="form-control" onChange={this.handleSchaufelinhalt.bind(this)} value={this.state.snap.schaufelinhalt} />
                                        </div>
                                      </React.Fragment>):(null)}
                                      {this.state.snap.laengeDerLadeflaeche?(
                                      <React.Fragment>
                                        <div className="detailsCategory col-sm-5 col-md-5">
                                          Länge der Ladefläche
                                        </div>
                                        <div className="col-sm-5 col-md-5">
                                          <input type="text" className="form-control" onChange={this.handleLaengeDerLadeflaeche.bind(this)} value={this.state.snap.laengeDerLadeflaeche} />
                                        </div>
                                      </React.Fragment>):(null)}
                                      {this.state.snap.breiteDerLadeflaeche?(
                                      <React.Fragment>
                                        <div className="detailsCategory col-sm-5 col-md-5">
                                          Breite der Ladefläche
                                        </div>
                                        <div className="col-sm-5 col-md-5">
                                          <input type="text" className="form-control" onChange={this.handleBreiteDerLadeflaeche.bind(this)} value={this.state.snap.breiteDerLadeflaeche} />
                                        </div>
                                      </React.Fragment>):(null)}
                                      {this.state.snap.hoeheDerLadeflaeche?(
                                      <React.Fragment>
                                        <div className="detailsCategory col-sm-5 col-md-5">
                                          Höhe der Ladefläche
                                        </div>
                                        <div className="col-sm-5 col-md-5">
                                          <input type="text" className="form-control" onChange={this.handleHoeheDerLadeflaeche.bind(this)} value={this.state.snap.hoeheDerLadeflaeche} />
                                        </div>
                                      </React.Fragment>):(null)}
                                      {this.state.snap.laderaumvolumen?(
                                      <React.Fragment>
                                        <div className="detailsCategory col-sm-5 col-md-5">
                                          Laderaumvolumen
                                        </div>
                                        <div className="col-sm-5 col-md-5">
                                          <input type="text" className="form-control" onChange={this.handleLaderaumvolumen.bind(this)} value={this.state.snap.laderaumvolumen} />
                                        </div>
                                      </React.Fragment>):(null)}
                                      {this.state.snap.volumenstrom?(
                                      <React.Fragment>
                                        <div className="detailsCategory col-sm-5 col-md-5">
                                          Volumenstrom
                                        </div>
                                        <div className="col-sm-5 col-md-5">
                                          <input type="text" className="form-control" onChange={this.handleVolumenstrom.bind(this)} value={this.state.snap.volumenstrom} />
                                        </div>
                                      </React.Fragment>):(null)}
                                      {this.state.snap.leergewicht?(
                                      <React.Fragment>
                                        <div className="detailsCategory col-sm-5 col-md-5">
                                          Leergewicht
                                        </div>
                                        <div className="col-sm-5 col-md-5">
                                          <input type="text" className="form-control" onChange={this.handleLeergewicht.bind(this)} value={this.state.snap.leergewicht} />
                                        </div>
                                      </React.Fragment>):(null)}
                                      {this.state.snap.gesamtGewicht?(
                                      <React.Fragment>
                                        <div className="detailsCategory col-sm-5 col-md-5">
                                          Gesamtgewicht
                                        </div>
                                        <div className="col-sm-5 col-md-5">
                                          <input type="text" className="form-control" onChange={this.handleGesamtGewicht.bind(this)} value={this.state.snap.gesamtGewicht} />
                                        </div>
                                      </React.Fragment>):(null)}
                                      {this.state.snap.sitzplaetze?(
                                      <React.Fragment>
                                        <div className="detailsCategory col-sm-5 col-md-5">
                                          Sitzplätze
                                        </div>
                                        <div className="col-sm-5 col-md-5">
                                          <input type="text" className="form-control" onChange={this.handleSitzplaetze.bind(this)} value={this.state.snap.sitzplaetze}/>
                                        </div>
                                      </React.Fragment>):(null)}
                                      {this.state.snap.sitzplaetze?(
                                      <React.Fragment>
                                        <div className="detailsCategory col-sm-5 col-md-5">
                                          Sitzplätze
                                        </div>
                                        <div className="col-sm-5 col-md-5">
                                          <input type="text" className="form-control" onChange={this.handleInklAuffahrampen.bind(this)} value={this.state.snap.inklAuffahrampen}/>
                                        </div>
                                      </React.Fragment>):(null)}
                                      {this.state.snap.dreiseitenkipper?(
                                      <React.Fragment>
                                        <div className="detailsCategory col-sm-5 col-md-5">
                                          Sitzplätze
                                        </div>
                                        <div className="col-sm-5 col-md-5">
                                          <input type="text" className="form-control" onChange={this.handleDreiseitenkipper.bind(this)} value={this.state.snap.dreiseitenkipper}/>
                                        </div>
                                      </React.Fragment>):(null)}
                                      {this.state.snap.inklAnhängerplane?(
                                      <React.Fragment>
                                        <div className="detailsCategory col-sm-5 col-md-5">
                                          Sitzplätze
                                        </div>
                                        <div className="col-sm-5 col-md-5">
                                          <input type="text" className="form-control" onChange={this.handleInklAnhängerplane.bind(this)} value={this.state.snap.inklAnhängerplane}/>
                                        </div>
                                      </React.Fragment>):(null)}

                                      {this.state.snap.leistung?(
                                      <React.Fragment>
                                        <div className="detailsCategory col-sm-5 col-md-5">
                                          Leistung
                                        </div>
                                        <div className="col-sm-5 col-md-5">
                                          <input type="text" className="form-control" onChange={this.handleLeistung.bind(this)} value={this.state.snap.leistung} />
                                        </div>
                                      </React.Fragment>):(null)}
                                      {this.state.snap.druckbereich?(
                                      <React.Fragment>
                                        <div className="detailsCategory col-sm-5 col-md-5">
                                          Druckbereich
                                        </div>
                                        <div className="col-sm-5 col-md-5">
                                          <input type="text" className="form-control" onChange={this.handleDruckbereich.bind(this)} value={this.state.snap.druckbereich} />
                                        </div>
                                      </React.Fragment>):(null)}
                                      {this.state.snap.anhaengerlastUngebremst?(
                                      <React.Fragment>
                                        <div className="detailsCategory col-sm-5 col-md-5">
                                          Anhängerlast Ungebremst
                                        </div>
                                        <div className="col-sm-5 col-md-5">
                                          <input type="text" className="form-control" onChange={this.handleAnhaengerlastUngebremst.bind(this)} value={this.state.snap.anhaengerlastUngebremst} />
                                        </div>
                                      </React.Fragment>):(null)}
                                      {this.state.snap.anhaengerlastGebremst?(
                                      <React.Fragment>
                                        <div className="detailsCategory col-sm-5 col-md-5">
                                          Anhängerlast Gebremst
                                        </div>
                                        <div className="col-sm-5 col-md-5">
                                          <input type="text" className="form-control" onChange={this.handleAnhaengerlastGebremst.bind(this)} value={this.state.snap.anhaengerlastGebremst} />
                                        </div>
                                      </React.Fragment>):(null)}
                                      {this.state.snap.stuetzlast?(
                                      <React.Fragment>
                                        <div className="detailsCategory col-sm-5 col-md-5">
                                          Stützlast
                                        </div>
                                        <div className="col-sm-5 col-md-5">
                                          <input type="text" className="form-control" onChange={this.handleStuetzlast.bind(this)} value={this.state.snap.stuetzlast} />
                                        </div>
                                      </React.Fragment>):(null)}
                                      {this.state.snap.fuehrerschein?(
                                      <React.Fragment>
                                        <div className="detailsCategory col-sm-5 col-md-5">
                                          Führerscheinklasse
                                        </div>
                                        <div className="col-sm-5 col-md-5">
                                          <input type="text" className="form-control" onChange={this.handleFuehrerschein.bind(this)} value={this.state.snap.fuehrerschein}/>
                                        </div>
                                      </React.Fragment>):(null)}
                                      </div>
                                    </div>)}
                                  </div>
                                </div>
                              </div>
                              <div className="editProfile">
                              <a className="editProfile" onClick={()=>{  this.setState((prevState)=>{
                                  return {editBeschreibung: !prevState.editBeschreibung};
                                })}}>{this.state.editBeschreibung?("bearbeiten"):("abbrechen")}</a><a> </a>
    {this.state.editBeschreibung?(null):(<a className="editProfile" onClick={this.saveBeschreibung.bind(this)}>speichern</a>)}
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
                                      {this.state.editBeschreibung?(<div className="col-sm-5 col-md-5">
                                        <p>{this.state.snap.cardDesc} </p>
                                      </div>):(
                                        <div className="col-sm-5 col-md-5">
                                        <textarea className="h-100 form-control" className="form-control" onChange={this.handleBeschreibung.bind(this)} value={this.state.snap.cardDesc}></textarea>
                                        </div>
                                      )}
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
                                      <div className="review-body">
                                        <div className="detailsCategory col-sm-12 col-md-5">
                                          <div className="review-avatar">
                														<img alt="" src={this.state.vermieterUrl} className=""/>
                													</div>
                                        </div>
                                        <div className="col-sm-12 col-md-5">
                                          <a>{this.state.vermieter}</a>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>


                						</div>
                						{/* End: Listing Detail Wrapper */}

                						{/* Sidebar Start */}

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
                  						<div className="col-md-12 col-sm-12">
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
                                        <div className="detailsCategory col-sm-5 col-md-5">
                                          Trog
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

export default MashineDetails;
