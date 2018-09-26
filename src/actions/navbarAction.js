import { FETCH_NAVBAR } from './types';


export const fetchNavbar = (navbarClass = '') =>  dispatch => {

  dispatch({
    type: FETCH_NAVBAR,
    payload: navbarClass
  })

}
