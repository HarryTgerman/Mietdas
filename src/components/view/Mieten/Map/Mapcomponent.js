import React, {Component} from "react";
import {withGoogleMap, GoogleMap, InfoWindow, Marker} from "react-google-maps";
import * as firebase from 'firebase'
import { Link } from 'react-router-dom'






const GettingStartedGoogleMap = withGoogleMap(props =>(
    <GoogleMap
      defaultZoom={13}
      center={props.center}
      >
        {
          props.markers.map((marker) => {
          const num = (Math.random() * 0.001) + 0.0001;
;
           return (
          <Marker  onClick={props.show} position={{ lat: marker.latitude + 0.005+ num, lng: marker.longitude+ 0.005+ num}}
          key={marker.id}>
          {
            props.isOpen && <InfoWindow onCloseClick={props.hide}>
            <div style={{height: "250px", width: "300px"}}>
            <Link to={{
              pathname: `/details/${props.id}`,
              state: {
                cardHeading: marker.cardHeading,
                cardDesc: marker.cardDesc,
                cardId: marker.id
              }
            }}>
              <img style={{maxHeight: "200px", width:"100%"}}  src={marker.cardImage} alt="242x200"/>
              <h4>{marker.cardHeading}</h4>
                  

                </Link>
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
   this.show = this.show.bind(this)
   this.hide = this.hide.bind(this)
   this.Ref = firebase.database().ref().child('app').child('cards');
   this.state = ({
     markers : [],
     isOpen: false,
   })
 }

 componentWillReceiveProps (nextProps){
   const previousMarker = this.state.markers;
   this.Ref.orderByChild('gebiet').equalTo(this.props.gebiet)
      .on('value', snap => {
        snap.forEach(childSnapshot =>{
          previousMarker.push({
              cardHeading: childSnapshot.val().cardHeading,
              cardBewertung: childSnapshot.val().bewertung,
              cardImage: childSnapshot.val().imageUrl,
              latitude: childSnapshot.val().cords.lat,
              longitude: childSnapshot.val().cords.lng,
              price: childSnapshot.val().cardPreis,
              key: snap.key,
            })

        this.setState ({
          markers: previousMarker
        })
        console.log("das hier ist Map",this.state.markers)

      })
    })
 }



  show() {
      this.setState({ isOpen: true });
    }

    hide() {
      this.setState({ isOpen: false });
    }


     render() {
         return (
             <div style={{height: `800px`}}>
                 <GettingStartedGoogleMap
                 containerElement={
                <div style={{ height: `100%` }} />
              }
              mapElement={
                <div style={{ height: `100%` }} />
              }

              center={this.props.center}
              markers={this.state.markers}
              show={this.show}
              hide={this.hide}
              isOpen={this.state.isOpen}
              googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
              />
            </div>
         );
     }
   }

export default AppMap;
