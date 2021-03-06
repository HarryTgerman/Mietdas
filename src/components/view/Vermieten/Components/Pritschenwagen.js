import React, {Component} from 'react';
import firebase from 'firebase';
import {Redirect, NavLink} from 'react-router-dom';
import Dropzone from 'react-dropzone';



class Pritschenwagen extends Component{
  constructor(props){
    super(props)
    this.state = {
       redirect: false,
       imageFiles: [],
       pictures: [],
       showAlert: false,
       alert: "",
       ret:false,

    }
}

onDrop(imageFiles) {

 this.setState({
     imageFiles: imageFiles,
   })
 }






 artikelHochladen(event) {

   event.preventDefault();


     if (this.titelInput.value == "") {
      const alert = "Gebe den Namen des Artikels ein"
      this.setState({alert: alert, showAlert: true})
      return 0
    }
    if (this.herstellerInput.value == "") {
      const alert = "Gebe den Hersteller des Artikels ein"
      this.setState({alert: alert, showAlert: true})
      return 0
    }
    if (this.GewichtdesArtikelsInput.value == "") {
    const alert = "Gebe Auskunft über das Gewicht"
    this.setState({alert: alert, showAlert: true})
    return 0
    }
    if (this.LaengedesArtikelsInput.value == "") {
    const alert = "Gebe Auskunft über die Länge"
    this.setState({alert: alert, showAlert: true})
    return 0
    }
    if (this.BreitedesArtikelsInput.value == "") {
    const alert = "Gebe Auskunft über die Breite"
    this.setState({alert: alert, showAlert: true})
    return 0
    }
    if (this.HoehedesArtikelsInput.value == "") {
    const alert = "Gebe Auskunft über die Höhe"
    this.setState({alert: alert, showAlert: true})
    return 0
    }
    if (this.LadeflaechedesArtikelsInput.value == "") {
    const alert = "Gebe Auskunft über das ladeflaeche"
    this.setState({alert: alert, showAlert: true})
    return 0
    }
    if (this.LeergewichtdesArtikelsInput.value == "") {
    const alert = "Gebe Auskunft über das Leergewicht"
    this.setState({alert: alert, showAlert: true})
    return 0
    }
    if (this.GesamtgewichtdesArtikelsInput.value == "") {
    const alert = "Gebe Auskunft über das zulässige Gesamtgewicht"
    this.setState({alert: alert, showAlert: true})
    return 0
    }
    if (this.NutzlastdesArtikelsInput.value == "") {
    const alert = "Gebe Auskunft über die Nutzlast"
    this.setState({alert: alert, showAlert: true})
    return 0
    }
    if (this.StzplaetzedesArtikelsInput.value == "") {
    const alert = "Gebe Auskunft über die Sitzplätze"
    this.setState({alert: alert, showAlert: true})
    return 0
    }
    if (this.LeistungdesArtikelsInput.value == "") {
    const alert = "Gebe Auskunft über die Leistung des Fahrzeugs"
    this.setState({alert: alert, showAlert: true})
    return 0
    }
    if (this.AnhaengelastUngebremstdesArtikelsInput.value == "") {
    const alert = "Gebe Auskunft über die Anhängelast ungebremst"
    this.setState({alert: alert, showAlert: true})
    return 0
    }
    if (this.AnhaengelastGebremstdesArtikelsInput.value == "") {
    const alert = "Gebe Auskunft über die Anhängelast gebremst"
    this.setState({alert: alert, showAlert: true})
    return 0
    }
    if (this.FührerscheinklassedesArtikelsInput.value == "") {
    const alert = "Gebe Auskunft über die Führerscheinklasse"
    this.setState({alert: alert, showAlert: true})
    return 0
    }
    if (this.priceInput.value == "") {
    const alert = "Lege einen Preis fest"
    this.setState({alert: alert, showAlert: true})
    return 0
    }
    if (this.state.imageFiles == []) {
      const alert = "Lade mindestens ein Bild hoch"
      this.setState({alert: alert, showAlert: true})
      return 0
    }
    if (this.rabattDreiInput.value == "") {
      const alert = "Fülle Die Rabattstaffelung aus"
      this.setState({alert: alert, showAlert: true})
      return 0
    }
    if (this.rabattFünfInput.value == "") {
      const alert = "Fülle Die Rabattstaffelung aus"
      this.setState({alert: alert, showAlert: true})
      return 0
    }
    if (this.rabattZehnInput.value == "") {
      const alert = "Fülle Die Rabattstaffelung aus"
      this.setState({alert: alert, showAlert: true})
      return 0
    }
    if (this.rabatt21Input.value == "") {
      const alert = "Fülle Die Rabattstaffelung aus"
      this.setState({alert: alert, showAlert: true})
      return 0
    }
    this.setState({
      loading: true,
      imageUpload: false,

    })

        const db = firebase.database().ref('app').child('cards').child('pritschenwagen');
        const userId = this.props.user;
        const titel = this.titelInput.value;
        const hersteller = this.herstellerInput.value;
        const gewicht = this.GewichtdesArtikelsInput.value;
        const laenge = this.LaengedesArtikelsInput.value;
        const breite = this.BreitedesArtikelsInput.value;
        const hoehe = this.HoehedesArtikelsInput.value;
        const ladeflaeche = this.LadeflaechedesArtikelsInput.value;
        const leerGewicht = this.LeergewichtdesArtikelsInput.value;
        const gesamtGewicht = this.GesamtgewichtdesArtikelsInput.value;
        const sitzplaetze = this.StzplaetzedesArtikelsInput.value;
        const leistung = this.LeistungdesArtikelsInput.value;
        const anhaengerlastUngebremst = this.AnhaengelastUngebremstdesArtikelsInput.value;
        const anhaengerlastGebremst = this.AnhaengelastGebremstdesArtikelsInput.value;
        const fuehrerschein = this.FührerscheinklassedesArtikelsInput.value;
        const preis = this.priceInput.value;

        let dreiTage = this.rabattDreiInput.value;
        let fünfTage = this.rabattFünfInput.value;
        let zehnTage = this.rabattZehnInput.value;
        let einundzwanzigTage = this.rabatt21Input.value;

        const timeInMs = Date.now();


        const array = []
        const imageFiles = this.state.imageFiles

        let keysPromises = imageFiles.map(
          img =>
            new Promise((resolve, reject) => {
              const imageFile = img;
              firebase
                .storage()
                .ref("images")
                .child("artikelimgaes/" + userId)
                .child("artikel/")
                .child(titel)
                .child(imageFile.name)
                .put(imageFile)
                .then(() => {
                  firebase
                    .storage()
                    .ref("images")
                    .child("artikelimgaes/" + userId)
                    .child("artikel/")
                    .child(titel)
                    .child(imageFile.name)
                    .getDownloadURL()
                    .then(url => {
                      const imgUrl = url;
                      array.push(url);
                      this.setState({ Arr: array }, resolve());
                    });
                });
            })
          );

        Promise.all(keysPromises).then(() => {

               const images = this.state.Arr;
               const imageUrl = this.state.Arr[0]
                       db.push({
                         rabattStaffelung: {
                           dreiTage: dreiTage,
                           fünfTage:fünfTage,
                           zehnTage:zehnTage,
                           einundzwanzigTage:einundzwanzigTage,
                         },
                         kategorie:"pritschenwagen",
                         email: this.props.email,
                         hersteller: hersteller,
                         cardHeading:titel ,
                         cardPreis: preis,
                         gewicht: gewicht,
                         laenge: laenge,
                         breite: breite,
                         hoehe: hoehe,
                         ladeflaeche: ladeflaeche,
                         leerGewicht: leerGewicht,
                         gesamtGewicht: gesamtGewicht,
                         sitzplaetze: sitzplaetze,
                         leistung: leistung,
                         anhaengerlastUngebremst: anhaengerlastUngebremst,
                         anhaengerlastGebremst: anhaengerlastGebremst,
                         fuehrerschein: fuehrerschein,
                         address: this.props.address,
                         ort: this.props.ort,
                         gemietet: 0,
                         cords: this.props.cords,
                         telefon:this.props.telefon ,
                         imageArr: images,
                         imageUrl: imageUrl,
                         gebiet: this.props.gebiet,
                         bundesland: this.props.bundesland,
                         uid: userId,
                         vermieter: this.props.vermieter,

                       })
                       this.setState({
                         loading: false,
                         redirect: true
                       })
                     })
     }

        render(){
          if(this.state.redirect === true) {
            return  <Redirect to="/benutzeraccount"/>
          }
          if(this.state.showAlert === true || this.state.loading ===true)
          {window.scrollTo(0, 0)}

          return(
              <div>

               {/*End Navigation*/}


                <div className=" full-detail mrg-bot-25 padd-bot-30 padd-top-25" >

                   {/* /. ROW  */}
                  <div id="page-inner">
  {this.state.loading?(<div className="loader"></div>):(
                        <div className="row bott-wid">
                          <div className="col-md-12 col-sm-12">
                            <div className=" full-detail mrg-bot-25 padd-bot-30 padd-top-25">
                              <div className="listing-box-header">
                                <i className="ti-write theme-cl"></i>
                                <h3>Pritschenwagen Inserieren</h3>
                                <p>Fülle das Formular vollständig aus</p>
                              </div>
                              <form onSubmit={this.artikelHochladen.bind(this)}>
                                {
                                  this.state.showAlert ?
                                   (<div ref="alert" className="alert alert-danger" role="alert">
                                      <strong>Achtung</strong> {this.state.alert}
                                    </div>)
                                  :(null)
                                }

                                <div className="row mrg-r-10 mrg-l-10">
                                  <div className="col-sm-6">
                                    <label>Model</label>
                                    <input type="text" className="form-control"  ref={(input) => { this.titelInput = input}} placeholder="Name des Artikels" />
                                  </div>

                                  <div className="col-sm-6">
                                    <label>Hersteler</label>
                                    <input type="text" className="form-control"  ref={(input) => { this.herstellerInput = input}} placeholder="..." />
                                  </div>

                                  <div className="col-sm-6">
                                    <label>Gewicht</label>
                                    <input type="number" className="form-control" ref={(input) => { this.GewichtdesArtikelsInput = input}} placeholder="in kg"/>
                                  </div>

                                  <div className="col-sm-6">
                                    <label>Länge</label>
                                    <input type="number" className="form-control" ref={(input) => { this.LaengedesArtikelsInput = input}} placeholder="in cm"/>
                                  </div>

                                  <div className="col-sm-6">
                                    <label>Breite</label>
                                    <input type="number" className="form-control" ref={(input) => { this.BreitedesArtikelsInput = input}} placeholder="in cm"/>
                                  </div>

                                  <div className="col-sm-6">
                                    <label>Höhe</label>
                                    <input type="number" className="form-control" ref={(input) => { this.HoehedesArtikelsInput = input}} placeholder="in cm"/>
                                  </div>

                                  <div className="col-sm-6">
                                    <label>Ladefläche</label>
                                    <input type="text" className="form-control" ref={(input) => { this.LadeflaechedesArtikelsInput = input}} placeholder="Bsp: 2.700 cm x 2.030 cm"/>
                                  </div>

                                  <div className="col-sm-6">
                                    <label>Leergewicht</label>
                                    <input type="number" className="form-control" ref={(input) => { this.LeergewichtdesArtikelsInput = input}} placeholder="in kg"/>
                                  </div>

                                  <div className="col-sm-6">
                                    <label>zulässiges Gesamtgewicht</label>
                                    <input type="number" className="form-control" ref={(input) => { this.GesamtgewichtdesArtikelsInput = input}} placeholder="in kg"/>
                                  </div>

                                  <div className="col-sm-6">
                                    <label>Nutzlast</label>
                                    <input type="number" className="form-control" ref={(input) => { this.NutzlastdesArtikelsInput = input}} placeholder="in kg"/>
                                  </div>

                                  <div className="col-sm-6">
                                    <label>Sitzplätze</label>
                                    <input type="number" className="form-control" ref={(input) => { this.StzplaetzedesArtikelsInput = input}} placeholder="Bsp: 3"/>
                                  </div>

                                  <div className="col-sm-6">
                                    <label>Leistung</label>
                                    <input type="number" className="form-control" ref={(input) => { this.LeistungdesArtikelsInput = input}} placeholder="in KW/PS"/>
                                  </div>

                                  <div className="col-sm-6">
                                    <label>Anhängelast ungebremst</label>
                                    <input type="number" className="form-control" ref={(input) => { this.AnhaengelastUngebremstdesArtikelsInput = input}} placeholder="in kg"/>
                                  </div>

                                  <div className="col-sm-6">
                                    <label>Anhängelast gebremst</label>
                                    <input type="number" className="form-control" ref={(input) => { this.AnhaengelastGebremstdesArtikelsInput = input}} placeholder="in kg"/>
                                  </div>

                                  <div className="col-sm-6">
                                    <label>Führerscheinklasse</label>
                                    <input type="text" className="form-control" ref={(input) => { this.FührerscheinklassedesArtikelsInput = input}} placeholder="Bsp: B/BE"/>
                                  </div>


                                  <div className="col-sm-6">
                                    <label>Preis</label>
                                    <input type="number" className="form-control" ref={(input) => { this.priceInput = input}} placeholder="€ Pro Tag"/>
                                  </div>

                                  <div className="col-sm-12">
                                    <label>Artikelbeschreibung/Mietbedienungen</label>
                                    <textarea className="h-100 form-control" ref={(input) => { this.descInput = input}} placeholder=" Mach Angaben z.B über Transport, Versicherung, Betankung und Reinigung"></textarea>
                                  </div>

                                  <div className="col-sm-12">
                                    <label>Rabattstaffelung</label>
                                  </div>
                                  <div className="col-sm-12 col-md-3">
                                    <p>ab Drei Tagen</p>
                                    <input  type="number" className="h-100 form-control" ref={(input) => { this.rabattDreiInput = input}} placeholder="in %"/>
                                  </div>
                                  <div className="col-sm-12 col-md-3">
                                    <p>ab Fünf Tagen</p>
                                    <input  type="number" className="h-100 form-control" ref={(input) => { this.rabattFünfInput = input}} placeholder="in %"/>
                                  </div>
                                  <div className="col-sm-12 col-md-3">
                                    <p>ab 10 Tagen</p>
                                    <input  type="number" className="h-100 form-control" ref={(input) => { this.rabattZehnInput = input}} placeholder="in %"/>
                                  </div>
                                  <div className="col-sm-12 col-md-3">
                                    <p>ab 21 Tagen</p>
                                    <input  type="number" className="h-100 form-control" ref={(input) => { this.rabatt21Input = input}} placeholder="in %"/>
                                  </div>

                                </div>
                                <div className="listing-box-header">
                                  <i className="ti-gallery theme-cl"></i>
                                  <h3>Gallerie</h3>
                                  <p>Füge deine Bilder hinzu</p>
                                </div>
                                <form style={{cursor:'pointer'}}  className="dz-clickable primary-dropzone">
                                  <Dropzone
                                      className="dropzone"
                                      onDrop={this.onDrop.bind(this)}
                                      activeClassName='active-dropzone'
                                      multiple={true}>
                                      <div className="dz-default dz-message">
                                        <i className="ti-gallery"></i>
                                        <span>Klicke auf diese Feld</span>
                                      </div>
                                      <div className="row">
                                      {this.state.imageFiles.length > 0 ? <div>
                                      <div>{this.state.imageFiles.map((file) => <div key={file.name.toString()} className="col-md-4 col-sm-12" ><img  stlye={{height: "120px", width: "120px", borderRadius: "4px"}}  src={file.preview} /></div> )}</div>
                                      </div> : null}
                                      </div>
                                    </Dropzone>

                                </form>
                                <div className="form-group">
                                  <div className="col-md-12 col-sm-12 text-center">
                                    <button type="submit" className="btn theme-btn">Artikel hochladen</button>
                                  </div>
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>)}

                  </div>
                </div>
              </div>
            )
        }
    }

export default Pritschenwagen;
