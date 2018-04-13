import React, {Component} from 'react';
import firebase from 'firebase';
import {Redirect, NavLink} from 'react-router-dom'
import AccountCards from './AccountCard'
import Anfragen from './Mitteilungen/Anfragen'
import LaufendeAnfragen from './Mitteilungen/LaufendeAnfragen'
import AvatarImg from'../../../img/avatar.jpg'
import AccountImg from'../../../img/account.jpg'
import Logo from'../../../img/logo.png'
import LogoWhite from'../../../img/logo-white.png'


class Account extends Component{
  constructor(props){
    super(props)
    this.firedata = this.firedata.bind(this)
    this.loadAnfragen = this.loadAnfragen.bind(this)
    this.state ={
      authenticated: false,
      cards: [],
      anfragen: [{}],
      mitteilungen: [],
      controll: false,
    }
}

firedata() {
  const previousCards = this.state.cards;
  firebase.database().ref().child('app').child('cards')
    .orderByChild('uid').equalTo(this.state.uid)
    .once('value', snap => {
      snap.forEach(childSnapshot => {
        previousCards.push ({
          id: childSnapshot.key,
          snap: childSnapshot.val()
        })
        this.setState ({
          cards: previousCards,
        })
      })
    })
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
      },()=>{ this.firedata();
              this.loadAnfragen();
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


  loadAnfragen(){
    const uid = this.state.uid;
    firebase.database().ref('app/').child('users/'+uid)
    .on('value', snap => {
      if(snap.val().anfragen == null){
      this.setState({
        controll: true,
        anfragen: 0,
        cardId: snap.val().cardId,
        url: snap.val().url,
        nachName: snap.val().nachName,
        adresse: snap.val().address,
        geboren: snap.val().geburtsDatum,
        mobil: snap.val().mobil,
        telefon: snap.val().telefon,

      })
  }else{
        this.setState({
        anfragen: snap.val().anfragen,
        cardId: snap.val().cardId,
        url: snap.val().url,
        nachName: snap.val().nachName,
        adresse: snap.val().address,
        geboren: snap.val().geburtsDatum,
        mobil: snap.val().mobil,
        telefon: snap.val().telefon,
      })
    }
  })
  const mitteilung = this.state.mitteilungen;
    firebase.database().ref().child('app').child('users/').child(this.state.uid)
    .child('mitteilung').once('value' ,snap => {
      snap.forEach(childSnapshot => {
      mitteilung.push ({
        id: childSnapshot.key,
        anfrage: childSnapshot.val().anfrage,
        bestätigt: childSnapshot.val().bestätigt,
        cardId: childSnapshot.val().cardId,

      })
      this.setState ({
        mitteilungen: mitteilung,
      })
    })
  })

}







        render(){
          const { anfragen } = this.state
          const keys = Object.keys(anfragen)


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
                        :(<li><a  href="javascript:void(0)"  data-toggle="modal" data-target="#signup">Log-In</a></li>)}
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

                {/* Page Title */}
                <div className="title-transparent page-title" style={{backgroundImage: `url(${AccountImg})`}}>
                  <div className="container">
                    <div className="title-content">
                    </div>
                  </div>
                </div>
                <div className="clearfix"></div>
                {/* Page Title */}

                <div className="padd-0">
                  <div className="container">

                    {/* General Information */}

                    <div className="add-listing-box translateY-60 edit-info mrg-bot-25 padd-bot-30 padd-top-25">
                      <div className="listing-box-header">
                        <div className="avater-box">
                        { this.state.url ?(<img src={this.state.url} className="img-responsive img-circle edit-avater" alt="" />)
                                                   :(<img src={AvatarImg} className="img-responsive img-circle edit-avater" alt="" />)
                        }
                        </div>
                        <h3>{this.state.name}</h3>
                      </div>
                      <div className="row mrg-r-10 mrg-l-10 preview-info">
                        <div className="col-sm-4">
                          <label><i className="ti-mobile preview-icon call mrg-r-10"></i>{this.state.telefon}</label>
                        </div>
                        <div className="col-sm-4">
                          <label><i className="ti-email preview-icon email mrg-r-10"></i>{this.state.email}</label>
                        </div>
                        <div className="col-sm-4">
                          <label><i className="ti-gift preview-icon birth mrg-r-10"></i>{this.state.geboren}</label>
                        </div>
                      </div>
                        <div className="container" style={{width: "95%", marginTop:"15px"}}>
                          <div className="col-md-12 col-sm-12">
                            <div className="panel-group style-1" id="accordion" role="tablist" aria-multiselectable="true">
                              <div className="panel panel-default">
                                <div className="panel-heading" role="tab" id="designing">
                                  <h4 className="panel-title">
                                    <a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                                      Anfragen für Ihre Baumaschinen
                                    </a>
                                  </h4>
                                </div>
                                <div id="collapseOne" className="panel-collapse collapse in" role="tabpanel" aria-labelledby="designing">
                                  <div className="panel-body">
                                  { this.state.controll ? (<h3>Du Hast keine Neuen Anfragen</h3>)
                                     : (keys.map((key) => {
                                        const anfrage = anfragen[key]
                                          return(<Anfragen
                                          anfrage={anfrage} name={anfrage.name} url={anfrage.url}
                                          cardHeading={anfrage.cardHeading} mietbeginn={anfrage.mietbeginn}
                                          uid={anfrage.uid} tage={anfrage.tage} umsatz={anfrage.umsatz}
                                         nummer={anfrage.nummer} email={anfrage.email}
                                          mietende={anfrage.mietende} num={anfrage.num} new={anfrage.new} cardId={anfrage.cardId} yName={this.state.name +" "+this.state.nachName} />
                                          )
                                        }))
                                   }
                                  </div>
                                </div>
                              </div>
                              <div className="panel panel-default">
                                <div className="panel-heading" role="tab" id="web-development">
                                  <h4 className="panel-title">
                                    <a className="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                      Angefragte Baumaschinen
                                    </a>
                                  </h4>
                                </div>
                                <div id="collapseTwo" className="panel-collapse collapse" role="tabpanel" aria-labelledby="web-development">
                                  <div className="panel-body">
                                  {this.state.mitteilungen.map((mit)=>{
                                    return(<LaufendeAnfragen anfrage={mit.anfrage} bestätigt={mit.bestätigt} cardId={mit.cardId} uid={this.state.uid}/>)
                                    })
                                  }
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    {/* End General Information */}
                  </div>
                </div>

                <div className="padd-top-0">
                  <div className="container">
                    <div className="col-md-6 col-sm-12 mob-padd-0">
                      {/* Basic Information */}
                      <div className="add-listing-box edit-info mrg-bot-25 padd-bot-30 padd-top-5">
                        <div className="preview-info-header">
                          <h4>Basic Info</h4>
                        </div>
                        <div className="preview-info-body">
                          <ul className="info-list">
                            <li>
                              <label>Name:</label>
                              <span>Daniel Deve</span>
                            </li>
                            <li>
                              <label>Company:</label>
                              <span>Info Soft Ltd</span>
                            </li>
                            <li>
                              <label>Designation:</label>
                              <span>Account Manager</span>
                            </li>
                            <li>
                              <label>Birth:</label>
                              <span>July 15 1990</span>
                            </li>
                            <li>
                              <label>Age:</label>
                              <span>22 Year</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                      {/* End Basic Information */}
                    </div>

                    <div className="col-md-6 col-sm-12 mob-padd-0">
                      {/* Address Information */}
                      <div className="add-listing-box edit-info mrg-bot-25 padd-bot-30 padd-top-5">
                        <div className="preview-info-header">
                          <h4>Basic Info</h4>
                        </div>
                        <div className="preview-info-body">
                          <ul className="info-list">
                            <li>
                              <label>Phone:</label>
                              <span>91 258 758 6584</span>
                            </li>
                            <li>
                              <label>Email:</label>
                              <span>support@listinghub.com</span>
                            </li>
                            <li>
                              <label>State:</label>
                              <span>Punjab</span>
                            </li>
                            <li>
                              <label>Country:</label>
                              <span>India</span>
                            </li>
                            <li>
                              <label>Address:</label>
                              <span>1126 Sunrise Road, NV 89107</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                      {/* End Address Information */}
                    </div>
                    <div className="padd-top-20">
                      <div className="container">
                        <div className="row">
                            {this.state.cards.map((card) => {
                                return(<AccountCards snap={card.snap} cardId={card.id}/>)
                              })
                          }
                      </div>
                      </div>
                    </div>
                    <div className="col-md-12 col-sm-12 mob-padd-0">
                      {/* About Information */}
                      <div className="add-listing-box edit-info mrg-bot-25 padd-bot-30 padd-top-5">
                        <div className="preview-info-header">
                          <h4>Miethistory</h4>
                        </div>
                        <div className="preview-info-body">
                          <div className="DetailsTable">
                            <table className="table">
                              <thead>
                                <tr>
                                  <th>#</th>
                                  <th>Datum</th>
                                  <th>Artikel</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td>1</td>
                                  <td>12.12.17</td>
                                  <td>Bagger 12 t</td>
                                </tr>
                                <tr>
                                  <td>2</td>
                                  <td>14.12.17</td>
                                  <td>Bagger 2t</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                      {/* End About Information */}
                    </div>


                  </div>
                </div>




              </div>
            )
        }
    }

export default Account;
