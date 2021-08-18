import React,{useState, useEffect} from 'react'
import { useSelector } from 'react-redux'
import { resumeSelector } from '../../Store/resumeStore'
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded'
import EditRoundedIcon from '@material-ui/icons/EditRounded'
import { isStringEmpty } from '../../Helpers/checkFormat'

import './Resume.css'

const SummaryResume = props => {

    const resume = useSelector(resumeSelector)
    const initialState = [
        {
            section:'About your profile',
            link: ''
        },
        {
            section:'About your work experiences',
            link: ''
        },
        {
            section:'Picture and design',
            link: ''
        }
    ]

    const [summary, setSummary] = useState(initialState)

    useEffect(() => {
        setSummary(summary.map(sum => {

            if (sum.section === 'About your profile') {
                if ( isStringEmpty(resume.position))
                    sum = {...sum, status: 'incomplete'}
                else sum = {...sum, status:'complete'}
        
            } else if (sum.section === 'About your work experiences') {
                if (!isStringEmpty(resume.company) && !isStringEmpty(resume.occupiedPosition) && !isStringEmpty(resume.place) && !isStringEmpty(resume.period)) {
                    sum = {...sum, status:'complete'}
                } else sum = {...sum, status:'incomplete'}
        
            } else if (sum.section === 'Picture and design') {
                if (!isStringEmpty(resume.colorMain) && !isStringEmpty(resume.profilPic)) {
                    sum = {...sum, status: 'complete'}
                } else sum = {...sum, status: 'incomplete'}
            }
               return sum
        }))

    }, [resume])


    return (
        <div 
            className='root-container resume'
            style={{display:'flex', flexDirection:'column', alignItems:'center'}}
        >
            <h2 className='form-main-title'>Summary</h2>
                <div style={{marginTop:'30px', width:'500px'}}>
                    {summary.map((e, i) => 
                            <div key={i} style={{display:'flex', justifyContent:'space-between', alignItems:'center', borderBottom:'1px solid #BDBDBD', margin:'40px 0px'}}>
                               <div style={{width:'280px'}}> 
                                   <h3 className='summary-title'>{e.section}</h3>
                                </div>
                                <p style={{color:'#786fa6'}}>{e.status}</p>
                                    {e.status === 'complete' 
                                        ? <CheckCircleRoundedIcon className='summary-icon success'/>
                                        : <EditRoundedIcon className ='summary-icon incomplete'/>
                                    }
                            </div>
                    )}
                </div>
            
        </div>
    )
}


export default SummaryResume