import {applyMiddleware, createStore, combineReducers} from 'redux'
import fileReducer from './fileReducer'
import userReducer from './userReducer'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import uploadReducer from "./uploadReducer";
import appReducer from "./appReducer";

const rootReducer = combineReducers({
    user: userReducer,
    file: fileReducer,
    upload: uploadReducer,
    app: appReducer
})

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))

export default store