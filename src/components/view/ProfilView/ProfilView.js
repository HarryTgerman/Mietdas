import React, {Component} from 'react';
import {Redirect, NavLink} from 'react-router-dom'
import { fetchNavbar } from'../../../actions/navbarAction'
import firebase from 'firebase';
import ProfilCards from './ProfilCards'
import { connect } from 'react-redux'

const mapStateToProps = state => ({
  authState: state.authState.items
})

class ProfilView extends Component{
  constructor(props){
    super(props)
    this.state={
      authenticated: false,
      loading:true,
    }
}
componentWillMount(){
  this.props.fetchNavbar('')
}
  componentDidMount(){
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
              let profilCards = [];
              let ProfilArray = ["minibagger","kompaktbagger","raupenbagger","mobilbagger","radlader",
                          "stampfer","vibrationsplatte","anhänger",
                          "kippanhänger","planenanhänger","autotransportanhänger","tieflader","kettendumper","abbruchhammer",
                          "bausteinBandseage","betonglaeter","betoninnenruettler","betonmischer",
                        "blocksteinsaege","bodenfraese","bohrhammer","erdbohrgeraet","fugenschneider","grabenwalze","holzhaecksler",
                      "kernbohrmaschiene","kompressor","materialContainer","motorradanhänger","planenanhänger","pritschenwagen",
                    "steinsaege","stromerzeuger","trennschleifer","umzugstransporter","vibrationswalze", "teleskopstapler","teleskopmastbühne",
                    "teleskopArbeitsbühne","selbstfahrendeScherenbühne","betonglaetter",
                    "lkwArbeitsbühne","gelenkteleskoparbeitsbühneAufGummiketten","gelenkteleskopArbeitsbühne","anhängerArbeitsbühne"]

              ProfilArray.map((i) =>
              {
                firebase.database().ref().child('app').child('cards/'+i)
                .orderByChild('uid').equalTo(userId)
                .once('value', snap => {
                  if(snap.val()){
                    snap.forEach(childSnapshot => {
                      profilCards.push({
                        id: childSnapshot.key,
                        snap: childSnapshot.val()
                      })
                    })
                  }
                })
              })
              this.setState ({
                loading: false,
                cards:profilCards,
              })
            })
          })
    }


        render(){
          // if(this.props.authState.authenticated == false) {
          //   alert("Du musst dich zuerst einloggen oder registeren")
          //     return  <Redirect  to='/'/>
          // }
          return(
              <div>


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
                        {this.state.loading?(<div className="loader"></div>):(
                        <div  className="row" style={{minHeight:"500px"}}>
                        {this.state.cards?(
                          <div style={{marginTop:"50px"}}>
                            {this.state.cards.map((i) => {
                                 return(<ProfilCards snap={i.snap} cardId={i.id} id={i.id}/>)
                               })}
                          </div>):(<h3>Du hast keine Geräte inseriert</h3>)}
                        </div>)}

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
        }
    }

export default connect(mapStateToProps, { fetchNavbar })(ProfilView);
