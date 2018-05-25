import React, {Component} from 'react';
import { NavLink, Link} from 'react-router-dom'
import AccountImg from'../../img/account.jpg'
import Logo from'../../img/logo.png'
import LogoWhite from'../../img/logo-white.png'
import firebase from 'firebase';



class Impressum extends Component{

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
    })
  }
})
}

        render(){
          const agbs = "AGB's"
          const vagbs = "Vermieter AGB's"
          const dae = "Datenschutzerklärung "

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
                        :(<li><a  href="javascript:void(1)"  data-toggle="modal" data-target="#signup">Log-In</a></li>)}
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
                <div className="container" style={{paddingTop:"300px", paddingBottom:"300px"}}>
                  <div>
                    <a href="https://firebasestorage.googleapis.com/v0/b/mietdas-93abf/o/pdf%2Fagbs%2FAGB%20Allgemein%20PDF.pdf?alt=media&token=748d0b45-efb5-461b-b3ef-afec01b0a5e7" className="theme-cl">{agbs}</a>
                  </div>
                  <p> At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, conset</p>
                  <div>
                    <a href="https://firebasestorage.googleapis.com/v0/b/mietdas-93abf/o/pdf%2Fagbs%2FAGB%20Vermieter%20PDF.pdf?alt=media&token=8cd37086-12fa-4822-a7bf-1aee5cd8fac1" className="theme-cl">{vagbs}</a>
                  </div>
                  <p> At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, conset</p>
                  <div>
                    <a href="https://firebasestorage.googleapis.com/v0/b/mietdas-93abf/o/pdf%2Fagbs%2F25.%20Mai%202018%20DAE.pdf?alt=media&token=20bd2399-4324-4b8b-941e-353c773fa6c0" className="theme-cl">{dae}</a>
                  </div>
                  <p> At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, conset</p>
                </div>
              </div>
            )
        }
    }

export default Impressum;
