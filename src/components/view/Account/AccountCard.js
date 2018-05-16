import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import PlacesAutocomplete, { geocodeByAddress ,getLatLng } from 'react-places-autocomplete';



class  AccountCards extends Component {
  constructor(props) {
      super(props)
      this.state ={
        toggle: true,
        adresse: this.props.snap.address
      }
    }

changeLocation(){
 geocodeByAddress(this.inputRef.value)
  .then(results =>{
    let res = results[0]
    getLatLng(results[0])
    .then(latLng =>{
      this.setState({
          latLng: latLng,
          })
      }).then(()=>{
        let arr =  res.formatted_address.split(",")
        console.log(results[0].address_components);
        let adresse= arr[0]+arr[1]
        let ort = results[0].address_components[5].long_name +" "+ results[0].address_components[2].long_name
        this.props.firebase.child('cards').child(this.props.snap.kategorie).child(this.props.cardId)
        .update({adresse:adresse, bundesland: results[0].address_components[3].long_name,
           cords: this.state.latLng, ort: ort,})
        this.setState({
          adresse: adresse,
          toggle:true,
      })
    }).catch(error => console.error('Error', error))
  })
}

    render(){

    return(

      <div >


      <div style={{height: "455px"}}  className="col-md-4 col-sm-12">
          <div className="listing-shot grid-style">
              <div className="listing-shot-img">
                <img src={this.props.snap.imageUrl}  className="img-responsive" alt=""/>
              </div>
            <div className="listing-shot-caption">
              <h4>{this.props.snap.cardHeading}</h4>
            </div>
            {this.state.toggle ?
          (
          <div className="listing-shot-info">
              <div className="row extra">
                <div className="col-md-12">
                  <div className="listing-detail-info">
                    <span>gemiete: ....</span>
                    <span><a>{this.state.adresse}</a></span>
                  </div>
                </div>
              </div>
            </div>):(
              <div className="listing-shot-info ">
                  <span><label>Adresse eingeben</label></span>
                  <span ><input style={{width: "70%"}} ref={(input) => { this.inputRef = input}}/><button onClick={this.changeLocation.bind(this)}><i className="color fa fa-map-marker" aria-hidden="true"></i></button></span>
              </div>
            )}
            <div className="listing-shot-info rating">
              <div className="row extra">
                <div className="col-md-7 col-sm-7 col-xs-6">
                  <i className="color fa fa-star" aria-hidden="true"></i>
                  <i className="color fa fa-star" aria-hidden="true"></i>
                  <i className="color fa fa-star" aria-hidden="true"></i>
                  <i className="color fa fa-star-half-o" aria-hidden="true"></i>
                  <i className="fa fa-star" aria-hidden="true"></i>
                </div>
                <div className="col-md-5 col-sm-5 col-xs-6 pull-right">
                  <a onClick={()=>{this.setState({toggle:!this.state.toggle})}} href="#" className="detail-link">Standort verändern</a>
                </div>
              </div>
            </div>
          </div>
        </div>

    </div>
    )
  }
}



export default AccountCards
