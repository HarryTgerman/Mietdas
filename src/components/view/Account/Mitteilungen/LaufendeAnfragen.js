import React, {Component} from 'react';
import firebase from 'firebase';
import {Link} from 'react-router-dom';



class LaufendeAnfragen extends Component{
  constructor(props){
    super(props)
    this.state={
    }
}



        render(){
          return(
            <div>
            <div className="col-md-12 col-sm-12">
              <div className="verticleilist listing-shot">
                <a className="listing-item">
                  <div className="listing-shot-img">
                    <img src={this.props.anfrage.url} className="img-responsive" alt=""/>
                    <span className="listing-price">{this.props.anfrage.umsatz}€</span>
                  </div>
                </a>

                <div className="verticle-listing-caption">

                  <div className="listing-shot-caption">
                    <h4>{this.props.anfrage.cardHeading}</h4>
                  </div>

                  <div className="listing-shot-info">
                    <div className="row extra">
                      <div className="col-md-12">
                        <div className="listing-detail-info">
                          <span>Zeitraum: <a>{this.props.anfrage.mietbeginn}</a> bis <a>{this.props.anfrage.mietende}</a>  = {this.props.anfrage.tage}</span>
                          <span>möglicher Umsatz: <a>{this.props.anfrage.umsatz}€</a> Benutzername: <a>{this.props.anfrage.name}</a></span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="listing-shot-info rating">
                    <div className="row extra" >

                      <div style={{marginRight:"10px"}} className="pull-right">
                        {
                          this.props.bestätigt ?(<Link to={{
                               pathname: `/reservierung=${this.props.cardId}/payment`,
                               query: {
                                 cardid: this.props.cardId,
                                 anfrage: this.props.anfrage,
                               }
                         }}>
                         <span  className="btn theme-btn"> Bezahlen</span></Link>)
                        :(<span className="pricetag">nicht bestätig</span>)
                        }
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </div>
            )
        }
    }

export default LaufendeAnfragen;
