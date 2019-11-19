/* 
  用来创建爱store对象
*/

import {createStore,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import reducers from './reducers'

const middleware = process.env.NODE_DEV === 'development' ? composeWithDevTools(applyMiddleware(thunk)) : applyMiddleware(thunk)

export default createStore(reducers,middleware)