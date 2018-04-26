
import React, {Component} from 'react';
import Logo from '../../img/logo-mietdas-310.png'


class Footer extends Component{
  constructor(props){
    super(props)

}

        render(){
          return(
              <div>
                <footer className="footer dark-bg">
                  <div className="row padd-0 mrg-0">
                    <div className="footer-text">
                      <div className="col-md-3 col-sm-12 theme-bg">
                        <div className="footer-widget">
                          <div className="textwidget">
                          <h3 className="widgettitle widget-title">Kontaktieren Sie uns</h3>
                          <p>67346 Speyer<br/>
                          Keplerstraße 10</p>
                          <p><strong>Email:</strong> support@mietdas.de</p>
                          <p>
                          <strong>Telefon:</strong> <a>017645636770</a>
                          </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-5 col-sm-4">
                        <div className="footer-widget">
                        <h3 className="widgettitle widget-title">About Us</h3>
                        <ul className="footer-navigation">
                          <li><a href="/">Home</a></li>
                          <li><a href="/mieten">Mieten</a></li>
                          <li><a href="/vermieten">Vermieten</a></li>
                          <li><a href="vermieten">Home Version 3</a></li>
                          <li><a href="/benutzeraccount">BenutzerProfil</a></li>
                        </ul>
                        </div>
                      </div>
                      <div className="col-md-4 col-sm-6">
                        <div className="footer-widget">
                          <h3 className="widgettitle widget-title">folge uns</h3>
                          <img src={Logo} alt="Footer logo" className="img-responsive" />
                          <ul className="footer-social">
                            <li><a href="#"><i className="fa fa-facebook"></i></a></li>
                            <li><a href="#"><i className="fa fa-google-plus"></i></a></li>
                            <li><a href="#"><i className="fa fa-twitter"></i></a></li>
                            <li><a href="#"><i className="fa fa-instagram"></i></a></li>
                            <li><a href="#"><i className="fa fa-pinterest"></i></a></li>
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
