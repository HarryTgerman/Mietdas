import React, {Component} from 'react';
import firebase from 'firebase';
import {Redirect, NavLink, Link} from 'react-router-dom'
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from 'react-image-gallery';
import Logo from '../../../../img/logo.png'


class MashineDetails extends Component{
  constructor (props){
  super(props)
  this.state={
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
  this.setState({
    load:true
  },()=>{
    firebase.database().ref('app').child('cards').child(this.state.urlId).remove()

  })
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
                                  <figure className="img-holder ">
                                    <a><ImageGallery  items={this.state.images} showPlayButton={false} className="detailsImg" alt="News"/></a>
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
