import React from 'react'
import PrivateRoute from '../HOC/PrivateRoute'

import ResumeInfos  from '../Pages/Resume/Form/ResumeInfos'
import MainInfos from '../Pages/Resume/Form/MainInfos'
import ExperiencesInfos from '../Pages/Resume/Form/ExperiencesInfos'
import FinalStep from '../Pages/Resume//Form/MediaDesign'
import SummaryResume from '../Pages/Resume/Summary'
import ResumeCheck from '../Pages/Resume/Final/ResumeCheck'

const MainRoutes = props => {

    const {isUserLogged} = props

    return (
        <>
            <PrivateRoute path='/resume/form/main-infos' component={MainInfos} isUserLogged={isUserLogged}/>
            <PrivateRoute path='/resume/form/resume-infos' component={ResumeInfos} isUserLogged={isUserLogged}/>
            <PrivateRoute path='/resume/form/work-experience-infos' component={ExperiencesInfos} isUserLogged={isUserLogged}/>
            <PrivateRoute path='/resume/form/medias' component={FinalStep} isUserLogged={isUserLogged}/>
            <PrivateRoute path='/resume/summary' component={SummaryResume} isUserLogged={isUserLogged}/>
            <PrivateRoute path='/resume/final/:id' component={ResumeCheck} isUserLogged={isUserLogged}/>
        </>
    )
}

export default MainRoutes