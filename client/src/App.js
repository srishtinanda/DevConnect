import React, { Fragment, useEffect } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Landing, Footer, Header } from './components/layout'
import { Register, Login } from './components/auth'
import './styles/index.scss'
import { Provider } from 'react-redux'
import store from './store'
import Alert from './components/layout/Alert'
import { userLoaded } from './actions'
import { setAuthToken } from './utils'
import Dashboard from './components/dashboard'
import PrivateRoute from './components/routing/PrivateRoute'
import CreateProfile from './components/profile-form/createProfile'
import Profiles from './components/profiles'
import { Profile } from './components/profile'
import EditProfile from './components/profile-form/editProfile'
import AddExperience from './components/profile-form/addExperience'
import AddEducation from './components/profile-form/addEducation'
import Posts from './components/posts';
import Post from './components/posts/Post';

if(localStorage.token) {
  setAuthToken(localStorage.token)
}
const App = () => {
  useEffect(() => {
    console.log('when is it executed')
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
        <PrivateRoute exact path='/dashboard' component={Dashboard} />
        <PrivateRoute exact path='/create-profile' component={CreateProfile} />
        <PrivateRoute exact path='/profiles' component={Profiles} />
        <PrivateRoute exact path='/edit-profile' component={EditProfile} />
        <PrivateRoute exact path='/profile/:id' component={Profile} />
        <PrivateRoute exact path='/add-experience' component={AddExperience} />
        <PrivateRoute exact path='/add-education' component={AddEducation} />
        <PrivateRoute exact path='/posts' component={Posts} />
        <PrivateRoute exact path='/post/:id' component={Post} />

      </Switch>
    </section>
    <Footer />
  </Fragment>
  </Router>
  </Provider>
)}

export default App
