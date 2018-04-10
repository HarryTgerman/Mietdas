import React, {Component} from 'react';
import firebase from 'firebase';
import {Redirect, NavLink} from 'react-router-dom';
import Dropzone from 'react-dropzone';



class Verdichtungstechnik extends Component{
  constructor(props){
    super(props)
    this.state = {
       authenticated: false,
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
        //Fomconstroll
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
       if (this.bedienungInput.value == "") {
         const alert = "Geben Sie Auskunft über die Bedienung"
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
       if (this.pdfUpload.files[0] == undefined) {
       const alert = "Laden Sie ein Datenblatt hoch"
       this.setState({alert: alert, showAlert: true})
       return 0
       }
       if (this.state.imageFiles == []) {
         const alert = "Laden Sie mindestens ein Bild hoch"
         this.setState({alert: alert, showAlert: true})
       }
       //end Formcontrol

       const db = firebase.database().ref('app').child('cards').child('verdichtungstechnik');
       const userId = this.props.user;

       const titel = this.titelInput.value;
       const hersteller = this.herstellerInput.value;
       const bedienung = this.bedienungInput.value;       const gewicht = this.GewichtdesArtikelsInput.value;
       const preis = this.priceInput.value;
       const desc = this.descInput.value;
       const Mietbedingungen = this.mietbedingungenInput.value;

       const Pdf = this.pdfUpload.files[0]
       firebase
      .storage()
      .ref("pdf")
      .child(userId)
      .child(titel)
      .child(Pdf.name)
      .put(Pdf)
      .then(() => {
        firebase
          .storage()
          .ref("pdf")
          .child(userId)
          .child(titel)
          .child(Pdf.name)
          .getDownloadURL()
          .then(url => {
            console.log(url);
            const pdfUrl = url;
            this.setState({ pdf: pdfUrl });
          })
        })
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
         const pdfUrl = this.state.pdf;
         const images = this.state.Arr;
         const imageUrl = this.state.Arr[0]
         db.push({
                  email: this.props.email,
                   hersteller: hersteller,
                   bedienung: bedienung,
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
            								<h3>Verdichtungs Maschiene Inserieren</h3>
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
            										<label>Bedienung</label>
            										<input type="text" className="form-control" ref={(input) => { this.bedienungInput = input}} placeholder="Bsp: mit Fahrer"/>
            									</div>




            									<div className="col-sm-6">
            										<label>Gewicht</label>
            										<input type="text" className="form-control" ref={(input) => { this.GewichtdesArtikelsInput = input}} placeholder="in Tonnen"/>
            									</div>

                              <div className="col-sm-12">
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
                                <div style={{padding:"10px"}} className="col-sm-12 text-center">
                                  <div style={{padding:"15px", border: "solid 1px #dde6ef"}}>
                                    <input style={{display:"none"}} accept='.pdf' ref={(input) => this.pdfUpload = input} type="file" name="myfile"/>
                                    <button onClick={()=>this.pdfUpload.click( )} type="button" className="btn theme-btn">Datenblatt hochladen</button>
                                  </div>
                                </div>
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

export default Verdichtungstechnik;
