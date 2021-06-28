import React from 'react'
import { Switch, Route } from 'react-router-dom'
import PrivateRoute from '../HOC/PrivateRoute'

import Landing from '../Pages/Landing'
import Connexion from '../Pages/Connexion/Connexion'
import Home from '../Pages/Dashboard/Home'

const MainRoutes = props => {

    const {isUserLogged} = props

    return (
        <Switch>
            <Route exact path='/' component={Landing}/>
            <Route exact path='/connexion' component={Connexion}/>
            <PrivateRoute exact path='/resume' component={Home} isUserLogged={isUserLogged}/>
        </Switch>
    )
}

export default MainRoutes