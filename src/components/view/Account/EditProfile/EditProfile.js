import React, {Component} from 'react';
import firebase from 'firebase'
import {Redirect} from 'react-router-dom'
import scrollToComponent from 'react-scroll-to-component';


class EditProfile extends Component{

  constructor(props){
    super(props)
    this.state={
      loading: false,
      redirect: false

    }
}

componentWillMount(){

this.setState({
  name: this.props.snap.name,
  email:this.props.snap.email,
  telefon:this.props.snap.telefon,
  geburtsDatum:this.props.snap.geburtsDatum,
  rechnungsadresse:this.props.snap.rechnungsadresse,
  straße:this.props.snap.straße,
  stadt:this.props.snap.stadt,
  plz:this.props.snap.plz,
  bundesLand:this.props.snap.bundesLand,
  url: this.props.snap.url
})
  if(this.props.snap.bankData == undefined){
    this.setState({
      iban: "bitte angeben",
      bic: "bitte  angeben",
      inhaber: "bitte angeben",
      bankName: "bitte angeben",
      paypal: "optional angeben",
    })

  }else {
    this.setState({
      iban: this.props.snap.bankData.iban,
      bic: this.props.snap.bankData.bic,
      inhaber: this.props.snap.bankData.kontoinhaber,
      bankName: this.props.snap.bankData.bankName,
    })
    if(this.props.snap.bankData.paypal == undefined){
      this.setState({
        paypal: "optional angeben",
      })
    }else {
      this.setState({
        paypal: this.props.snap.bankData.paypal,
      })
    }
  }


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
        const error = "Bitte gebe deine Strasse ein";
        this.setState({strasseError: error, isError: true,straße: e.target.value})
     }else{
        this.setState({strasseError: '', isError: false, straße: e.target.value})
      }
    }

    checkStadt(e) {
      if (this.stadtInput.value.length < 3){
        const error = "Bitte gebe deine Stadt ein";
        this.setState({stadtError: error, isError: true,stadt: e.target.value})
     }else{
        this.setState({stadtError: '', isError: false, stadt: e.target.value})
      }
    }

    checkPlz(e) {
      if (this.plzInput.value.length < 5){
        const error = "Bitte gebe deine PLZ ein. Eine Postleitzahl hat mindestens 5 Ziffern.";
        this.setState({plzError: error, isError: true,plz: e.target.value})
     }else{
        this.setState({plzError: '', isError: false, plz: e.target.value})
      }
    }

    checkBundesland (e) {
      if (this.bundeslandInput.value.length < 2){
        const error = "Bitte gebe dein Bundesland ein. Es können auch Abkürzungen wie 'BW' eingegeben werden.";
        this.setState({bundeslandError: error, isError: true,bundesLand: e.target.value})
     }else{
        this.setState({bundeslandError: '', isError: false,bundesLand: e.target.value})
      }
    }
    checkRechnungsadresse(e) {
      if (this.bundeslandInput.value.length < 2){
        const error = "Bitte gebe deine vollstädinge Rechnungsadresse an";
        this.setState({rechnungsAdresseError: error, isError: true,rechnungsadresse: e.target.value})
     }else{
        this.setState({rechnungsAdresseError: '', isError: false,rechnungsadresse: e.target.value})
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
        const error = "Bitte gebe deinen vollstädigen Namen des Konotinhabers ein.";
        this.setState({inhaberError: error, isError: true,inhaber: e.target.value})
     }else{
        this.setState({inhaberError: '', isError: false,inhaber: e.target.value})
      }
    }
    checkBankName(e) {

      if (this.inhaberInput.value.length < 2){
        const error = "Bitte gebe den Namen der Bank ein.";
        this.setState({bankNameError: error, isError: true,bankName: e.target.value})
     }else{
        this.setState({bankNameError: '', isError: false,bankName: e.target.value})
      }
    }
    checkPaypal(e) {
      var str = e.target.value;
      var n = str.includes("paypal.me/")
      if (n){
        this.setState({paypalError: '', isError: false,paypal: e.target.value})
     }else{
       const error = "bitte geben den PayPal.Me Link im folgenden Format an: paypal.me/mustename";
       this.setState({paypalError: error, isError: true,paypal: e.target.value})
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

savePersonel(){
  firebase.database().ref().child('app/users').child(this.props.uid).update({
    telefon: this.state.telefon,
    geburtsDatum: this.state.geburtsDatum,
  })
  this.setState({editProfile: false})

}
saveLocation(){
  let ort = this.state.plz + " " + this.state.stadt
  let adresse = this.state.straße + " " + this.state.plz + " " + this.state.stadt
  firebase.database().ref().child('app/users').child(this.props.uid).update({
    straße: this.state.straße,
    plz: this.state.plz,
    bundesLand: this.state.bundesLand,
    stadt: this.state.stadt,
    adresse:adresse,
    rechnungsadresse: this.state.rechnungsadresse,
    ort: ort,
  })
  this.setState({
    editLocation:false,
  })

}
saveBankData(){
  if(this.state.kontoinhaber == 'bitte angeben'){
    const error = "Bitte gebe den vollstädigen Namen des Konotinhabers ein.";
    this.setState({inhaberError: error, isError: true})
    return 0
  }
  else if(this.state.bic == 'bitte angeben'){
    const error = "BIC muss zwischen 8 und 11 zeichen lang sein.";
    this.setState({bicError: error, isError: true})
    return 0
  }
  else if(this.state.bankName == 'bitte angeben'){
    const error = "Bitte gebe den Namen der Bank ein.";
    this.setState({bankNameError: error, isError: true})
    return 0
  }
  else if(this.state.iban == 'bitte angeben'){
    const error = "Iban muss 22 Zeichen lang sein.";
    this.setState({ibanError: error, isError: true})
    return 0
  }
  if(this.state.isError){return 0}
  else{
      if (this.state.paypal == "optional angeben"){
      firebase.database().ref().child('app/users').child(this.props.uid).child('bankData').set({
        iban: this.state.iban,
        bic: this.state.bic,
        kontoinhaber: this.state.inhaber,
        bankName: this.state.bankName,
      })
      this.setState({
          editBankData: false,
      })
    }else {
      firebase.database().ref().child('app/users').child(this.props.uid).child('bankData').set({
        iban: this.state.iban,
        bic: this.state.bic,
        kontoinhaber: this.state.inhaber,
        bankName: this.state.bankName,
        paypal: this.state.paypal
      })
      this.setState({
          editBankData: false,
      })
    }
  }
}
componentDidMount(){
  if (this.props.showBankData){
  scrollToComponent(this.bankData)
}
}

        render(){
          if (this.state.redirect === true){return <Redirect to="/account-erstellen"/>}




          return(
              <div>
                {this.state.loading?(<h1>Lade Daten</h1>):(<section className="">
                  <div className="container" >
                    <div className="col-md-10 translateY-60 col-sm-12 col-md-offset-1">
                      <div className="  edit-info mrg-bot-25 padd-bot-30 padd-top-25">
                        <div className="listing-box-header">
                          <div className="avater-box">
                          <img style={{height:"130px" ,width:"130px"}} src={this.state.url} className="img-responsive img-circle edit-avater" alt="" />
                          <div style={{marginLeft:"12px"}} className="upload-btn-wrapper2">
                            <button className="btn theme-btn" >Profilbild</button>
                            <input type="file" name="myfile"  style={{cursor:"pointer"}} ref={(input) => { this.profilePic = input; }} onChange={this.handleChange.bind(this)}/>
                          </div>
                          </div>
                          <h3>{this.state.name}</h3>
                        </div>
                        <form>
                          <div className="row mrg-r-10 mrg-l-10">
                            <div className="col-sm-6">
                              <label>Name</label>
                              <p>{this.state.name}</p>
                            </div>
                            <div className="col-sm-6">
                              <label>Email</label>
                              <p>{this.state.email}</p>
                            </div>
                            <div className="col-sm-6">
                              <label>Telefon</label>
                              {this.state.editPersonel ?(<input type="text" className="form-control" onChange={this.handleChangeTelefon.bind(this)} value={this.state.telefon}/>)
                              :(<p>{this.state.telefon}</p>)}
                            </div>
                            <div className="col-sm-6">
                              <label>Geburtsdatum</label>
                              {this.state.editPersonel ?(<input type="text" className="form-control" onChange={this.handleChangeGeburtsDatum.bind(this)} value={this.state.geburtsDatum}/>)
                              :(<p>{this.state.geburtsDatum}</p>)}
                            </div>
                              <div className="editProfile">
                              <a className="editProfile" onClick={()=>{  this.setState((prevState)=>{
                                  return {editPersonel: !prevState.editPersonel};
                                })}}>{this.state.editPersonel?("abbrechen"):("bearbeiten ")}</a><a> </a>
    {this.state.editPersonel?(<a className="editProfile" onClick={this.savePersonel.bind(this)}>speichern</a>):(null)}
                            </div>
                          </div>
                        </form>
                      </div>

                      <div className=" add-location mrg-bot-25 padd-bot-30 padd-top-25">
                        <div className="listing-box-header">
                          <i className="ti-location-pin theme-cl"></i>
                          <h3>Standort Informationen</h3>
                        </div>
                        <form>
                          <div className="row mrg-r-10 mrg-l-10">
                            <div className="col-sm-6">
                              <label>Straße + Hausnummer</label>
                              {this.state.editLocation ?(<div><input type="text" className="form-control" ref={(input) => { this.straßeInput = input; }} onChange={this.checkStrasse.bind(this)} value={this.state.straße}/><p className="errorMessage">{this.state.strasseError}</p></div>)
                              :(<p>{this.state.straße}</p>)}
                            </div>

                            <div className="col-sm-6">
                              <label>Stadt</label>
                              {this.state.editLocation ?(<div><input type="text" className="form-control" ref={(input) => { this.stadtInput = input; }} onChange={this.checkStadt.bind(this)} value={this.state.stadt} /><p className="errorMessage">{this.state.stadtError}</p></div>)
                              :(<p>{this.state.stadt}</p>)}
                            </div>
                            <div className="col-sm-6">
                              <label>PLZ</label>
                              {this.state.editLocation ?(<div><input type="text" className="form-control" ref={(input) => { this.plzInput = input; }} onChange={this.checkPlz.bind(this)} value={this.state.plz}/><p className="errorMessage">{this.state.plzError}</p></div>)
                              :(<p>{this.state.plz}</p>)}
                            </div>
                            <div className="col-sm-6">
                              <label>Bundesland</label>
                              {this.state.editLocation ?(<div><input type="text" className="form-control" ref={(input) => { this.bundeslandInput = input; }} onChange={this.checkBundesland.bind(this)} value={this.state.bundesLand} /><p className="errorMessage">{this.state.bundeslandError}</p></div>)
                              :(<p>{this.state.bundesLand}</p>)}
                            </div>
                            <div className="col-sm-6">
                              <label>Rechnungsadresse (Straße Plz Stadt)</label>
                              {this.state.editLocation ?(<div><input type="text" className="form-control" ref={(input) => { this.rechnungsadresseInput = input; }} onChange={this.checkRechnungsadresse.bind(this)} value={this.state.rechnungsadresse} /><p className="errorMessage">{this.state.rechnungsadresseError}</p></div>)
                              :(<p>{this.state.rechnungsadresse}</p>)}
                            </div>
                            <div className="editProfile">
                            <a className="editProfile" onClick={()=>{  this.setState((prevState)=>{
                                return {editLocation: !prevState.editLocation};
                              })}}>{this.state.editLocation?("abbrechen"):("bearbeiten ")}</a><a> </a>
  {this.state.editLocation?(<a className="editProfile" onClick={this.saveLocation.bind(this)}>speichern</a>):(null)}
                          </div>
                          </div>
                        </form>
                      </div>


                      <div  className="opening-day mrg-bot-25 padd-bot-30 padd-top-25">
                        <div  className="listing-box-header">
                          <i className="ti-wallet theme-cl"></i>
                          <h3>Bank Daten</h3>
                          <p> Bitte fülle deine Bankdaten aus</p>
                        </div>
                          <div className="row mrg-r-10 mrg-l-10">
                            <div className="col-md-12">
                              <div className="pull-right">

                              </div>
                              <form ref={(section) => { this.bankData = section; }}>
                                <div className="row mrg-0">
                                  <div className="col-md-12 mob-padd-0">
                                    <div className="form-group">
                                      <label>Kontoinhaber</label>
                                      {this.state.editBankData ?(<div><div className="input-group">
                                        <input onChange={this.checkInhaber.bind(this)} ref={(input) => { this.inhaberInput = input; }} type="text" className="form-control" placeholder="Kontoinhaber" value={this.state.inhaber}/>
                                        <span className="input-group-addon"><span className="glyphicon glyphicon-user"></span></span>
                                      </div>  <p className="errorMessage">{this.state.inhaberError}</p></div>)
                                      :(<p>{this.state.inhaber}</p>)}
                                    </div>
                                  </div>
                                </div>
                                <div className="row mrg-0">
                                  <div className="col-md-12 mob-padd-0">
                                    <div className="form-group">
                                      <label>Bank Name</label>
                                      {this.state.editBankData ?(<div><div className="input-group">
                                        <input onChange={this.checkBankName.bind(this)} ref={(input) => { this.bankNameInput = input; }} type="text" className="form-control" placeholder="..." value={this.state.bankName}/>
                                        <span className="input-group-addon"><span className="glyphicon glyphicon-lock"></span></span>
                                      </div>  <p className="errorMessage">{this.state.bankNameError}</p></div>)
                                      :(<p>{this.state.bankName}</p>)}
                                    </div>
                                  </div>
                                <div className="row mrg-0">
                                  <div className="col-md-12 mob-padd-0">
                                    <div className="form-group">
                                      <label>IBAN</label>
                                      {this.state.editBankData ?(<div><div className="input-group">
                                        <input onChange={this.checkIban.bind(this)} ref={(input) => { this.ibanInput = input; }} type="text" className="form-control" placeholder="mindestens 22 Zeichen" value={this.state.iban}/>
                                        <span className="input-group-addon"><span className="glyphicon glyphicon-lock"></span></span>
                                      </div>  <p className="errorMessage">{this.state.ibanError}</p></div>)
                                      :(<p>{this.state.iban}</p>)}
                                    </div>
                                  </div>
                                </div>
                                <div className="row mrg-0">
                                  <div className="col-md-12 mob-padd-0">
                                    <div className="form-group">
                                      <label>BIC</label>
                                      {this.state.editBankData ?(<div><div className="input-group">
                                        <input onChange={this.checkBIC.bind(this)} ref={(input) => { this.bicInput = input; }} type="text" className="form-control" placeholder="zwischen 8 und 11 Zeichen" value={this.state.bic}/>
                                        <span className="input-group-addon"><span className="glyphicon glyphicon-lock"></span></span>
                                      </div>  <p className="errorMessage">{this.state.bicError}</p></div>)
                                      :(<p>{this.state.bic}</p>)}
                                    </div>
                                  </div>
                                </div>
                                <div className="row mrg-0">
                                  <div className="col-md-12 mob-padd-0">
                                    <div className="form-group">
                                      <label>PayPal Me Link</label>
                                      {this.state.editBankData ?(<div><div className="input-group">
                                        <input onChange={this.checkPaypal.bind(this)} ref={(input) => { this.paypalInput = input; }} type="text" className="form-control" placeholder="z.b. paypal.me/maxmustermann" />
                                        <span className="input-group-addon"><span className="glyphicon glyphicon-lock"></span></span>
                                      </div>
                                       <p className="errorMessage">{this.state.paypalError}</p>
                                      <div >
                                        <div className="card card-body">
                                          Mit einem PayPal.Me-Link kannst du persönliche oder geschäftliche Zahlungen von anderen über PayPal anfordern und empfangen.
                                        <a target="_blank" className="theme-cl" href="https://www.paypal.com/paypalme/grab?locale.x=de_DE&country.x=CH">  Jetzt kostenlos PayPal.Me Link generieren </a>
                                        </div>
                                      </div>
                                      </div>)
                                      :(<p>{this.state.paypal}</p>)}
                                    </div>
                                  </div>
                                  </div>
                                  <div className="editProfile">
                                  <a className="editProfile" onClick={()=>{  this.setState((prevState)=>{
                                      return {editBankData: !prevState.editBankData};
                                    })}}>{this.state.editBankData?("abbrechen"):("bearbeiten ")}</a><a> </a>
        {this.state.editBankData?(<a className="editProfile" onClick={this.saveBankData.bind(this)}>speichern</a>):(null)}
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
