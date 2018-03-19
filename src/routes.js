import React, {Component} from 'react';
import {BrowserRouter, Route, withProps} from 'react-router-dom';


import Home from './components/view/Home/Home'
import Mieten from './components/view/Mieten/Mieten'
import Logout from './components/Logout/Logout'
import Account from './components/view/Account/Account'
import BaumaschinenAnfragen from './components/view/Account/Mitteilungen/BaumaschinenAnfragen'
import Artikelbearbeiten from './components/view/Account/Artikelbearbeiten/Artikelbearbeiten'
import MietDetails from './components/view/Mieten/MietDetails/MietDetails'
import Footer from './components/Footer/Footer'
import Payment from './components/PaymentMethod/Payment'
import Vermieten from './components/view/Vermieten/Vermieten'
import AccountErstellen from './components/view/AccountErstellen/AccountErstellen'


class Routes extends Component{
  constructor(props){
    super(props)

}

        render(){
          return(
                <BrowserRouter>
                  <div >
                    <div className='app'>
                      <Route path='/' exact component={Home}/>
                      <Route path='/mieten' exact component={Mieten}/>
                      <Route path='/logout' exact component={Logout}/>
                      <Route path='/benutzeraccount' exact component={Account}/>
                      <Route name= 'artikelbearbeiten' path='/artikelbearbeiten/:cardId' component={Artikelbearbeiten}/>
                      <Route name= 'details' path='/details/:id' component={MietDetails}/>
                      <Route name= 'anfragen' path='/anfragen/:cardId' component={Payment}/>
                      <Route name= 'baumaschinenAnfragenDetails' path='/baumaschinen_Anfragen/uid:uid/name:name/num:num' component={BaumaschinenAnfragen}/>
                      <Route name= 'Vermieten' path='/vermieten' component={Vermieten}/>
                      <Route name= 'AccountErstellen' path='/account-erstellen' component={AccountErstellen}/>
                    </div>
                    <Footer/>
                  </div>
                </BrowserRouter>
            )
        }
    }

export default Routes;
