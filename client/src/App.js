import React, { Fragment, useEffect } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Landing, Header } from './components/layout'
import { Register, Login } from './components/auth'
import './styles/index.scss'
import { Provider } from 'react-redux'
import store from './store'
import Alert from './components/layout/Alert'
import { userLoaded } from './actions'
import { setAuthToken } from './utils'

if(localStorage.token) {
  setAuthToken(localStorage.token)
}
const App = () => {
  useEffect(() => {
    store.dispatch(userLoaded())
  }, [])
  return(
  <Provider store={store}>
  <Router>
  <Fragment>
    <Header />
    <Route exact path = '/' component={Landing} />
    <section className='container'>
      <Alert/>
      <Switch>
        <Route exact path='/login' component={Login} />
        <Route exact path='/register' component={Register} />

      </Switch>
    </section>
  </Fragment>
  </Router>
  </Provider>
)}

export default App
