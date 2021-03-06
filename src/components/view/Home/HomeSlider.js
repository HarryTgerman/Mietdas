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
                  <img src='https://firebasestorage.googleapis.com/v0/b/mietdas-93abf/o/images%2Fhomeslider%2FBagger.jpg?alt=media&token=77fb498f-1a9a-4d0f-b000-b01e7cc0b6b2'/>
                  <div className="col-md-12 col-xs-12" >
                    <form className="form-verticle " >
                    {
                      this.state.showAlert ?
                       (<div ref="alert" className="alert alert-danger" role="alert">
                          <strong>Achtung</strong> {this.state.alert}
                        </div>)
                      :(null)
                    }
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
                          <button style={{padding: "15px 40px", width: "100%"}} type='button' onClick={()=>{if(this.state.city == ""){
                            const alert = "tippe eine Stadt ein"
                            this.setState({alert: alert, showAlert: true})
                            return 0
                          }this.setState({bagger:true})}} className="btn theme-btn">Suche</button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                <div style={{paddingLeft: "60px", paddingRight: "60px"}}>
                  <h1 className="center">Radlader</h1>
                  <img src='https://firebasestorage.googleapis.com/v0/b/mietdas-93abf/o/images%2Fhomeslider%2FRadlader.jpg?alt=media&token=4b4fd4a0-a156-4445-a54c-765a7c3ba4e6'/>
                  <div className="col-md-12 col-xs-12" >
                    <form className="form-verticle " >
                    {
                      this.state.showAlert ?
                       (<div ref="alert" className="alert alert-danger" role="alert">
                          <strong>Achtung</strong> {this.state.alert}
                        </div>)
                      :(null)
                    }
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
                          <button style={{padding: "15px 40px", width: "100%"}} type='button' onClick={()=>{if(this.state.city == ""){
                            const alert = "tippe eine Stadt ein"
                            this.setState({alert: alert, showAlert: true})
                            return 0
                          }this.setState({radlader:true})}} className="btn theme-btn">Suche</button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                <div style={{paddingLeft: "60px", paddingRight: "60px"}}>
                  <h1 className="center">Anhänger</h1>
                  <img src='https://firebasestorage.googleapis.com/v0/b/mietdas-93abf/o/images%2Fhomeslider%2FAnha%CC%88nger.jpg?alt=media&token=dd88ee3d-ccd5-44dc-99aa-f306e18f07e9'/>
                  <div className="col-md-12 col-xs-12" >
                    <form className="form-verticle " >
                    {
                      this.state.showAlert ?
                       (<div ref="alert" className="alert alert-danger" role="alert">
                          <strong>Achtung</strong> {this.state.alert}
                        </div>)
                      :(null)
                    }
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
                          <button style={{padding: "15px 40px", width: "100%"}} type='button' onClick={()=>{if(this.state.city == ""){
                            const alert = "tippe eine Stadt ein"
                            this.setState({alert: alert, showAlert: true})
                            return 0
                          }this.setState({anhänger:true})}} className="btn theme-btn">Suche</button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                <div style={{paddingLeft: "60px", paddingRight: "60px"}}>
                  <h1 className="center">Baugeräte</h1>
                  <img src='https://firebasestorage.googleapis.com/v0/b/mietdas-93abf/o/images%2Fhomeslider%2FBaugera%CC%88te.jpg?alt=media&token=07f80169-519f-41b4-9253-626bcaf90228'/>
                  <div className="col-md-12 col-xs-12" >
                    <form className="form-verticle " >
                    {
                      this.state.showAlert ?
                       (<div ref="alert" className="alert alert-danger" role="alert">
                          <strong>Achtung</strong> {this.state.alert}
                        </div>)
                      :(null)
                    }
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
                          <button style={{padding: "15px 40px", width: "100%"}} type='button' onClick={()=>{if(this.state.city == ""){
                            const alert = "tippe eine Stadt ein"
                            this.setState({alert: alert, showAlert: true})
                            return 0
                          }this.setState({baugeräte:true})}} className="btn theme-btn">Suche</button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                <div style={{paddingLeft: "60px", paddingRight: "60px"}}>
                  <h1 className="center">Verdichtungstechnik</h1>
                  <img src='https://firebasestorage.googleapis.com/v0/b/mietdas-93abf/o/images%2Fhomeslider%2FVerdichtungstechnik.jpg?alt=media&token=e17d83f3-394e-4822-bbea-f25a836c8a5e'/>
                  <div className="col-md-12 col-xs-12" >
                    <form className="form-verticle " >
                    {
                      this.state.showAlert ?
                       (<div ref="alert" className="alert alert-danger" role="alert">
                          <strong>Achtung</strong> {this.state.alert}
                        </div>)
                      :(null)
                    }
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
                          <button style={{padding: "15px 40px", width: "100%"}} type='button' onClick={()=>{if(this.state.city == ""){
                            const alert = "tippe eine Stadt ein"
                            this.setState({alert: alert, showAlert: true})
                            return 0
                          }this.setState({verdichtunstechnik:true})}} className="btn theme-btn">Suche</button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                <div style={{paddingLeft: "60px", paddingRight: "60px"}}>
                  <h1 className="center">Landschaftstechnik</h1>
                  <img src='https://firebasestorage.googleapis.com/v0/b/mietdas-93abf/o/images%2Fhomeslider%2FLandschaftstechnik.jpg?alt=media&token=9da0be8b-0cf3-45b9-b23f-180f22d39648'/>
                  <div className="col-md-12 col-xs-12" >
                    <form className="form-verticle ">
                    {
                      this.state.showAlert ?
                       (<div ref="alert" className="alert alert-danger" role="alert">
                          <strong>Achtung</strong> {this.state.alert}
                        </div>)
                      :(null)
                    }
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
                          <button style={{padding: "15px 40px", width: "100%"}}  type='button' onClick={()=>{if(this.state.city == ""){
                            const alert = "tippe eine Stadt ein"
                            this.setState({alert: alert, showAlert: true})
                            return 0
                          }this.setState({landschaftstechnik:true})}} className="btn theme-btn">Suche</button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                <div style={{paddingLeft: "60px", paddingRight: "60px"}}>
                  <h1 className="center">Sägen und Schneider</h1>
                  <img src='https://firebasestorage.googleapis.com/v0/b/mietdas-93abf/o/images%2Fhomeslider%2FSa%CC%88gen%20und%20Schneider.jpg?alt=media&token=25ae62fa-6b90-4eb6-8495-43d0ba7f97ba'/>
                  <div className="col-md-12 col-xs-12" >
                    <form className="form-verticle " >
                    {
                      this.state.showAlert ?
                       (<div ref="alert" className="alert alert-danger" role="alert">
                          <strong>Achtung</strong> {this.state.alert}
                        </div>)
                      :(null)
                    }
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
                          <button style={{padding: "15px 40px", width: "100%"}} type='button' onClick={()=>{if(this.state.city == ""){
                            const alert = "tippe eine Stadt ein"
                            this.setState({alert: alert, showAlert: true})
                            return 0
                          }this.setState({sägenUndSchneider:true})}} className="btn theme-btn">Suche</button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                <div style={{paddingLeft: "60px", paddingRight: "60px"}}>
                  <h1 className="center">Raumsysteme</h1>
                  <img src='https://firebasestorage.googleapis.com/v0/b/mietdas-93abf/o/images%2Fhomeslider%2FRaumsysteme.jpg?alt=media&token=b0b6e491-c23a-4d90-b7f7-04285b11c5b0'/>
                  <div className="col-md-12 col-xs-12" >
                    <form className="form-verticle " >
                    {
                      this.state.showAlert ?
                       (<div ref="alert" className="alert alert-danger" role="alert">
                          <strong>Achtung</strong> {this.state.alert}
                        </div>)
                      :(null)
                    }
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
                          <button style={{padding: "15px 40px", width: "100%"}} type='button' onClick={()=>{if(this.state.city == ""){
                            const alert = "tippe eine Stadt ein"
                            this.setState({alert: alert, showAlert: true})
                            return 0
                          }this.setState({raumsysteme:true})}} className="btn theme-btn">Suche</button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                <div style={{paddingLeft: "60px", paddingRight: "60px"}}>
                  <h1 className="center">Fahrzeuge</h1>
                  <img src='https://firebasestorage.googleapis.com/v0/b/mietdas-93abf/o/images%2Fhomeslider%2FTransport.jpg?alt=media&token=de687ed5-8b59-4e5d-b7d8-c9c716df743d'/>
                  <div className="col-md-12 col-xs-12" >
                    <form className="form-verticle " >
                    {
                      this.state.showAlert ?
                       (<div ref="alert" className="alert alert-danger" role="alert">
                          <strong>Achtung</strong> {this.state.alert}
                        </div>)
                      :(null)
                    }
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
                          <button style={{padding: "15px 40px", width: "100%"}} type='button' onClick={()=>{if(this.state.city == ""){
                            const alert = "tippe eine Stadt ein"
                            this.setState({alert: alert, showAlert: true})
                            return 0
                          }this.setState({fahrzeuge:true})}} className="btn theme-btn">Suche</button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                <div style={{paddingLeft: "60px", paddingRight: "60px"}}>
                  <h1 className="center">Hebetechnik</h1>
                  <img src='https://firebasestorage.googleapis.com/v0/b/mietdas-93abf/o/images%2Fhomeslider%2FHebetechnik.jpg?alt=media&token=adb6594c-4320-4c0e-aaa6-3693e9affcf4'/>
                  <div className="col-md-12 col-xs-12" >
                    <form className="form-verticle " >
                    {
                      this.state.showAlert ?
                       (<div ref="alert" className="alert alert-danger" role="alert">
                          <strong>Achtung</strong> {this.state.alert}
                        </div>)
                      :(null)
                    }
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
                          <button style={{padding: "15px 40px", width: "100%"}} type='button' onClick={()=>{if(this.state.city == ""){
                            const alert = "tippe eine Stadt ein"
                            this.setState({alert: alert, showAlert: true})
                            return 0
                          }this.setState({hebetechnik: true})}} className="btn theme-btn">Suche</button>
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
