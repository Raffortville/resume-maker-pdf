import React from 'react'
import PrivateRoute from '../HOC/PrivateRoute'

import ResumeInfos  from '../Pages/Resume/ResumeInfos'
import MainInfos from '../Pages/Resume/MainInfos'

const MainRoutes = props => {

    const {isUserLogged} = props

    return (
        <>
            <PrivateRoute path='/resume/form/main-infos' component={MainInfos} isUserLogged={isUserLogged}/>
            <PrivateRoute path='/resume/form/resume-infos' component={ResumeInfos} isUserLogged={isUserLogged}/>
        </>
    )
}

export default MainRoutes