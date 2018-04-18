import React, {Component} from 'react';
import firebase from 'firebase'


class EditProfile extends Component{

  constructor(props){
    super(props)
    this.state={
      loading: true
    }
}

componentDidMount(){
  firebase.database().ref().child("app/users").child(this.props.uid)
  .once('value', snap=>{
    let url = snap.val().url
    let email = snap.val().email
    let name = snap.val().name
    let telefon = snap.val().telefon
    let geburtsdatum = snap.val().geburtsDatum
    let adresse = snap.val().address
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
          return(
              <div>
                {this.state.loading?(<h1>Lade Daten</h1>):(<section className="padd-0">
                  <div className="container">
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


                      <div className="  opening-day mrg-bot-25 padd-bot-30 padd-top-25">
                        <div className="listing-box-header">
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
                                      <label>CARD NUMBER</label>
                                      <div className="input-group">
                                        <input type="text" className="form-control" placeholder="Valid Card Number"/>
                                        <span className="input-group-addon"><span className="glyphicon glyphicon-lock"></span></span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="row mob-mrg-0 mrg-0 mrg-r-10 mrg-l-10">
                                  <div className="col-sm-12 col-md-7 padd-0">
                                    <div className="form-group">
                                      <div className="row mrg-r-10 mrg-l-10 mob-mrg-0">
                                        <label className="prizm">EXPIRY DATE</label>
                                        <div className="col-xs-6 col-lg-6 pl-ziro padd-0">
                                          <input type="text" className="form-control" placeholder="MM" />
                                        </div>
                                        <div className="col-xs-6 col-lg-6 pl-ziro padd-r-0">
                                          <input type="text" className="form-control" placeholder="YY" />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-5 col-sm-12 padd-l-5 padd-r-5 mob-padd-0">
                                    <div className="form-group">
                                      <label for="cvCode">
                                        CV CODE</label>
                                      <input type="password" className="form-control" id="cvCode" placeholder="CV" required />
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
