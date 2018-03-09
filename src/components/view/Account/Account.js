import React, {Component} from 'react';
import firebase from 'firebase';
import {Redirect, NavLink} from 'react-router-dom'
import AccountCards from './AccountCard'

class Account extends Component{
  constructor(props){
    super(props)
    this.firedata = this.firedata.bind(this)
    this.state ={
      authenticated: false,
      cards: [],
    }
}

firedata() {
  const previousCards = this.state.cards;
  firebase.database().ref().child('app').child('cards')
    .orderByChild('uid').equalTo(this.state.uid)
    .once('value', snap => {
      snap.forEach(childSnapshot => {
        previousCards.push ({
          id: childSnapshot.key,
          snap: childSnapshot.val()
        })
        this.setState ({
          cards: previousCards,
        })
      })
    })
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
        },()=>{ this.firedata()}
    )

    } else {
      this.setState({
        authenticated: false,
      })
      return <Redirect to="/"/>
    }
  })

}


  componentDidMount(){

  }







        render(){



          return(
            <div className="wrapper">
                {/* Start Navigation */}
                <div className="navbar navbar-default navbar-fixed navbar-transparent white bootsnav">
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
                <div className="clearfix"></div>

                {/* Page Title */}
                <div className="title-transparent page-title" style={{backgroundImage: `url(${'http://via.placeholder.com/1920x850'})`}}>
                  <div className="container">
                    <div className="title-content">
                    </div>
                  </div>
                </div>
                <div className="clearfix"></div>
                {/* Page Title */}

                <div className="padd-0">
                  <div className="container">

                    {/* General Information */}

                    <div className="add-listing-box translateY-60 edit-info mrg-bot-25 padd-bot-30 padd-top-25">
                      <div className="listing-box-header">
                        <div className="avater-box">
                        <img src="assets/img/avatar.jpg" className="img-responsive img-circle edit-avater" alt="" />
                        </div>
                        <h3>Daniel M. Dev</h3>
                        <p>Account Manager</p>
                      </div>
                      <div className="row mrg-r-10 mrg-l-10 preview-info">
                        <div className="col-sm-6">
                          <label><i className="ti-mobile preview-icon call mrg-r-10"></i>91 258 574 5287</label>
                        </div>
                        <div className="col-sm-6">
                          <label><i className="ti-email preview-icon email mrg-r-10"></i>support@listinghub@.com</label>
                        </div>
                        <div className="col-sm-6">
                          <label><i className="ti-gift preview-icon birth mrg-r-10"></i>July 17 1990</label>
                        </div>
                        <div className="col-sm-6">
                          <label><i className="ti-world preview-icon web mrg-r-10"></i>Www.listinghub.com</label>
                        </div>
                      </div>
                    </div>
                    {/* End General Information */}
                  </div>
                </div>

                <div className="padd-top-0">
                  <div className="container">
                    <div className="col-md-6 col-sm-12 mob-padd-0">
                      {/* Basic Information */}
                      <div className="add-listing-box edit-info mrg-bot-25 padd-bot-30 padd-top-5">
                        <div className="preview-info-header">
                          <h4>Basic Info</h4>
                        </div>
                        <div className="preview-info-body">
                          <ul className="info-list">
                            <li>
                              <label>Name:</label>
                              <span>Daniel Deve</span>
                            </li>
                            <li>
                              <label>Company:</label>
                              <span>Info Soft Ltd</span>
                            </li>
                            <li>
                              <label>Designation:</label>
                              <span>Account Manager</span>
                            </li>
                            <li>
                              <label>Birth:</label>
                              <span>July 15 1990</span>
                            </li>
                            <li>
                              <label>Age:</label>
                              <span>22 Year</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                      {/* End Basic Information */}
                    </div>

                    <div className="col-md-6 col-sm-12 mob-padd-0">
                      {/* Address Information */}
                      <div className="add-listing-box edit-info mrg-bot-25 padd-bot-30 padd-top-5">
                        <div className="preview-info-header">
                          <h4>Basic Info</h4>
                        </div>
                        <div className="preview-info-body">
                          <ul className="info-list">
                            <li>
                              <label>Phone:</label>
                              <span>91 258 758 6584</span>
                            </li>
                            <li>
                              <label>Email:</label>
                              <span>support@listinghub.com</span>
                            </li>
                            <li>
                              <label>State:</label>
                              <span>Punjab</span>
                            </li>
                            <li>
                              <label>Country:</label>
                              <span>India</span>
                            </li>
                            <li>
                              <label>Address:</label>
                              <span>1126 Sunrise Road, NV 89107</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                      {/* End Address Information */}
                    </div>
                    <div className="padd-top-20">
                      <div className="container">
                        <div className="row">
                            {this.state.cards.map((card) => {
                                return(<AccountCards snap={card.snap} cardId={card.id}/>)
                              })
                          }
                      </div>
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-12 mob-padd-0">
                      {/* About Information */}
                      <div className="add-listing-box edit-info mrg-bot-25 padd-bot-30 padd-top-5">
                        <div className="preview-info-header">
                          <h4>About</h4>
                        </div>
                        <div className="preview-info-body">
                          <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi</p>
                          <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti blanditiis praesentium voluptatum deleniti quos dolores et quas molestias excepturi sint occaecati ducimus qui blanditiis praesentium voluptatum deleniti atque.</p>
                          <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti.</p>
                        </div>
                      </div>
                      {/* End About Information */}
                    </div>

                    <div className="col-md-6 col-sm-12 mob-padd-0">
                      {/* Follow Information */}
                      <div className="add-listing-box edit-info mrg-bot-25 padd-bot-30 padd-top-5">
                        <div className="preview-info-header">
                          <h4>Follow Us</h4>
                        </div>
                        <div className="preview-info-body">
                          <ul className="social-info info-list">
                            <li>
                              <label><i className="fa fa-facebook"></i></label>
                              <span>https://www.facebook.com</span>
                            </li>
                            <li>
                              <label><i className="fa fa-twitter"></i></label>
                              <span>https://www.twitter.com/</span>
                            </li>
                            <li>
                              <label><i className="fa fa-google-plus"></i></label>
                              <span>https://www.plus.google.com</span>
                            </li>
                            <li>
                              <label><i className="fa fa-linkedin"></i></label>
                              <span>https://www.linkedin.com</span>
                            </li>
                            <li>
                              <label><i className="fa fa-youtube"></i></label>
                              <span>https://www.youtube.com</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                      {/* End Follow Information */}
                    </div>
                  </div>
                </div>

                {/* ================ Start Footer ======================= */}
                <footer className="footer dark-bg">
                  <div className="row padd-0 mrg-0">
                    <div className="footer-text">
                      <div className="col-md-3 col-sm-12 theme-bg">
                        <div className="footer-widget">
                          <div className="textwidget">
                          <h3 className="widgettitle widget-title">Get In Touch</h3>
                          <p>7744 North Park Place<br/>
                          San Francisco, CA 714258</p>
                          <p><strong>Email:</strong> support@listinghub.com</p>
                          <p>
                          <strong>Call:</strong> <a href="tel:+774422777">777-444-2222</a>
                          </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-5 col-sm-4">
                        <div className="footer-widget">
                        <h3 className="widgettitle widget-title">About Us</h3>
                        <ul className="footer-navigation">
                          <li><a href="#">Home Version 1</a></li>
                          <li><a href="#">Home Version 2</a></li>
                          <li><a href="#">Home Version 3</a></li>
                          <li><a href="#">Home Version 4</a></li>
                          <li><a href="#">Listing Detail</a></li>
                          <li><a href="#">Listing Vertical</a></li>
                          <li><a href="#">Listing Sidebar</a></li>
                          <li><a href="#">Vertical Sidebar</a></li>
                        </ul>
                        </div>
                      </div>
                      <div className="col-md-4 col-sm-6">
                        <div className="footer-widget">
                          <h3 className="widgettitle widget-title">Connect Us</h3>
                          <img src="assets/img/footer-logo.png" alt="Footer logo" className="img-responsive" />
                          <ul className="footer-social">
                            <li><a href="#"><i className="fa fa-facebook"></i></a></li>
                            <li><a href="#"><i className="fa fa-google-plus"></i></a></li>
                            <li><a href="#"><i className="fa fa-twitter"></i></a></li>
                            <li><a href="#"><i className="fa fa-instagram"></i></a></li>
                            <li><a href="#"><i className="fa fa-pinterest"></i></a></li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="footer-copyright">
                    <p>Copyright@ 2017 Listing Hub Design By <a href="http://www.themezhub.com/" title="Themezhub" target="_blank">Themezhub</a></p>
                  </div>
                </footer>
                {/* ================ End Footer div ======================= */}

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
            )
        }
    }

export default Account;
