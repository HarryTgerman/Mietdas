import React, {Component} from 'react';
import firebase from 'firebase';
import {Redirect, NavLink} from 'react-router-dom'
import AccountCards from './AccountCard'
import Anfragen from './Mitteilungen/Anfragen'
import LaufendeAnfragen from './Mitteilungen/LaufendeAnfragen'
import AccountImg from'../../../img/account.jpg'
import AvatarImg from'../../../img/avatar.jpg'
import Chat from './Mitteilungen/Chat/Chat'
import EditProfile from './EditProfile/EditProfile'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import { connect } from 'react-redux';
import { fetchNavbar } from '../../../actions/navbarAction';
import { fetchAuthState } from '../../../actions/authAction';

const mapStateToProps = state => ({
  authState: state.authState.items
})

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

componentWillMount(){
  this.props.fetchAuthState();
  this.props.fetchNavbar('home-2');
}

componentWillReceiveProps(nextProps){
  if(nextProps.authState){
    this.firedata();
    this.loadAnfragen();
  }
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
    .orderByChild('uid').equalTo(this.props.authState.uid)
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
    const uid = this.props.authState.uid;
    firebase.database().ref('app/').child('users/'+uid)
    .once('value', snap => {
      console.log('loadAnfragen !!!');
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
            <div className="wrapper">

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
                <Tabs className="tab style-2  " >
                  <TabList className="nav nav-tabs">
                    <Tab><a className="nav-active" style={{cursor: "pointer"}}>Übersicht Anfragen</a></Tab>
                    <Tab><a className="nav-active" style={{cursor: "pointer"}}>Gestellte Mietanfragen</a></Tab>
                    <Tab><a className="nav-active" style={{cursor: "pointer"}}>mein Gerätepark</a></Tab>
                    <Tab><a className="nav-active" style={{cursor: "pointer"}}>Profil</a></Tab>
                    <Tab><a className="nav-active" style={{cursor: "pointer"}}>Nachrichten</a></Tab>
                  </TabList>


                  <div className="tab-content container">
                    <TabPanel >
                    {this.state.loader?(<div className="loader"></div>):(
                      <div className="tabs">
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
                    </TabPanel>
                    <TabPanel>
                    <div className="tabs">
                    {this.state.mitteilungen?(this.state.mitteilungen.map((mit)=>{
                                  return(<LaufendeAnfragen  anfrage={mit.anfrage} bestätigt={mit.bestätigt} cardId={mit.cardId} snapId={mit.id} uid={this.state.uid} zahlungImGang={mit.zahlungImGang}/>)
                                })):(<h3>Du hast keine laufenden Anfragen</h3>)
                    }
                    </div>
                    </TabPanel>
                    <TabPanel >
                    {this.state.cards?(this.state.cards.map((card) => {
                             return(<AccountCards snap={card.snap} cardId={card.id} firebase={firebase.database().ref().child('app')}/>)
                           })):(<h3>Du hast keine Geräte inseriert</h3>)
                       }
                    </TabPanel>
                    <TabPanel>
                      <div className="tabs" >
                        <div style={{float:"right", marginRight:"20px", marginBottom:"40px",marginTop: "10px", position: "relative"}} >
                          {this.state.showEditBankData?(<button className="btn btn-default" style={{marginRight:"5px"}} onClick={this.editBankData.bind(this)}>Bankdaten hinzufügen</button>):(null)}
                          <button type="button" onClick={this.editProfile.bind(this)}  className="btn theme-btn">
                          {this.state.editProfile ?("Zurück"):("Profil bearbeiten")}</button>
                        </div>
                      <div style={{paddingTop:"100px"}}>
                         {/* General Information */}
                         {this.state.editProfile ?(<div><EditProfile snap={this.state.profileInfo} uid={this.props.authState.uid} name={this.props.authState.name} showBankData={this.state.showBankData}/></div>)
                     :(<div style={{marginBottom:"30px"}}>

                         <div className="col-md-10 col-sm-12 col-md-offset-1">
                           <div className="edit-info mrg-bot-25 padd-bot-30 ">
                             <div className="edit-info">
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
                                          <label><i className="ti-email preview-icon new mrg-r-10"></i>{this.props.authState.email}</label>
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
                                          <label><i className="ti-user preview-icon call mrg-r-10"></i>{this.props.authState.name}</label>
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
                    </TabPanel>
                    <TabPanel>
                      <div className="tabs">
                        <Chat   name={this.props.authState.name} uid={this.props.authState.uid}/>
                      </div>
                    </TabPanel>
                  </div>
                </Tabs>
            </div>
          </div>

            )
        }
    }





export default connect(mapStateToProps, { fetchNavbar, fetchAuthState }) (Account);
