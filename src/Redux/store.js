import { applyMiddleware, combineReducers, legacy_createStore, compose } from 'redux'
import thunk from 'redux-thunk'
import { reducer as AppRedux } from './AppRedux/reducer'
import { reducer as AuthRedux } from './AuthRedux/reducer'


const composeEnhancers = (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose);
const rootReducer = combineReducers({ AppRedux, AuthRedux })
const store = legacy_createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));


export { store }
