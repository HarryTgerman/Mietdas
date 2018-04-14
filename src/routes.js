import React, {Component} from 'react';
import {BrowserRouter, Route, withProps} from 'react-router-dom';


import Home from './components/view/Home/Home'
import Mieten from './components/view/Mieten/Mieten'
import Logout from './components/Logout/Logout'
import Account from './components/view/Account/Account'
import Artikelbearbeiten from './components/view/Account/Artikelbearbeiten/Artikelbearbeiten'
import MietDetails from './components/view/Mieten/MietDetails/MietDetails'
import Footer from './components/Footer/Footer'
import Reservierung from './components/view/Mieten/MietDetails/Reservierung'
import Vermieten from './components/view/Vermieten/Vermieten'
import AccountErstellen from './components/view/AccountErstellen/AccountErstellen'
import Payment from './components/PaymentMethod/Payment'

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
                      <Route name= 'details' path='/details/search=?:id/:id' component={MietDetails}/>
                      <Route name= 'anfragen' path='/anfragen/:cardId' component={Reservierung}/>
                      <Route name= 'Vermieten' path='/vermieten' component={Vermieten}/>
                      <Route name= 'AccountErstellen' path='/account-erstellen' component={AccountErstellen}/>
                      <Route name= 'Bezahlen' path='/reservierung:id/payment' component={Payment}/>
                    </div>
                    <Footer/>
                  </div>
                </BrowserRouter>
            )
        }
    }

export default Routes;
