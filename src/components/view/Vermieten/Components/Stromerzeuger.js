import React, {Component} from 'react';
import firebase from 'firebase';
import {Redirect, NavLink} from 'react-router-dom';
import Dropzone from 'react-dropzone';



class Stromerzeuger extends Component{
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
    if (this.transporthoeheVonInput.value == "") {
    const alert = "Geben Sie Auskunft über die Transporthöhe"
    this.setState({alert: alert, showAlert: true})
    return 0
    }

    if (this.transportbreiteVonInput.value == "") {
    const alert = "Geben Sie Auskunft über die Transportbreite"
    this.setState({alert: alert, showAlert: true})
    return 0
    }
    if (this.schnittlaengeInput.value == "") {
    const alert = "Geben Sie Auskunft über die Schnittlänge"
    this.setState({alert: alert, showAlert: true})
    return 0
    }
    if (this.schnitttiefe.value == "") {
    const alert = "Geben Sie Auskunft über die Schnitttiefe"
    this.setState({alert: alert, showAlert: true})
    return 0
    }
    if (this.schnittbreite.value == "") {
    const alert = "Geben Sie Auskunft über die Schnittbreite"
    this.setState({alert: alert, showAlert: true})
    return 0
    }

    if (this.GewichtdesArtikelsInput.value == "") {
    const alert = "Geben Sie Auskunft über das Gewicht"
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
    if (this.abmessungenInput.value == "") {
    const alert = "Geben Sie Auskunft über die Abmessungen"
    this.setState({alert: alert, showAlert: true})
    return 0
    }
    if (this.leistungkvaInput.value == "") {
    const alert = "Geben Sie Auskunft über Leistung (kVA)"
    this.setState({alert: alert, showAlert: true})
    return 0
    }
    if (this.leistungkwaInput.value == "") {
    const alert = "Geben Sie Auskunft über Leistung kW/A"
    this.setState({alert: alert, showAlert: true})
    return 0
    }
    if (this.tankinhaltInput.value == "") {
    const alert = "Geben Sie Auskunft über den Tankinhalt"
    this.setState({alert: alert, showAlert: true})
    return 0
    }
    if (this.verbrauchInput.value == "") {
    const alert = "Geben Sie Auskunft über den Verbrauch unter Vollast"
    this.setState({alert: alert, showAlert: true})
    return 0
    }
    if (this.kraftstoffInput.value == "") {
    const alert = "Geben Sie Auskunft über den Kraftstoff"
    this.setState({alert: alert, showAlert: true})
    return 0
    }
    if (this.state.imageFiles == []) {
      const alert = "Laden Sie mindestens ein Bild hoch"
      this.setState({alert: alert, showAlert: true})
    }

        const db = firebase.database().ref('app').child('cards').child('stromerzeuger');
        const userId = this.props.user;
        const titel = this.titelInput.value;
        const hersteller = this.herstellerInput.value;

        const bedienung = this.bedienungInput.value;

        const transportbreite = this.transportbreiteVonInput.value;
        const transporthoehe = this.transporthoeheVonInput.value;
        const abmessungen = this.abmessungenInput.value;
        const leistungkva = this.leistungkvaInput.value;
        const leistungkwa = this.leistungkwaInput.value;
        const tankinhalt = this.tankinhalt.value;
        const verbrauch = this.verbrauchInput.value;
        const kraftstoff = this.kraftstoffInput.value;

        const gewicht = this.GewichtdesArtikelsInput.value;
        const preis = this.priceInput.value;
        const desc = this.descInput.value;
        const Mietbedingungen = this.mietbedingungenInput.value;

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
                         kategorie:"stromerzeuger",
                         email: this.props.email,
                         hersteller: hersteller,

                         bedienung: bedienung,

                         transportbreite: transportbreite,
                         transporthoehe: transporthoehe,
                         abmessungen : abmessungen,
                         leistungkva : leistungkva,
                         leistungkwa : leistungkwa,
                         tankinhalt : tankinhalt,
                         verbrauch : verbrauch,
                         kraftstoff : kraftstoff,

                         cardHeading:titel ,
                         cardPreis: preis,
                         cardDesc: desc,
                         mietbedingungen: Mietbedingungen,
                         gewicht: gewicht,
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
                                <h3>Stromzeuger Inserieren</h3>
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
                                    <input type="text" className="form-control"  ref={(input) => { this.herstellerInput = input}} placeholder="Bsp: Honda" />
                                  </div>

                                  <div className="col-sm-6">

                                    <label>Bedienung</label>
                                    <input type="text" className="form-control" ref={(input) => { this.bedienungInput = input}} placeholder="Bsp: mit Fahrer"/>
                                  </div>


                                    <label>Transportbreite</label>
                                    <input type="number" ref={(input) => { this.transportbreiteVonInput = input}} className="form-control" placeholder="in mm"/>
                                  </div>
                                  <div className="col-sm-6">
                                    <label>Transporthöhe</label>
                                    <input type="number" ref={(input) => { this.transporthoeheVonInput  = input}} className="form-control" placeholder="in mm"/>
                                  </div>
                                  <div className="col-sm-6">
                                    <label>Abmessungen</label>
                                    <input type="text" ref={(input) => { this.abmessungenInput  = input}} className="form-control" placeholder="Bsp: 502 x 167 x 213 cm"/>
                                  </div>
                                  <div className="col-sm-6">
                                    <label>Leistung (kVA)</label>
                                    <input type="number" ref={(input) => { this.leistungkvaInput  = input}} className="form-control" placeholder="kVA"/>
                                  </div>
                                  <div className="col-sm-6">
                                    <label>Leistung (kW/A)</label>
                                    <input type="number" ref={(input) => { this.leistungkwaInput  = input}} className="form-control" placeholder="kW/A"/>
                                  </div>
                                  <div className="col-sm-6">
                                    <label>Tankinhalt</label>
                                    <input type="number" className="form-control" ref={(input) => { this.tankinhaltInput = input}} placeholder="in Liter"/>
                                  </div>
                                  <div className="col-sm-6">
                                    <label>Verbrauch Volllast</label>
                                    <input type="number" className="form-control" ref={(input) => { this.verbrauchInput = input}} placeholder="L/h"/>
                                  </div>
                                  <div className="col-sm-6">
                                    <label>Kraftstoff</label>
                                    <input type="text" className="form-control" ref={(input) => { this.kraftstoffInput = input}} placeholder="Bsp: Diesel"/>
                                  </div>

                                  <div className="col-sm-6">
                                    <label>Gewicht</label>
                                    <input type="number" className="form-control" ref={(input) => { this.GewichtdesArtikelsInput = input}} placeholder="in kg"/>
                                  </div>

                                  <div className="col-sm-6">
                                    <label>Preis</label>
                                    <input type="number" className="form-control" ref={(input) => { this.priceInput = input}} placeholder="€ Pro Tag"/>
                                  </div>

                                  <div className="col-sm-12">
                                    <label>Artikelbeschreibung</label>
                                    <textarea className="h-100 form-control" ref={(input) => { this.descInput = input}} placeholder="Beschreibe deinen Artikel"></textarea>
                                  </div>

                                  <div className="col-sm-12">
                                    <label>Mietbedingungen</label>
                                    <textarea className="h-100 form-control" ref={(input) => { this.mietbedingungenInput = input}} placeholder="Lege die Mietbedingungen fest"></textarea>
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

export default Stromerzeuger;
