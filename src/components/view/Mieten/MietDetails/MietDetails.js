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
    const ref = url.split('/');
    const cardId = ref[2];
    const urlPromis =  new Promise ((resolve, reject)=>{
    firebase.database().ref().child('app').child('cards')
      .child(cardId)
      .once('value', snap => {
          this.setState ({
            snap: snap.val(),
            id: snap.key,
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
                                    <div class="blog-post-date theme-bg">
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
                                      <div className="detailsCategory col-sm-5 col-md-5">
                                        Grabtiefe
                                      </div>
                                      <div className="col-sm-5 col-md-5">
                                        <p>{this.state.snap.grabtiefe}</p>
                                      </div>
                                      <div className="detailsCategory col-sm-5 col-md-5">
                                        Transportbreite
                                      </div>
                                      <div className="col-sm-5 col-md-5">
                                        <p>{this.state.snap.transportbreite}</p>
                                      </div>
                                      <div className="detailsCategory col-sm-5 col-md-5">
                                        Transporthöhe
                                      </div>
                                      <div className="col-sm-5 col-md-5">
                                        <p>{this.state.snap.transporthoehe}</p>
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

                							<div className="detail-wrapper">
                								<div className="detail-wrapper-header">
                									<h4>Rate & Write Reviews</h4>
                								</div>
                								<div className="detail-wrapper-body">

                									<div className="row mrg-bot-10">
                										<div className="col-md-12">
                											<div className="rating-opt">
                												<div   className="jr-ratenode jr-nomal"></div>
                												<div   className="jr-ratenode jr-nomal "></div>
                												<div   className="jr-ratenode jr-nomal "></div>
                												<div   className="jr-ratenode jr-nomal "></div>
                												<div   className="jr-ratenode jr-nomal "></div>
                											</div>
                										</div>
                									</div>

                									<div className="row">
                										<div className="col-sm-6">
                											<input type="text" className="form-control" placeholder="Your Name*"/>
                										</div>
                										<div className="col-sm-6">
                											<input type="email" className="form-control" placeholder="Email Address*"/>
                										</div>
                										<div className="col-sm-12">
                											<textarea className="form-control height-110" placeholder="Tell us your experience..."></textarea>
                										</div>
                										<div className="col-sm-12">
                											<button type="button" className="btn theme-btn">Submit your review</button>
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
                    </div>):(<h2>Loading...</h2>)}
              </div>
            )
        }
    }

export default MietDetails;
