import React, {Component} from 'react';
import firebase from 'firebase';
import {Redirect, NavLink} from 'react-router-dom';
import Dropzone from 'react-dropzone';



class BausteinBandseage extends Component{
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
    if (this.state.imageFiles == []) {
      const alert = "Laden Sie mindestens ein Bild hoch"
      this.setState({alert: alert, showAlert: true})
    }

        const db = firebase.database().ref('app').child('cards').child('bausteinBandseage');
        const userId = this.props.user;
        const titel = this.titelInput.value;
        const hersteller = this.herstellerInput.value;
        const schnittlaenge = this.schnittlaengeInput.value;
        const schnitttiefe = this.schnitttiefeInput.value;
        const schnittbreite = this.schnittbreiteInput.value;
        const gewicht = this.GewichtdesArtikelsInput.value;
        const preis = this.priceInput.value;
        const desc = this.descInput.value;

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
                         kategorie:"bausteinBandseage",
                         email: this.props.email,
                         hersteller: hersteller,
                         schnittlaenge: schnittlaenge,
                         schnitttiefe: schnitttiefe,
                         schnittbreite: schnittbreite,
                         cardHeading:titel ,
                         cardPreis: preis,
                         cardDesc: desc,
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
            								<h3>Baustein-Bandsäge Inserieren</h3>
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
            										<input type="text" className="form-control"  ref={(input) => { this.herstellerInput = input}} placeholder="Bsp: Zagro" />
            									</div>


                              <div className="col-sm-6">
            										<label>Schnittlänge</label>
            										<input type="number" ref={(input) => { this.schnittlaengeInput  = input}} className="form-control" placeholder="in mm"/>
            									</div>
                              <div className="col-sm-6">
                                <label>Schnittbreite</label>
                                <input type="number" ref={(input) => { this.schnittbreiteInput  = input}} className="form-control" placeholder="in mm"/>
                              </div>
                              <div className="col-sm-6">
            										<label>Schnitttiefe</label>
            										<input type="number" ref={(input) => { this.schnitttiefeInput  = input}} className="form-control" placeholder="in mm"/>
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

export default BausteinBandseage;
