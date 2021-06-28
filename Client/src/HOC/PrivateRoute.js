import React from 'react'
import { useSelector } from 'react-redux'
import { Route, Redirect} from 'react-router'
import { loadingSelector } from '../Store/alertStore'
import Spinner from '../Components/Ux/Spinner'


const AuthRoute = ({component: Component, ...rest}) => {

    const isLoading = useSelector(loadingSelector)
    const {path, exact, isUserLogged} = rest

    return (
        <>
            {!isLoading
                ? <Route exact={exact} path={path} render={() => isUserLogged ? <Component/> : <Redirect to='/'/>}/>
                : <Spinner/>
            }
        </>
    )
    
}

export default AuthRoute