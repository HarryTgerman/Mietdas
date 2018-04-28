import React, {Component} from 'react';
import firebase from 'firebase';
import {Redirect, NavLink} from 'react-router-dom';
import Dropzone from 'react-dropzone';



class Umzugstransporter extends Component{
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

c

onDrop(imageFiles) {

 this.setState({
     imageFiles: imageFiles,
   })
 }






 artikelHochladen(event) {

   event.preventDefault();
     this.setState({
       loading: true,
       imageUpload: false,

     })

     if (this.titelInput.value == "") {
      const alert = "Geben Sie den Namen des Artikels ein"
      this.setState({alert: alert, showAlert: true})
      return 0
    }
    if (this.herstellerInput.value == "") {
      const alert = "Geben Sie den Hersteller des Artikels ein"
      this.setState({alert: alert, showAlert: true})
      return 0
    }
    if (this.GewichtdesArtikelsInput.value == "") {
    const alert = "Geben Sie Auskunft über das Gewicht"
    this.setState({alert: alert, showAlert: true})
    return 0
    }
    if (this.LaengedesArtikelsInput.value == "") {
    const alert = "Geben Sie Auskunft über die Länge"
    this.setState({alert: alert, showAlert: true})
    return 0
    }
    if (this.BreitedesArtikelsInput.value == "") {
    const alert = "Geben Sie Auskunft über die Breite"
    this.setState({alert: alert, showAlert: true})
    return 0
    }
    if (this.HoehedesArtikelsInput.value == "") {
    const alert = "Geben Sie Auskunft über die Höhe"
    this.setState({alert: alert, showAlert: true})
    return 0
    }
    if (this.LaengeDerLadeflaechedesArtikelsInput.value == "") {
    const alert = "Geben Sie Auskunft über die Länge der Ladefläche"
    this.setState({alert: alert, showAlert: true})
    return 0
    }
    if (this.BreiteDerLadeflaechedesArtikelsInput.value == "") {
    const alert = "Geben Sie Auskunft über die Breite der Ladefläche"
    this.setState({alert: alert, showAlert: true})
    return 0
    }
    if (this.HoeheDerLadeflaechedesArtikelsInput.value == "") {
    const alert = "Geben Sie Auskunft über die Höhe der Ladefläche"
    this.setState({alert: alert, showAlert: true})
    return 0
    }
    if (this.LaderaumvolumendesArtikelsInput.value == "") {
    const alert = "Geben Sie Auskunft über das Laderaumvolumen"
    this.setState({alert: alert, showAlert: true})
    return 0
    }
    if (this.LeergewichtdesArtikelsInput.value == "") {
    const alert = "Geben Sie Auskunft über das Leergewicht"
    this.setState({alert: alert, showAlert: true})
    return 0
    }
    if (this.GesamtgewichtdesArtikelsInput.value == "") {
    const alert = "Geben Sie Auskunft über das zulässige Gesamtgewicht"
    this.setState({alert: alert, showAlert: true})
    return 0
    }
    if (this.NutzlastdesArtikelsInput.value == "") {
    const alert = "Geben Sie Auskunft über die Nutzlast"
    this.setState({alert: alert, showAlert: true})
    return 0
    }
    if (this.StzplaetzedesArtikelsInput.value == "") {
    const alert = "Geben Sie Auskunft über die Sitzplätze"
    this.setState({alert: alert, showAlert: true})
    return 0
    }
    if (this.LeistungdesArtikelsInput.value == "") {
    const alert = "Geben Sie Auskunft über die Leistung des Fahrzeugs"
    this.setState({alert: alert, showAlert: true})
    return 0
    }
    if (this.AnhaengelastUngebremstdesArtikelsInput.value == "") {
    const alert = "Geben Sie Auskunft über die Anhängelast ungebremst"
    this.setState({alert: alert, showAlert: true})
    return 0
    }
    if (this.AnhaengelastGebremstdesArtikelsInput.value == "") {
    const alert = "Geben Sie Auskunft über die Anhängelast gebremst"
    this.setState({alert: alert, showAlert: true})
    return 0
    }
    if (this.StützlastdesArtikelsInput.value == "") {
    const alert = "Geben Sie Auskunft über die Stützlast"
    this.setState({alert: alert, showAlert: true})
    return 0
    }
    if (this.FührerscheinklassedesArtikelsInput.value == "") {
    const alert = "Geben Sie Auskunft über die Führerscheinklasse"
    this.setState({alert: alert, showAlert: true})
    return 0
    }
    if (this.priceInput.value == "") {
    const alert = "Legen Sie einen Preis fest"
    this.setState({alert: alert, showAlert: true})
    return 0
    }
    if (this.descInput.value == "") {
    const alert = "Legen Sie einen Beschreibung fest"
    this.setState({alert: alert, showAlert: true})
    return 0
    }
    if (this.mietbedingungenInput.value == "") {
    const alert = "Legen Sie ihre Mietbedingungen fest"
    this.setState({alert: alert, showAlert: true})
    return 0
    }
    if (this.state.imageFiles == []) {
      const alert = "Laden Sie mindestens ein Bild hoch"
      this.setState({alert: alert, showAlert: true})
    }

        const db = firebase.database().ref('app').child('cards').child('umzugstransporter');
        const userId = this.props.user;
        const titel = this.titelInput.value;
        const hersteller = this.herstellerInput.value;
        const gewicht = this.GewichtdesArtikelsInput.value;
        const laenge = this.LaengedesArtikelsInput.value;
        const breite = this.BreitedesArtikelsInput.value;
        const hoehe = this.HoehedesArtikelsInput.value;
        const laengeDerLadeflaeche = this.LaengeDerLadeflaechedesArtikelsInput.value;
        const breiteDerLadeflaeche = this.BreiteDerLadeflaechedesArtikelsInput.value;
        const hoeheDerLadeflaeche = this.HoeheDerLadeflaechedesArtikelsInput.value;
        const laderaumvolumen = this.LaderaumvolumendesArtikelsInput.value;
        const leerGewicht = this.LeergewichtdesArtikelsInput.value;
        const gesamtGewicht = this.GesamtgewichtdesArtikelsInput.value;
        const sitzplaetze = this.StzplaetzedesArtikelsInput.value;
        const leistung = this.LeistungdesArtikelsInput.value;
        const anhaengerlastUngebremst = this.AnhaengelastUngebremstdesArtikelsInput.value;
        const anhaengerlastGebremst = this.AnhaengelastGebremstdesArtikelsInput.value;
        const stuetzlast = this.StützlastdesArtikelsInput.value;
        const fuehrerschein = this.FührerscheinklassedesArtikelsInput.value;
        const preis = this.priceInput.value;
        const desc = this.descInput.value;
        const Mietbedingungen = this.mietbedingungenInput.value;

        const timeInMs = Date.now();


        const array = []
        const imageFiles = this.state.imageFiles
        const keys = Object.keys(imageFiles)

        let keysPromises = keys.map(
          key =>
            new Promise((resolve, reject) => {
              const imageFile = imageFiles[key];
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
                         kategorie:"umzugstransporter",
                         email: this.props.email,
                         hersteller: hersteller,
                         cardHeading:titel ,
                         cardPreis: preis,
                         cardDesc: desc,
                         mietbedingungen: Mietbedingungen,
                         gewicht: gewicht,
                         laenge: laenge,
                         breite: breite,
                         hoehe: hoehe,
                         laengeDerLadeflaeche: laengeDerLadeflaeche,
                         breiteDerLadeflaeche: breiteDerLadeflaeche,
                         hoeheDerLadeflaeche: hoeheDerLadeflaeche,
                         laderaumvolumen: laderaumvolumen,
                         leerGewicht: leerGewicht,
                         gesamtGewicht: gesamtGewicht,
                         sitzplaetze: sitzplaetze,
                         leistung: leistung,
                         anhaengerlastUngebremst: anhaengerlastUngebremst,
                         anhaengerlastGebremst: anhaengerlastGebremst,
                         stuetzlast: stuetzlast,
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
          if(this.state.showAlert === true)
          {window.scrollTo(0, 0)}

          return(
              <div>

               {/*End Navigation*/}


                <div className=" full-detail mrg-bot-25 padd-bot-30 padd-top-25" >

                   {/* /. ROW  */}
                  <div id="page-inner">
                    <div className="row bott-wid">
                      <div className="col-md-12 col-sm-12">
                        <div className=" full-detail mrg-bot-25 padd-bot-30 padd-top-25">
            							<div className="listing-box-header">
            								<i className="ti-write theme-cl"></i>
            								<h3>Umzugstransporter Inserieren</h3>
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
            										<label>Bezeichnung</label>
            										<input type="text" className="form-control"  ref={(input) => { this.titelInput = input}} placeholder="Name des Artikels" />
            									</div>

            									<div className="col-sm-6">
            										<label>Hersteler</label>
            										<input type="text" className="form-control"  ref={(input) => { this.herstellerInput = input}} placeholder="..." />
            									</div>

                              <div className="col-sm-6">
                                <label>Gewicht</label>
                                <input type="text" className="form-control" ref={(input) => { this.GewichtdesArtikelsInput = input}} placeholder="in kg"/>
                              </div>

                              <div className="col-sm-6">
                                <label>Länge</label>
                                <input type="text" className="form-control" ref={(input) => { this.LaengedesArtikelsInput = input}} placeholder="in mm"/>
                              </div>

                              <div className="col-sm-6">
                                <label>Breite</label>
                                <input type="text" className="form-control" ref={(input) => { this.BreitedesArtikelsInput = input}} placeholder="in mm"/>
                              </div>

                              <div className="col-sm-6">
                                <label>Höhe</label>
                                <input type="text" className="form-control" ref={(input) => { this.HoehedesArtikelsInput = input}} placeholder="in mm"/>
                              </div>

                              <div className="col-sm-6">
                                <label>Länge der Ladefläche</label>
                                <input type="text" className="form-control" ref={(input) => { this.LaengeDerLadeflaechedesArtikelsInput = input}} placeholder="in mm"/>
                              </div>

                              <div className="col-sm-6">
                                <label>Breite der Ladefläche</label>
                                <input type="text" className="form-control" ref={(input) => { this.BreiteDerLadeflaechedesArtikelsInput = input}} placeholder="in mm"/>
                              </div>

                              <div className="col-sm-6">
                                <label>Höhe der Ladefläche</label>
                                <input type="text" className="form-control" ref={(input) => { this.HoeheDerLadeflaechedesArtikelsInput = input}} placeholder="in mm"/>
                              </div>

                              <div className="col-sm-6">
                                <label>Laderaumvolumen</label>
                                <input type="text" className="form-control" ref={(input) => { this.LaderaumvolumendesArtikelsInput = input}} placeholder="in m3"/>
                              </div>

                              <div className="col-sm-6">
                                <label>Leergewicht</label>
                                <input type="text" className="form-control" ref={(input) => { this.LeergewichtdesArtikelsInput = input}} placeholder="in kg"/>
                              </div>

                              <div className="col-sm-6">
                                <label>zulässiges Gesamtgewicht</label>
                                <input type="text" className="form-control" ref={(input) => { this.GesamtgewichtdesArtikelsInput = input}} placeholder="in kg"/>
                              </div>

                              <div className="col-sm-6">
                                <label>Nutzlast</label>
                                <input type="text" className="form-control" ref={(input) => { this.NutzlastdesArtikelsInput = input}} placeholder="in kg"/>
                              </div>

                              <div className="col-sm-6">
                                <label>Sitzplätze</label>
                                <input type="text" className="form-control" ref={(input) => { this.StzplaetzedesArtikelsInput = input}} placeholder="Bsp: 3"/>
                              </div>

                              <div className="col-sm-6">
                                <label>Leistung</label>
                                <input type="text" className="form-control" ref={(input) => { this.LeistungdesArtikelsInput = input}} placeholder="in KW/PS"/>
                              </div>

                              <div className="col-sm-6">
                                <label>Anhängelast ungebremst</label>
                                <input type="text" className="form-control" ref={(input) => { this.AnhaengelastUngebremstdesArtikelsInput = input}} placeholder="in kg"/>
                              </div>

                              <div className="col-sm-6">
                                <label>Anhängelast gebremst</label>
                                <input type="text" className="form-control" ref={(input) => { this.AnhaengelastGebremstdesArtikelsInput = input}} placeholder="in kg"/>
                              </div>

                              <div className="col-sm-6">
                                <label>Stützlast</label>
                                <input type="text" className="form-control" ref={(input) => { this.StützlastdesArtikelsInput = input}} placeholder="in kg"/>
                              </div>

                              <div className="col-sm-6">
                                <label>Führerscheinklasse</label>
                                <input type="text" className="form-control" ref={(input) => { this.FührerscheinklassedesArtikelsInput = input}} placeholder="Bsp: B/BE"/>
                              </div>


                              <div className="col-sm-6">
                                <label>Preis</label>
                                <input type="text" className="form-control" ref={(input) => { this.priceInput = input}} placeholder="€ Pro Tag"/>
                              </div>

            									<div className="col-sm-12">
            										<label>Artikelbeschreibung</label>
            										<textarea className="h-100 form-control" ref={(input) => { this.descInput = input}} placeholder="Beschreibe deinen Artikel"></textarea>
            									</div>

                              <div className="col-sm-12">
            										<label>Mietbedingungen</label>
            										<textarea className="h-100 form-control" ref={(input) => { this.mietbedingungenInput = input}} placeholder="Lege die Mietbedingungen fest"></textarea>
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
                    </div>
                  </div>
                </div>
              </div>
            )
        }
    }

export default Umzugstransporter;
