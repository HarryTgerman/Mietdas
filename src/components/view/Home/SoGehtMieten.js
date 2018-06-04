import React, {Component} from 'react';
import backgroundImg from '../../../img/backgroundPayment.jpg';
import firebase from 'firebase'
import Logo from'../../../img/logo.png'
import LogoWhite from'../../../img/logo-white.png'
import {NavLink, Redirect,Link} from 'react-router-dom'




class SoGehtMieten extends Component{
  constructor(props){
    super(props)
    this.state = {
       authenticated: false,
       redirect: false,
    }
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
          })

      } else {
        this.setState({
          authenticated: false,
        })
        }
      })

      // this.getPaymentMethods()
    }

        render(){
          return(

            <div>
              <div className="wrapper">
                <div className="clearfix"></div>

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

                {/* ================ Start Page Title ======================= */}
                <section className="title-transparent page-title" style={{ background:`url(${backgroundImg})`,backgroundRepeat:"noRepeat"}}>
                  <div className="container">
                    <div className="title-content">
                      <h1>Reservieren Sie etzt einfach und unverbindlich</h1>
                      <div className="breadcrumbs">
                        <a href="#">Wählen Sie Ihre</a>
                        <span className="gt3_breadcrumb_divider"></span>
                        <span className="current">Bezahloption</span>
                      </div>
                    </div>
                  </div>
                </section>
                <div className="clearfix"></div>
                {/* ================ End Page Title ======================= */}

                {/* ================ Payment Methode Section ======================= */}
                </div>
              </div>


























            )
        }
    }

export default SoGehtMieten;
