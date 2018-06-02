import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import firebase from 'firebase'
import Rating from '../../../StarRating/Rating'



class  Cards extends Component {
  constructor(props) {
      super(props)
      this.cardDesc = props.cardDesc;
      this.cardHeading = props.cardHeading;
      this.cardPreis = props.cardPreis;
      this.id = props.id;
      this.rating = props.bewertung;
      this.standOrt = props.standOrt
      this.url = props.image;
      this.imageArr = props.imageArr;
      this.gewicht = props.gewicht,
      this.grabtiefe = props.grabtiefe,
      this.transportbreite = props.transportbreite,
      this.transporthoehe = props.transporthoehe,
      this.snap = props.snap;

      this.state ={
        kategorie:"",
        pullRight: true,
        showModal: false,
      }

  }


    render(){



    return(

      <div >
        <div className="col-md-4 col-sm-12">
          <div className="listing-shot grid-style">

              <div className="listing-shot-img">
                <img src={this.url}  className="img-responsive" alt=""/>
                <span className="listing-price">{this.cardPreis}€</span>
              </div>
              <div className="listing-shot-caption">
                <h4 style={{marginBottom: "10px"}}>{this.props.snap.hersteller?(this.props.snap.hersteller+" "):(null)}{this.props.snap.cardHeading}{this.props.snap.gewicht?(" "+this.props.snap.gewicht+"Kg"):(null)}</h4>
                <p className="listing-location">{this.standOrt}</p>
              </div>


            <div className="listing-shot-info rating">
              <div className="row extra">
                <Rating/>
                <div className="col-md-5 col-sm-5 col-xs-6 pull-right">
                <a href={`/details/search=${this.props.kategorie+"/"+this.props.id}`} className="detail-link" target="_blank" >Gehe zu</a>
                </div>
              </div>
            </div>
          </div>
        </div>

    </div>
    )
  }
}


export default Cards
