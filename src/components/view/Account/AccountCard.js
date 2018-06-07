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
              <h4>{this.props.snap.hersteller?(this.props.snap.hersteller+" "):(null)}{this.props.snap.cardHeading}{this.props.snap.gewicht?(" "+this.props.snap.gewicht+"Kg"):(null)}</h4>
            </div>
            {this.state.toggle ?
          (
          <div className="listing-shot-info">
              <div className="row extra">
                <div className="col-md-12">
                  <div className="listing-detail-info">
                    <span></span>
                    <span><i className="ti-location-pin mrg-r-5"></i><a>{this.state.adresse}</a></span>
                  </div>
                </div>
              </div>
            </div>):(
              <div className="listing-shot-info " >
                  <span><label>Adresse eingeben</label></span>
                  <span ><input style={{width: "100%"}} ref={(input) => { this.inputRef = input}} placeholder="bitte vollsständige Adresse eingeben"/><button onClick={this.changeLocation.bind(this)}>aktualisieren</button></span>
              </div>
            )}
            <div className="listing-shot-info rating">
              <div className="row extra">
                <div className="col-sm-6" >
                  <Link to={'mashineDetails/search='+this.props.snap.kategorie+'/'+this.props.cardId}><a  className="detail-link">Bearbeiten</a></Link>
                </div>
                <div className="col-sm-6" style={{textAlign:"right"}}>
                  <a onClick={()=>{this.setState({toggle:!this.state.toggle})}} href="#" className="detail-link">{this.state.toggle?('Standort verändern'):('abbrechen')}</a>
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
