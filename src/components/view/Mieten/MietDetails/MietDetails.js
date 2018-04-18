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




        render(){
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
                												<a href="#" className="detail-rating-count">47 Rating</a>
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
                                      <div className="detailsCategory col-sm-5 col-md-5">
                                        Gewicht
                                      </div>
                                      <div className="col-sm-5 col-md-5">
                                        <p>{this.state.snap.gewicht} Tonnen</p>
                                      </div>
                                      <div className="detailsCategory col-sm-5 col-md-5">
                                        Hersetller
                                      </div>
                                      <div className="col-sm-5 col-md-5">
                                        <p>{this.state.snap.hersteller}</p>
                                      </div>
                                      <div>
                                      {this.state.snap.grabtiefe?
                                      (<React.Fragment>
                                        <div className="detailsCategory col-sm-5 col-md-5">
                                          Grabtiefe
                                        </div>
                                        <div className="col-sm-5 col-md-5">
                                          <p>{this.state.snap.grabtiefe}</p>
                                        </div>
                                      </React.Fragment>
                                      ):(null)}
                                      {this.state.snap.transportbreite?(
                                      <React.Fragment>
                                        <div className="detailsCategory col-sm-5 col-md-5">
                                          Transportbreite
                                        </div>
                                        <div className="col-sm-5 col-md-5">
                                          <p>{this.state.snap.transportbreite}</p>
                                        </div>
                                      </React.Fragment>
                                      ):(null)}
                                      {this.state.snap.transporthoehe?(
                                      <React.Fragment>
                                        <div className="detailsCategory col-sm-5 col-md-5">
                                          Transporthöhe
                                        </div>
                                        <div className="col-sm-5 col-md-5">
                                          <p>{this.state.snap.transporthoehe}</p>
                                        </div>
                                      </React.Fragment>):(null)}
                                      </div>
                                      <div className="detailsCategory col-sm-5 col-md-5">
                                        Datenblatt
                                      </div>
                                      <div className="col-sm-5 col-md-5">
                                        <a href={this.state.snap.pdf}>klicke hier</a>
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
          							         <h4>Mietbedingungen</h4>
                								</div>
                                <div className="widget-boxed-body">
                                  <div className="side-list">
                                    <div className="reviews-box">
                                      <div className="detailsCategory col-sm-5 col-md-5">
                                        Mietbedingungen
                                      </div>
                                      <div className="col-sm-5 col-md-5">
                                        <p>{this.state.snap.mietbedingungen} </p>
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
                						<div className="col-md-4 col-sm-12">
                							<div className="sidebar">
                								{/* Start: Book A Reservation */}
                								<div className="widget-boxed ">
                									<div className="widget-boxed-header">
                										<h4><i className="ti-calendar padd-r-10"></i>Book A Reservation</h4>
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
                                           const diff =  b.diff(a, 'days');
                                           var  Gesamtsumme = this.state.snap.cardPreis * diff ;
                                            this.setState({ endDate, startDate,
                                              startDateString: startDateString,
                                              endDateString: endDateString,
                                              numberOfDays: diff+" Tage",
                                              Diff: diff,
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
                    												<li>Ihr Preis <span>{this.state.snap.cardPreis * this.state.Diff},00€</span></li>
        												            <li>Gesamtsumme <span>{this.state.snap.cardPreis * this.state.Diff},00€</span></li>
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
                  										<h3>loading Data... </h3>
                  										<div className="row">
                  											<a href="#listing-location" className="listing-address col-sm-5">
                  												<i className="ti-location-pin mrg-r-5"></i>
                  												loading Data...
                  											</a>
                  											<div className="rating-box col-sm-5 starBox">
                  												<div className="detail-list-rating">
                  													<i className="fa fa-star"></i>
                  													<i className="fa fa-star"></i>
                  													<i className="fa fa-star"></i>
                  													<i className="fa fa-star"></i>
                  													<i className="fa fa-star"></i>
                  												</div>
                  												<a href="#" className="detail-rating-count">47 Rating</a>
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
                                          <p>loading Data...</p>
                                        </div>
                                        <div className="detailsCategory col-sm-5 col-md-5">
                                          Hersetller
                                        </div>
                                        <div className="col-sm-5 col-md-5">
                                          <p>loading Data... </p>
                                        </div>
                                        <div className="detailsCategory col-sm-5 col-md-5">
                                          Grabtiefe
                                        </div>
                                        <div className="col-sm-5 col-md-5">
                                          <p>loading Data... </p>
                                        </div>
                                        <div className="detailsCategory col-sm-5 col-md-5">
                                          Transportbreite
                                        </div>
                                        <div className="col-sm-5 col-md-5">
                                          <p>loading Data... </p>
                                        </div>
                                        <div className="detailsCategory col-sm-5 col-md-5">
                                          Transporthöhe
                                        </div>
                                        <div className="col-sm-5 col-md-5">
                                          <p>loading Data... </p>
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
                                          <p>loading Data... </p>
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
                                          <p>loading Data...</p>
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
                  										<h4><i className="ti-calendar padd-r-10"></i>Book A Reservation</h4>
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
                                             const diff =  b.diff(a, 'days');
                                             var  Gesamtsumme = 0 * diff ;
                                              this.setState({ endDate, startDate,
                                                startDateString: startDateString,
                                                endDateString: endDateString,
                                                numberOfDays: diff+" Tage",
                                                Diff: diff,
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
                      												<li>Standort  <span>...</span></li>
                                              <li>Mietdauer  <span>...</span></li>
                      												<li>Ihr Preis <span>...,00€</span></li>
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
