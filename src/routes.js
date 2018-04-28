import React, {Component} from 'react';
import {BrowserRouter, Route, withProps ,Redirect} from 'react-router-dom';
import firebase from 'firebase'
import Logo from'./img/logo.png'


import Home from './components/view/Home/Home'
import Mieten from './components/view/Mieten/Mieten'
import Logout from './components/Logout/Logout'
import Account from './components/view/Account/Account'
import Artikelbearbeiten from './components/view/Account/Artikelbearbeiten/Artikelbearbeiten'
import MietDetails from './components/view/Mieten/MietDetails/MietDetails'
import Footer from './components/Footer/Footer'
import Reservierung from './components/view/Mieten/MietDetails/Reservierung'
import Vermieten from './components/view/Vermieten/Vermieten'
import AccountErstellen from './components/view/AccountErstellen/AccountErstellen'
import Payment from './components/PaymentMethod/Payment'


const facebookProvider = new firebase.auth.FacebookAuthProvider()

class Routes extends Component{
  constructor(props){
    super(props)
    this.register = this.register.bind(this);
    this.signIn = this.signIn.bind(this);
    this.authWithFacebook= this.authWithFacebook.bind(this);
    this.registerWithFacebook = this.registerWithFacebook.bind(this);
    this.state= {
      registerRedirect: false,
      forgottPw: false,
    }
}

authWithFacebook(){
  let whenFacebookAuth = firebase.auth().signInWithPopup(facebookProvider)
    .then((result, error) => {
      if (error) {
        alert(error)
        return 0;
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
          return 0;
        } else {
          alert(errorMessage);
          return 0;
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
        return 0;
      } else {
        alert(errorMessage);
        return 0;
      }
      console.log(error);
      // [END_EXCLUDE]
    });

  // ...
  whenRegister
  .then(()=>{
     const userProfile = firebase.auth().currentUser
    userProfile.sendEmailVerification().then(function() {
      alert('Es wurde eine bestätigungs Email an Sie versendet')
    }).catch(function(error) {
      // An error happened.
    })
     this.setState({registerRedirect:true})
  })

}

registerWithFacebook(){
  let whenFacebookAuth = firebase.auth().signInWithPopup(facebookProvider)
    .then((result, error) => {
      if (error) {
        alert(error)
        return 0;
      } else {
        const userProfile = firebase.auth().currentUser
        userProfile.sendEmailVerification().then(function() {
          alert('Es wurde eine bestätigungs Email an Sie versendet')
        }).catch(function(error) {
          // An error happened.
        })
        this.setState({ authenticated: true})
      }
    })
    whenFacebookAuth.then(() =>{ this.setState({registerRedirect:true})
    })
}

sendPwReset(){
  var auth = firebase.auth();
  var email = this.userNameInput.value
  auth.sendPasswordResetEmail(email).then(function() {
    alert('Email wurde versendet')
}).then(()=>{
  this.setState({forgottPw:false})
}).catch(function(error) {
  alert(error)
});
}
        render(){

          return(
                <BrowserRouter>
                  <div >
                    <div className='app'>
                      <Route path='/' exact component={Home}/>
                      <Route path='/mieten' exact component={Mieten}/>
                      <Route path='/mieten/city=:id/type=:id/' exact component={Mieten}/>
                      <Route path='/logout' exact component={Logout}/>
                      <Route path='/benutzeraccount' exact component={Account}/>
                      <Route name= 'artikelbearbeiten' path='/artikelbearbeiten/:cardId' component={Artikelbearbeiten}/>
                      <Route name= 'details' path='/details/search=:type/:id' component={MietDetails}/>
                      <Route name= 'anfragen' path='/anfragen/:cardId' component={Reservierung}/>
                      <Route name= 'Vermieten' path='/vermieten' component={Vermieten}/>
                      <Route name= 'AccountErstellen' path='/account-erstellen' component={AccountErstellen}/>
                      <Route name= 'Bezahlen' path='/reservierung:id/payment' component={Payment}/>
                      {this.state.registerRedirect ?
                        (<Redirect to='/account-erstellen' />):(null)
                      }
                    </div>
                  { this.state.registerRedirect ?(null):(<div className="modal fade" id="signup" tabindex="-1" role="dialog" aria-labelledby="myModalLabel2" aria-hidden="true">
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
                                  <img src={Logo} className="img-responsive" alt="" />
                                  <div className="subscribe wow fadeInUp">
                                    <form className="form-inline" >
                                      <div className="col-sm-12">
                                        <div className="form-group">
                                          {this.state.forgottPw
                                        ?(<div className="center">
                                          <input type="email" className="form-control" placeholder="E-mail"  ref={(input) => { this.userNameInput = input = input; }} required=""/>
                                          <button type="button" onClick={this.sendPwReset.bind(this)}  className="btn btn-midium theme-btn btn-radius width-200"> Pw zurücksetzen </button></div>)
                                        :(<div>
                                          <input type="email"  name="email" className="form-control" placeholder="E-mail"  ref={(input) => { this.userNameInput = input; }} required=""/>
                                          <input type="password" name="password" className="form-control"  placeholder="Passwort" ref={(input) => { this.passwordInput = input; }} required=""/>
                                          <a className="forgottPW" onClick={()=>{this.setState({forgottPw : true})}} >Passwort vergessen ?</a>
                                          <div style={{marginTop:"10px"}} className="center">
                                          <button  type = "button" className="btn btn-midium btn-primary btn-radius width-200" style={{borderRadius: "50px", width: "200px"}} onClick={this.authWithFacebook}>
                                            Log-In mit Facebook
                                          </button>
                                          <button type="button" id="login-btn" onClick={this.signIn} className="btn btn-midium theme-btn btn-radius width-200"> Login </button>

                                          </div></div>)}
                                        </div>
                                      </div>
                                    </form>
                                  </div>
                                </div>

                                <div role="tabpanel" className="tab-pane fade" id="register">
                                <img src={Logo} className="img-responsive" alt="" />
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
                    </div>)}
                    <Footer/>
                  </div>
                </BrowserRouter>
            )
        }
    }

export default Routes;
