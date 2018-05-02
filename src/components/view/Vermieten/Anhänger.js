import React, {Component} from 'react';
import firebase from 'firebase';
import {Redirect, NavLink} from 'react-router-dom';
import Dropzone from 'react-dropzone';



class Anhänger extends Component{
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
    if (this.AuflaufbremsedesArtikelsInput.value == "") {
    const alert = "Geben Sie Auskunft über die Auflaufbremse"
    this.setState({alert: alert, showAlert: true})
    return 0
    }
    if (this.GesamthoeheLadeboarddesArtikelsInput.value == "") {
    const alert = "Geben Sie Auskunft über die Gesamthöhe (Ladeboardwand)"
    this.setState({alert: alert, showAlert: true})
    return 0
    }
    if (this.GesamthoeheSpriegeldesArtikelsInput.value == "") {
    const alert = "Geben Sie Auskunft über die Gesamthöhe (inkl. Spriegel)"
    this.setState({alert: alert, showAlert: true})
    return 0
    }
    if (this.GesamtbreitedesArtikelsInput.value == "") {
    const alert = "Geben Sie Auskunft über die Gesamtbreite"
    this.setState({alert: alert, showAlert: true})
    return 0
    }
    if (this.GesamtlaengedesArtikelsInput.value == "") {
    const alert = "Geben Sie Auskunft über die Gesamtlänge"
    this.setState({alert: alert, showAlert: true})
    return 0
    }
    if (this.InnenhoehedesArtikelsInput.value == "") {
    const alert = "Geben Sie Auskunft über die Innenhöhe (Ladeboardwandhöhe)"
    this.setState({alert: alert, showAlert: true})
    return 0
    }
    if (this.InnenladehoehedesArtikelsInput.value == "") {
    const alert = "Geben Sie Auskunft über die Innenladehöhe"
    this.setState({alert: alert, showAlert: true})
    return 0
    }
    if (this.InnenbreitedesArtikelsInput.value == "") {
    const alert = "Geben Sie Auskunft über die Innenbreite"
    this.setState({alert: alert, showAlert: true})
    return 0
    }
    if (this.InnenlaengedesArtikelsInput.value == "") {
    const alert = "Geben Sie Auskunft über die Innenlänge"
    this.setState({alert: alert, showAlert: true})
    return 0
    }
    if (this.LadehoehedesArtikelsInput.value == "") {
    const alert = "Geben Sie Auskunft über die Ladehöhe"
    this.setState({alert: alert, showAlert: true})
    return 0
    }
    if (this.HundertkmhdesArtikelsInput.value == "") {
    const alert = "Geben Sie Auskunft über die 100 km/h Zulassung"
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
    if (this.state.imageFiles == []) {
      const alert = "Laden Sie mindestens ein Bild hoch"
      this.setState({alert: alert, showAlert: true})
    }

        const db = firebase.database().ref('app').child('cards').child('anhänger');
        const userId = this.props.user;
        const titel = this.titelInput.value;
        const hersteller = this.herstellerInput.value;
        const gesamtgewicht = this.GesamtgewichtdesArtikelsInput.value;
        const nutzlast = this.NutzlastdesArtikelsInput.value;
        const auflaufbremse = this.AuflaufbremsedesArtikelsInput.value;
        const gesamthoeheLadeboard = this.GesamthoeheLadeboarddesArtikelsInput.value;
        const gesamthoeheSpriegel = this.GesamthoeheSpriegeldesArtikelsInput.value;
        const gesamtbreite = this.GesamtbreitedesArtikelsInput.value;
        const gesamtlaenge = this.GesamtlaengedesArtikelsInput.value;
        const innenhoehe = this.InnenhoehedesArtikelsInput.value;
        const innenladehoehe = this.InnenladehoehedesArtikelsInput.value;
        const innenbreite = this.InnenbreitedesArtikelsInput.value;
        const innenlaenge = this.InnenlaengedesArtikelsInput.value;
        const ladehoehe = this.LadehoehedesArtikelsInput.value;
        const hundertkmh = this.HundertkmhdesArtikelsInput.value;
        const preis = this.priceInput.value;
        const desc = this.descInput.value;

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
                         kategorie:"anhänger",
                         email: this.props.email,
                         hersteller: hersteller,
                         cardHeading:titel ,
                         cardPreis: preis,
                         cardDesc: desc,
                         gesamtgewicht: gesamtgewicht,
                         nutzlast: nutzlast,
                         auflaufbremse: auflaufbremse,
                         gesamthoeheLadeboard: gesamthoeheLadeboard,
                         gesamthoeheSpriegel: gesamthoeheSpriegel,
                         gesamtbreite: gesamtbreite,
                         gesamtlaenge: gesamtlaenge,
                         innenhoehe: innenhoehe,
                         innenladehoehe: innenladehoehe,
                         innenbreite: innenbreite,
                         innenlaenge: innenlaenge,
                         ladehoehe: ladehoehe,
                         hundertkmh: hundertkmh,
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
            								<h3>Anhänger Inserieren</h3>
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
            										<label>zulässiges Gesamtgewicht</label>
            										<input type="number" className="form-control" ref={(input) => { this.GesamtgewichtdesArtikelsInput = input}} placeholder="in kg"/>
            									</div>

                              <div className="col-sm-6">
            										<label>Nutzlast</label>
            										<input type="number" className="form-control" ref={(input) => { this.NutzlastdesArtikelsInput = input}} placeholder="in kg"/>
            									</div>

                              <div className="col-sm-6">
            										<label>Auflaufbremse</label>
            										<input type="text" className="form-control" ref={(input) => { this.AuflaufbremsedesArtikelsInput = input}} placeholder="Ja/Nein"/>
            									</div>

                              <div className="col-sm-6">
            										<label> Gesamthöhe (Ladeboardwand)</label>
            										<input type="number" className="form-control" ref={(input) => { this.GesamthoeheLadeboarddesArtikelsInput = input}} placeholder="in mm"/>
            									</div>

                              <div className="col-sm-6">
            										<label>Gesamthöhe (inkl. Spriegel)</label>
            										<input type="number" className="form-control" ref={(input) => { this.GesamthoeheSpriegeldesArtikelsInput = input}} placeholder="in mm"/>
            									</div>

                              <div className="col-sm-6">
            										<label>Gesamtbreite</label>
            										<input type="number" className="form-control" ref={(input) => { this.GesamtbreitedesArtikelsInput = input}} placeholder="in mm"/>
            									</div>

                              <div className="col-sm-6">
            										<label>Gesamtlänge</label>
            										<input type="number" className="form-control" ref={(input) => { this.GesamtlaengedesArtikelsInput = input}} placeholder="in mm"/>
            									</div>

                              <div className="col-sm-6">
            										<label>Innenhöhe (Ladeboardwandhöhe)</label>
            										<input type="number" className="form-control" ref={(input) => { this.InnenhoehedesArtikelsInput = input}} placeholder="in mm"/>
            									</div>

                              <div className="col-sm-6">
            										<label>Innenladehöhe</label>
            										<input type="number" className="form-control" ref={(input) => { this.InnenladehoehedesArtikelsInput = input}} placeholder="in mm"/>
            									</div>

                              <div className="col-sm-6">
            										<label>Innenbreite</label>
            										<input type="number" className="form-control" ref={(input) => { this.InnenbreitedesArtikelsInput = input}} placeholder="in mm"/>
            									</div>

                              <div className="col-sm-6">
            										<label>Innenlänge</label>
            										<input type="number" className="form-control" ref={(input) => { this.InnenlaengedesArtikelsInput = input}} placeholder="in mm"/>
            									</div>

                              <div className="col-sm-6">
            										<label>Ladehöhe</label>
            										<input type="number" className="form-control" ref={(input) => { this.LadehoehedesArtikelsInput = input}} placeholder="in mm"/>
            									</div>

                              <div className="col-sm-6">
            										<label> 100 km/h Zulassung</label>
            										<input type="text" className="form-control" ref={(input) => { this.HundertkmhdesArtikelsInput = input}} placeholder="Ja/Nein"/>
            									</div>

                              <div className="col-sm-6">
                                <label>Preis</label>
                                <input type="number" className="form-control" ref={(input) => { this.priceInput = input}} placeholder="€ Pro Tag"/>
                              </div>

            									<div className="col-sm-12">
            										<label>Artikelbeschreibung</label>
            										<textarea className="h-100 form-control" ref={(input) => { this.descInput = input}} placeholder="Beschreibe deinen Artikel"></textarea>
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

export default Anhänger;
