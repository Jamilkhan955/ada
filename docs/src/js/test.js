import './common'

// React
import React from 'react'
import ReactDOM from 'react-dom'

import { createStore, bindActionCreators, combineReducers, applyMiddleware, compose } from 'redux'
import { Provider, connect } from 'react-redux'

import { Switch } from 'react-router'
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux'
import createHistory from 'history/createHashHistory'

import ReactApp from './App.jsx'

import reducer from './reducers'
import * as Actions from './actions'

// React test
const history = createHistory()
const middleware = routerMiddleware(history)
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(combineReducers(Object.assign(
  reducer,
  { router: routerReducer }
)), composeEnhancers(applyMiddleware(middleware)))
const mapStateToProps = state => ({
  name: state.name
})
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Actions, dispatch)
})
const App = connect(
  mapStateToProps,
  mapDispatchToProps
)(ReactApp)

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <App />
      </Switch>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('react')
)

// hbs test
// const tmpl = require('main.hbs')

// const htmlStr = tmpl({
//   name: '张三',
//   age: 22,
//   sexNum: 1
// })

// document.getElementById('hbs-test').innerHTML = htmlStr

// lazy test
// import('common/lazy.js').then(({LAZY}) => {
//     console.log(LAZY)
// })
