import React, {Component} from 'react';
import backgroundImg from '../../../img/backgroundPayment.jpg';
import firebase from 'firebase'
import Logo from'../../../img/logo.png'
import LogoWhite from'../../../img/logo-white.png'
import {NavLink, Redirect,Link} from 'react-router-dom'

import { connect } from 'react-redux'
import { fetchNavbar } from '../../../actions/navbarAction'

const mapStateToProps = state => ({
  authState: state.authState.items
})

class SoGehtMieten extends Component{
  constructor(props){
    super(props)
    this.state = {
       authenticated: false,
       redirect: false,
    }
}


  componentWillMount(){
    this.props.fetchNavbar(false)

      // this.getPaymentMethods()
    }

        render(){
          return(

            <div>
            <title>Mietdas so geht mieten</title>
              <div >
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
                        <p className="text-center">Suche über die Suchleiste nach der gewünschten Maschine. Gebe den Einsatzort und die Kategorien an.</p>
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
                        <p>Für die unterschiedlichsten Ansprüche & Projekte findest du in unseren zahlreichen Kategorien sofort verfügbare Mietmaschinen und Geräte: Vom Mobilbagger über die Gartenfräse bis hin zur Arbeitsbühne.</p>
                      </div>
                    </div>
                    <div className="col-md-4 col-sm-4">
                      <div className="feature-box">
                        <span className="ti-money"></span>
                        <h4>Kosten</h4>
                        <p>Inseriere kostenlos und unverbindlich Geräte und Maschienen auf MietDas. Es entstehen keinerlei zusätzliche Kosten für Mieter oder Vermieter. Bis zum Abschluss der Testphase (vorraussichtlich 01.01.2019) verzichten wir auf eine Gebühr für unsere Dienstleistung</p>
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

export default connect(mapStateToProps, { fetchNavbar })(SoGehtMieten);
