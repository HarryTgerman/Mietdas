import React, {Component} from 'react'
import Cards from './Cards'
import * as firebase from 'firebase'


class  Listing extends Component {


  constructor(props){
    super(props)
}



   render(){
    return(
          <div style={{minHeight:"500px"}}>
              {this.props.cards.map((card) => {
                return(<Cards  snap={card.snap} id={card.id} standOrt={card.standOrt} kat={this.props.kat}/>)
              })
            }
          </div>
    )
  }
}

export default  Listing
