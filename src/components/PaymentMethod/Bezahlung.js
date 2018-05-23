import React, {Component} from 'react';
import { NavLink, Link} from 'react-router-dom'
import AccountImg from'../../img/account.jpg'
import Logo from'../../img/logo.png'
import LogoWhite from'../../img/logo-white.png'
import firebase from 'firebase';




class Bezahlung extends Component{
  constructor(props){
    super(props)
    this.state= {
      authenticated: false,
      redirect: false,
    }
}
componentWillMount(){
  firebase.auth().onAuthStateChanged((user)=>{
    const userProfile = firebase.auth().currentUser;
    if(user){
      console.log(userProfile, 'aus account.js')
      this.setState(
        {
        authenticated: true,
        photoUrl: userProfile.photoURL,
        name : userProfile.displayName,
        email : userProfile.email,
        stadt: userProfile.stadt,
        uid : userProfile.uid,
      },()=>{
        let url = this.props.location.search.split('=');
        let resultUrl = url[1].split('&')[0];
        let paymentMethod = this.props.location.search.split('&')[3].split('=')[1]
        let pspReference = this.props.location.search.split('&')[4].split('=')[1]
        let merchantReference = url[2].split('&')[0]

        if(resultUrl == "CANCELLED"){this.setState({cancelled:true})};

        if(resultUrl == "AUTHORISED"){
          this.setState({authorised:true})
          firebase.database().ref().child('app').child('users/').child(this.state.uid).child('mitteilung')
          .child(merchantReference).once('value', snap=>{
            this.setState({
              snap:snap.val(),
              ownerId: snap.val().anfrage.ArtikelOwnerId
            },()=>{
              firebase.database().ref().child('app').child('payments').child(this.state.uid).child(merchantReference)
              .set({
                paymentData: this.state.snap,
                pspReference: pspReference,
                paymentMethod: paymentMethod
              })
              firebase.database().ref().child('app/users').child(this.state.ownerId).child('anfragen')
              .child(merchantReference).remove()
              firebase.database().ref().child('app/users').child(this.state.uid).child('mitteilung')
              .child(merchantReference).remove()

            })
          })
        }
      })
    }
  })
}
        render(){
          return(
              <div className="home-2 wrapper">
                <div className="navbar navbar-default navbar-fixed navbar-transparent white bootsnav">
                  <div style={{paddingBottom: "0"}}  className="container">
                    <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#navbar-menu">
                      <i className="ti-align-left"></i>
                    </button>

                     {/*Start Header Navigation*/}
                    <div className="navbar-header">
                      <NavLink to="/">
                      <img src={Logo} className="logo logo-scrolled" alt=""/>
                      <img src={LogoWhite} className="logo logo-display" alt=""/>
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
                        :(null)}
                      </ul>
                      <ul className="nav navbar-nav navbar-right" data-in="fadeInDown" data-out="fadeOutUp">
                      { this.state.authenticated ?(<li className="no-pd"><NavLink to="/benutzeraccount" className="addlist">
                      {this.state.photoUrl ? (<img src={this.state.photoUrl} className="avater-img" alt=""/>)
                      :(<i className="ti-user"></i>)}{this.state.name}</NavLink></li>)
                      :(null)
                      }
                      </ul>
                    </div>
                     {/*.navbar-collapse*/}
                  </div>
                </div>
                {/* End Navigation */}
                <div className="title-transparent page-title" style={{backgroundImage: `url(${AccountImg})`, marginBottom:"-50px"}}>
                  <div className="container">
                    <div className="title-content">
                    </div>
                  </div>
                </div>
                {this.state.cancelled?(<section>
                  <div className="container">
                    <div className="booking-abort padd-top-30 padd-bot-30">
                      <i className="ti-close preview-icon" aria-hidden="true"></i>
                      <h2 className="mrg-top-15">OUPS da ist wohl etwas schief gelaufen!</h2>
                      <p>Versuche es mit einer anderen Bezahlmethode</p>
                      <a href="/benutzeraccount" className="btn theme-btn-trans mrg-top-20">Zurück zum Benutzeraccount</a>
                    </div>
                  </div>
                </section>):(null)}
              {this.state.authorised?(<section>
                <div className="container">
                  <div className="booking-confirm padd-top-30 padd-bot-30">
                    <i className="ti-check preview-icon" aria-hidden="true"></i>
                    <h2 className="mrg-top-15">Du hast den Bezahlvorgang erfolgreich abgeschlossen</h2>
                    <p>Du erhälst in kürze eine bestätigungs E-Mail</p>
                    <Link to="/benutzeraccount"><a className="btn theme-btn-trans mrg-top-20">Zurück zum Benutzeraccount</a></Link>
                  </div>
                </div>
              </section>):(null)}
              </div>
            )
        }
    }

export default Bezahlung;
