import { FETCH_NAVBAR } from '../actions/types';


const initialState = {
  items: [],
}

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_NAVBAR:
    return {
        ...state,
       items: action.payload
     };
    default: return state;

  }
}
