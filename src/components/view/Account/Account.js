import React, {Component} from 'react';
import firebase from 'firebase';
import {Redirect, NavLink} from 'react-router-dom'
import AccountCards from './AccountCard'
import Anfragen from './Mitteilungen/Anfragen'
import LaufendeAnfragen from './Mitteilungen/LaufendeAnfragen'
import AccountImg from'../../../img/account.jpg'
import Logo from'../../../img/logo.png'
import LogoWhite from'../../../img/logo-white.png'
import AvatarImg from'../../../img/avatar.jpg'
import Chat from './Mitteilungen/Chat/Chat'
import EditProfile from './EditProfile/EditProfile'
class Account extends Component{
  constructor(props){
    super(props)
    this.firedata = this.firedata.bind(this)
    this.loadAnfragen = this.loadAnfragen.bind(this)

    this.state ={
      authenticated: false,
      redirect: false,
      loader: true,
      anfragen: false,
      editProfile: false,
      messages: [{}]
    }
}
componentDidMount(){
  firebase.auth().onAuthStateChanged((user)=>{
    const userProfile = firebase.auth().currentUser;
    if(user){
      this.setState(
        {
        authenticated: true,
        photoUrl: userProfile.photoURL,
        name : userProfile.displayName,
        email : userProfile.email,
        stadt: userProfile.stadt,
        uid : userProfile.uid,
      },()=>{ this.firedata();
              this.loadAnfragen();
      }
    )

    } else {
      this.setState({
        authenticated: false,
        redirect: true,
      })
    }
  })

}
firedata() {
  let array = ["minibagger","kompaktbagger","raupenbagger","mobilbagger","radlader",
              "stampfer","vibrationsplatte","anhänger",
              "kippanhänger","planenanhänger","autotransportanhänger","tieflader","kettendumper","abbruchhammer",
              "bausteinBandseage","betonglaeter","betoninnenruettler","betonmischer",
            "blocksteinsaege","bodenfraese","bohrhammer","erdbohrgeraet","fugenschneider","grabenwalze","holzhaecksler",
          "kernbohrmaschiene","kompressor","materialContainer","motorradanhänger","planenanhänger","pritschenwagen",
        "steinsaege","stromerzeuger","trennschleifer","umzugstransporter","vibrationswalze", "teleskopstapler","teleskopmastbühne",
        "teleskopArbeitsbühne","selbstfahrendeScherenbühne","betonglaetter",
        "lkwArbeitsbühne","gelenkteleskoparbeitsbühneAufGummiketten","gelenkteleskopArbeitsbühne","anhängerArbeitsbühne"]
  const previousCards = [];
  array.map((i) =>
  {
    firebase.database().ref().child('app').child('cards/'+i)
    .orderByChild('uid').equalTo(this.state.uid)
    .on('value', snap => {
      snap.forEach(childSnapshot => {
        previousCards.push ({
          id: childSnapshot.key,
          snap: childSnapshot.val()
        })
      })
    })
  })
  this.setState ({
    cards: previousCards,
  })
  }




  loadAnfragen(){
    const mitteilung = [];
    let anfragen = [];
    const uid = this.state.uid;
    firebase.database().ref('app/').child('users/'+uid)
    .once('value', snap => {
        if(snap.val()){
          this.setState({
            cardId: snap.val().cardId,
            url: snap.val().url,
            nachName: snap.val().nachName,
            adresse: snap.val().address,
            geboren: snap.val().geburtsDatum,
            telefon: snap.val().telefon,
            stadt: snap.val().stadt,
            plz: snap.val().plz,
            straße: snap.val().straße,
            profileInfo: snap.val()
          })
          if(snap.val().bankData == undefined){
            this.setState({
              showEditBankData: true
            })
          }

          if (snap.val().anfragen){
            Object.keys(snap.val().anfragen).map(function(key, index) {
               anfragen.push(snap.val().anfragen[key]);
            });
            anfragen.sort(function(a, b){
                var keyA = new Date(a.timestamp),
                    keyB = new Date(b.timestamp);
                // Compare the 2 dates
                if(keyA > keyB) return -1;
                if(keyA < keyB) return 1;
                return 0;
            });

            this.setState({
            anfragen: anfragen,
            loader: false,
            })
          }else{
            this.setState({
              anfragen: false,
              loader: false,
            })
          }
        firebase.database().ref('app/users/'+uid).child('mitteilung').once('value',snap=>{
          snap.forEach(childSnapshot => {
          mitteilung.push ({
            id: childSnapshot.key,
            anfrage: childSnapshot.val().anfrage,
            bestätigt: childSnapshot.val().bestätigt,
            cardId: childSnapshot.val().cardId,
            zahlungImGang: childSnapshot.val().zahlungImGang,
            timestamp:childSnapshot.val().timestamp,
          })
          mitteilung.sort(function(a, b){
              var keyA = new Date(a.timestamp),
                  keyB = new Date(b.timestamp);
              // Compare the 2 dates
              if(keyA > keyB) return -1;
              if(keyA < keyB) return 1;
              return 0;
          });
          this.setState ({
            mitteilungen: mitteilung,
            })
          })
        })
        }else{
            alert('vervollstädige zuerst deine Profielinformationen')
          return <Redirect to="/account-erstellen"/>

        }

      })


}


editProfile() {

		this.setState((prevState)=>{
			return {editProfile: !prevState.editProfile};
		});
	}

editBankData(){
  this.setState((prevState)=>{
    return {editProfile: !prevState.editProfile, showBankData: true};
  });


}



        render(){


          if(this.state.redirect === true){
            return (<Redirect to="/"/>)
          }

          return(
            <div className="home-2 wrapper">
                {/* Start Navigation */}
                <div className="navbar navbar-default navbar-fixed navbar-transparent white bootsnav">
                  <div style={{paddingBottom: "0"}}  className="container">
                    <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#navbar-menu">
                      <i className="ti-align-left"></i>
                    </button>

                     {/*Start Header Navigation*/}
                    <div className="navbar-header">
                      <NavLink to="/">
                      <img src={Logo} className="logo logo-scrolled" alt=""/>
                      <img src={LogoWhite} className="logo logo-display" alt=""/>
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
                        :(null)}
                      </ul>
                      <ul className="nav navbar-nav navbar-right" data-in="fadeInDown" data-out="fadeOutUp">
                      { this.state.authenticated ?(<li className="no-pd"><NavLink to="/benutzeraccount" className="addlist">
                      {this.state.photoUrl ? (<img src={this.state.photoUrl} className="avater-img" alt=""/>)
                      :(<i className="ti-user"></i>)}{this.state.name}</NavLink></li>)
                      :(null)
                      }
                      </ul>
                    </div>
                     {/*.navbar-collapse*/}
                  </div>
                </div>
                {/* End Navigation */}
                <div className="clearfix"></div>

              <div className="title-transparent page-title" style={{backgroundImage: `url(${AccountImg})`, marginBottom:"-50px"}}>
                <div className="container">
                  <div className="title-content">
                  </div>
                </div>
              </div>
              <div className="clearfix"></div>
              {/* Tab Style 1 */}
              <div className="container" style={{minHeight:"600px"}}>
                <div className="tab style-2" role="tabpanel">
                  {/* Nav tabs */}
                  <ul className="nav nav-tabs" role="tablist">
                    <li role="presentation" className="active"><a href="#home" aria-controls="home" role="tab" data-toggle="tab">Übersicht Anfragen</a></li>
                    <li role="presentation"><a href="#meineAnfragen" aria-controls="meineAnfragen" role="tab" data-toggle="tab">Gestellte Mietanfragen</a></li>
                    <li role="presentation"><a href="#meinGerätepark" aria-controls="meinGerätepark" role="tab" data-toggle="tab">mein Gerätepark</a></li>
                    <li role="presentation"><a href="#profile" aria-controls="profile" role="tab" data-toggle="tab">Profil</a></li>
                    <li role="presentation"><a href="#nachrichten" aria-controls="nachrichten" role="tab" data-toggle="tab">Nachrichten</a></li>

                  </ul>
                  {/* Tab panes */}
                  <div className="tab-content tabs">
                    <div role="tabpanel" className="tab-pane fade in active" id="home">
                    {this.state.loader?(<div className="loader"></div>):(
                      <div>
                      { this.state.anfragen ? (this.state.anfragen.map((key) => {
                         const anfrage = key
                           return(<Anfragen
                           anfrage={anfrage} name={anfrage.name} url={anfrage.url}
                           cardHeading={anfrage.cardHeading} mietbeginn={anfrage.mietbeginn}
                           uid={this.state.uid} tage={anfrage.tage} umsatz={anfrage.umsatz}
                          nummer={anfrage.nummer} email={anfrage.email}
                           mietende={anfrage.mietende} num={anfrage.num} new={anfrage.new} cardId={anfrage.cardId} yName={this.state.name +" "+this.state.nachName} />
                           )
                         })
                        ) : (<h3>Du hast keine neuen Anfragen</h3>)
                      }
                      </div>
                    )}



                    </div>
                    <div role="tabpanel" className="tab-pane fade" id="meineAnfragen">
                    {this.state.mitteilungen?(this.state.mitteilungen.map((mit)=>{
                                  return(<LaufendeAnfragen anfrage={mit.anfrage} bestätigt={mit.bestätigt} cardId={mit.cardId} snapId={mit.id} uid={this.state.uid} zahlungImGang={mit.zahlungImGang}/>)
                                })):(<h3>Du hast keine laufenden Anfragen</h3>)
                    }
                    </div>
                    <div role="tabpanel" className="tab-pane fade" id="meinGerätepark">
                    {this.state.cards?(this.state.cards.map((card) => {
                             return(<AccountCards snap={card.snap} cardId={card.id} firebase={firebase.database().ref().child('app')}/>)
                           })):(<h3>Du hast keine Geräte inseriert</h3>)
                       }
                    </div>
                    <div role="tabpanel" className="tab-pane fade" id="profile">
                      <div>
                        <div style={{float:"right", marginRight:"20px", marginBottom:"40px",marginTop: "10px"}} >
                          {this.state.showEditBankData?(<button className="btn btn-default" style={{marginRight:"5px"}} onClick={this.editBankData.bind(this)}>Bankdaten hinzufügen</button>):(null)}
                          <button type="button" onClick={this.editProfile.bind(this)}  className="btn theme-btn">
                          {this.state.editProfile ?("Zurück"):("Profil bearbeiten")}</button>
                      </div>
                         {/* General Information */}
                         {this.state.editProfile ?(<div><EditProfile snap={this.state.profileInfo} uid={this.state.uid} name={this.state.name} showBankData={this.state.showBankData}/></div>)
                     :(<div className="container">

                         <div className="col-md-10 translateY-60 col-sm-12 col-md-offset-1">
                           <div className="  edit-info mrg-bot-25 padd-bot-30 padd-top-25">
                             <div className=" edit-info">
                               <div className="listing-box-header">
                                 <div className="avater-box">
                                 { this.state.url ?(<img style={{height:"130px",width:"130px"}} src={this.state.url} className="img-responsive img-circle" alt="" />)
                                                            :(<img style={{height:"130px",width:"130px"}}  src={AvatarImg} className="img-responsive img-circle " alt="" />)
                                 }
                                 </div>
                               </div>
                             </div>
                              <div className="col-md-12 col-sm-12 mob-padd-0">
                                {/* Basic Information */}
                                <div className="edit-info">
                                  <div className="col-md-6 col-sm-12">
                                    <h4>Kontaktdaten</h4>
                                    <div className="preview-info-body">
                                      <ul className="info-list">
                                        <li>
                                          <label><i className="ti-email preview-icon new mrg-r-10"></i>{this.state.email}</label>
                                        </li>
                                        <li>
                                          <label><i className="ti-mobile preview-icon new mrg-r-10"></i>{this.state.telefon}</label>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>

                                  <div className="col-md-6 col-sm-12">
                                    <h4>Persönliche Daten</h4>
                                    <div className="preview-info-body">
                                      <ul className="info-list">
                                        <li>
                                          <label><i className="ti-user preview-icon call mrg-r-10"></i>{this.state.name}</label>
                                        </li>
                                        <li>
                                          <label><i className="ti-location-pin preview-icon call mrg-r-10"></i>Ort: {this.state.stadt}</label>
                                        </li>
                                        <li>
                                          <label><i className="ti-info preview-icon call mrg-r-10"></i>PLZ: {this.state.plz}</label>
                                        </li>
                                        <li>
                                        <label><i className="ti-home preview-icon call mrg-r-10"></i>Straße: {this.state.straße}</label>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                                {/* End Basic Information */}
                              </div>
                            </div>
                          </div>
                        </div>)}
                         {/* End General Information */}
                      </div>
                    </div>
                    <div role="tabpanel" className="tab-pane fade" id="nachrichten">
                      <Chat name={this.state.name} uid={this.state.uid}/>
                    </div>
                  </div>
                </div>
            </div>
          </div>






            )
        }
    }

export default Account;
