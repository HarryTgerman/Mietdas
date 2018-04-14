import React, {Component} from 'react';
import AvatarImg from'../../../img/avatar.jpg'
import firebase from 'firebase';
import {NavLink, Redirect} from 'react-router-dom'


class AccountErstellen extends Component{
  constructor(props){
    super(props)
    this.avatarImg = AvatarImg
    this.Ref = firebase.database().ref('app').child('users');
    this.state = {
      avatarImg : this.avatarImg
    }
}
componentWillMount(){

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
      },()=>{if (this.state.photoUrl == null){this.setState({showPhotoUrl:false})}else {this.setState({showPhotoUrl:true})}
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
createUserProfil(event){
    event.preventDefault()
    const name = this.nameInput.value;
    const email = this.emailInput.value;
    const date = this.dateInput.value;
    const straße = this.straßeInput.value;
    const stadt = this.stadtInput.value;
    const plz = this.plzInput.value
    const adresse = straße + " " + stadt  + " " + plz;
    const ort = this.plzInput.value +" "+this.stadtInput.value;
    const telefon = this.nummerInput.value;
    const userImage =  this.profilePic.files[0];
    const userId = this.state.uid;
    const land = this.landInput.value;
    const bundesLand = this.bundeslandInput.value;
    var user = firebase.auth().currentUser;

      firebase.storage().ref('images/pimgaes/').child(userId).child('pimage').put(userImage)
      .then(()=>{
      firebase.storage().ref('images/pimgaes/').child(userId).child('pimage')
      .getDownloadURL().then((url) => {
        const Url = url
        this.Ref.child(userId).update({
                          name: name,
                          email: email,
                          url : Url,
                          geburtsDatum: date,
                          adresse: adresse,
                          straße: straße,
                          stadt: stadt,
                          plz:plz,
                          land: land,
                          bundesLand: bundesLand,
                          ort: ort,
                          telefon: telefon,
                          uid: userId,
                        })
        user.updateProfile({
          photoUrl: Url,
          telefon: telefon,
          adresse: adresse,

        }).catch(function(error) {
        // An error happened.
        console.error(error);
        });


      })
    })
      .then(() => {
          this.setState({
            redirect: true
          })
        })

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
          return(
              <div className="home-2">
                <div className="navbar navbar-default navbar-fixed navbar-transparent white bootsnav">
                  <div style={{paddingBottom: "0"}}  className="container">
                    <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#navbar-menu">
                      <i className="ti-align-left"></i>
                    </button>

                     {/*Start Header Navigation*/}
                    <div className="navbar-header">
                      <NavLink to="/">
                        <img src="assets/img/logo.png" className="logo logo-scrolled" alt=""/>
                        <img src="assets/img/logo-white.png" className="logo logo-display" alt=""/>
                      </NavLink>
                    </div>

                     {/*Collect the nav links, forms, and other content for toggling*/}
                    <div className="collapse navbar-collapse" id="navbar-menu">
                      <ul className="nav navbar-nav navbar-center" data-in="fadeInDown" data-out="fadeOutUp">

                      <li className="dropdown">
                        <NavLink to="/mieten" >Mieten</NavLink>
                      </li>
                      <li className="dropdown">
                        <NavLink to="/vermieten" >Vermieten</NavLink>
                      </li>
                        {this.state.authenticated ?(<li className="dropdown">
                            <NavLink to="/logout" >Logout</NavLink>
                          </li>)
                        :(<li><a  href="javascript:void(0)"  data-toggle="modal" data-target="#signup">Log-In</a></li>)}
                      </ul>
                      <ul className="nav navbar-nav navbar-right" data-in="fadeInDown" data-out="fadeOutUp">
                      { this.state.authenticated ?(<li className="no-pd"><NavLink to="/benutzeraccount" className="addlist">
                      {this.state.showPhotoUrl ? (<img src={this.state.photoUrl} className="avater-img" alt=""/>)
                      :(<i className="ti-user"></i>)}{this.state.name}</NavLink></li>)
                      :(null)
                      }
                      </ul>
                    </div>
                     {/*.navbar-collapse*/}
                  </div>
                </div>
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
                            <div className="avater-box">
                            <img src={this.state.avatarImg } style={{height:"130px",width:"130px"}} className="img-responsive img-circle edit-avater" alt="" />
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
                                <label>Name/Firma</label>
                                <input type="text" ref={(input) => { this.nameInput = input; }} className="form-control" value={this.state.name}/>
                              </div>
                              <div className="col-sm-6">
                                <label>Email</label>
                                <input type="text" ref={(input) => { this.emailInput = input; }} className="form-control" value={this.state.email}/>
                              </div>
                              <div className="col-sm-6">
                                <label>Nummer</label>
                                <input type="text" className="form-control" ref={(input) => { this.nummerInput = input; }} placeholder="Telefon Nummer"/>
                              </div>
                              <div className="col-sm-6">
                                <label>Geburtstag</label>
                                <input type="text" ref={(input) => { this.dateInput = input; }} placeholder="TT.MM.JJJJ" className="form-control"/>
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
                                <input type="text" className="form-control" ref={(input) => { this.straßeInput = input; }} placeholder="Straße Nummer"/>
                              </div>
                              <div className="col-sm-6">
                                <label>Rechnungsadresse</label>
                                <input type="text" className="form-control" ref={(input) => { this.rechnungsAdresseInput = input; }} placeholder="Vollständige Adresse"/>
                              </div>
                              <div className="col-sm-6">
                                <label>Stadt</label>
                                <input type="text" className="form-control" ref={(input) => { this.stadtInput = input; }} placeholder="Stadt"/>
                              </div>
                              <div className="col-sm-6">
                                <label>PLZ</label>
                                <input type="text" className="form-control" ref={(input) => { this.plzInput = input; }} placeholder="Postleitzahl"/>
                              </div>
                              <div className="col-sm-6">
                                <label>Bundesland</label>
                                <input type="text" className="form-control" ref={(input) => { this.bundeslandInput = input; }} placeholder="Bundesland"/>
                              </div>
                              <div className="col-sm-6">
                                <label>Land</label>
                                <input type="text" className="form-control" ref={(input) => { this.landInput = input; }} placeholder="Deutschland"/>
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

export default AccountErstellen;
