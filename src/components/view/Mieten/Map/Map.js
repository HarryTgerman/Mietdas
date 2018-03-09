import React, {Component} from 'react'
import  {AppMap} from './Mapcomponent'
import {Row, Col, Button ,FormControl} from 'react-bootstrap';
import PlacesAutocomplete, { geocodeByAddress ,getLatLng } from 'react-places-autocomplete';

import List from '../List/List'




class Map extends Component{
  constructor(props){
      super(props)
      this.state = {
        center: {lat:49.3173858, lng:8.4365679},
        position: {lat:49.3173858, lng:8.4365679},
        address: "",
        gebiet: "",
      };
      this.onChange = (address) => this.setState({ address })

    }




handleFormSubmit = (event) => {

  const titel = this.titelInput.value;
  event.preventDefault();
  geocodeByAddress(titel)
      .then(results =>{
        const res = results[0]
        this.setState({
          gebiet: res.address_components[1].long_name
        })
      })
  geocodeByAddress(titel)
      .then(results =>  getLatLng(results[0]))
      .then(latLng =>{
        this.setState({
            center: latLng,
            position: latLng
        })
         console.log('Success', latLng)}
         )
      .catch(error => console.error('Error', error))
      this.setState({
        gebiet: this.state.address,
        address: titel
      })

 }





    render(){

        return(
            <div>
            <Row>
              <Col  xs={12} md={8} sm={8} lg={8}>
              <div style={{marginLeft: "30px", marginRight: "30px"}} className="maplist">
                <form className="autoCFrom" onSubmit={this.handleFormSubmit} >
                  <Row>
                    <Col style={{padding: "0", margin: "0" }} xs={10} md={10}  sm={10} lg={10}>
                    <FormControl style={{marginRight:"0"}} inputRef={(ref) => { this.titelInput = ref; }} type="text" placeholder="Wo suchen Sie nach ihrem Artikel?" />
                    </Col>
                    <Col style={{padding: "0", margin: "0"}} xs={2} md={2}  sm={2} lg={2} >
                    <Button bsStyle="primary" type="submit">Submit</Button>
                    </Col>
                  </Row>
                </form>
                <div style={{overflow: "scroll", height: "700px"}}>
                  <List gebiet={this.state.gebiet} />
                </div>
              </div>
              </Col>
              <Col xsHidden md={4} lg={4} sm={4}>
            <div className="mapcomponent" style={{align: "right"}}>
              <AppMap center={this.state.center} gebiet={this.state.gebiet} position={this.state.position} />
            </div>
            </Col>
            </Row>
          </div>
          )
        }
    }
export default Map
