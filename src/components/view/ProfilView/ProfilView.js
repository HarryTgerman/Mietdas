import React, {Component} from 'react';
import {Redirect, NavLink} from 'react-router-dom'
import Logo from'../../../img/logo.png'
import firebase from 'firebase';
import Cards from './Cards'



class ProfilView extends Component{
  constructor(props){
    super(props)
    this.state={
      authenticated: false,
      loading:true,
      geräteVorhanden: false,
    }
}
componentWillMount(){
  const url = this.props.location.pathname;
  const ref = url.split('/');
  const userId = ref[2];
  firebase.database().ref('app/users').child(userId)
    .once('value', snap => {
        this.setState ({
          userId: userId,
          userName: snap.val().name,
          imageUrl: snap.val().url,
        },()=>{
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
            .orderByChild('uid').equalTo(userId)
            .once('value', snap => {
              snap.forEach(childSnapshot => {
                previousCards.push ({
                  id: childSnapshot.key,
                  snap: childSnapshot.val()
                })
              })
            })
          })
          this.setState ({
            loading: false,
            cards: previousCards,
          })
          if(previousCards >= 1)
          {this.setState({geräteVorhanden :true})}
        })
      })

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
          })
        }
      })

    }


        render(){

          return(
              <div>
              <div className="navbar navbar-default navbar-fixed navbar-transparent white bootsnav">
                <div style={{paddingBottom: "0"}}  className="container">
                  <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#navbar-menu">
                    <i className="ti-align-left"></i>
                  </button>

                   {/*Start Header Navigation*/}
                  <div className="navbar-header">
                    <NavLink to="/">
                      <img src={Logo} className="logo logo-display" alt=""/>
                      <img src={Logo} className="logo logo-scrolled" alt=""/>
                    </NavLink>
                  </div>

                   {/*Collect the nav links, forms, and other content for toggling*/}
                  <div className="collapse navbar-collapse" id="navbar-menu">
                    <ul className="nav navbar-nav navbar-center" data-in="fadeInDown" data-out="fadeOutUp">
                    <li className="dropdown">
                      <NavLink to="/so-geht-mieten">So geht mieten</NavLink>
                    </li>
                    <li className="dropdown">
                      <NavLink to="/mieten" >Mieten</NavLink>
                    </li>
                    <li className="dropdown">
                      <NavLink to="/vermieten" >Vermieten</NavLink>
                    </li>
                      {this.state.authenticated ?(<li className="dropdown">
                          <NavLink to="/logout" >Logout</NavLink>
                        </li>)
                      :(<li><a  href="javascript:void(1)"  data-toggle="modal" data-target="#signup">Log-In</a></li>)}
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
              </div >

              <div className='container' style={{paddingTop:"100px"}}>

                  <div className="col-md-12 col-sm-12">
                    <div className="edit-info mrg-bot-25 padd-bot-30 ">
                      <div className="edit-info">
                        <div className="listing-box-header">
                          <div className="avater-box">
                           <img style={{height:"130px",width:"130px"}} src={this.state.imageUrl} className="img-responsive img-circle" alt="" />
                          </div>
                            <h3>{this.state.userName}</h3>
                        </div>
                        <div className="col-md-12">
                          <h5>{this.state.cards?(<div>{this.state.cards.length} Baugeräte inserriert</div>):(null) }</h5>
                        </div>
                        {this.state.loading?(<div className="loader"></div>):
                        (<div  className="row" style={{minHeight:"500px"}}>
                        <div style={{marginTop:"50px"}}>
                        {this.state.geräteVorhanden?(this.state.cards.map((card) => {
                                 return(<Cards snap={card.snap} cardId={card.id} id={card.id}/>)
                               })):(<h4>{this.state.userName} hat noch keine Geräte inserriert</h4>)
                           }
                          </div>
                        </div>)}

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
        }
    }

export default ProfilView;
