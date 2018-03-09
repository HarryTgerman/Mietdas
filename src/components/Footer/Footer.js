
import React, {Component} from 'react';



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
                          <h3 className="widgettitle widget-title">Get In Touch</h3>
                          <p>7744 North Park Place<br/>
                          San Francisco, CA 714258</p>
                          <p><strong>Email:</strong> support@listinghub.com</p>
                          <p>
                          <strong>Call:</strong> <a href="tel:+774422777">777-444-2222</a>
                          </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-5 col-sm-4">
                        <div className="footer-widget">
                        <h3 className="widgettitle widget-title">About Us</h3>
                        <ul className="footer-navigation">
                          <li><a href="#">Home Version 1</a></li>
                          <li><a href="#">Home Version 2</a></li>
                          <li><a href="#">Home Version 3</a></li>
                          <li><a href="#">Home Version 4</a></li>
                          <li><a href="#">Listing Detail</a></li>
                          <li><a href="#">Listing Vertical</a></li>
                          <li><a href="#">Listing Sidebar</a></li>
                          <li><a href="#">Vertical Sidebar</a></li>
                        </ul>
                        </div>
                      </div>
                      <div className="col-md-4 col-sm-6">
                        <div className="footer-widget">
                          <h3 className="widgettitle widget-title">Connect Us</h3>
                          <img src="assets/img/footer-logo.png" alt="Footer logo" className="img-responsive" />
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
                    <p>Copyright@ 2017 Listing Hub Design By <a href="http://www.themezhub.com/" title="Themezhub" target="_blank">Themezhub</a></p>
                  </div>
                </footer>
              </div>
            )
        }
    }

export default Footer;
