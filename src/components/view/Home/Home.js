import React, {Component} from 'react';
import {NavLink, Redirect,Link} from 'react-router-dom'
import firebase from 'firebase'
import Slider from 'react-slick'
import Select from 'react-select';
import Logo from'../../../img/logo.png'
import LogoWhite from'../../../img/logo-white.png'
import scrollToComponent from 'react-scroll-to-component';



const fn = value => <span>{value}</span>

class Home extends Component{

  constructor(props){
    super(props)
    this.state = {
       authenticated: false,
       redirect: false,
       registerRedirect:false,
       selectValue:  { value: '', label: 'wähle/tippe Kategorie' },
       showAlert: false,
       alert: "",
       kat:false,
    }
}


handleChange(event) {
   this.setState({cityValue: event.target.value});
 }
 clickLi = (selectValue) => {
this.setState({ selectValue });
console.log(`Selected: ${selectValue.label}`);
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

handleSubmit(event){
  event.preventDefault();
if (this.state.selectValue.value == "") {
    const alert = "wählen Sie ein Kategorie aus"
    this.setState({alert: alert, showAlert: true})
    return 0
  }else {this.setState({kat:true})}
}

scrollToSection2(){
  scrollToComponent(this.section2)
}

scrollToSection3(){
  scrollToComponent(this.section3)
}
scrollToSection4(){
  scrollToComponent(this.section4)
}

        render(){
          if (this.state.redirect === true) {
            return <Redirect to='/benutzeraccount' />
          }else if (this.state.registerRedirect === true) {
            return <Redirect to='/account-erstellen' />
          }
          let settings = {
             dots: true,
             centerPadding: '50px',
             arrows: true,
             variableWidth: true,
             infinite: true,
             speed: 800,
             adaptiveHeight: true,
             slidesToShow: 2,
             slidesToScroll: 2
           }

            const { selectedOption } = this.state;
            const value = selectedOption && selectedOption.value
            if (this.state.kat === true){
               return <Redirect to={{pathname: `/mieten/city=${this.state.cityValue+"/type="+this.state.selectValue.value+"/"}`}}/>
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
                                  <img src={Logo}  className="logo logo-scrolled" alt=""/>
                                  <img src={LogoWhite} className="logo logo-display" alt=""/>
                                </NavLink>
                              </div>

                               {/*Collect the nav links, forms, and other content for toggling*/}
                              <div className="collapse navbar-collapse" id="navbar-menu">
                                <ul className="nav navbar-nav navbar-center">
                                <li className="dropdown">
                                  <NavLink to="/so-geht-mieten">So geht mieten</NavLink>
                                </li>
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
                                  <h1><span stlye={{color: "#ff431e"}}>Baumaschinen</span> in Ihrer Umgebung</h1>
                                  <p>Mieten Sie Baumaschinen in Ihrer Umgebung.</p>
                                    <form className="form-verticle col-sm-12" onSubmit={this.handleSubmit.bind(this)}>
                                    {
                                      this.state.showAlert ?
                                       (<div ref="alert" className="alert alert-danger" role="alert">
                                          <strong>Achtung</strong> {this.state.alert}
                                        </div>)
                                      :(null)
                                    }
                                      <div className="col-md-5 col-sm-5 no-padd">
                                        <i className="banner-icon icon-map-pin"></i>
                                        <input type="text" className="form-control left-radius right-br" onChange={this.handleChange.bind(this)} placeholder="Ort..."/>
                                      </div>
                                      <div className="col-md-5 col-sm-5 no-padd">

                                      <Select

                                        className="form-control"
                                          name="form-field-name"
                                          value={value}
                                          onChange={this.clickLi.bind(this)}
                                          placeholder={this.state.selectValue.label}
                                          options={[

                                            { value: 'BAGGER', label: <strong>BAGGER</strong>},
                                            { value: 'minibagger', label: 'Minibagger' },
                                            { value: 'kompaktbagger', label: 'Kompaktbagger' },
                                            { value: 'raupenbagger', label: 'Raupenbagger' },
                                            { value: 'mobilbagger', label: 'Mobilbagger' },
                                            { value: 'RADLADER', label: <strong>RADLADER</strong>},
                                            { value: 'radlader', label: 'Radlader' },
                                            { value: 'kettendumper', label: 'Kettendumper' },
                                            { value: 'raddumper', label: 'Raddumper' },
                                            { value: 'ANHÄNGER', label: <strong>ANHÄNGER</strong>},
                                            { value: 'anhänger', label: 'Anhänger' },
                                            { value: 'kippanhänger', label: 'Kippanhänger' },
                                            { value: 'planenanhänger', label: 'Planenanhänger' },
                                            { value: 'autotransportanhänger', label: 'Autotransportanhänger' },
                                            { value: 'tieflader', label: 'Tieflader' },
                                            { value: 'BAUGERÄTE', label: <strong>BAUGERÄTE</strong>},
                                            { value: 'abbruchhammer', label: 'Abbruchhammer' },
                                            { value: 'betonglaetter', label: 'Betonglätter' },
                                            { value: 'betoninnenruettler', label: 'Betoninnenrüttler' },
                                            { value: 'betonmischer', label: 'Betonmischer' },
                                            { value: 'bohrhammer', label: 'Bohrhammer' },
                                            { value: 'erdbohrgeraet', label: 'Erdbohrgerät' },
                                            { value: 'kernbohrmaschiene', label: 'Kernbohrmaschiene' },
                                            { value: 'VERDICHTUNGSTECHNIK', label: <strong>VERDICHTUNGSTECHNIK</strong>},
                                            { value: 'stampfer', label: 'Stampfer' },
                                            { value: 'vibrationsplatte', label: 'Vibrationsplatte' },
                                            { value: 'grabenwalze', label: 'Grabenwalze' },
                                            { value: 'vibrationswalze', label: 'Vibrationswalze' },
                                            { value: 'LANDSCHAFTSTECHNIK', label: <strong>LANDSCHAFTSTECHNIK</strong>},
                                            { value: 'bodenfraese', label: 'Bodenfräse' },
                                            { value: 'holzhaecksler', label: 'Holzhäcksler' },
                                            { value: 'SÄGEN UND SCHNEIDER', label: <strong>SÄGEN UND SCHNEIDER</strong>},
                                            { value: 'trennschleifer', label: 'Trennschleifer' },
                                            { value: 'bausteinBandseage', label: 'Baustein Bandsäge' },
                                            { value: 'blocksteinsaege', label: 'Blocksteinsäge' },
                                            { value: 'fugenschneider', label: 'Fugenschneider' },
                                            { value: 'steinsaege', label: 'Steinsäge' },
                                            { value: '', label: <strong>RAUMSYSTEME</strong>},
                                            { value: 'materialContainer', label: 'Materialcontainer' },
                                            { value: 'RAUMSYSTEME', label: <strong>FAHRZEUGE</strong>},
                                            { value: 'pritschenwagen', label: 'Pritschenwagen' },
                                            { value: 'umzugstransporter', label: 'Umzugstransporter' },
                                            { value: 'HEBETECHNIK', label: <strong>HEBETECHNIK</strong>},
                                            { value: 'teleskopstapler', label: 'Teleskopstapler' },
                                            { value: 'teleskopmastbühne', label: 'Teleskopmastbühne' },
                                            { value: 'teleskopArbeitsbühne', label: 'Teleskop-Arbeitsbühne' },
                                            { value: 'selbstfahrendeScherenbühne', label: 'Selbstfahrende Scherenbühne' },
                                            { value: 'gelenkteleskoparbeitsbühneAufGummiketten', label: 'Gelenkteleskoparbeitsbühne auf Gummiketten' },
                                            { value: 'lkwArbeitsbühne', label: 'LKW Arbeitsbühne' },
                                            { value: 'gelenkteleskopArbeitsbühne', label: 'Gelenkteleskop-Arbeitsbühne' },
                                            { value: 'anhängerArbeitsbühne', label: 'Anhänger-Arbeitsbühne' },


                                       ]}

                                        />
                                        </div>
                                      <div className="col-md-2 col-sm-2 no-padd">
                                        <button type="submit" className="btn theme-btn btn-default">Suchen</button>
                                      </div>
                                    </form>
                                  </div>

                              </div>
                              <div className="col-md-12 col-sm-12 banner-text">
                              <span className="arrow-down-white" onClick={this.scrollToSection2.bind(this)}></span>
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
                                <div className="heading" >
                                  <h2>Baumaschinen &  <span> Geräte </span></h2>
                                  <p>Mieten Sie sofort Baumaschinen in Ihrer Umgebung. Schnell. Einfach. Kostenlos.</p>
                                </div>
                                </div>
                              </div>
                              <div className="col-md-4 col-sm-4" ref={(section) => { this.section2 = section; }}>
                                <div className="feature-box" >
                                  <span className="ti-map-alt"></span>
                                  <h4>In Ihrer Nähe</h4>
                                  <p>Suchen Sie in jedem Umkreis nach benötigten Maschinen & Geräten.</p>
                                </div>
                              </div>
                              <div className="col-md-4 col-sm-4">
                                <div className="feature-box">
                                  <span className="ti-email"></span>
                                  <h4>Kontaktaufnahme</h4>
                                  <p>Setzen Sie sich mit dem Vermieter in Verbindung.</p>
                                </div>
                              </div>
                              <div className="col-md-4 col-sm-4">
                                <div className="feature-box">
                                  <span className="ti-user"></span>
                                  <h4>Unkompliziert persönlich</h4>
                                  <p>Klären Sie die Abholung oder Lieferung Ihrer Maschinen.</p>
                                </div>
                              </div>
                              <div className="col-md-12 col-sm-12 banner-text"  >
                              <span className="arrow-down" onClick={this.scrollToSection3.bind(this)}></span>
                              </div>
                            </div>

                          </section>
                           {/*End Services Section*/}

                           {/*Popular Listing Section*/}
                          <section className="gray-bg">
                            <div className="container">
                              <div className="row">
                                <div className="col-md-12">
                                  <div className="heading" >
                                    <h2>Beliebte <span>Anzeigen</span></h2>
                                    <p>Ein Auszug der meistvermieteten Maschinen & Geräte.</p>
                                  </div>
                                </div>
                                <div >
                                  <div ref={(section) => { this.section3 = section; }} className="col-md-4 col-xs-12">
                                    <div className="listing-shot grid-style">
                                      <div className="listing-shot-img">
                                        <img src="https://firebasestorage.googleapis.com/v0/b/mietdas-93abf/o/images%2Fartikelimgaes%2F38pcAMH9VNTSNBTa7WDTjh5sMq12%2Fartikel%2FXt260%2FIMG_20170425_181736.jpg?alt=media&token=e519664d-3019-40b8-a409-a4a5dca473bf"  className="img-responsive" alt=""/>
                                        <span className="listing-price">160€</span>
                                      </div>
                                      <div className="listing-shot-caption">
                                        <h4 style={{marginBottom: "10px"}}>Dino Xt260</h4>
                                        <p className="listing-location">77694 Kehl</p>
                                      </div>
                                      <div className="listing-shot-info rating">
                                        <div className="row extra">
                                          <div className="col-md-5 col-sm-5 col-xs-6 pull-right">
                                            <Link Link style={{ textDecoration: 'none' }} to='/details/search=anhängerArbeitsbühne/-LEItX9SBIv78x1nUKjQ'><a href="#" className="detail-link">Gehe zu</a></Link>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-md-4 col-xs-12">
                                  <div className="listing-shot grid-style">
                                    <div className="listing-shot-img">
                                      <img src="https://firebasestorage.googleapis.com/v0/b/mietdas-93abf/o/images%2Fartikelimgaes%2FJErCZbfivYS4jpWsPqqi0xAuUPx2%2Fartikel%2FAR%2060%2F449f2e58-d83b-46fc-b7db-880e911c99be.jpg?alt=media&token=3a096ca8-d7eb-49d3-8014-2d8c284529a2"  className="img-responsive" alt=""/>
                                      <span className="listing-price">160€</span>
                                    </div>
                                    <div className="listing-shot-caption">
                                      <h4 style={{marginBottom: "10px"}}>Atlas AR 60 4650Kg</h4>
                                      <p className="listing-location">76726 Germersheim</p>
                                    </div>
                                    <div className="listing-shot-info rating">
                                      <div className="row extra">
                                        <div className="col-md-5 col-sm-5 col-xs-6 pull-right">
                                          <Link Link style={{ textDecoration: 'none' }} to='/details/search=radlader/-LDGjUc5Gw2VHm_9wmY7'><a href="#" className="detail-link">Gehe zu</a></Link>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-md-4 col-xs-12">
                                  <div className="listing-shot grid-style">
                                    <div className="listing-shot-img">
                                      <img src="https://firebasestorage.googleapis.com/v0/b/mietdas-93abf/o/images%2Fartikelimgaes%2F5pBpsl0Tr0YFhrIoYEjuZsBaOjH2%2Fartikel%2FTB%20215%20R%2FTB%20215%20R.JPG?alt=media&token=e04d4af6-024f-4a4b-826b-63abb43e7619"  className="img-responsive" alt=""/>
                                      <span className="listing-price">95€</span>
                                    </div>
                                    <div className="listing-shot-caption">
                                      <h4 style={{marginBottom: "10px"}}>Takeuchi TB 215 R 1500Kg</h4>
                                      <p className="listing-location">64319 Pfungstadt</p>
                                    </div>
                                    <div className="listing-shot-info rating">
                                      <div className="row extra">
                                        <div className="col-md-5 col-sm-5 col-xs-6 pull-right">
                                          <Link Link style={{ textDecoration: 'none' }} to='details/search=minibagger/-LEErNPPW3oPOQGXNK6F'><a href="#" className="detail-link">Gehe zu</a></Link>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-12 col-sm-12 banner-text" >
                              <span className="arrow-down" onClick={this.scrollToSection4.bind(this)}></span>
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
                                      <a href="#">Vermieten Sie Ihre Maschinen in Ihrer Umgebung</a>
                                    </h3>

                                  </div>

                                </div>
                              </div>

                              <div className="col-md-4 col-sm-6" ref={(section) => { this.section4 = section; }}>
                                <div className="service-box">
                                  <div className="service-icon">
                                    <i className="ti-mobile"></i>
                                  </div>
                                  <div className="service-content">
                                    <h3>
                                      <a href="#">Unkomplizierte verwaltung für Ihr Smartphone</a>
                                    </h3>

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
                                      <a href="#">Inserieren Sie Ihre Maschinen und Ihr Werkzeug</a>
                                    </h3>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </section>
                           {/*End Features Section*/}



                           {/*================== Login & Sign Up Window ==================*/}

                      </div>
                    </body>
                </div>
            )
        }
    }

export default Home;
