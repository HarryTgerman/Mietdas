import React, {Component} from 'react';
import firebase from 'firebase'
import Logo from'../../img/logo.png'
import LogoWhite from'../../img/logo-white.png'
import {NavLink, Redirect,Link} from 'react-router-dom'

import { connect } from 'react-redux';
import { fetchAuthState } from '../../actions/authAction';


class Navbar extends Component {

  constructor(props){
    super(props)
    this.state = {
       authenticated: false,
     }
    }

  componentWillMount(){
    this.props.fetchAuthState()
    }
componentWillReceiveProps(nextProps){
  if (nextProps.authState.authenticated == false) {
    this.setState({
      authenticated: false,
    })
  }
}
        render(){
          return(
            <div>
              {this.props.authState.authenticated ?(
                <div className={this.props.navState}>
                <div className="wrapper">
                   {/*Start Navigation*/}
                  <div className="navbar navbar-default navbar-fixed navbar-transparent white bootsnav">
                    <div style={{paddingBottom: "0"}}  className="container">
                      <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#navbar-menu">
                        <i className="ti-align-left"></i>
                      </button>

                       {/*Start Header Navigation*/}
                      <div className="navbar-header">
                        <NavLink to="/">
                          <img src={Logo}  className="logo logo-scrolled" alt=""/>
                          {this.props.navState ? (<img src={LogoWhite} className="logo logo-display" alt=""/>) : (<img src={Logo}  className="logo logo-display" alt=""/>)}
                        </NavLink>
                      </div>

                       {/*Collect the nav links, forms, and other content for toggling*/}
                      <div className="collapse navbar-collapse" id="navbar-menu">
                        <ul className="nav navbar-nav navbar-center">
                        <li className="dropdown">
                          <NavLink to="/so-geht-mieten">So geht mieten</NavLink>
                        </li>
                        <li className="dropdown">
                          <NavLink to="/mieten" >Mieten</NavLink>
                        </li>
                        <li className="dropdown">
                          <NavLink to="/vermieten" >Vermieten</NavLink>
                        </li>
                          {this.props.authState.authenticated ?(<li className="dropdown">
                              <NavLink to="/logout" >Logout</NavLink>
                            </li>)
                          :(<li><a  href="javascript:void(0)"  data-toggle="modal" data-target="#signup">Log-In</a></li>)}
                        </ul>
                        <ul className="nav navbar-nav navbar-right" data-in="fadeInDown" data-out="fadeOutUp">
                        { this.props.authState.authenticated ?(<li className="no-pd"><NavLink to="/benutzeraccount" className="addlist">
                        {this.props.authState.showPhotoUrl ? (<img src={this.props.authState.photoUrl} className="avater-img" alt=""/>)
                        :(<i className="ti-user"></i>)}{this.props.authState.name}</NavLink></li>)
                        :(null)
                        }
                        </ul>
                      </div>
                       {/*.navbar-collapse*/}
                    </div>
                  </div>
                </div>
              </div>
              ):(
                <div className="wrapper">
                  {/* Start Navigation */}
                  <div  className="navbar navbar-default navbar-fixed navbar-transparent white bootsnav">
                    <div style={{paddingBottom: "0"}}  className="container">
                      <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#navbar-menu">
                        <i className="ti-align-left"></i>
                      </button>

                       {/*Start Header Navigation*/}
                      <div className="navbar-header">
                        <NavLink to="/">
                          <img src={Logo} className="logo logo-display" alt=""/>
                          <img src={Logo} className="logo logo-scrolled" alt=""/>
                        </NavLink>
                      </div>

                       {/*Collect the nav links, forms, and other content for toggling*/}
                      <div className="collapse navbar-collapse" id="navbar-menu">
                        <ul className="nav navbar-nav navbar-center" data-in="fadeInDown" data-out="fadeOutUp">

                        <li className="dropdown">
                          <NavLink to="/mieten" >Mieten</NavLink>
                        </li>
                        <li className="dropdown">
                          <NavLink to="/vermieten" >Vermieten</NavLink>
                        </li>
                        {this.props.authState.authenticated ?(<li className="dropdown">
                            <NavLink to="/logout" >Logout</NavLink>
                          </li>)
                        :(<li><a  href="javascript:void(2)"  data-toggle="modal" data-target="#signup">Log-In</a></li>)}
                      </ul>
                      <ul className="nav navbar-nav navbar-right" data-in="fadeInDown" data-out="fadeOutUp">
                      { this.props.authState.authenticated ?(<li className="no-pd"><NavLink to="/benutzeraccount" className="addlist">
                      {this.props.authState.showPhotoUrl ? (<img src={this.props.authState.photoUrl} className="avater-img" alt=""/>)
                      :(<i className="ti-user"></i>)}{this.props.authState.name}</NavLink></li>)
                      :(null)
                      }
                        </ul>
                      </div>
                       {/*.navbar-collapse*/}
                    </div>
                  </div>
                </div>
              )}
              </div>
            )
        }
    }

const mapStateToProps = state => ({
  navState: state.navState.items,
  authState: state.authState.items
})

export default connect(mapStateToProps, { fetchAuthState })(Navbar);
