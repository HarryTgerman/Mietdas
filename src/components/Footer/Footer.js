
import React, {Component} from 'react';
import Logo from '../../img/logo-white.png'
import { NavLink, Link} from 'react-router-dom'


class Footer extends Component{
  constructor(props){
    super(props)

}

        render(){
          const agbs = "AGB's"
          return(
              <div>
                <footer className="footer dark-bg">
                  <div className="row padd-0 mrg-0">
                    <div className="footer-text">
                      <div className="col-md-3 col-sm-12 theme-bg">
                        <div className="footer-widget">
                          <div className="textwidget">
                          <h3 className="widgettitle widget-title">Kontaktiere uns</h3>
                          <p><strong>Email:</strong> support@mietdas.de</p>
                          <img src={Logo} alt="Footer logo" className="img-responsive" />
                          </div>
                        </div>
                      </div>
                      <div className="col-md-5 col-sm-4">
                        <div className="footer-widget">
                        <h3 className="widgettitle widget-title">Routes</h3>
                        <ul className="footer-navigation">
                          <Link to="/"><li><a>Home</a></li></Link>
                          <Link to="/mieten"><li><a >Mieten</a></li></Link>
                          <Link to="/vermieten"><li><a>Vermieten</a></li></Link>
                          <Link to="/benutzeraccount"><li><a>Benutzer Profil</a></li></Link>
                          <Link to="/impressum"><li><a>Impressum</a></li></Link>
                          <Link to="/agb"><li><a>{agbs}</a></li></Link>
                        </ul>
                        </div>
                      </div>
                      <div className="col-md-4 col-sm-6">
                        <div className="footer-widget">

                          <h3 className="widgettitle widget-title">folge uns</h3>
                          <ul className="footer-social">
                            <li><a target="_blank" href="https://www.facebook.com/mietdasde"><i className="ti-facebook"></i></a></li>
                            <li><a target="_blank" href="https://www.instagram.com/mietdas"><i className="ti-instagram"></i></a></li>
                            <li><a target="_blank"  href="#"><i className="ti-youtube"></i></a></li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="footer-copyright">
                    <p>Copyright@ 2018 Mietdas Speyer</p>
                  </div>
                </footer>
              </div>
            )
        }
    }

export default Footer;
