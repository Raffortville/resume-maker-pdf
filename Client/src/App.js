import React, {useEffect, useState} from "react"
import { useDispatch, useSelector } from "react-redux"
import {BrowserRouter as Router} from "react-router-dom"

import Header from './Components/header/Header'
import {auth} from './Services/firebase'
import {getUser} from "./Store/userStore"
import { setLoading, loadingSelector } from "./Store/alertStore"
import { alertSelector } from './Store/alertStore'
import Alert from '@material-ui/lab/Alert'
import Spinner from "./Components/Ux/Spinner"
import MainRoutes from "./Routes/MainRoutes"
import ResumeRoutes from './Routes/ResumeRoutes'



function App() {

  const dispatch = useDispatch()
  
  const [isUserLogged, setUserLogged] = useState(false)

  const alert = useSelector(alertSelector)
  const isLoading = useSelector(loadingSelector)

  useEffect(() => {
    dispatch(setLoading(true))
    auth.onAuthStateChanged((user) => {
      if (user) {
        console.log('user connected')
        dispatch(getUser(user.email))
        setUserLogged(true)

      } else {
        console.log('user NOT connected')
        dispatch(setLoading(false))
        setUserLogged(false)
      }
    })
  },[dispatch])
  
  
  return (
    <Router>
      {isLoading 
        ? <Spinner/>
        : <>
          <div className='alert-container'>
              {alert?.message !== '' &&
                <Alert severity={alert.type || 'info'}>{alert.message}</Alert>
              }
            </div>
            <Header/>
            <MainRoutes isUserLogged={isUserLogged}/>
            <ResumeRoutes isUserLogged={isUserLogged}/>
          </>
      }
    </Router>
  )
}

export default App;
