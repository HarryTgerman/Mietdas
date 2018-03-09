import React, {Component} from 'react'
import { Link } from 'react-router-dom'



class  AccountCards extends Component {
  constructor(props) {
      super(props)
    }


    render(){

    return(

      <div >


        <div style={{height: "455px"}}  className="col-md-4 col-sm-12">
          <div className="listing-shot grid-style">
            <a href="#">
              <div style={{background: "grey"}} className="listing-shot-img">
                <img src={this.props.snap.imageUrl}  className="img-responsive" alt=""/>
              </div>
              <div className="listing-shot-caption">
                <h4>{this.props.snap.cardHeading}</h4>
                <p className="listing-location">{this.props.snap.standOrt}</p>
                <Link to={{ pathname: `/artikelbearbeiten/${this.props.cardId}`,
                          state: {
                                    id: this.props.cardId,
                                    snap: this.props.snap,
                                  }
        }}><span className="like-listing style-2"><i className="fa fa-edit" aria-hidden="true"></i></span></Link>
              </div>
            </a>
            <div className="listing-shot-info">
              <div className="row extra">
                <div className="col-md-12">
                  <div className="listing-detail-info">
                    <span><i className="fa fa-phone" aria-hidden="true"></i> 807-502-5867</span>
                    <span><i className="fa fa-globe" aria-hidden="true"></i> www.mysitelink.com</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="listing-shot-info rating">
              <div className="row extra">
                <div className="col-md-7 col-sm-7 col-xs-6">
                  <i className="color fa fa-star" aria-hidden="true"></i>
                  <i className="color fa fa-star" aria-hidden="true"></i>
                  <i className="color fa fa-star" aria-hidden="true"></i>
                  <i className="color fa fa-star-half-o" aria-hidden="true"></i>
                  <i className="fa fa-star" aria-hidden="true"></i>
                </div>
                <div className="col-md-5 col-sm-5 col-xs-6 pull-right">
                  <a href="#" className="detail-link">Open Now</a>
                </div>
              </div>
            </div>
          </div>
        </div>

    </div>
    )
  }
}



export default AccountCards
