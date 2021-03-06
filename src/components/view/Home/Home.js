import React, {Component} from 'react';
import {NavLink, Redirect,Link} from 'react-router-dom'
import firebase from 'firebase'
import Select from 'react-select';
import Logo from'../../../img/logo.png'
import LogoWhite from'../../../img/logo-white.png'
import scrollToComponent from 'react-scroll-to-component';
import HomeSlider from './HomeSlider'
import { fetchNavbar } from '../../../actions/navbarAction'
import { connect } from 'react-redux';
import Geosuggest from 'react-geosuggest';

const geoStyel=
  { 'input':
  {height: "55px",
  width: "100%",
  border: "1px solid #dde6ef",
  marginBottom: "1px",
  borderRadius: "0",
  background: "#fbfdff",
  fontSize: "15px",
  color: "#445461",
  fontWeight: "400",
  padding: "6px 12px 6px 12px",
  borderRadius: "50px 0px 0px 50px",

  },
 'suggests': {
   borderBottomRightRadius:"4px",
   VborderBottomLeftRadius:"4px",
   backgroundColor:"#fff",
   border:"1pxsolid#CCC",
   VborderTopColor:"#e6e6e6",
   marginTop:"-1px",
   maxHeight:"200px",
   position:'absolute',
   Vleft:"0",
   top:"100%",
   width:"95%",
   VzIndex:"1",
},
'suggestItem': {

}
 }



const fn = value => <span>{value}</span>

class Home extends Component{

  constructor(props){
    super(props)
    this.handleChange=this.handleChange.bind(this)
    this.state = {
       authenticated: false,
       redirect: false,
       registerRedirect:false,
       selectValue:  { value: '', label: 'wähle/tippe Kategorie' },
       showAlert: false,
       alert: "",
       kat:false,
       cityValue: "",
    }
}



componentWillMount(){
  this.props.fetchNavbar('home-2')

  }

handleChange = (city) => {
           this.setState({cityValue: city});
       }
 clickLi = (selectValue) => {
this.setState({ selectValue });
console.log(`Selected: ${selectValue.label}`);
}

handleSubmit(event){
  event.preventDefault();
if (this.state.selectValue.value == "") {
    const alert = "wähle ein Kategorie aus"
    this.setState({alert: alert, showAlert: true})
    return 0
  }else if(this.state.cityValue == ""){
    const alert = "tippe eine Stadt ein"
    this.setState({alert: alert, showAlert: true})
    return 0;
  }
  else {this.setState({kat:true})}
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
              if(this.state.cityValue.label)
               {return <Redirect to={{pathname: `/mieten/city=${this.state.cityValue.label+"/type="+this.state.selectValue.value+"/"}`}}/>}
               else{
                  return <Redirect to={{pathname: `/mieten/city=${this.state.cityValue+"/type="+this.state.selectValue.value+"/"}`}}/>
               }
              }
                  return(
                <div>

                      <body >
                           <div className="wrapper">
                        
                          <div className="clearfix"></div>

                           {/*Main Banner Section Start*/}
                          <div className="banner light-opacity bannerBackground2">
                            <div className="container">

                              <div className="banner-caption">
                                <div className="col-md-12 col-sm-12 banner-text">
                                  <h1><span stlye={{color: "#ff431e"}}>Baumaschinen</span> in deiner Umgebung</h1>
                                  <p>Miete Baumaschinen in deiner Umgebung.</p>
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
                                        <Geosuggest  className="left-radius right-br" placeholder="Ort..." style={geoStyel} onSuggestSelect={this.handleChange} onChange={this.handleChange}/>
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

                           <div ref={(section) => { this.section2 = section; }}>
                             <div className="container hidden-xs ">
                                <HomeSlider/>
                             </div>
                           </div>

                          <section className="features">
                            <div className="container">

                              <div className="row">
                                <div className="col-md-10 col-md-offset-1">
                                <div className="heading" >
                                  <h2>Baumaschinen &  <span> Geräte </span></h2>
                                  <p>Miete sofort Baumaschinen in deiner Umgebung. Schnell. Einfach. Kostenlos.</p>
                                </div>
                                </div>
                              </div>
                              <div className="col-md-4 col-sm-4" >
                                <div className="feature-box" >
                                  <span className="ti-map-alt"></span>
                                  <h4>In deiner Nähe</h4>
                                  <p>Suche in jedem Umkreis nach benötigten Maschinen & Geräten.</p>
                                </div>
                              </div>
                              <div className="col-md-4 col-sm-4">
                                <div className="feature-box">
                                  <span className="ti-email"></span>
                                  <h4>Kontaktaufnahme</h4>
                                  <p>Setze dich mit dem Vermieter in Verbindung.</p>
                                </div>
                              </div>
                              <div className="col-md-4 col-sm-4">
                                <div className="feature-box">
                                  <span className="ti-user"></span>
                                  <h4>Unkompliziert persönlich</h4>
                                  <p>Kläre die Abholung oder Lieferung deiner Maschinen.</p>
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
                                  <div ref={(section) => { this.section3 = section; }} className="col-md-4 col-sm-5 col-xs-12">
                                    <div className="listing-shot grid-style">
                                      <div className="listing-shot-img">
                                        <img src="https://firebasestorage.googleapis.com/v0/b/mietdas-93abf/o/images%2Fhomeimages%2FAnha%CC%88ngerHome.jpeg?alt=media&token=3d3a9e0a-3e73-49a4-864e-1a168097f3ee"  className="img-responsive" alt=""/>
                                        <span className="listing-price">200€</span>
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
                                <div className="col-md-4 col-sm-5 col-xs-12">
                                  <div className="listing-shot grid-style">
                                    <div className="listing-shot-img">
                                      <img src="https://firebasestorage.googleapis.com/v0/b/mietdas-93abf/o/images%2Fhomeimages%2FRadlader%20(1).jpeg?alt=media&token=b13493be-ddd4-411a-8e12-253150081b00"  className="img-responsive" alt=""/>
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
                                <div className="col-md-4 col-sm-5 col-xs-12">
                                  <div className="listing-shot grid-style">
                                    <div className="listing-shot-img">
                                      <img src="https://firebasestorage.googleapis.com/v0/b/mietdas-93abf/o/images%2Fhomeimages%2FminiBagger%20(1).jpeg?alt=media&token=44bcf3d4-3008-46a8-a23d-289574eb5b16"  className="img-responsive" alt=""/>
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
                                      <a href="#">Vermieten  Maschinen in deiner Umgebung</a>
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
                                      <a href="#">Unkomplizierte verwaltung für dein Smartphone</a>
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
                                      <a href="#">Inseriere deine Maschinen und Werkzeug</a>
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



export default connect(null, { fetchNavbar })(Home);
