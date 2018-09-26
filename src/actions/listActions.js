import { FETCH_LIST, NEW_LIST } from './types';
import PlacesAutocomplete, { geocodeByAddress ,getLatLng } from 'react-places-autocomplete';
import firebase from 'firebase'



export const fetchList = (selectValue, lat, searchCords) =>  dispatch => {

  let markers = [];
  let cards = [];

     if(selectValue == "BAGGER" || selectValue == "BAGGER/"){
       let arr =['minibagger','kompaktbagger','raupenbagger','mobilbagger']

      arr.map(i=>{
        firebase.database().ref().child('app').child('cards').child(i).orderByChild('cords/lat').startAt(lat).limitToFirst(100)
         .once('value', snap => {
          snap.forEach(childSnapshot =>{
            markers.push({
              kategorie: childSnapshot.val().kategorie,
              id: childSnapshot.key,
              standOrt: childSnapshot.val().ort,
              cardHeading: childSnapshot.val().cardHeading,
              cardBewertung: childSnapshot.val().bewertung,
              cardImage: childSnapshot.val().imageUrl,
              latitude: childSnapshot.val().cords.lat,
              longitude: childSnapshot.val().cords.lng,
              price: childSnapshot.val().cardPreis,
              key: snap.key,
              })
            cards.push ({
              id: childSnapshot.key,
              kategorie: childSnapshot.val().kategorie,
              cardPreis: childSnapshot.val().cardPreis,
              cardHeading: childSnapshot.val().cardHeading,
              cardBewertung: childSnapshot.val().bewertung,
              cardImage: childSnapshot.val().imageUrl,
              standOrt: childSnapshot.val().ort,
              gewicht: childSnapshot.val().gewicht,
              snap: childSnapshot.val(),
            })
          })
          cards.map(i => {
            i.snap.cords = i.snap.cords.lat + i.snap.cords.lng;
          })
          cards = cards.sort(function(a, b){
            return Math.abs(searchCords-a.snap.cords) - Math.abs(searchCords-b.snap.cords);
         });

         let post = { kat: 'Bagger',
                       cards: cards,
                       markers:markers,
                       loadingData: false,
                       markers: markers }
         return dispatch ({
           type: FETCH_LIST,
           payload: post
         })
        })
      })
  }
  else if(selectValue == "RADLADER" || selectValue == "RADLADER/"){
      let arr =['radlader','kettendumper','raddumper']

      arr.map(i=>{
        firebase.database().ref().child('app').child('cards').child(i).orderByChild('cords/lat').startAt(lat).limitToFirst(100)
         .once('value', snap => {
          snap.forEach(childSnapshot =>{
            markers.push({
              kategorie: childSnapshot.val().kategorie,
              id: childSnapshot.key,
              standOrt: childSnapshot.val().ort,
              cardHeading: childSnapshot.val().cardHeading,
              cardBewertung: childSnapshot.val().bewertung,
              cardImage: childSnapshot.val().imageUrl,
              latitude: childSnapshot.val().cords.lat,
              longitude: childSnapshot.val().cords.lng,
              price: childSnapshot.val().cardPreis,
              key: snap.key,
              })
            cards.push ({
              id: childSnapshot.key,
              kategorie: childSnapshot.val().kategorie,
              cardPreis: childSnapshot.val().cardPreis,
              cardHeading: childSnapshot.val().cardHeading,
              cardBewertung: childSnapshot.val().bewertung,
              cardImage: childSnapshot.val().imageUrl,
              standOrt: childSnapshot.val().ort,
              gewicht: childSnapshot.val().gewicht,
              snap: childSnapshot.val(),
            })
          })
          cards.map(i => {
            i.snap.cords = i.snap.cords.lat + i.snap.cords.lng;
          })
          cards = cards.sort(function(a, b){
            return Math.abs(searchCords-a.snap.cords) - Math.abs(searchCords-b.snap.cords);
         });
         let post = {  kat: 'Radlader',
                       cards: cards,
                       markers:markers,
                       loadingData: false,
                       markers: markers }

         return dispatch ({
           type: FETCH_LIST,
           payload: post
         })
        })
      })
  }

    else if(selectValue == "ANHÄNGER" || selectValue == "ANHÄNGER/"){
      let arr =['anhänger','kippanhänger','planenanhänger','autotransportanhänger','tieflader']

      arr.map(i=>{
        firebase.database().ref().child('app').child('cards').child(i).orderByChild('cords/lat').startAt(lat).limitToFirst(100)
         .once('value', snap => {
          snap.forEach(childSnapshot =>{
            markers.push({
              kategorie: childSnapshot.val().kategorie,
              id: childSnapshot.key,
              standOrt: childSnapshot.val().ort,
              cardHeading: childSnapshot.val().cardHeading,
              cardBewertung: childSnapshot.val().bewertung,
              cardImage: childSnapshot.val().imageUrl,
              latitude: childSnapshot.val().cords.lat,
              longitude: childSnapshot.val().cords.lng,
              price: childSnapshot.val().cardPreis,
              key: snap.key,
              })
            cards.push ({
              id: childSnapshot.key,
              kategorie: childSnapshot.val().kategorie,
              cardPreis: childSnapshot.val().cardPreis,
              cardHeading: childSnapshot.val().cardHeading,
              cardBewertung: childSnapshot.val().bewertung,
              cardImage: childSnapshot.val().imageUrl,
              standOrt: childSnapshot.val().ort,
              gewicht: childSnapshot.val().gewicht,
              snap: childSnapshot.val(),
            })
          })
          cards.map(i => {
            i.snap.cords = i.snap.cords.lat + i.snap.cords.lng;
          })
          cards = cards.sort(function(a, b){
            return Math.abs(searchCords-a.snap.cords) - Math.abs(searchCords-b.snap.cords);
         });

         let post = { kat: 'Anhänger',
                       cards: cards,
                       markers:markers,
                       loadingData: false,
                       markers: markers }
         return dispatch ({
           type: FETCH_LIST,
           payload: post
         })
        })
      })
  }

  else if(selectValue == "BAUGERÄTE" || selectValue == "BAUGERÄTE/"){
    let arr =['abbruchhammer','betonglaetter','betoninnenruettler','betonmischer','bohrhammer','erdbohrgeraet','kernbohrmaschiene',]

    arr.map(i=>{
      firebase.database().ref().child('app').child('cards').child(i).orderByChild('cords/lat').startAt(lat).limitToFirst(100)
       .once('value', snap => {
        snap.forEach(childSnapshot =>{
          markers.push({
            kategorie: childSnapshot.val().kategorie,
            id: childSnapshot.key,
            standOrt: childSnapshot.val().ort,
            cardHeading: childSnapshot.val().cardHeading,
            cardBewertung: childSnapshot.val().bewertung,
            cardImage: childSnapshot.val().imageUrl,
            latitude: childSnapshot.val().cords.lat,
            longitude: childSnapshot.val().cords.lng,
            price: childSnapshot.val().cardPreis,
            key: snap.key,
            })
          cards.push ({
            id: childSnapshot.key,
            kategorie: childSnapshot.val().kategorie,
            cardPreis: childSnapshot.val().cardPreis,
            cardHeading: childSnapshot.val().cardHeading,
            cardBewertung: childSnapshot.val().bewertung,
            cardImage: childSnapshot.val().imageUrl,
            standOrt: childSnapshot.val().ort,
            gewicht: childSnapshot.val().gewicht,
            snap: childSnapshot.val(),
          })
        })
        cards.map(i => {
          i.snap.cords = i.snap.cords.lat + i.snap.cords.lng;
        })
        cards = cards.sort(function(a, b){
          return Math.abs(searchCords-a.snap.cords) - Math.abs(searchCords-b.snap.cords);
       });
       let post = { kat: 'Baugeräte',
                    loadingData: false,
                     cards: cards,
                     markers:markers,
                     markers: markers }
       return dispatch ({
         type: FETCH_LIST,
         payload: post
       })
      })
    })
  }

  else if(selectValue == "VERDICHTUNGSTECHNIK" || selectValue == "VERDICHTUNGSTECHNIK/"){
    let arr =['stampfer',
  'vibrationsplatte',
  'grabenwalze',
  'vibrationswalze']

    arr.map(i=>{
      firebase.database().ref().child('app').child('cards').child(i).orderByChild('cords/lat').startAt(lat).limitToFirst(100)
       .once('value', snap => {
        snap.forEach(childSnapshot =>{
          markers.push({
            kategorie: childSnapshot.val().kategorie,
            id: childSnapshot.key,
            standOrt: childSnapshot.val().ort,
            cardHeading: childSnapshot.val().cardHeading,
            cardBewertung: childSnapshot.val().bewertung,
            cardImage: childSnapshot.val().imageUrl,
            latitude: childSnapshot.val().cords.lat,
            longitude: childSnapshot.val().cords.lng,
            price: childSnapshot.val().cardPreis,
            key: snap.key,
            })
          cards.push ({
            id: childSnapshot.key,
            kategorie: childSnapshot.val().kategorie,
            cardPreis: childSnapshot.val().cardPreis,
            cardHeading: childSnapshot.val().cardHeading,
            cardBewertung: childSnapshot.val().bewertung,
            cardImage: childSnapshot.val().imageUrl,
            standOrt: childSnapshot.val().ort,
            gewicht: childSnapshot.val().gewicht,
            snap: childSnapshot.val(),
          })
        })
        cards.map(i => {
          i.snap.cords = i.snap.cords.lat + i.snap.cords.lng;
        })
        cards = cards.sort(function(a, b){
          return Math.abs(searchCords-a.snap.cords) - Math.abs(searchCords-b.snap.cords);
       });
       let post = { kat: 'Verdichtungstechnik',
                    loadingData: false,
                     cards: cards,
                     markers:markers,
                     markers: markers }
       return dispatch ({
         type: FETCH_LIST,
         payload: post
       })
      })
    })
  }
  else if(selectValue == "LANDSCHAFTSTECHNIK" || selectValue == "LANDSCHAFTSTECHNIK/"){
    let arr =['bodenfraese',
  'holzhaecksler']

    arr.map(i=>{
      firebase.database().ref().child('app').child('cards').child(i).orderByChild('cords/lat').startAt(lat).limitToFirst(100)
       .once('value', snap => {
        snap.forEach(childSnapshot =>{
          markers.push({
            kategorie: childSnapshot.val().kategorie,
            id: childSnapshot.key,
            standOrt: childSnapshot.val().ort,
            cardHeading: childSnapshot.val().cardHeading,
            cardBewertung: childSnapshot.val().bewertung,
            cardImage: childSnapshot.val().imageUrl,
            latitude: childSnapshot.val().cords.lat,
            longitude: childSnapshot.val().cords.lng,
            price: childSnapshot.val().cardPreis,
            key: snap.key,
            })
          cards.push ({
            id: childSnapshot.key,
            kategorie: childSnapshot.val().kategorie,
            cardPreis: childSnapshot.val().cardPreis,
            cardHeading: childSnapshot.val().cardHeading,
            cardBewertung: childSnapshot.val().bewertung,
            cardImage: childSnapshot.val().imageUrl,
            standOrt: childSnapshot.val().ort,
            gewicht: childSnapshot.val().gewicht,
            snap: childSnapshot.val(),
          })
        })
        cards.map(i => {
          i.snap.cords = i.snap.cords.lat + i.snap.cords.lng;
        })
        cards = cards.sort(function(a, b){
          return Math.abs(searchCords-a.snap.cords) - Math.abs(searchCords-b.snap.cords);
       });

        let post = { kat: 'Landschaftstechnik',
                      loadingData: false,
                      cards: cards,
                      markers:markers,
                      markers: markers }
        return dispatch ({
          type: FETCH_LIST,
          payload: post
        })
      })
    })
  }
  else if(selectValue == "SÄGEN UND SCHNEIDER" || selectValue == "SÄGEN UND SCHNEIDER/"){
    let arr =['trennschleifer',
  'bausteinBandseage',
  'blocksteinsaege',
  'fugenschneider',
  'steinsaege']

    arr.map(i=>{
      firebase.database().ref().child('app').child('cards').child(i).orderByChild('cords/lat').startAt(lat).limitToFirst(100)
       .once('value', snap => {
        snap.forEach(childSnapshot =>{
          markers.push({
            kategorie: childSnapshot.val().kategorie,
            id: childSnapshot.key,
            standOrt: childSnapshot.val().ort,
            cardHeading: childSnapshot.val().cardHeading,
            cardBewertung: childSnapshot.val().bewertung,
            cardImage: childSnapshot.val().imageUrl,
            latitude: childSnapshot.val().cords.lat,
            longitude: childSnapshot.val().cords.lng,
            price: childSnapshot.val().cardPreis,
            key: snap.key,
            })
          cards.push ({
            id: childSnapshot.key,
            kategorie: childSnapshot.val().kategorie,
            cardPreis: childSnapshot.val().cardPreis,
            cardHeading: childSnapshot.val().cardHeading,
            cardBewertung: childSnapshot.val().bewertung,
            cardImage: childSnapshot.val().imageUrl,
            standOrt: childSnapshot.val().ort,
            gewicht: childSnapshot.val().gewicht,
            snap: childSnapshot.val(),
          })
        })
        cards.map(i => {
          i.snap.cords = i.snap.cords.lat + i.snap.cords.lng;
        })
        cards = cards.sort(function(a, b){
          return Math.abs(searchCords-a.snap.cords) - Math.abs(searchCords-b.snap.cords);
       });

       let post = { kat: 'Sägen und Schneider',
                     cards: cards,
                     markers:markers,
                     loadingData: false,
                     markers: markers }
       return dispatch ({
         type: FETCH_LIST,
         payload: post
       })
      })
    })
  }

  else if(selectValue == "RAUMSYSTEME" || selectValue == "RAUMSYSTEME/"){
    let arr =['materialContainer']

    arr.map(i=>{
      firebase.database().ref().child('app').child('cards').child(i).orderByChild('cords/lat').startAt(lat).limitToFirst(100)
       .once('value', snap => {
        snap.forEach(childSnapshot =>{
          markers.push({
            kategorie: childSnapshot.val().kategorie,
            id: childSnapshot.key,
            standOrt: childSnapshot.val().ort,
            cardHeading: childSnapshot.val().cardHeading,
            cardBewertung: childSnapshot.val().bewertung,
            cardImage: childSnapshot.val().imageUrl,
            latitude: childSnapshot.val().cords.lat,
            longitude: childSnapshot.val().cords.lng,
            price: childSnapshot.val().cardPreis,
            key: snap.key,
            })
          cards.push ({
            id: childSnapshot.key,
            kategorie: childSnapshot.val().kategorie,
            cardPreis: childSnapshot.val().cardPreis,
            cardHeading: childSnapshot.val().cardHeading,
            cardBewertung: childSnapshot.val().bewertung,
            cardImage: childSnapshot.val().imageUrl,
            standOrt: childSnapshot.val().ort,
            gewicht: childSnapshot.val().gewicht,
            snap: childSnapshot.val(),
          })
        })
        cards.map(i => {
          i.snap.cords = i.snap.cords.lat + i.snap.cords.lng;
        })
        cards = cards.sort(function(a, b){
          return Math.abs(searchCords-a.snap.cords) - Math.abs(searchCords-b.snap.cords);
       });

       let post = { kat: 'Raumsysteme',
                     cards: cards,
                     markers:markers,
                     loadingData: false,
                     markers: markers }
       return dispatch ({
         type: FETCH_LIST,
         payload: post
       })
      })
    })
  }

  else if(selectValue == "FAHRZEUGE" || selectValue == "FAHRZEUGE/"){
    let arr =['pritschenwagen',
  'umzugstransporter']

    arr.map(i=>{
      firebase.database().ref().child('app').child('cards').child(i).orderByChild('cords/lat').startAt(lat).limitToFirst(100)
       .once('value', snap => {
        snap.forEach(childSnapshot =>{
          markers.push({
            kategorie: childSnapshot.val().kategorie,
            id: childSnapshot.key,
            standOrt: childSnapshot.val().ort,
            cardHeading: childSnapshot.val().cardHeading,
            cardBewertung: childSnapshot.val().bewertung,
            cardImage: childSnapshot.val().imageUrl,
            latitude: childSnapshot.val().cords.lat,
            longitude: childSnapshot.val().cords.lng,
            price: childSnapshot.val().cardPreis,
            key: snap.key,
            })
          cards.push ({
            id: childSnapshot.key,
            kategorie: childSnapshot.val().kategorie,
            cardPreis: childSnapshot.val().cardPreis,
            cardHeading: childSnapshot.val().cardHeading,
            cardBewertung: childSnapshot.val().bewertung,
            cardImage: childSnapshot.val().imageUrl,
            standOrt: childSnapshot.val().ort,
            gewicht: childSnapshot.val().gewicht,
            snap: childSnapshot.val(),
          })
        })
        cards.map(i => {
          i.snap.cords = i.snap.cords.lat + i.snap.cords.lng;
        })
        cards = cards.sort(function(a, b){
          return Math.abs(searchCords-a.snap.cords) - Math.abs(searchCords-b.snap.cords);
       });
       let post = { kat: 'Fahrzeuge',
                     cards: cards,
                     markers:markers,
                     loadingData: false,
                     markers: markers }
       return dispatch ({
         type: FETCH_LIST,
         payload: post
       })
      })
    })
  }

  else if(selectValue == "HEBETECHNIK" || selectValue == "HEBETECHNIK/"){
    let arr =['teleskopstapler',
  'teleskopmastbühne',
  'teleskopArbeitsbühne',
  'selbstfahrendeScherenbühne',
  'gelenkteleskoparbeitsbühneAufGummiketten',
  'lkwArbeitsbühne',
  'gelenkteleskopArbeitsbühne',
  'anhängerArbeitsbühne']

    arr.map(i=>{
      firebase.database().ref().child('app').child('cards').child(i).orderByChild('cords/lat').startAt(lat).limitToFirst(100)
       .once('value', snap => {
        snap.forEach(childSnapshot =>{
          markers.push({
            kategorie: childSnapshot.val().kategorie,
            id: childSnapshot.key,
            standOrt: childSnapshot.val().ort,
            cardHeading: childSnapshot.val().cardHeading,
            cardBewertung: childSnapshot.val().bewertung,
            cardImage: childSnapshot.val().imageUrl,
            latitude: childSnapshot.val().cords.lat,
            longitude: childSnapshot.val().cords.lng,
            price: childSnapshot.val().cardPreis,
            key: snap.key,
            })
          cards.push ({
            id: childSnapshot.key,
            kategorie: childSnapshot.val().kategorie,
            cardPreis: childSnapshot.val().cardPreis,
            cardHeading: childSnapshot.val().cardHeading,
            cardBewertung: childSnapshot.val().bewertung,
            cardImage: childSnapshot.val().imageUrl,
            standOrt: childSnapshot.val().ort,
            gewicht: childSnapshot.val().gewicht,
            snap: childSnapshot.val(),
          })
        })
        cards.map(i => {
          i.snap.cords = i.snap.cords.lat + i.snap.cords.lng;
        })
        cards = cards.sort(function(a, b){
          return Math.abs(searchCords-a.snap.cords) - Math.abs(searchCords-b.snap.cords);
       });
       let post = { kat: 'Hebetechnik',
                     cards: cards,
                     markers:markers,
                     loadingData: false,
                     markers: markers }
       return dispatch ({
         type: FETCH_LIST,
         payload: post
       })

      })
    })
  }

  else{
       firebase.database().ref().child('app').child('cards').child(selectValue).orderByChild('cords/lat').startAt(lat).limitToFirst(100)
        .once('value', snap => {
          snap.forEach(childSnapshot =>{
            markers.push({
              kategorie: childSnapshot.val().kategorie,
              id: childSnapshot.key,
              standOrt: childSnapshot.val().ort,
              cardHeading: childSnapshot.val().cardHeading,
              cardBewertung: childSnapshot.val().bewertung,
              cardImage: childSnapshot.val().imageUrl,
              latitude: childSnapshot.val().cords.lat,
              longitude: childSnapshot.val().cords.lng,
              price: childSnapshot.val().cardPreis,
              key: snap.key,
              })
            cards.push ({
              id: childSnapshot.key,
              kategorie: childSnapshot.val().kategorie,
              cardPreis: childSnapshot.val().cardPreis,
              cardHeading: childSnapshot.val().cardHeading,
              cardBewertung: childSnapshot.val().bewertung,
              cardImage: childSnapshot.val().imageUrl,
              standOrt: childSnapshot.val().ort,
              gewicht: childSnapshot.val().gewicht,
              snap: childSnapshot.val(),
            })
          })
          cards.map(i => {
            i.snap.cords = i.snap.cords.lat + i.snap.cords.lng;
          })
          cards = cards.sort(function(a, b){
            return Math.abs(searchCords-a.snap.cords) - Math.abs(searchCords-b.snap.cords);
         });
         let post = { kat: selectValue,
                      loadingData: false,
                       cards: cards,
                       markers:markers,
                       }
         return dispatch ({
           type: FETCH_LIST,
           payload: post
         })
        })
      }







}
