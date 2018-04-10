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
            <Link Link style={{ textDecoration: 'none' }} to={{
              pathname: `/details/search=?${this.props.id}`,
            state: {
            kategorie: this.props.kategorie,
            snap: this.snap,
            cardHeading: this.cardHeading,
            cardDesc: this.cardDesc,
            id: this.id,
            standOrt: this.standOrt,
            cardPreis: this.cardPreis,
            imageUrl: this.url,
            imageArr: this.imageArr,
            gewicht: this.gewicht,
            grabtiefe: this.grabtiefe,
            transportbreite: this.transportbreite,
            transporthoehe: this.transporthoehe,
              }
            }}>
              <div className="listing-shot-img">
                <img src={this.url}  className="img-responsive" alt=""/>
                <span className="listing-price">{this.cardPreis}€</span>
              </div>
              <div className="listing-shot-caption">
                <h4>{this.cardHeading}</h4>
                <p className="listing-location">{this.standOrt}</p>
              </div>
            </Link>
            <div className="listing-shot-info">
              <div className="row extra">
                <div className="col-md-12">
                </div>
              </div>
            </div>

            <div className="listing-shot-info rating">
              <div className="row extra">
                <Rating/>
                <div className="col-md-5 col-sm-5 col-xs-6 pull-right">
                  <a href="#" className="detail-link">Gehe zu</a>
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
