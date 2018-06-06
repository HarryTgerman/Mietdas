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
              <div >

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
                <section className="title-transparent page-title" style={{ background:`url(${backgroundImg})`}}>
                  <div className="container">
                    <div className="title-content">
                      <h1>Das Mieten von Baumaschinen war noch nie so einfach!</h1>
                    </div>
                  </div>
                </section>
                <div className="clearfix"></div>
                {/* ================ End Page Title ======================= */}

                <section className="features-sec">
                  <div className="container">
                    <div className="col-md-4 col-sm-6">
                      <div className="service-box">
                        <div className="service-icon">
                          <i className="ti-search"></i>
                        </div>
                        <div className="service-content">
                          <h3>
                            <a href="#">Produkt auswählen</a>
                          </h3>
                        </div>
                        <p className="text-center">Suche über die Suchleiste nich der gewünschten Maschine. Gebe den Einsatzort und die Kategorien an.</p>
                      </div>
                    </div>
                    <div className="col-md-4 col-sm-6">
                      <div className="service-box">
                        <div className="service-icon">
                          <i className="ti-list"></i>
                        </div>
                        <div className="service-content">
                          <h3>
                            <a href="#">Mietanfrage stellen</a>
                          </h3>
                        </div>
                        <p className="text-center">Wähle aus den Suchergebnissen nach der passenden Maschine und sende dem Vermieter eine Anfrage.</p>
                      </div>
                    </div>

                    <div className="col-md-4 col-sm-6" ref={(section) => { this.section4 = section; }}>
                      <div className="service-box">
                        <div className="service-icon">
                          <i className="ti-email"></i>
                        </div>
                        <div className="service-content">
                          <h3>
                            <a href="#">Angebot erhalten</a>
                          </h3>
                        </div>
                        <p className="text-center">Einloggen, Buchung bestätigen, bezahlen.</p>
                      </div>
                    </div>
                  </div>
                </section>
                <section className="container" style={{textAlign:"center"}}>
                  <Link to="/mieten"><button className="btn theme-btn">jetzt passende Maschine suchen</button></Link>
                </section>
                <h2 style={{textAlign:"center"}}>Die Online-Miete bei MietDas einfach erklärt</h2>
                <section className="container" >
                  <div className="text-center frow lrow">&nbsp;<iframe width="556" height="310" src="https://www.youtube.com/embed/ZyrPhaxIwaQ" allowfullscreen="allowfullscreen"></iframe></div>
                </section>
                <section className="small-pad">
          				<div className="container">

                    <div className="col-md-4 col-sm-4" ref={(section) => { this.section2 = section; }}>
                      <div className="feature-box" >
                        <span className="ti-info"></span>
                        <h4>Über MietDas</h4>
                        <p>MietDas ist ein StartUp aus Speyer mit dem langfristigen Ziel, die Online-Miete im Bereich Bauwirtschaft zu revolutionieren. Besitzer können ihre Maschinen in Zeiten geringer Auslastung zur Miete anbieten und damit Geld verdienen.
                          Mieter profitieren von dem breiten Angebot und der sofortigen Verfügbarkeit hochwertiger Baumaschinen & - Geräte.</p>
                      </div>
                    </div>
                    <div className="col-md-4 col-sm-4">
                      <div className="feature-box">
                        <span className="ti-check"></span>
                        <h4>Geräte Sortiment</h4>
                        <p>Für die unterschiedlichsten Ansprüche & Projekte finden Sie in unseren zahlreichen Kategorien sofort verfügbare Mietmaschinen und Geräte: Vom Mobilbagger über die Gartenfräse bis hin zur Arbeitsbühne.</p>
                      </div>
                    </div>
                    <div className="col-md-4 col-sm-4">
                      <div className="feature-box">
                        <span className="ti-money"></span>
                        <h4>Kosten</h4>
                        <p>Inserieren Sie Kostenlos und unverbindlich Geräte und Maschienen auf MietDas. Es fallen keinerlei Kosten für den Miter an! Bei einer abgeschlossenen Miete werden dem Vermieter 10% des Mietbetrags in Rechnung gestellt.</p>
                      </div>
                    </div>

          				</div>
          			</section>

                {/* ================ Payment Methode Section ======================= */}
                </div>
              </div>


























            )
        }
    }

export default SoGehtMieten;
