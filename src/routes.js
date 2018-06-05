import React, {Component} from 'react';
import {BrowserRouter, Route, withProps ,Redirect, Link} from 'react-router-dom';
import firebase from 'firebase'
import Logo from'./img/logo.png'
import ReCAPTCHA from 'react-google-recaptcha';
import request from 'request';

import MashineDetails from './components/view/Account/MashineDetails/MashineDetails'
import Home from './components/view/Home/Home'
import Mieten from './components/view/Mieten/Mieten'
import Logout from './components/Logout/Logout'
import Account from './components/view/Account/Account'
import Bezahlung from './components/PaymentMethod/Bezahlung'
import MietDetails from './components/view/Mieten/MietDetails/MietDetails'
import Footer from './components/Footer/Footer'
import Impressum from './components/Footer/Impressum'
import AGB from './components/Footer/AGB'
import Reservierung from './components/view/Mieten/MietDetails/Reservierung'
import Vermieten from './components/view/Vermieten/Vermieten'
import AccountErstellen from './components/view/AccountErstellen/AccountErstellen'
import Payment from './components/PaymentMethod/Payment'
import SoGehtMieten from './components/view/Home/SoGehtMieten'




const facebookProvider = new firebase.auth.FacebookAuthProvider()
const gmailProvider = new firebase.auth.GoogleAuthProvider();



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
      isCaptcha: false,
      agb: false,

    }
}



checkCaptcha(response) {

  // from https://itsolutionstuff.com/post/php-how-to-implement-google-new-recaptcha-code-example-with-demoexample.html

  let captcha = document.querySelector('#g-recaptcha-response').value;

  fetch("https://mietdas.de/Backend/recaptcha.php", {
  method: "post",
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  //make sure to serialize your JSON body
  body: JSON.stringify({
    captcha: captcha
  })
})
.then( (response) => {
  if(response.success !== undefined && !response.success){
    console.log({"success": false, "msg":"Failed captcha verification"});
    this.setState({ isCaptcha: false});
    return console.log(this.state.isCaptcha, "das ist captcha");
  }else{
    console.log({"success": true, "msg":"Captcha passed"});
    this.setState({ isCaptcha: true});
    return console.log(this.state.isCaptcha, "das ist captcha");
  }


   //do something awesome that makes the world a better place
   //console.log(response);
});

 }

authWithGmail(){
  firebase.auth().signInWithPopup(gmailProvider).then(function(result) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    this.setState({ authenticated: true})

    // ...
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });
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


signIn(req, res){
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
  if(this.state.agb === false || this.state.dae === false){return 0}
  if(this.createPassword.value.length > 8){

    if(this.state.isCaptcha){

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
    }else{
      alert("bitte bestätige das du kein Roboter bist")
    }

  }else{
    alert("Ihr Passwort muss mehr als 8 Zeichen lang sein")
  }
}

registerWithFacebook(){
  if(this.state.agb === false || this.state.dae === false){return 0}
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
registerWithGmail(){
  if(this.state.agb === false || this.state.dae === false){return 0}
  let whenGmailAuth = firebase.auth().signInWithPopup(gmailProvider)
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
    whenGmailAuth.then(() =>{ this.setState({registerRedirect:true})
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
          const agbs = "AGB's"
          return(
                <BrowserRouter>
                  <div >
                    <div className='app'>
                      <Route path='/' exact component={Home}/>
                      <Route path='/mieten' exact component={Mieten}/>
                      <Route path='/mieten/city=:id/type=:id/' exact component={Mieten}/>
                      <Route path='/logout' exact component={Logout}/>
                      <Route path='/benutzeraccount' exact component={Account}/>
                      <Route path='/bezahlung' exact component={Bezahlung}/>
                      <Route name= 'details' path='/details/search=:type/:id' component={MietDetails}/>
                      <Route name= 'anfragen' path='/anfragen/:cardId' component={Reservierung}/>
                      <Route name= 'Vermieten' path='/vermieten' component={Vermieten}/>
                      <Route name= 'AccountErstellen' path='/account-erstellen' component={AccountErstellen}/>
                      <Route name= 'Bezahlen' path='/reservierung:id/payment' component={Payment}/>
                      <Route name= 'MashineDetails' path='/mashineDetails/search=:type/:id' component={MashineDetails}/>
                      <Route name= 'Impressum' path='/impressum' component={Impressum}/>
                      <Route name= 'Impressum' path='/impressum' component={Impressum}/>
                      <Route name= 'SoGehtMieten' path='/so-geht-mieten' component={SoGehtMieten}/>
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
                                          <button  type = "button" className="btn btn-midium btn-primary btn-radius width-200" style={{borderRadius: "50px", width: "200px", margin:"5px"}} onClick={this.authWithFacebook}>
                                            Log-In mit Facebook
                                          </button>
                                          <button  type = "button" className="btn btn-midium btn-radius width-200" style={{borderRadius: "50px", width: "200px",margin:"5px"}} onClick={this.authWithGmail.bind(this)}>
                                          <img className="left" width="20px" alt="Google &quot;G&quot; Logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"/>
                                            Log-In mit Gmail
                                          </button>
                                          <button type="button" id="login-btn" onClick={this.signIn} className="btn btn-midium theme-btn btn-radius width-200" style={{margin:"5px"}}> Login </button>

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
                                        <div className="left" style={{textAlign: "left"}}>
                                        <input type="checkbox" onClick={()=>{  this.setState((prevState)=>{
                                        return {agb: !prevState.agb};})}}/>
                                        Ich akzeptiere die <a target="_blank" href='https://firebasestorage.googleapis.com/v0/b/mietdas-93abf/o/pdf%2Fagbs%2Fmerged.pdf?alt=media&token=0dac7549-502d-49a8-be64-17a885333157'>{agbs}</a>
                                        </div>
                                        <div className="left" style={{textAlign: "left"}}>
                                        <input type="checkbox" onClick={()=>{  this.setState((prevState)=>{
                                        return {dae: !prevState.dae};})}}/>
                                        Ich akzeptiere die <a target="_blank" href='https://firebasestorage.googleapis.com/v0/b/mietdas-93abf/o/pdf%2Fagbs%2F25.%20Mai%202018%20DAE.pdf?alt=media&token=20bd2399-4324-4b8b-941e-353c773fa6c0'>Datenschutzerklärung</a>
                                        </div>
                                        <div className="center"  >
                                          <ReCAPTCHA style={{marginBottom: "10px"}}
                                          ref="recaptcha"
                                          sitekey="6LeEWlYUAAAAAOITMgxX0pcih46KC23uxTQQwD72"
                                          onChange={this.checkCaptcha.bind(this)}/>

                                        <button  type = "button" className="btn btn-midium btn-primary btn-radius width-200" style={{borderRadius: "50px", width: "200px", margin:"5px"}} onClick={this.registerWithFacebook}>
                                          Log-In mit Facebook
                                        </button>
                                        <button  type="button" className="btn btn-midium btn-radius width-200" style={{borderRadius: "50px", width: "200px",margin:"5px"}} onClick={this.registerWithGmail.bind(this)}>
                                           <img width="20px" alt="Google &quot;G&quot; Logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"/>
                                          Log-In mit Gmaill
                                        </button>
                                        <button   type = "button" onClick={this.register} className="btn btn-midium theme-btn btn-radius width-200" style={{margin:"5px"}}> Registriere Dich </button>
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
