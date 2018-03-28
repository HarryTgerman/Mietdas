import React, {Component} from "react";
import {withGoogleMap, GoogleMap, InfoWindow, Marker} from "react-google-maps";
import * as firebase from 'firebase'
import { Link } from 'react-router-dom'
import MyMarker from '../../../../img/marker7.png'
const { compose, withProps, withStateHandlers } = require("recompose");




const exampleMapStyles = [
    {
      "featureType": "administrative",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#444444"
        }
      ]
    },
    {
      "featureType": "landscape",
      "elementType": "all",
      "stylers": [
        {
          "color": "#f2f2f2"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "all",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "all",
      "stylers": [
        {
          "saturation": -100
        },
        {
          "lightness": 45
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "all",
      "stylers": [
        {
          "visibility": "simplified"
        }
      ]
    },
    {
      "featureType": "road.arterial",
      "elementType": "labels.icon",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "transit",
      "elementType": "all",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "all",
      "stylers": [
        {
          "color": "#c0e4f3"
        },
        {
          "visibility": "on"
        }
      ]
    }
  ]

const GettingStartedGoogleMap = compose(
withStateHandlers(() => ({
    isOpen: false,
  }), {
    onToggleOpen: ({ isOpen }) => () => ({
      isOpen: !isOpen,
    })
  }),withGoogleMap)(props =>(
    <GoogleMap
     defaultOptions={{ styles: exampleMapStyles }}

      defaultZoom={13}
      scrollwheel="false"
      center={props.center}

      >
        {
          props.markers.map((marker) => {
          const num = (Math.random() * 0.001) + 0.0001;
;
           return (
          <Marker
          icon={{
                url: MyMarker,
            }}
            onClick={props.onToggleOpen}
            position={{ lat: marker.latitude + 0.005+ num, lng: marker.longitude+ 0.005+ num}}
            key={marker.id}>
          {
            props.isOpen && <InfoWindow onCloseClick={props.onToggleOpen}>
              <div style={{height: "350px", width: "250px"}}>
                    <div className="listing-shot grid-style">
                      <div className="listing-shot-img">
                        <img src={marker.cardImage} stlye={{height:"150px"}} className="img-responsive" alt=""/>
                        <span className="listing-price">{marker.price}€</span>
                      </div>
                      <div className="listing-shot-caption">
                        <h4>{marker.cardHeading}</h4>
                        <span><i className="fa fa-map-marker" aria-hidden="true"></i>{marker.standOrt}</span>
                      </div>
                      <a/>
                      <div className="listing-shot-info">
                       </div>
                       <div className="listing-shot-info rating">
                       <div className="row extra">
                        <div className="col-md-7 col-sm-7 col-xs-6">
                          <i className="color fa fa-star" aria-hidden="true"></i>
                          <i className="color fa fa-star" aria-hidden="true"></i>
                          <i className="color fa fa-star" aria-hidden="true"></i>
                          <i className="color fa fa-star" aria-hidden="true"></i>
                          <i className="fa fa-star" aria-hidden="true"></i>
                        </div>
                        <div className="col-md-5 col-sm-5 col-xs-6 pull-right">
                        <Link to={{
                          pathname: `/details/${marker.id}`,
                        }}><a href="#" className="detail-link">gehe zu</a></Link>
                        </div>
                      </div>
                    </div>
                  </div>
              </div>
            </InfoWindow>
          }
          </Marker>
        )})}
</GoogleMap>
));

export class AppMap extends Component {

 constructor(props) {
   super(props);
   this.Ref = firebase.database().ref().child('app').child('cards');
   this.state = ({
     isOpen: false,
   })
 }



     render() {
         return (
             <div style={{height: `93%`}}>
                 <GettingStartedGoogleMap
                 containerElement={
                <div style={{ height: `100%` }} />
              }
              mapElement={
                <div style={{ height: `100%` }} />
              }

              center={this.props.center}
              markers={this.props.markers}



              googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
              />
            </div>
         );
     }
   }

export default AppMap;
