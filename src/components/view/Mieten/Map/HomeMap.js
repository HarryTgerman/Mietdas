import React, {Component} from 'react';
import AppMap from './Mapcomponent';


class HomeMap extends Component{
  constructor(props){
    super(props)

}

        render(){
          return(
              <div>
                <div className="col-md-4 hidden-sm hidden-xs">
                  <div className="side-full-map">
                    <AppMap markers={this.props.markers} center={this.props.center} gebiet={this.props.gebiet} position={this.props.position}/>
                  </div>
                </div>
              </div>
            )
        }
    }

export default HomeMap;
