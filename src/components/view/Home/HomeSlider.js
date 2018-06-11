import React, {Component} from 'react';
import Slider from 'react-slick'
import logo from '../../../img/logo.png'
import {Redirect} from 'react-router-dom'
import Geosuggest from 'react-geosuggest';

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

class HomeSlider extends Component{
  constructor(props){
    super(props)
    this.state = {city: ""}
}

handleCity = (city) => {
           this.setState({city: city});
}





      render(){
          var settings = {
        slider:true,
        centerMode: true,
        arrwos: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,

      };
      if(this.state.bagger){
        if(this.state.city.label)
        {return <Redirect to={{pathname: `/mieten/city=${this.state.city.label+"/type="+this.baggerInput.value+"/"}`}}/>}
        else{
          return <Redirect to={{pathname: `/mieten/city=${this.state.city+"/type="+this.baggerInput.value+"/"}`}}/>
        }
      }
      if(this.state.radlader){
        if(this.state.city.label)
        {return <Redirect to={{pathname: `/mieten/city=${this.state.city.label+"/type="+this.radladerInput.value+"/"}`}}/>}
        else{
          return <Redirect to={{pathname: `/mieten/city=${this.state.city+"/type="+this.radladerInput.value+"/"}`}}/>
        }
      }
      if(this.state.anhänger){
        if(this.state.city.label)
        {return <Redirect to={{pathname: `/mieten/city=${this.state.city.label+"/type="+this.anhängerInput.value+"/"}`}}/>}
        else{
          return <Redirect to={{pathname: `/mieten/city=${this.state.city+"/type="+this.anhängerInput.value+"/"}`}}/>
        }
      }
      if(this.state.baugeräte){
        if(this.state.city.label)
        {return <Redirect to={{pathname: `/mieten/city=${this.state.city.label+"/type="+this.baugeräteInput.value+"/"}`}}/>}
        else{
          return <Redirect to={{pathname: `/mieten/city=${this.state.city+"/type="+this.baugeräteInput.value+"/"}`}}/>
        }
      }
      if(this.state.verdichtunstechnik){
        if(this.state.city.label)
        {return <Redirect to={{pathname: `/mieten/city=${this.state.city.label+"/type="+this.verdichtunstechnikInput.value+"/"}`}}/>}
        else{
          return <Redirect to={{pathname: `/mieten/city=${this.state.city+"/type="+this.verdichtunstechnikInput.value+"/"}`}}/>
        }
      }
      if(this.state.landschaftstechnik){
        if(this.state.city.label)
        {return <Redirect to={{pathname: `/mieten/city=${this.state.city.label+"/type="+this.landschaftstechnikInput.value+"/"}`}}/>}
        else{
          return <Redirect to={{pathname: `/mieten/city=${this.state.city+"/type="+this.landschaftstechnikInput.value+"/"}`}}/>
        }
      }
      if(this.state.sägenUndSchneider){
        if(this.state.city.label)
        {return <Redirect to={{pathname: `/mieten/city=${this.state.city.label+"/type="+this.sägenUndSchneiderInput.value+"/"}`}}/>}
        else{
           <Redirect to={{pathname: `/mieten/city=${this.state.city+"/type="+this.sägenUndSchneiderInput.value+"/"}`}}/>
        }

      }
      if(this.state.raumsysteme){
        if(this.state.city.label)
        {return <Redirect to={{pathname: `/mieten/city=${this.state.city.label+"/type="+this.raumsystemeInput.value+"/"}`}}/>}
        else{
          return <Redirect to={{pathname: `/mieten/city=${this.state.city+"/type="+this.raumsystemeInput.value+"/"}`}}/>
        }
      }
      if(this.state.fahrzeuge){
        if(this.state.city.label)
        {return <Redirect to={{pathname: `/mieten/city=${this.state.city.label+"/type="+this.fahrzeugeInput.value+"/"}`}}/>}
        else{
          return <Redirect to={{pathname: `/mieten/city=${this.state.city+"/type="+this.fahrzeugeInput.value+"/"}`}}/>
        }
      }
      if(this.state.hebetechnik){
        if(this.state.city.label)
        {return <Redirect to={{pathname: `/mieten/city=${this.state.city.label+"/type="+this.hebetechnikInput.value+"/"}`}}/>}
        else{
          return <Redirect to={{pathname: `/mieten/city=${this.state.city+"/type="+this.hebetechnikInput.value+"/"}`}}/>
        }
      }
      return (
              <Slider {...settings}>
                <div style={{paddingLeft: "60px", paddingRight: "60px"}}>
                  <h1 className="center">Bagger</h1>
                  <img src='https://firebasestorage.googleapis.com/v0/b/mietdas-93abf/o/images%2Fhomeslider%2FBagger.jpg?alt=media&token=a86846cd-94a7-4f83-a596-9347ea2a2506'/>
                  <div className="col-md-12 col-xs-12" >
                    <form className="form-verticle " >
                      <div className="row mrg-0">
                        <div className="col-md-5 col-sm-12 col-xs-12 no-padd">
                          <Geosuggest  className="left-radius right-br" placeholder="Ort..." style={geoStyel} onSuggestSelect={this.handleCity.bind(this)} onChange={this.handleCity.bind(this)}/>                        </div>
                        <div  className="col-md-5 col-sm-12 col-xs-12 no-padd" >
                        <select  className="form-control right-radius" ref={select => this.baggerInput = select}  >
                          <option value="BAGGER"><strong>BAGGER</strong></option>
                          <option value="minibagger">Minibagger</option>
                          <option value="kompaktbagger">Kompaktbagger</option>
                          <option value="raupenbagger">Raupenbagger</option>
                          <option value="mobilbagger">Mobilbagger</option>
                        </select>
                        </div>
                        <div className="col-md-2 col-sm-12 col-xs-12 no-padd" >
                          <button style={{padding: "15px 40px", width: "100%"}} type='button' onClick={()=>{this.setState({bagger:true})}} className="btn theme-btn">Suche</button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                <div style={{paddingLeft: "60px", paddingRight: "60px"}}>
                  <h1 className="center">Radlader</h1>
                  <img src='https://firebasestorage.googleapis.com/v0/b/mietdas-93abf/o/images%2Fhomeslider%2FRadlader.jpg?alt=media&token=9ccf5218-1dc8-4ff8-b17a-023503519796'/>
                  <div className="col-md-12 col-xs-12" >
                    <form className="form-verticle " >
                      <div className="row mrg-0">
                        <div className="col-md-5 col-sm-12 col-xs-12 no-padd">
                          <Geosuggest  className="left-radius right-br" placeholder="Ort..." style={geoStyel} onSuggestSelect={this.handleCity.bind(this)} onChange={this.handleCity.bind(this)}/>
                        </div>
                        <div  className="col-md-5 col-sm-12 col-xs-12 no-padd" >
                        <select  className="form-control right-radius" ref={select => this.radladerInput = select}  >
                          <option value="RADLADER"><strong>RADLADER</strong></option>
                          <option value="radlader">Radlader</option>
                          <option value="kettendumper">Kettendumper</option>
                          <option value="raddumper">Raddumper</option>
                        </select>
                        </div>
                        <div className="col-md-2 col-sm-12 col-xs-12 no-padd" >
                          <button style={{padding: "15px 40px", width: "100%"}} type='button' onClick={()=>{this.setState({radlader:true})}} className="btn theme-btn">Suche</button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                <div style={{paddingLeft: "60px", paddingRight: "60px"}}>
                  <h1 className="center">Anhänger</h1>
                  <img src='https://firebasestorage.googleapis.com/v0/b/mietdas-93abf/o/images%2Fhomeslider%2FAnha%CC%88nger.jpg?alt=media&token=1eb559e0-a9b8-433c-af38-96fbf69535d5'/>
                  <div className="col-md-12 col-xs-12" >
                    <form className="form-verticle " >
                      <div className="row mrg-0">
                        <div className="col-md-5 col-sm-12 col-xs-12 no-padd">
                          <Geosuggest  className="left-radius right-br" placeholder="Ort..." style={geoStyel} onSuggestSelect={this.handleCity.bind(this)} onChange={this.handleCity.bind(this)}/>
                        </div>
                        <div  className="col-md-5 col-sm-12 col-xs-12 no-padd" >
                        <select  className="form-control right-radius" ref={select => this.anhängerInput = select}  >
                          <option value="ANHÄNGER"><strong>ANHÄNGER</strong></option>
                          <option value="anhänger">Anhänger</option>
                          <option value="kippanhänger">Kippanhänger</option>
                          <option value="planenanhänger">Planenanhänger</option>
                          <option value="autotransportanhänger">Autotransportanhänger</option>
                          <option value="tieflader">Tieflader</option>
                        </select>
                        </div>
                        <div className="col-md-2 col-sm-12 col-xs-12 no-padd" >
                          <button style={{padding: "15px 40px", width: "100%"}} type='button' onClick={()=>{this.setState({anhänger:true})}} className="btn theme-btn">Suche</button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                <div style={{paddingLeft: "60px", paddingRight: "60px"}}>
                  <h1 className="center">Baugeräte</h1>
                  <img src='https://firebasestorage.googleapis.com/v0/b/mietdas-93abf/o/images%2Fhomeslider%2FBaugera%CC%88te.jpg?alt=media&token=70964fda-fdd6-46d2-ae5c-1f7dc682ba8b'/>
                  <div className="col-md-12 col-xs-12" >
                    <form className="form-verticle " >
                      <div className="row mrg-0">
                        <div className="col-md-5 col-sm-12 col-xs-12 no-padd">
                          <Geosuggest  className="left-radius right-br" placeholder="Ort..." style={geoStyel} onSuggestSelect={this.handleCity.bind(this)} onChange={this.handleCity.bind(this)}/>
                        </div>
                        <div  className="col-md-5 col-sm-12 col-xs-12 no-padd" >
                        <select  className="form-control right-radius" ref={select => this.baugeräteInput = select}  >
                          <option value="BAUGERÄTE"><strong>BAUGERÄTE</strong></option>
                          <option value="abbruchhammer">Abbruchhammer</option>
                          <option value="betonglaetter">Betonglätter</option>
                          <option value="betoninnenruettler">Betoninnenrüttler</option>
                          <option value="betonmischer">Betonmischer</option>
                          <option value="bohrhammer">Bohrhammer</option>
                          <option value="erdbohrgeraet">Erdbohrgerät</option>
                          <option value="kernbohrmaschiene">Kernbohrmaschiene</option>
                        </select>
                        </div>
                        <div className="col-md-2 col-sm-12 col-xs-12 no-padd" >
                          <button style={{padding: "15px 40px", width: "100%"}} type='button' onClick={()=>{this.setState({baugeräte:true})}} className="btn theme-btn">Suche</button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                <div style={{paddingLeft: "60px", paddingRight: "60px"}}>
                  <h1 className="center">Verdichtungstechnik</h1>
                  <img src='https://firebasestorage.googleapis.com/v0/b/mietdas-93abf/o/images%2Fhomeslider%2FVerdichtungstechnik.jpg?alt=media&token=510725c8-eb31-4ccf-b126-ce474fb0fad5'/>
                  <div className="col-md-12 col-xs-12" >
                    <form className="form-verticle " >
                      <div className="row mrg-0">
                        <div className="col-md-5 col-sm-12 col-xs-12 no-padd">
                          <Geosuggest  className="left-radius right-br" placeholder="Ort..." style={geoStyel} onSuggestSelect={this.handleCity.bind(this)} onChange={this.handleCity.bind(this)}/>
                        </div>
                        <div  className="col-md-5 col-sm-12 col-xs-12 no-padd" >
                        <select  className="form-control right-radius" ref={select => this.verdichtunstechnikInput = select}  >
                          <option value="VERDICHTUNGSTECHNIK"><strong>VERDICHTUNGSTECHNIK</strong></option>
                          <option value="stampfer">Stampfer</option>
                          <option value="vibrationsplatte">Vibrationsplatte</option>
                          <option value="grabenwalze">Grabenwalze</option>
                          <option value="vibrationswalze">Vibrationswalze</option>
                        </select>
                        </div>
                        <div className="col-md-2 col-sm-12 col-xs-12 no-padd" >
                          <button style={{padding: "15px 40px", width: "100%"}} type='button' onClick={()=>{this.setState({verdichtunstechnik:true})}} className="btn theme-btn">Suche</button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                <div style={{paddingLeft: "60px", paddingRight: "60px"}}>
                  <h1 className="center">Landschaftstechnik</h1>
                  <img src='https://firebasestorage.googleapis.com/v0/b/mietdas-93abf/o/images%2Fhomeslider%2FLandschaftstechnik.jpg?alt=media&token=1e2a1948-0290-456b-9cb2-3d0f76d1832d'/>
                  <div className="col-md-12 col-xs-12" >
                    <form className="form-verticle ">
                      <div className="row mrg-0">
                        <div className="col-md-5 col-sm-12 col-xs-12 no-padd">
                          <Geosuggest  className="left-radius right-br" placeholder="Ort..." style={geoStyel} onSuggestSelect={this.handleCity.bind(this)} onChange={this.handleCity.bind(this)}/>
                        </div>
                        <div  className="col-md-5 col-sm-12 col-xs-12 no-padd" >
                        <select  className="form-control right-radius" ref={select => this.landschaftstechnikInput = select}  >
                          <option value="LANDSCHAFTSTECHNIK"><strong>LANDSCHAFTSTECHNIK</strong></option>
                          <option value="bodenfraese">Bodenfräse</option>
                          <option value="holzhaecksler">Holzhäcksler</option>
                        </select>
                        </div>
                        <div className="col-md-2 col-sm-12 col-xs-12 no-padd" >
                          <button style={{padding: "15px 40px", width: "100%"}}  type='button' onClick={()=>{this.setState({landschaftstechnik:true})}} className="btn theme-btn">Suche</button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                <div style={{paddingLeft: "60px", paddingRight: "60px"}}>
                  <h1 className="center">Sägen und Schneider</h1>
                  <img src='https://firebasestorage.googleapis.com/v0/b/mietdas-93abf/o/images%2Fhomeslider%2FSa%CC%88gen%20und%20Schneider.jpg?alt=media&token=43e4da53-80ca-4a62-a30d-336938fb3601'/>
                  <div className="col-md-12 col-xs-12" >
                    <form className="form-verticle " >
                      <div className="row mrg-0">
                        <div className="col-md-5 col-sm-12 col-xs-12 no-padd">
                          <Geosuggest  className="left-radius right-br" placeholder="Ort..." style={geoStyel} onSuggestSelect={this.handleCity.bind(this)} onChange={this.handleCity.bind(this)}/>
                        </div>
                        <div  className="col-md-5 col-sm-12 col-xs-12 no-padd" >
                        <select  className="form-control right-radius" ref={select => this.sägenUndSchneiderInput = select}  >
                          <option value="SÄGEN UND SCHNEIDER"><strong>SÄGEN UND SCHNEIDER</strong></option>
                          <option value="trennschleifer">Trennschleifer</option>
                          <option value="bausteinBandseage">Baustein Bandsäge</option>
                          <option value="blocksteinsaege">Blocksteinsäge</option>
                          <option value="fugenschneider">Fugenschneider</option>
                          <option value="steinsaege">Steinsäge</option>
                        </select>
                        </div>
                        <div className="col-md-2 col-sm-12 col-xs-12 no-padd" >
                          <button style={{padding: "15px 40px", width: "100%"}} type='button' onClick={()=>{this.setState({sägenUndSchneider:true})}} className="btn theme-btn">Suche</button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                <div style={{paddingLeft: "60px", paddingRight: "60px"}}>
                  <h1 className="center">Raumsysteme</h1>
                  <img src='https://firebasestorage.googleapis.com/v0/b/mietdas-93abf/o/images%2Fhomeslider%2FRaumsysteme.jpg?alt=media&token=2b4d66dd-06f1-41b3-93e7-9a8d49341af9'/>
                  <div className="col-md-12 col-xs-12" >
                    <form className="form-verticle " >
                      <div className="row mrg-0">
                        <div className="col-md-5 col-sm-12 col-xs-12 no-padd">
                          <Geosuggest  className="left-radius right-br" placeholder="Ort..." style={geoStyel} onSuggestSelect={this.handleCity.bind(this)} onChange={this.handleCity.bind(this)}/>
                        </div>
                        <div  className="col-md-5 col-sm-12 col-xs-12 no-padd" >
                        <select  className="form-control right-radius" ref={select => this.raumsystemeInput = select}  >
                          <option value="RAUMSYSTEME"><strong>RAUMSYSTEME</strong></option>
                          <option value="materialContainer">Materialcontainer</option>
                        </select>
                        </div>
                        <div className="col-md-2 col-sm-12 col-xs-12 no-padd" >
                          <button style={{padding: "15px 40px", width: "100%"}} type='button' onClick={()=>{this.setState({raumsysteme:true})}} className="btn theme-btn">Suche</button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                <div style={{paddingLeft: "60px", paddingRight: "60px"}}>
                  <h1 className="center">Fahrzeuge</h1>
                  <img src='https://firebasestorage.googleapis.com/v0/b/mietdas-93abf/o/images%2Fhomeslider%2FTransport.jpg?alt=media&token=f461fdeb-8691-4dc1-8bfb-4a151bd0320e'/>
                  <div className="col-md-12 col-xs-12" >
                    <form className="form-verticle " >
                      <div className="row mrg-0">
                        <div className="col-md-5 col-sm-12 col-xs-12 no-padd">
                          <Geosuggest  className="left-radius right-br" placeholder="Ort..." style={geoStyel} onSuggestSelect={this.handleCity.bind(this)} onChange={this.handleCity.bind(this)}/>
                        </div>
                        <div  className="col-md-5 col-sm-12 col-xs-12 no-padd" >
                        <select  className="form-control right-radius" ref={select => this.fahrzeugeInput = select}  >
                          <option value="FAHRZEUGE"><strong>FAHRZEUGE</strong></option>
                          <option value="pritschenwagen">Pritschenwagen</option>
                          <option value="umzugstransporter">Umzugstransporter</option>
                        </select>
                        </div>
                        <div className="col-md-2 col-sm-12 col-xs-12 no-padd" >
                          <button style={{padding: "15px 40px", width: "100%"}} type='button' onClick={()=>{this.setState({fahrzeuge:true})}} className="btn theme-btn">Suche</button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                <div style={{paddingLeft: "60px", paddingRight: "60px"}}>
                  <h1 className="center">Hebetechnik</h1>
                  <img src='https://firebasestorage.googleapis.com/v0/b/mietdas-93abf/o/images%2Fhomeslider%2FHebetechnik.jpg?alt=media&token=fae45489-9125-4574-bce0-0b158f968fe3'/>
                  <div className="col-md-12 col-xs-12" >
                    <form className="form-verticle " >
                      <div className="row mrg-0">
                        <div className="col-md-5 col-sm-12 col-xs-12 no-padd">
                          <Geosuggest  className="left-radius right-br" placeholder="Ort..." style={geoStyel} onSuggestSelect={this.handleCity.bind(this)} onChange={this.handleCity.bind(this)}/>
                        </div>
                        <div  className="col-md-5 col-sm-12 col-xs-12 no-padd" >
                        <select  className="form-control right-radius" ref={select => this.hebetechnikInput = select}  >
                          <option value="HEBETECHNIK"><strong>HEBETECHNIK</strong></option>
                          <option value="teleskopstapler">Teleskopstapler</option>
                          <option value="teleskopmastbühne">Teleskopmastbühne</option>
                          <option value="teleskopArbeitsbühne">Teleskop-Arbeitsbühne</option>
                          <option value="selbstfahrendeScherenbühne">Selbstfahrende Scherenbühne</option>
                          <option value="gelenkteleskoparbeitsbühneAufGummiketten">Gelenkteleskoparbeitsbühne auf Gummiketten</option>
                          <option value="lkwArbeitsbühne">LKW Arbeitsbühne</option>
                          <option value="gelenkteleskopArbeitsbühne">Gelenkteleskop-Arbeitsbühne</option>
                          <option value="anhängerArbeitsbühne">Anhänger-Arbeitsbühne</option>
                        </select>
                        </div>
                        <div className="col-md-2 col-sm-12 col-xs-12 no-padd" >
                          <button style={{padding: "15px 40px", width: "100%"}} type='button' onClick={()=>{this.setState({hebetechnik: true})}} className="btn theme-btn">Suche</button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </Slider>
          )
        }
    }

export default HomeSlider;
