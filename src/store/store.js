import {createStore,combineReducers,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import listReduser from './reducers/rootReduser'

const redusers = combineReducers({
  listReduser:listReduser
})

const store =createStore(redusers,applyMiddleware(thunk))


export default store;