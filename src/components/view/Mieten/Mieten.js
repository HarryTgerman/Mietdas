import React, {Component} from 'react';
import HomeMap from './Map/HomeMap'
import {AppMap} from './Map/Mapcomponent'
import PlacesAutocomplete, { geocodeByAddress ,getLatLng } from 'react-places-autocomplete';
import Listing from './Listing/Listing'
import firebase from 'firebase'
import Logo from '../../../img/logo.png'
import {NavLink, Redirect,Link} from 'react-router-dom'
import Select from 'react-select';
import Geosuggest from 'react-geosuggest';

import { connect } from 'react-redux';
import { fetchNavbar } from '../../../actions/navbarAction'
import { fetchList } from '../../../actions/listActions'


const geoStyel=
  { 'input':
  {height: "50px",
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



class Mieten extends Component{
  constructor(props){
    super(props)
    this.Ref = firebase.database().ref().child('app').child('cards');
    this.state = {
      authenticated: false,
      redirect: false,
      registerRedirect:false,
      center: {lat:49.3173858, lng:8.4365679},
      position: {lat:49.3173858, lng:8.4365679},
      address: "",
      gebiet: "",
      listState: false,
      cityValue: "",
      kat: '',
      selectValue:  { value: '', label: 'wähle/tippe Kategorie' },
    };
    this.onChange = (address) => this.setState({ address })
    }



    componentWillMount(){
      this.props.fetchNavbar(false)
    }

  componentDidMount(){
    if(this.props.location.pathname.length > 8){this.handleFormSubmit()}
            }
     handleChange = (city) => {
            this.setState({cityValue: city});
            }
    clickLi = (selectValue) => {
   this.setState({ selectValue });
   console.log(`Selected: ${selectValue.label}`);
 }

 componentWillReceiveProps(nextProps){
   if(nextProps.listState.cards){
     this.setState({
       listState: nextProps.listState,
       cards: nextProps.listState.cards,
       markers: nextProps.listState.markers,
       kat: nextProps.listState.kat,
       loadingData: nextProps.listState.loadingData,
     })
   }
 }


 handleFormSubmit = () => {
   const url = this.props.location.pathname;
   const ref = url.split('=');
   const strCity = ref[1];
   const city = strCity.replace(/\/type/i, "")
   const type = ref[2]

   this.setState({type:type, cityValue:city,loadingData: true})
   let whenGeoCode = geocodeByAddress(city)
   .then(results =>{
     getLatLng(results[0])
     .then(latLng =>{
       this.setState({
           center: latLng,
           position: latLng
           })
       })
     .catch(error => console.error('Error', error))
     this.setState({
       gebiet: this.state.address,
       address:   this.state.cityValue,
     })
     const res = results[0]
     let arr =  res.formatted_address.split(",")
     let ort = arr[0]

     console.log(results[0]);
     this.setState({
       ort: ort,
       gebiet: res.address_components[1].long_name,
     })
   })


whenGeoCode.then(() =>{

         let lat = this.state.center.lat - 0.5
         let searchCords = this.state.center.lat + this.state.center.lng;

         this.props.fetchList(this.state.type, this.state.cityValu, searchCords)

     })
}



  handleFormSubmit1 = (e) => {
    e.preventDefault();

    this.setState({
      markers:[],
      cards:[],
      loadingData: true
    })
    let lat;
    if (this.state.selectValue.value == "") {
        const alert = "wähle eine Kategorie aus"
        this.setState({alert: alert, showAlert: true})
        return 0
      }else if(this.state.cityValue == ""){
        const alert = "tippe eine Stadt ein"
        this.setState({alert: alert, showAlert: true})
        return 0
      }else {this.setState({alert: "", showAlert: false})}

      if (this.state.cityValue.location){
        this.setState({
            center: this.state.cityValue.location,
        })
        lat = this.state.cityValue.location.lat -0.5
      }
      else{
        geocodeByAddress(this.state.cityValue)
        .then(results =>{
          getLatLng(results[0])
          .then(latLng =>{
            lat = latLng.lat -0.5
            this.setState({
              center: latLng,
            })
          })
        })
      }

      let searchCords = this.state.center.lat + this.state.center.lng;


    this.props.fetchList(this.state.selectValue.value, lat, searchCords)

}

sortierenNachPreisUp(e){
e.preventDefault()
let sorted = this.props.listState.cards.sort(function(a, b){
    return a.cardPreis-b.cardPreis
})
this.setState({cards:sorted})
}
sortierenNachPreisDown(e){
e.preventDefault()
let sorted = this.props.listState.cards.sort(function(a, b){
    return b.cardPreis-a.cardPreis
})
this.setState({cards:sorted})
}
sortierenNachGewichtUp(e){
e.preventDefault()
let sorted = this.props.listState.cards.sort(function(a, b){
    return a.gewicht-b.gewicht
})
this.setState({cards:sorted})
}
sortierenNachGewichtDown(e){
e.preventDefault()
let sorted = this.props.listState.cards.sort(function(a, b){
    return b.gewicht-a.gewicht
})
this.setState({cards:sorted})
}

      render(){
        if (this.state.redirect === true) {
          return <Redirect to='/benutzeraccount' />
        }else if (this.state.registerRedirect === true) {
          return <Redirect to='/account-erstellen' />
        }
        const { selectedOption } = this.state;
        const value = selectedOption && selectedOption.value

          return(
              <div>
                <div>
                <div className="wrapper">

                    <div className="clearfix">


                    {/* ================ Search listing With Filter Option ======================= */}
                    <div  style={{marginTop: "60px"}}>
                      <div className="container-fluid">
                        <div  className="col-md-8 col-sm-5">

                          {/* Filter Option */}
                          <div className="row">

                            <div s className="col-md-12 col-sm-12 no-padd">
                              <h3>Finde deine Baumaschinen in deiner Umgebung</h3>
                              <p>Suche nach Ort und Kategorie</p>
                            </div>

                            <form className="form-verticle " onSubmit={this.handleFormSubmit1.bind(this)}>
                            {
                              this.state.showAlert ?
                               (<div ref="alert" className="alert alert-danger" role="alert">
                                  <strong>Achtung</strong> {this.state.alert}
                                </div>)
                              :(null)
                            }
                              <div className="row mrg-0">
                                <div className="col-md-5 col-sm-12 col-xs-12 no-padd">
                                  <Geosuggest  className="left-radius right-br" placeholder="Ort..." style={geoStyel} onChange={this.handleChange.bind(this)} onSuggestSelect={this.handleChange.bind(this)}/>
                                </div>
                                <div  className="col-md-5 col-sm-12 col-xs-12 no-padd" >

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
                                      { value: 'RAUMSYSTEME', label: <strong>RAUMSYSTEME</strong>},
                                      { value: 'materialContainer', label: 'Materialcontainer' },
                                      { value: 'FAHRZEUGE', label: <strong>FAHRZEUGE</strong>},
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
              					        <div className="col-md-2 col-sm-12 col-xs-12 no-padd" >
              						        <button style={{padding: "15px 40px", width: "100%"}} type="submit" className="btn theme-btn">Suche</button>
                                </div>
                              </div>
                            </form>
                          </div>


                          {/* All Listing */}
                          <div className="row mrg-bot-20">
                            <div className="col-md-6">
                              <h5>{/*this.state.listState ? (this.state.cards.length + ' Ergebnisse'):(null)}  {this.state.listState.kat?('für '+this.props.listState.kat):(null)*/}</h5>
                            </div>
                            <div className="col-md-6">
                              {this.props.listState.kat?(<div><h5>Sortieren nach Preis: <i onClick={this.sortierenNachPreisUp.bind(this)} className="ti-arrow-up LaufendeAnfragen-info"></i><i className="ti-arrow-down LaufendeAnfragen-info" onClick={this.sortierenNachPreisDown.bind(this)}></i> Gewicht: <i className="ti-arrow-up LaufendeAnfragen-info" onClick={this.sortierenNachGewichtUp.bind(this)}></i><i className="ti-arrow-down LaufendeAnfragen-info" onClick={this.sortierenNachGewichtDown.bind(this)}></i></h5></div>):(null)}
                            </div>

                          </div>

                          <div  className="row">
                            {this.props.listState.kat ? (<Listing gebiet={this.state.gebiet} cards={this.props.listState.cards} kat={this.props.listState.kat} />): (null)}
                            {this.state.loadingData ? (<div style={{marginTop:"30px", marginBottom:"50px"}} className='loader'></div>):(null)}
                          </div>

                        </div>

                        {/* Sidebar Map */}
                            <HomeMap markers={this.props.listState.markers} gebiet={this.state.gebiet} center={this.state.center}/>
                            {/*<AppMap center={this.state.center} gebiet={this.state.gebiet} position={this.state.position}/>*/}

                      </div>
                    </div>


                </div>
              </div>
            </div>

          </div>

            )
        }
    }

  const mapStateToProps = state => ({
    listState: state.listState.items
  })


export default connect(mapStateToProps, { fetchList,fetchNavbar }) (Mieten);
