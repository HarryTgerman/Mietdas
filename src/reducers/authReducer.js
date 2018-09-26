import { FETCH_AUTHSTATUS } from '../actions/types';


const initialState = {
  items: {
    authenticated: false,
    name : '',
    email : '',
    uid : '',
  },
}

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_AUTHSTATUS:
    return {
        ...state,
       items: action.payload
     };
    default: return state;

  }
}
