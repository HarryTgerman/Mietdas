import React, {Component} from 'react';
import firebase from 'firebase';
import {Link} from 'react-router-dom';
import Popover from 'react-awesome-popover';
import "react-awesome-popover/dest/react-awesome-popover.css";



class LaufendeAnfragen extends Component{
  constructor(props){
    super(props)
    this.state={
      delete: false,
    }
}
deleteAnfrage(){
  firebase.database().ref().child('app').child('users/' + this.props.anfrage.uid)
  .child('/mitteilung/').child(this.props.snapId).remove();
  firebase.database().ref().child('app')
  .child('users').child(this.props.anfrage.ArtikelOwnerId)
  .child("anfragen/" +this.props.snapId).remove()
  this.setState({
    delete: true,
  })
}


        render(){
          return(
            <div>
            {this.state.delete?(null):(<div className="col-md-12 col-sm-12">
              <div className="verticleilist listing-shot">
                <a className="listing-item">
                  <div className="listing-shot-img">
                    <img src={this.props.anfrage.url} className="img-responsive" alt=""/>
                    <span className="listing-price">{this.props.anfrage.umsatz}€</span>
                  </div>
                </a>

                <div className="verticle-listing-caption">

                  <div className="listing-shot-caption">
                    <div className="right">
                      <Popover>
                      <i className="ti-info LaufendeAnfragen-info"></i>
                      <div className="tooltipbox" ><a onClick={this.deleteAnfrage.bind(this)}> Anfrage rückgängig machen ?</a></div>
                     </Popover>
                   </div>

                    <h4>{this.props.anfrage.hersteller?(this.props.anfrage.hersteller+" "):(null)}{this.props.anfrage.cardHeading}{this.props.anfrage.gewicht?(" "+this.props.anfrage.gewicht+"Kg"):(null)}</h4>
                  </div>

                  <div className="listing-shot-info">
                    <div className="row extra">
                      <div className="col-md-12">
                        <div className="listing-detail-info">
                          <span>Zeitraum: <a>{this.props.anfrage.mietbeginn}</a> bis <a>{this.props.anfrage.mietende}</a>  = {this.props.anfrage.tage}</span>
                          <span>Kosten: <a>{this.props.anfrage.umsatz}€</a></span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="listing-shot-info rating">
                    <div className="row extra" >

                      <div style={{marginRight:"10px"}} className="pull-right">
                        {
                          this.props.bestätigt ?(<div>{this.props.zahlungImGang?(<span className="pricetag1">BEZAHLUNG BESTÄTIGT</span>):(<Link to={{
                               pathname: `/reservierung=${this.props.cardId}/payment`,
                               query: {
                                 merchantReference: this.props.snapId,
                                 cardid: this.props.cardId,
                                 anfrage: this.props.anfrage,
                               }
                         }}>
                         <span  className="btn theme-btn"> Bezahlen</span></Link>)}</div>)
                        :(<span className="pricetag">nicht bestätig</span>)
                        }
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

export default LaufendeAnfragen;
