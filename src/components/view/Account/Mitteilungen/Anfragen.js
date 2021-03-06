
import React, {Component} from 'react';
import firebase from 'firebase'
import {Link} from 'react-router-dom';



class Anfragen extends Component{
  constructor(props){
    super(props)
    this.state={
      remove:false,
      zugesagt: this.props.anfrage.zugesagt,
      vermietet: this.props.anfrage.zahlungImGang,
    }
  }



  Zusagen(){
    this.setState({zugesagt:true})
    let ref = this.props.name.split(' ').join('-') + this.props.num;
    alert('Du hast '+ this.props.name+ ' zugesagt ' +this.props.cardHeading + ' im Zeitraum von '+this.props.mietbeginn + " - " +this.props.mietende+" zu vermieten")
    firebase.database().ref().child('app').child('users/' + this.props.anfrage.uid)
    .child('mitteilung').child(ref)
    .update({ bestätigt: true,
            })
    firebase.database().ref().child('app').child('users/' + this.props.uid)
    .child('anfragen').child(ref)
    .update({zugesagt: true})
  }

  Absagen(){
    let ref = this.props.name.split(' ').join('-') + this.props.num;
    firebase.database().ref().child('app').child('users/' + this.props.uid)
    .child('anfragen').child(ref)
    .remove()
    firebase.database().ref().child('app').child('users/' + this.props.anfrage.uid)
    .child('mitteilung').child(ref)
    .remove()
    firebase.database().ref().child('app/users').child(this.props.anfrage.uid).child('gestellteAnfragen')
    .child(ref).remove()
    this.setState({remove: true})
  }

        render(){
          return(<div>
              {this.state.remove?(null):(<div className="col-sm-12" style={{ overflow: "hidden"}}>
                  <div className="col-md-12 col-sm-12">
                      <div className="verticleilist listing-shot">
                        <a className="listing-item">
                          <div className="listing-shot-img">
                            <img src={this.props.url} className="img-responsive" alt=""/>
                            <span className="listing-price">{this.props.umsatz}€</span>
                          </div>
                        </a>


                      <div className="verticle-listing-caption">

                        <div className="listing-shot-caption">
                          <h4>{this.props.anfrage.hersteller?(this.props.anfrage.hersteller+" "):(null)}{this.props.anfrage.cardHeading}{this.props.anfrage.gewicht?(" "+this.props.anfrage.gewicht+"Kg"):(null)}</h4>
                        </div>

                        <div className="listing-shot-info">
                          <div className="row extra">
                            <div className="col-md-12">
                              <div className="listing-detail-info">
                                <span>Zeitraum: <a>{this.props.mietbeginn}</a> bis <a>{this.props.mietende}</a>  = {this.props.tage}</span>
                                <span>möglicher Umsatz: <a>{this.props.umsatz}€</a> Benutzername: <a>{this.props.name}</a></span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <br/>
                        <div style={{marginBottom:"20px"}} className="listing-shot-info rating">
                          <div className="row extra">

                            <div className="row pull-right">
                              {this.state.zugesagt?(<div>{this.state.vermietet?(<span className="pricetag1">VERMIETET</span>):(<span className="pricetag2">ZUGESAGT</span>)}</div>):
                              (<div><div className="col-sm-6">
                                <button onClick={this.Zusagen.bind(this)} className="theme-btn btn-outlined">Zusagen</button>
                              </div>
                              <Link to={{
                                       pathname: `/baumaschinen_Anfragen/uid=${this.props.uid}/name=${this.props.name}/num=${this.props.num}`,
                                       query: {
                                         name: this.props.name,
                                         url: this.props.url,
                                         umsatz: this.props.umsatz,
                                         cardHeading: this.props.cardHeading,
                                         mietbeginn: this.props.mietbeginn,
                                         mietende: this.props.mietende,
                                         uid: this.props.uid,
                                         tage: this.props.tage,
                                         num: this.props.num,
                                         nummer: this.props.nummer,
                                         email: this.props.email,
                                         yName: this.props.yName,
                                       }
                                     }}>

                              </Link>
                              <div className="col-sm-6">
                                <button onClick={this.Absagen.bind(this)} className="theme-btn btn-outlined">Absagen</button>
                              </div>
                            </div>)}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
              </div>)}
              </div>
            )
        }
    }

export default Anfragen;
