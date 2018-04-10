import React, {Component} from 'react';
import firebase from 'firebase';
import {Link} from 'react-router-dom';



class LaufendeAnfragen extends Component{
  constructor(props){
    super(props)
    this.state={
    }
}

componentWillMount(){

}

        render(){
          return(
            <div>
              {this.props.anfrage ?(<div className="col-md-4 col-sm-6">
                <div className="category-box-full style-2">

                  <a href="#" className="category-boxs" data-background-image={this.props.anfrage.url} tabindex="0">
                    <div className="category-box-content">
                      <h3>{this.props.anfrage.cardHeading}</h3>
                      <span>Zeitraum: {this.props.anfrage.mietbeginn} bis {this.props.anfrage.mietende}</span>
                      <span>Zu zahlen: {this.props.anfrage.umsatz}€</span>
                    </div>
                    {
                      this.props.bestätigt ?(<Link to={{
                           pathname: `/reservierung=${this.props.cardId}/payment`,
                           query: {
                             anfrage: this.props.anfrage,
                           }
                     }}>
                     <span className="category-box-btn"> Bezahlen</span></Link>)
                    :(<span className="pricetag">nicht bestätig</span>)
                    }
                    <div className="category-box-bg" style={{backgroundImage: `url(${this.props.anfrage.url})`}}></div>
                  </a>
                </div>
              </div>): (null)}
            </div>
            )
        }
    }

export default LaufendeAnfragen;
