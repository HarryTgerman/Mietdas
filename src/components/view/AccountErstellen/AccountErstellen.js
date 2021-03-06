import React, {Component} from 'react';
import firebase from 'firebase';
import {NavLink, Redirect} from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchNavbar } from '../../../actions/navbarAction'


class AccountErstellen extends Component{
  constructor(props){
    super(props)
    this.Ref = firebase.database().ref('app').child('users');
    this.state = {
      avatarImg : 'https://firebasestorage.googleapis.com/v0/b/mietdas-93abf/o/images%2Fpimgaes%2Favatar.jpg?alt=media&token=0a6f964d-ce1f-488b-99de-f65fc9b047d5'
    }
}
componentWillMount(){

  this.props.fetchNavbar('home-2')

  firebase.auth().onAuthStateChanged((user)=>{
    const userProfile = firebase.auth().currentUser;

    if(user){
      this.setState(
        {
        authenticated: true,
        photoUrl: userProfile.photoURL,
        name : userProfile.displayName,
        email : userProfile.email,
        uid : userProfile.uid,
        isError: true,
        vornameError: "",
        emailError: "",
        telefonError: "",
        geburtstagError: "",
        strasseError: "",
        stadtError: "",
        plzError: "",
        bundeslandError: "",
        landError: ""
      },()=>{


        if (this.state.photoUrl == null){this.setState({showPhotoUrl:false})}else {this.setState({showPhotoUrl:true})}
            }
    )

    } else {
      this.setState({
        authenticated: false,
      })
      return <Redirect to="/"/>
    }
  })

}


  checkName =(e) =>{
    if (this.nameInput.value.length < 4 ){
      const error = "Bitte gib deinen Namen ein"
      this.setState({vornameError: error, isError: true, name: e.target.value})
    }else{
      this.setState({vornameError: '', isError: false, name: e.target.value})
    }
  }

 checkNummer = () =>{
   if (this.nummerInput.value.length < 11){
     const error = "Deine Telefonnummer muss mindestens 11 Ziffern haben"
     this.setState({telefonError: error, isError: true})
   }else{
     this.setState({telefonError: '', isError: false})
   }
 }

  checkGeburtstag = () =>{
    if (this.dateInput.value.length < 10){
      const error = "Bitte gebe dein Gebrutsdatum im diesem Format 'TT.MM.JJJJ' ein";
      this.setState({geburtstagError: error, isError: true})
   }else{
      this.setState({geburtstagError: '', isError: false})
    }
  }

  checkStrasse = () =>{
    if (this.straßeInput.value.length < 3){
      const error = "Bitte gebe deine Strasse ein";
      this.setState({strasseError: error, isError: true})
   }else{
      this.setState({strasseError: '', isError: false})
    }
  }

  checkStadt = () =>{
    if (this.stadtInput.value.length < 3){
      const error = "Bitte gebe deine Stadt ein";
      this.setState({stadtError: error, isError: true})
   }else{
      this.setState({stadtError: '', isError: false})
    }
  }

  checkPlz = () =>{
    if (this.plzInput.value.length < 5){
      const error = "Bitte gebe deine PLZ ein. Eine Postleitzahl hat mindestens 5 Ziffern.";
      this.setState({plzError: error, isError: true})
   }else{
      this.setState({plzError: '', isError: false})
    }
  }

  checkBundesland = () =>{
    if (this.bundeslandInput.value ==" "){
      const error = "Bitte wähle ein Bundesland";
      this.setState({bundeslandError: error, isError: true})
   }else{
      this.setState({bundeslandError: '', isError: false})
    }
  }

  checkLand = () =>{
    if (this.landInput.value.length < 2){
      const error = "Bitte gebe dein Land ein.";
      this.setState({landError: error, isError: true})
   }else{
      this.setState({landError: '', isError: false})
    }
  }






createUserProfil(event){
    event.preventDefault()
    const name = this.nameInput.value;
    const email = this.emailInput.value;
    const date = this.dateInput.value;
    const straße = this.straßeInput.value +" "+ this.hausNummerInput.value;
    const stadt = this.stadtInput.value;
    const plz = this.plzInput.value
    const rechnungadresse = this.rechnungsadresseInput.value;
    const adresse = straße + " " + plz  + " " + stadt;
    const ort = this.plzInput.value +" "+this.stadtInput.value;
    const telefon = this.nummerInput.value;
    const userImage =  this.profilePic.files[0];
    const userId = this.state.uid;
    const bundesLand = this.bundeslandInput.value;
    const user = firebase.auth().currentUser;

    if(this.state.isError){
      const alert = "Bitte fülle alle Felder richtig aus."
      this.setState({alert: alert, showAlert: true})
    }else{

      if(userImage == undefined){
        let Url = 'https://firebasestorage.googleapis.com/v0/b/mietdas-93abf/o/images%2Fpimgaes%2Favatar.jpg?alt=media&token=0a6f964d-ce1f-488b-99de-f65fc9b047d5';
        user.updateProfile({
          displayName: name,
          photoURL: Url,
        }).catch(function(error) {
        console.error(error);
        });
        this.Ref.child(userId).update({
                          bankAccount: false,
                          name: name,
                          email: email,
                          url : Url,
                          geburtsDatum: date,
                          rechnungsadresse:rechnungadresse,
                          adresse: adresse,
                          straße: straße,
                          stadt: stadt,
                          plz:plz,
                          bundesLand: bundesLand,
                          ort: ort,
                          telefon: telefon,
                          uid: userId,
                        }).then(() => {
                              this.setState({
                                redirect: true
                              })
                            })
      }else{

      firebase.storage().ref('images/pimgaes/').child(userId).child('pimage').put(userImage)
      .then(()=>{
      firebase.storage().ref('images/pimgaes/').child(userId).child('pimage')
      .getDownloadURL().then((url) => {
        const Url = url
        user.updateProfile({
          displayName: name,
          photoURL: Url,
        }).catch(function(error) {
        console.error(error);
        });
        this.Ref.child(userId).update({
                          bankAccount: false,
                          name: name,
                          email: email,
                          url : Url,
                          rechnungsadresse:rechnungadresse,
                          geburtsDatum: date,
                          adresse: adresse,
                          straße: straße,
                          stadt: stadt,
                          plz:plz,
                          bundesLand: bundesLand,
                          ort: ort,
                          telefon: telefon,
                          uid: userId,
                        })
                      })
                    })
        .then(() => {
          this.setState({
            redirect: true
            })
          })
        }
      }
}

handleChange(event){
  event.preventDefault()
  if (event.target.files && event.target.files[0]) {
            let reader = new FileReader();
            reader.onload = (e) => {
                this.setState({avatarImg: e.target.result});
            };
            reader.readAsDataURL(event.target.files[0]);
        }
}

        render(){

          if(this.state.redirect === true){
                return  <Redirect to="/benutzeraccount"/>
              };
          let profiel = this.profilePic
          if(this.state.showAlert === true)
          {window.scrollTo(0, 0)}
          return(
              <div >

                 {/*End Navigation*/}
              {/* ================ Start Page Title ======================= */}
                  <section className="title-transparent page-title" style={{background:"url(http://via.placeholder.com/1920x850)"}}>
                    <div className="container">
                    </div>
                  </section>
                  <div className="clearfix"></div>
                  {/* ================ End Page Title ======================= */}

                  {/* ================ Edit Section Start ======================= */}
                  <section className="padd-0">
                    <div className="container">
                      <div className="col-md-10 translateY-60 col-sm-12 col-md-offset-1">
                        {/* General Information */}
                        <div className="add-listing-box edit-info mrg-bot-25 padd-bot-30 padd-top-25">
                          <div className="listing-box-header">
                          {
                            this.state.showAlert ?
                             (<div ref="alert" className="alert alert-danger" role="alert">
                                <strong>Achtung</strong> {this.state.alert}
                              </div>)
                            :(null)
                          }
                            <div className="avater-box">
                            <img src={this.state.avatarImg} style={{height:"130px",width:"130px"}} className="img-responsive img-circle edit-avater" alt="" />
                            <div className="upload-btn-wrapper">
                              <button className="btn theme-btn">Profilbild hochladen + </button>
                              <input type="file" name="myfile"   ref={(input) => { this.profilePic = input; }} onChange={this.handleChange.bind(this)}/>
                          </div>
                          <p className="errorMessage">{this.state.bildError}</p>
                            </div>
                            <h3>{this.state.name}</h3>
                          </div>
                          <form>
                            <div className="row mrg-r-10 mrg-l-10">
                              <div className="col-sm-6">
                                <label>Name/Firma</label>
                                <input type="text" ref={(input) => { this.nameInput = input; }} onChange={this.checkName.bind(this)} className="form-control" value={this.state.name} />
                                <p className="errorMessage">{this.state.vornameError}</p>
                              </div>
                              <div className="col-sm-6">
                                <label>Email</label>
                                <input type="text" ref={(input) => { this.emailInput = input; }} className="form-control" value={this.state.email} disabled/>
                                <p className="errorMessage">{this.state.emailError}</p>
                              </div>
                              <div className="col-sm-6">
                                <label>Telefonnummer</label>
                                <input type="number" className="form-control" ref={(input) => { this.nummerInput = input; }} onChange={this.checkNummer.bind(this)} placeholder="Telefon Nummer"/>
                                <p className="errorMessage">{this.state.telefonError}</p>
                              </div>
                              <div className="col-sm-6">
                                <label>Geburtstag</label>
                                <input type="text" ref={(input) => { this.dateInput = input; }} onChange={this.checkGeburtstag.bind(this)} placeholder="TT.MM.JJJJ" className="form-control"/>
                                <p className="errorMessage">{this.state.geburtstagError}</p>
                              </div>
                            </div>
                          </form>
                        </div>
                        {/* End General Information */}

                        {/* Edit Location */}
                        <div className="add-listing-box add-location mrg-bot-25 padd-bot-30 padd-top-25">
                          <div className="listing-box-header">
                            <i className="ti-location-pin theme-cl"></i>
                            <h3>Standort Informationen</h3>
                            <p>Firmensitz oder Standort der Maschienen</p>
                          </div>
                          <form>
                            <div className="row mrg-r-10 mrg-l-10">
                              <div className="col-sm-6">
                                <label>Straße</label>
                                <input type="text" className="form-control" ref={(input) => { this.straßeInput = input; }} onChange={this.checkStrasse.bind(this)} placeholder="Straße Nummer"/>
                                <p className="errorMessage">{this.state.strasseError}</p>
                              </div>
                              <div className="col-sm-6">
                                <label>Hausnummer</label>
                                <input type="number" className="form-control" ref={(input) => { this.hausNummerInput = input; }} placeholder="Hausnummer"/>
                                <p className="errorMessage">{this.state.hausNummern}</p>
                              </div>

                              <div className="col-sm-6">
                                <label>Stadt</label>
                                <input type="text" className="form-control" ref={(input) => { this.stadtInput = input; }} onChange={this.checkStadt.bind(this)} placeholder="Stadt"/>
                                <p className="errorMessage">{this.state.stadtError}</p>
                              </div>
                              <div className="col-sm-6">
                                <label>PLZ</label>
                                <input type="text" className="form-control" ref={(input) => { this.plzInput = input; }} onChange={this.checkPlz.bind(this)} placeholder="Postleitzahl"/>
                                <p className="errorMessage">{this.state.plzError}</p>
                              </div>
                              <div className="col-sm-6">
                                <label>Bundesland</label>
                                <select  className="form-control" ref={select => this.bundeslandInput = select}  name="inklAuffahrrampenInput">>
                                  <option value=" ">...</option>
                                  <option value="Baden-Württemberg">Baden-Württemberg</option>
                                  <option value="Bayern">Bayern</option>
                                  <option value="Berlin">Berlin</option>
                                  <option value="Brandenburg">Brandenburg</option>
                                  <option value="Bremen">Bremen</option>
                                  <option value="Hamburg">Hamburg</option>
                                  <option value="Hessen">Hessen</option>
                                  <option value="Mecklenburg-Vorpommern">Mecklenburg-Vorpommern</option>
                                  <option value="Niedersachsen">Niedersachsen</option>
                                  <option value="Nordrhein-Westfalen">Nordrhein-Westfalen</option>
                                  <option value="Rheinland-Pfalz">Rheinland-Pfalz</option>
                                  <option value="Saarland">Saarland</option>
                                  <option value="Sachsen">Sachsen</option>
                                  <option value="Sachsen-Anhalt">Sachsen-Anhalt</option>
                                  <option value="Schleswig-Holstein">Schleswig-Holstein</option>
                                  <option value="Thüringen">Thüringen</option>
                                </select>
                                  <p className="errorMessage">{this.state.bundeslandError}</p>
                              </div>
                              <div className="col-sm-6">
                                <label>Rechnungsadresse</label>
                                <input type="text" className="form-control" ref={(input) => { this.rechnungsadresseInput = input; }}  placeholder="Vollständige Adresse"/>
                              </div>
                            </div>
                          </form>
                        </div>
                        {/* End Edit Location */}
                        <div className="text-center">
                          <button style={{height: "55px"}} className="btn theme-btn" onClick={this.createUserProfil.bind(this)}type="button">Profile Erstellen</button>
                        </div>
                      </div>
                    </div>
                  </section>
                  {/* ================ End Edit Section Start ======================= */}
              </div>
            )
        }
    }

export default connect(null, { fetchNavbar })(AccountErstellen);
