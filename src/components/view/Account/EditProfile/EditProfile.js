import React, {Component} from 'react';
import firebase from 'firebase'
import {Redirect} from 'react-router-dom'
import scrollToComponent from 'react-scroll-to-component';


class EditProfile extends Component{

  constructor(props){
    super(props)
    this.state={
      loading: true,
      redirect: false

    }
}

componentDidMount(){
  firebase.database().ref().child("app/users").child(this.props.uid)
  .once('value', snap=>{
    if(snap.val() === null){
      this.setState({
        redirect: true
      })
      return 0;
    }

    let url = snap.val().url
    let email = snap.val().email
    let name = snap.val().name
    let telefon = snap.val().telefon
    let geburtsdatum = snap.val().geburtsDatum
    let adresse = snap.val().adresse
    let straße = snap.val().straße
    let plz = snap.val().plz
    let stadt = snap.val().stadt
    let bundesLand = snap.val().bundesLand



    this.setState({
      bundesLand:bundesLand,
      adresse: adresse,
      straße: straße,
      plz: plz,
      stadt: stadt,
      geburtsDatum:geburtsdatum,
      telefon: telefon,
      avatarImg: url,
      email:email,
      name:name,
      loading: false,
    })
  })
}

handleChangeName(event) {
   this.setState({name: event.target.value});
 }
 handleChangeEmail(event) {
    this.setState({email: event.target.value});
  }
  handleChangeTelefon(event) {
     this.setState({telefon: event.target.value});
   }
   handleChangeGeburtsDatum(event) {
      this.setState({geburtsDatum: event.target.value});
    }
    checkStrasse (e) {
      if (this.straßeInput.value.length < 3){
        const error = "Bitte geben Sie Ihre Strasse ein";
        this.setState({strasseError: error, isError: true,straße: e.target.value})
     }else{
        this.setState({strasseError: '', isError: false, straße: e.target.value})
      }
    }

    checkStadt(e) {
      if (this.stadtInput.value.length < 3){
        const error = "Bitte geben Sie Ihre Stadt ein";
        this.setState({stadtError: error, isError: true,stadt: e.target.value})
     }else{
        this.setState({stadtError: '', isError: false, stadt: e.target.value})
      }
    }

    checkPlz(e) {
      if (this.plzInput.value.length < 5){
        const error = "Bitte geben Sie Ihre PLZ ein. Eine Postleitzahl hat mindestens 5 Ziffern.";
        this.setState({plzError: error, isError: true,plz: e.target.value})
     }else{
        this.setState({plzError: '', isError: false, plz: e.target.value})
      }
    }

    checkBundesland (e) {
      if (this.bundeslandInput.value.length < 2){
        const error = "Bitte geben Sie Ihr Bundesland ein. Es können auch Abkürzungen wie 'BW' eingegeben werden.";
        this.setState({bundeslandError: error, isError: true,bundesLand: e.target.value})
     }else{
        this.setState({bundeslandError: '', isError: false,bundesLand: e.target.value})
      }
    }
    checkRechnungsAdresse(e) {
      if (this.bundeslandInput.value.length < 2){
        const error = "Bitte geben Sie Ihr Bundesland ein. Es können auch Abkürzungen wie 'BW' eingegeben werden.";
        this.setState({bundeslandError: error, isError: true,adresse: e.target.value})
     }else{
        this.setState({bundeslandError: '', isError: false,adresse: e.target.value})
      }
    }
    checkIban(e) {
      if (this.ibanInput.value.length != 22){
        const error = "Iban muss 22 Zeichen lang sein.";
        this.setState({ibanError: error, isError: true, iban: e.target.value})
     }else{
        this.setState({ibanError: '', isError: false,iban: e.target.value})
      }
    }
    checkBIC(e) {
      if (this.bicInput.value.length < 8 || this.bicInput.value.length > 11){
        const error = "BIC muss zwischen 8 und 11 zeichen lang sein.";
        this.setState({bicError: error, isError: true,bic: e.target.value})
     }else{
        this.setState({bicError: '', isError: false,bic: e.target.value})
      }
    }
    checkInhaber(e) {
      if (this.inhaberInput.value.length < 4){
        const error = "Bitte geben Sie den vollstädigen Namen des Konotinhabers ein.";
        this.setState({inhaberError: error, isError: true,inhaber: e.target.value})
     }else{
        this.setState({inhaberError: '', isError: false,inhaber: e.target.value})
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

uploadData(){
  firebase.database().ref('app').child('user').child(this.props.uid).
  update({
    straße: this.state.straße,
    plz: this.state.plz,
    stadt: this.state.stadt,
  
  })
}


        render(){
          if (this.state.redirect === true){return <Redirect to="/account-erstellen"/>}

          if (this.props.showBankData){
            scrollToComponent(this.bankData, {
    offset: 1000,
    align: 'top',
    duration: 1500
});
          }

          return(
              <div>
                {this.state.loading?(<h1>Lade Daten</h1>):(<section className="">
                  <div className="container" >
                    <div className="col-md-10 translateY-60 col-sm-12 col-md-offset-1">
                      <div className="  edit-info mrg-bot-25 padd-bot-30 padd-top-25">
                        <div className="listing-box-header">
                          <div className="avater-box">
                          <img style={{height:"130px" ,width:"130px"}} src={this.state.avatarImg} className="img-responsive img-circle edit-avater" alt="" />
                          <div style={{marginLeft:"11px"}} className="upload-btn-wrapper">
                            <button className="btn theme-btn">Profilbild</button>
                            <input type="file" name="myfile"   ref={(input) => { this.profilePic = input; }} onChange={this.handleChange.bind(this)}/>
                          </div>
                          </div>
                          <h3>{this.state.name}</h3>
                        </div>
                        <form>
                          <div className="row mrg-r-10 mrg-l-10">
                            <div className="col-sm-6">
                              <label>Name</label>
                              <input type="text" className="form-control" onChange={this.handleChangeName.bind(this)} value={this.state.name}/>
                            </div>
                            <div className="col-sm-6">
                              <label>Email</label>
                              <input type="text" className="form-control" onChange={this.handleChangeEmail.bind(this)} value={this.state.email}/>
                            </div>
                            <div className="col-sm-6">
                              <label>Telefon</label>
                              <input type="text" className="form-control" onChange={this.handleChangeTelefon.bind(this)} value={this.state.telefon}/>
                            </div>
                            <div className="col-sm-6">
                              <label>Geburtsdatum</label>
                              <input type="text" className="form-control" onChange={this.handleChangeGeburtsDatum.bind(this)} value={this.state.geburtsDatum}/>
                            </div>
                          </div>
                        </form>
                      </div>

                      <div className=" add-location mrg-bot-25 padd-bot-30 padd-top-25">
                        <div className="listing-box-header">
                          <i className="ti-location-pin theme-cl"></i>
                          <h3>Standort Informationen</h3>
                          <p>Firmensitz oder Standort der Maschienen</p>
                        </div>
                        <form>
                          <div className="row mrg-r-10 mrg-l-10">
                            <div className="col-sm-6">
                              <label>Straße</label>
                              <input type="text" className="form-control" ref={(input) => { this.straßeInput = input; }} onChange={this.checkStrasse.bind(this)} value={this.state.straße}/>
                              <p className="errorMessage">{this.state.strasseError}</p>
                            </div>
                            <div className="col-sm-6">
                              <label>Rechnungsadresse</label>
                              <input type="text" className="form-control" ref={(input) => { this.rechnungsAdresseInput = input; }} onChange={this.checkRechnungsAdresse.bind(this)} value={this.state.adresse} />
                            </div>
                            <div className="col-sm-6">
                              <label>Stadt</label>
                              <input type="text" className="form-control" ref={(input) => { this.stadtInput = input; }} onChange={this.checkStadt.bind(this)} value={this.state.stadt} />
                              <p className="errorMessage">{this.state.stadtError}</p>
                            </div>
                            <div className="col-sm-6">
                              <label>PLZ</label>
                              <input type="text" className="form-control" ref={(input) => { this.plzInput = input; }} onChange={this.checkPlz.bind(this)} value={this.state.plz}/>
                              <p className="errorMessage">{this.state.plzError}</p>
                            </div>
                            <div className="col-sm-12">
                              <label>Bundesland</label>
                              <input type="text" className="form-control" ref={(input) => { this.bundeslandInput = input; }} onChange={this.checkBundesland.bind(this)} value={this.state.bundesLand} />
                              <p className="errorMessage">{this.state.bundeslandError}</p>
                            </div>
                          </div>
                        </form>
                      </div>


                      <div  className="opening-day mrg-bot-25 padd-bot-30 padd-top-25">
                        <div ref={(section) => { this.bankData = section; }} className="listing-box-header">
                          <i className="ti-wallet theme-cl"></i>
                          <h3>Bank Daten</h3>
                          <p>Füllen Sie Ihre Bankdaten </p>
                        </div>
                          <div className="row mrg-r-10 mrg-l-10">
                            <div className="col-md-12">
                              <div className="pull-right">

                              </div>
                              <form>
                                <div className="row mrg-0">
                                  <div className="col-md-12 mob-padd-0">
                                    <div className="form-group">
                                      <label>Kontoinhaber</label>
                                      <div className="input-group">
                                        <input onChange={this.checkInhaber.bind(this)} ref={(input) => { this.inhaberInput = input; }} type="text" className="form-control" placeholder="Kontoinhaber"/>
                                        <span className="input-group-addon"><span className="glyphicon glyphicon-user"></span></span>
                                      </div>
                                      <p className="errorMessage">{this.state.inhaberError}</p>
                                    </div>
                                  </div>
                                </div>
                                <div className="row mrg-0">
                                  <div className="col-md-12 mob-padd-0">
                                    <div className="form-group">
                                      <label>IBAN</label>
                                      <div className="input-group">
                                        <input onChange={this.checkIban.bind(this)} ref={(input) => { this.ibanInput = input; }} type="text" className="form-control" placeholder="mindestens 22 Zeichen"/>
                                        <span className="input-group-addon"><span className="glyphicon glyphicon-lock"></span></span>
                                      </div>
                                      <p className="errorMessage">{this.state.ibanError}</p>
                                    </div>
                                  </div>
                                </div>
                                <div className="row mrg-0">
                                  <div className="col-md-12 mob-padd-0">
                                    <div className="form-group">
                                      <label>BIC</label>
                                      <div className="input-group">
                                        <input onChange={this.checkBIC.bind(this)} ref={(input) => { this.bicInput = input; }} type="text" className="form-control" placeholder="zwischen 8 und 11 Zeichen"/>
                                        <span className="input-group-addon"><span className="glyphicon glyphicon-lock"></span></span>
                                      </div>
                                      <p className="errorMessage">{this.state.bicError}</p>
                                    </div>
                                  </div>
                                </div>

                              </form>
                            </div>
                          </div>
                      </div>



                    </div>
                  </div>
                </section>)}
              </div>
            )
        }
    }

export default EditProfile;
