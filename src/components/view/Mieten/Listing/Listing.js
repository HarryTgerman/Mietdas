import React, {Component} from 'react'
import Cards from './Cards'
import * as firebase from 'firebase'


class  Listing extends Component {


  constructor(props){
    super(props)
}



   render(){
    return(
          <div>
              {this.props.cards.map((card) => {
                return(<Cards cardHeading={card.cardHeading} cardDesc={card.cardDesc}
               cardPreis={card.cardPreis} id={card.id} bewertung={card.cardBewertung}
               image={card.cardImage} standOrt={card.standOrt} imageArr={card.imageArr}
               gewicht={card.gewicht} grabtiefe={card.grabtiefe} transportbreite={card.transportbreite}
                transporthoehe={card.transporthoehe} snap={card.snap}/>)
              })
            }
          </div>
    )
  }
}

export default  Listing
