import React, {Component} from 'react';
import {NavLink, Redirect,Link} from 'react-router-dom'
import CountTo from 'react-count-to';
import firebase from 'firebase'
import Slider from 'react-slick'

const fn = value => <span>{value}</span>
const facebookProvider = new firebase.auth.FacebookAuthProvider()

class Home extends Component{

  constructor(props){
    super(props)
    this.register = this.register.bind(this);
    this.signIn = this.signIn.bind(this);
    this.authWithFacebook= this.authWithFacebook.bind(this);
    this.registerWithFacebook = this.registerWithFacebook.bind(this);
    this.state = {
       authenticated: false,
       redirect: false,
       registerRedirect:false,
       selectValue: "",
       cityValue: "",
    }
}


handleChange(event) {
   this.setState({cityValue: event.target.value});
 }
 handleChange1(event) {
    this.setState({selectValue: event.target.value});
  }
componentWillMount(){
    this.removeAuthListener = firebase.auth().onAuthStateChanged((user)=>{
      const userProfile = firebase.auth().currentUser;
      if(user){
        this.setState({
          authenticated: true,
          name : userProfile.displayName,
          email : userProfile.email,
          uid : userProfile.uid,
        })
      } else {
        this.setState({
          authenticated: false,
        },()=>{if (this.state.photoUrl == null){this.setState({showPhotoUrl:false})}else {this.setState({showPhotoUrl:true})}}
        )
      }
    })
  }







  authWithFacebook(){
    let whenFacebookAuth = firebase.auth().signInWithPopup(facebookProvider)
      .then((result, error) => {
        if (error) {
          alert(error)
        } else {
          this.setState({ authenticated: true})
        }
      })
      whenFacebookAuth.then(() =>{ window.location.reload()})
  }


signIn(){
  const email = this.userNameInput.value;
  const password = this.passwordInput.value;

  let whenSignIn = firebase.auth().signInWithEmailAndPassword(email, password).catch((error) => {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // [START_EXCLUDE]
          if (errorCode === 'auth/wrong-password') {
            alert('Falsches Passwort');
          } else {
            alert(errorMessage);
          }
          console.log(error)
        })
    whenSignIn.then(() =>{ window.location.reload()})
      }

register(){


  const email = this.emailInput.value;
  const password = this.createPassword.value;
  let whenRegister = firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
        var errorMessage = error.message;
        // [START_EXCLUDE]
        if (errorCode === 'auth/weak-password') {
          alert('Das Password ist zu schwach');
        } else {
          alert(errorMessage);
        }
        console.log(error);
        // [END_EXCLUDE]
      });
    // ...
    whenRegister
    .then(()=>{ this.setState({registerRedirect:true})
    })

  }

  registerWithFacebook(){
    let whenFacebookAuth = firebase.auth().signInWithPopup(facebookProvider)
      .then((result, error) => {
        if (error) {
          alert(error)
        } else {
          this.setState({ authenticated: true})
        }
      })
      whenFacebookAuth.then(() =>{ this.setState({registerRedirect:true})
      })
  }
        render(){
          if (this.state.redirect === true) {
            return <Redirect to='/benutzeraccount' />
          }else if (this.state.registerRedirect === true) {
            return <Redirect to='/account-erstellen' />
          }
          var slickSettings = {
              dots: false,
              infinite: true,
              speed: 500,
              slidesToShow: 1,
              slidesToScroll: 1
            }
                  return(
                <div>

                      <body className="home-2">
                        <div className="wrapper">
                           {/*Start Navigation*/}
                          <div className="navbar navbar-default navbar-fixed navbar-transparent white bootsnav">
                            <div style={{paddingBottom: "0"}}  className="container">
                              <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#navbar-menu">
                                <i className="ti-align-left"></i>
                              </button>

                               {/*Start Header Navigation*/}
                              <div className="navbar-header">
                                <NavLink to="/">
                                  <img src="assets/img/logo.png" className="logo logo-scrolled" alt=""/>
                                  <img src="assets/img/logo-white.png" className="logo logo-display" alt=""/>
                                </NavLink>
                              </div>

                               {/*Collect the nav links, forms, and other content for toggling*/}
                              <div className="collapse navbar-collapse" id="navbar-menu">
                                <ul className="nav navbar-nav navbar-center">

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
                           {/*End Navigation*/}
                          <div className="clearfix"></div>

                           {/*Main Banner Section Start*/}
                          <div className="banner light-opacity bannerBackground2">
                            <div className="container">

                              <div className="banner-caption">
                                <div className="col-md-12 col-sm-12 banner-text">
                                  <h1>Miete jetzt <span stlye={{color: "#ff431e"}}>Baumaschinen</span></h1>
                                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</p>
                                    <form className="form-verticle formverticle">
                                      <div className="col-md-4 col-sm-4 no-padd">
                                        <i className="banner-icon icon-map-pin"></i>
                                        <input type="text" className="form-control left-radius right-br" onChange={this.handleChange.bind(this)} placeholder="Ort..."/>
                                      </div>
                                      <div className="col-md-3 col-sm-3 no-padd">

                                          <select  onChange={this.handleChange1.bind(this)} className="form-control"  data-live-search="true">
                                            <option default><i className="banner-icon icon-layers"></i>Wähle Kategorie</option>
                                            <option value="bagger">Bagger</option>
                                            <option value="verdichtungstechnik">Verdichtungstechnik</option>
                                            <option value="anhänger">Anhänger</option>
                                            <option value="transporter">Transporter</option>
                                          </select>
                                        </div>
                                      <div className="col-md-2 col-sm-2 no-padd">
                                        <Link to={{pathname: `/mieten/`,query: {city: this.state.cityValue,kategorie: this.state.selectValue}}}>
                                        <button type="submit" className="btn theme-btn btn-default">Suchen</button></Link>
                                      </div>
                                    </form>

                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="clearfix"></div>
                           {/*Main Banner Section End*/}

                           {/*Services Section*/}
                          <section className="features">
                            <div className="container">
                              <div className="row">
                                <div className="col-md-10 col-md-offset-1">
                                <div className="heading">
                                  <h2>Plan Which in <span>Your Mind</span></h2>
                                  <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi</p>
                                </div>
                                </div>
                              </div>
                              <div className="col-md-4 col-sm-4">
                                <div className="feature-box">
                                  <span className="ti-map-alt"></span>
                                  <h4>Find Interesting Place</h4>
                                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.</p>
                                </div>
                              </div>
                              <div className="col-md-4 col-sm-4">
                                <div className="feature-box">
                                  <span className="ti-email"></span>
                                  <h4>Contact a Few Owners</h4>
                                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.</p>
                                </div>
                              </div>
                              <div className="col-md-4 col-sm-4">
                                <div className="feature-box">
                                  <span className="ti-user"></span>
                                  <h4>Make a Reservation</h4>
                                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.</p>
                                </div>
                              </div>
                            </div>
                          </section>
                           {/*End Services Section*/}

                           {/*Popular Listing Section*/}
                          <section className="gray-bg">
                            <div className="container">
                              <div className="row">
                                <div className="col-md-10 col-md-offset-1">
                                <div className="heading">
                                  <h2>Top & Popular <span>Listings</span></h2>
                                  <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis</p>
                                </div>
                                </div>
                              </div>

                              <div className="row">
                                <div className="col-md-4 col-sm-6">
                                  <div className="listing-shot grid-style">
                                    <a href="#">
                                      <div className="listing-shot-img">
                                        <img src="http://via.placeholder.com/800x800" className="img-responsive" alt=""/>
                                        <span className="like-listing"><i className="fa fa-heart-o" aria-hidden="true"></i></span>
                                      </div>
                                      <div className="listing-shot-caption">
                                        <h4>Art & Design</h4>
                                        <p className="listing-location">Bishop Avenue, New York</p>
                                      </div>
                                    </a>
                                    <div className="listing-shot-info">
                                      <div className="row extra">
                                        <div className="col-md-12">
                                          <div className="listing-detail-info">
                                            <span><i className="fa fa-phone" aria-hidden="true"></i> 807-502-5867</span>
                                            <span><i className="fa fa-globe" aria-hidden="true"></i> www.mysitelink.com</span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="listing-shot-info rating">
                                      <div className="row extra">
                                        <div className="col-md-7 col-sm-7 col-xs-6">
                                          <i className="color fa fa-star" aria-hidden="true"></i>
                                          <i className="color fa fa-star" aria-hidden="true"></i>
                                          <i className="color fa fa-star" aria-hidden="true"></i>
                                          <i className="color fa fa-star-half-o" aria-hidden="true"></i>
                                          <i className="fa fa-star" aria-hidden="true"></i>
                                        </div>
                                        <div className="col-md-5 col-sm-5 col-xs-6 pull-right">
                                          <a href="#" className="detail-link">Open Now</a>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <div className="col-md-4 col-sm-6">
                                  <div className="listing-shot grid-style">
                                    <a href="#">
                                      <div className="listing-shot-img">
                                        <img src="http://via.placeholder.com/800x800" className="img-responsive" alt=""/>
                                        <span className="like-listing"><i className="fa fa-heart-o" aria-hidden="true"></i></span>
                                      </div>
                                      <div className="listing-shot-caption">
                                        <h4>Education</h4>
                                        <p className="listing-location">Bishop Avenue, New York</p>
                                      </div>
                                    </a>
                                    <div className="listing-shot-info">
                                      <div className="row extra">
                                        <div className="col-md-12">
                                          <div className="listing-detail-info">
                                            <span><i className="fa fa-phone" aria-hidden="true"></i> 807-502-5867</span>
                                            <span><i className="fa fa-globe" aria-hidden="true"></i> www.mysitelink.com</span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="listing-shot-info rating">
                                      <div className="row extra">
                                        <div className="col-md-7 col-sm-7 col-xs-6">
                                          <i className="color fa fa-star" aria-hidden="true"></i>
                                          <i className="color fa fa-star" aria-hidden="true"></i>
                                          <i className="color fa fa-star" aria-hidden="true"></i>
                                          <i className="color fa fa-star-half-o" aria-hidden="true"></i>
                                          <i className="fa fa-star" aria-hidden="true"></i>
                                        </div>
                                        <div className="col-md-5 col-sm-5 col-xs-6 pull-right">
                                          <a href="#" className="detail-link">Open Now</a>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <div className="col-md-4 col-sm-6">
                                  <div className="listing-shot grid-style">
                                    <a href="#">
                                      <div className="listing-shot-img">
                                        <img src="http://via.placeholder.com/800x800" className="img-responsive" alt=""/>
                                        <span className="like-listing"><i className="fa fa-heart-o" aria-hidden="true"></i></span>
                                      </div>
                                      <div className="listing-shot-caption">
                                        <h4>Documentary</h4>
                                        <p className="listing-location">Bishop Avenue, New York</p>
                                      </div>
                                    </a>
                                    <div className="listing-shot-info">
                                      <div className="row extra">
                                        <div className="col-md-12">
                                          <div className="listing-detail-info">
                                            <span><i className="fa fa-phone" aria-hidden="true"></i> 807-502-5867</span>
                                            <span><i className="fa fa-globe" aria-hidden="true"></i> www.mysitelink.com</span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="listing-shot-info rating">
                                      <div className="row extra">
                                        <div className="col-md-7 col-sm-7 col-xs-6">
                                          <i className="color fa fa-star" aria-hidden="true"></i>
                                          <i className="color fa fa-star" aria-hidden="true"></i>
                                          <i className="color fa fa-star" aria-hidden="true"></i>
                                          <i className="color fa fa-star-half-o" aria-hidden="true"></i>
                                          <i className="fa fa-star" aria-hidden="true"></i>
                                        </div>
                                        <div className="col-md-5 col-sm-5 col-xs-6 pull-right">
                                          <a href="#" className="detail-link">Open Now</a>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </section>
                           {/*End Popular Listing Section*/}

                           {/*Features Section*/}
                          <section className="features-sec">
                            <div className="container">
                              <div className="col-md-4 col-sm-6">
                                <div className="service-box">
                                  <div className="service-icon">
                                    <i className="ti-map-alt"></i>
                                  </div>
                                  <div className="service-content">
                                    <h3>
                                      <a href="#">Discover greates places</a>
                                    </h3>
                                    <p>
                                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam finibus, velit nec luctus dictum.
                                    </p>
                                  </div>
                                  <div className="read">
                                    <a href="#">+</a>
                                  </div>
                                </div>
                              </div>

                              <div className="col-md-4 col-sm-6">
                                <div className="service-box">
                                  <div className="service-icon">
                                    <i className="ti-share"></i>
                                  </div>
                                  <div className="service-content">
                                    <h3>
                                      <a href="#">Discover greates places</a>
                                    </h3>
                                    <p>
                                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam finibus, velit nec luctus dictum.
                                    </p>
                                  </div>
                                  <div className="read">
                                    <a href="#">+</a>
                                  </div>
                                </div>
                              </div>

                              <div className="col-md-4 col-sm-6">
                                <div className="service-box">
                                  <div className="service-icon">
                                    <i className="ti-pencil-alt"></i>
                                  </div>
                                  <div className="service-content">
                                    <h3>
                                      <a href="#">Discover greates places</a>
                                    </h3>
                                    <p>
                                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam finibus, velit nec luctus dictum.
                                    </p>
                                  </div>
                                  <div className="read">
                                    <a href="#">+</a>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </section>
                           {/*End Features Section*/}

                           {/*Counter Section*/}
                          <section className="company-state theme-overlap bannerBackground1" >
                            <div className="container-fluid">
                              <div className="col-md-3 col-sm-6">
                                <div className="work-count">
                                  <span className="theme-cl icon icon-trophy"></span>
                                  <span className="counter"><CountTo to={40} speed={5555}>{fn}</CountTo></span> <span className="counter-incr">+</span>
                                  <p>Awards Winning</p>
                                </div>
                              </div>
                              <div className="col-md-3 col-sm-6">
                                <div className="work-count">
                                  <span className="theme-cl icon icon-layers"></span>
                                  <span className="counter"><CountTo to={10034} speed={5555}>{fn}</CountTo></span> <span className="counter-incr">+</span>
                                  <p>Done Projects</p>
                                </div>
                              </div>
                              <div className="col-md-3 col-sm-6">
                                <div className="work-count">
                                  <span className="theme-cl icon icon-happy"></span>
                                  <span className="counter"><CountTo to={3490} speed={5555}>{fn}</CountTo></span> <span className="counter-incr">+</span>
                                  <p>Happy Clients</p>
                                </div>
                              </div>
                              <div className="col-md-3 col-sm-6">
                                <div className="work-count">
                                  <span className="theme-cl icon icon-dial"></span>
                                  <span className="counter"><CountTo to={1000000} speed={5555}>{fn}</CountTo></span> <span className="counter-incr">+</span>
                                  <p>Cups Of Cofee</p>
                                </div>
                              </div>
                            </div>
                          </section>
                          {/*End Counter Section*/}

                          {/*Testimonial Section*/}
                          <section className="testimonials-2">
                            <div className="container">
                              <div className="row">
                                <div className="col-md-10 col-md-offset-1">
                                <div className="heading">
                                  <h2>What Say <span>Our Customers</span></h2>
                                  <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis</p>
                                </div>
                                </div>
                              </div>

                              <div className="row">
                                <div className="col-md-12">
                                 <Slider {...slickSettings}>
                                    <div className="testimonial-detail">
                                      <div className="pic">
                                        <img src="http://via.placeholder.com/80x80" alt=""/>
                                      </div>
                                      <p className="description">
                                        " Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem commodi eligendi facilis itaque minus non odio, quaerat ullam unde voluptatum? "
                                      </p>
                                      <h3 className="testimonial-title">williamson</h3>
                                      <span className="post">Web Developer</span>
                                      <ul className="testimonial-rating">
                                        <li className="fa fa-star-o"></li>
                                        <li className="fa fa-star-o"></li>
                                        <li className="fa fa-star"></li>
                                      </ul>
                                    </div>

                                    <div className="testimonial-detail">
                                      <div className="pic">
                                        <img src="http://via.placeholder.com/80x80" alt=""/>
                                      </div>
                                      <p className="description">
                                        " Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem commodi eligendi facilis itaque minus non odio, quaerat ullam unde voluptatum? "
                                      </p>
                                      <h3 className="testimonial-title">kristiana</h3>
                                      <span className="post">Web Designer</span>
                                      <ul className="testimonial-rating">
                                        <li className="fa fa-star-o"></li>
                                        <li className="fa fa-star"></li>
                                        <li className="fa fa-star"></li>
                                      </ul>
                                    </div>

                                    <div className="testimonial-detail">
                                      <div className="pic">
                                        <img src="http://via.placeholder.com/80x80" alt=""/>
                                      </div>
                                      <p className="description">
                                        " Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem commodi eligendi facilis itaque minus non odio, quaerat ullam unde voluptatum? "
                                      </p>
                                      <h3 className="testimonial-title">kristiana</h3>
                                      <span className="post">Web Designer</span>
                                      <ul className="testimonial-rating">
                                        <li className="fa fa-star-o"></li>
                                        <li className="fa fa-star"></li>
                                        <li className="fa fa-star"></li>
                                      </ul>
                                    </div>

                                    <div className="testimonial-detail">
                                      <div className="pic">
                                        <img src="http://via.placeholder.com/80x80" alt=""/>
                                      </div>
                                      <p className="description">
                                        " Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem commodi eligendi facilis itaque minus non odio, quaerat ullam unde voluptatum? "
                                      </p>
                                      <h3 className="testimonial-title">kristiana</h3>
                                      <span className="post">Web Designer</span>
                                      <ul className="testimonial-rating">
                                        <li className="fa fa-star-o"></li>
                                        <li className="fa fa-star"></li>
                                        <li className="fa fa-star"></li>
                                      </ul>
                                    </div>
                                  </Slider>
                                </div>
                              </div>
                            </div>
                          </section>
                           {/*End Testimonial Section*/}

                           {/*================== Login & Sign Up Window ==================*/}
                          <div className="modal fade" id="signup" tabindex="-1" role="dialog" aria-labelledby="myModalLabel2" aria-hidden="true">
                            <div className="modal-dialog">
                              <div className="modal-content">
                                <div className="modal-body">
                                  <div className="tab" role="tabpanel">
                                   {/*Nav tabs*/}
                                  <ul className="nav nav-tabs" role="tablist">
                                    <li role="presentation" className="active"><a href="#login" role="tab" data-toggle="tab">Log dich ein</a></li>
                                    <li role="presentation"><a href="#register" role="tab" data-toggle="tab">Registriere dich</a></li>
                                  </ul>
                                   {/*Tab panes*/}
                                  <div className="tab-content" id="myModalLabel2">
                                    <div role="tabpanel" className="tab-pane fade in active" id="login">
                                      <img src="assets/img/logo.png" className="img-responsive" alt="" />
                                      <div className="subscribe wow fadeInUp">
                                        <form className="form-inline" >
                                          <div className="col-sm-12">
                                            <div className="form-group">
                                              <input type="email"  name="email" className="form-control" placeholder="E-mail"  ref={(input) => { this.userNameInput = input; }} required=""/>
                                              <input type="password" name="password" className="form-control"  placeholder="Passwort" ref={(input) => { this.passwordInput = input; }} required=""/>
                                              <div className="center">
                                              <button  type = "button" className="btn btn-midium btn-primary btn-radius width-200" style={{borderRadius: "50px", width: "200px"}} onClick={this.authWithFacebook}>
                                                Log-In mit Facebook
                                              </button>
                                              <button type="button" id="login-btn" onClick={this.signIn} className="btn btn-midium theme-btn btn-radius width-200"> Login </button>
                                              </div>
                                            </div>
                                          </div>
                                        </form>
                                      </div>
                                    </div>

                                    <div role="tabpanel" className="tab-pane fade" id="register">
                                    <img src="assets/img/logo.png" className="img-responsive" alt="" />
                                      <form className="form-inline"  >
                                        <div className="col-sm-12">
                                          <div className="form-group">
                                            <input type="email"  name="email" className="form-control" placeholder="Deine Email" ref={(input) => { this.emailInput = input; }} required=""/>
                                            <input type="password"  name="password" className="form-control" placeholder="Passwort" ref={(input) => { this.createPassword = input; }} required=""/>
                                            <div className="center">
                                            <button  type = "button" className="btn btn-midium btn-primary btn-radius width-200" style={{borderRadius: "50px", width: "200px"}} onClick={this.registerWithFacebook}>
                                              Log-In mit Facebook
                                            </button>
                                            <button   type = "button" onClick={this.register} className="btn btn-midium theme-btn btn-radius width-200"> Registriere Dich </button>
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
                        </body>
                </div>
            )
        }
    }

export default Home;
