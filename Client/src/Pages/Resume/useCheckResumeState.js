import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { resumeSelector } from "../../Store/resumeStore";
import { isStringEmpty } from "../../Helpers/checkFormat";

const useCheckResumeState = () => {

   const resume = useSelector(resumeSelector)

   const initialState = [
      {
         section:'About your profile',
         link: '/resume/form/resume-infos'
      },
      {
         section:'About your work experiences',
         link: '/resume/form/work-experience-infos'
      },
      {
         section:'Picture and design',
         link: '/resume/form/medias'
      }
  ]

   const [sections, setSections] = useState(initialState)
   const [resumeState, setResumeState] = useState()

   useEffect(() => {
      setSections(sections.map(e => {
         if (e.section === 'About your profile') {
            if ( isStringEmpty(resume.position))
               e = {...e, status: 'incomplete'}
            else e = {...e, status:'complete'}

         } else if (e.section === 'About your work experiences') {
               if (!isStringEmpty(resume.experiences[0]?.company) && !isStringEmpty(resume.experiences[0]?.occupiedPosition) && !isStringEmpty(resume.experiences[0]?.place) && !isStringEmpty(resume.experiences[0]?.period)) {
                  e = {...e, status:'complete'}
               } else e = {...e, status:'incomplete'}
       
           } else if (e.section === 'Picture and design') {
               if (!isStringEmpty(resume.colorMain) && !isStringEmpty(resume.profilPic)) {
                  e = {...e, status: 'complete'}
               } else e = {...e, status: 'incomplete'}
           }
         return e
      
      }))
      
   },[resume])

   useEffect(() => {
     sections.some(e => e.status === 'incomplete' ? setResumeState('draft') : setResumeState('complete'))
   }, [sections])

  return {sections, resumeState}
}


export default useCheckResumeState