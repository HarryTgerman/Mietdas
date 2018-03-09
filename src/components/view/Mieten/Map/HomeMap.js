import React, {Component} from 'react';



class HomeMap extends Component{
  constructor(props){
    super(props)

}

        render(){
          return(
              <div>
                <div className="col-md-4 col-sm-12">
                  <div className="side-full-map">
                    <div id="home-map"></div>
                  </div>
                </div>
              </div>
            )
        }
    }

export default HomeMap;
