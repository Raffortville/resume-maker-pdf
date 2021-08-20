import React from 'react'
import { useHistory } from 'react-router'
import { useSelector } from 'react-redux'
import { resumeSelector } from '../../Store/resumeStore'
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded'
import EditRoundedIcon from '@material-ui/icons/EditRounded'
import { Tooltip, Button } from '@material-ui/core'
import useCheckResumeState from '../Resume/useCheckResumeState'

import './Resume.css'

const SummaryResume = props => {

    const history = useHistory()
    const resume = useSelector(resumeSelector)
    const {sections, resumeState} = useCheckResumeState()


    return (
        <div 
            className='root-container resume'
            style={{display:'flex', flexDirection:'column', alignItems:'center'}}
        >
            <h2 className='form-main-title'>Summary</h2>
                <div style={{marginTop:'30px', width:'500px'}}>
                    {sections.map((e, i) => 
                            <div key={i} style={{display:'flex', justifyContent:'space-between', alignItems:'center', borderBottom:'1px solid #BDBDBD', margin:'40px 0px'}}>
                               <div style={{width:'280px'}}> 
                                   <h3 className='summary-title'>{e.section}</h3>
                                </div>
                                <p style={{color:'#786fa6'}}>{e.status}</p>
                                    {e.status === 'complete' 
                                        ? <Tooltip title={`Go to ${e.section} section`}>
                                            <CheckCircleRoundedIcon 
                                                className='summary-icon success'
                                                onClick={()=> history.push(e.link)}
                                            />
                                        </Tooltip> 
                                        : <Tooltip title={`Go to ${e.section} section`}>
                                            <EditRoundedIcon 
                                                className ='summary-icon incomplete'
                                                onClick={()=> history.push(e.link)}
                                            />
                                        </Tooltip>
                                    }
                            </div>
                    )}
                </div>
                <div style={{marginTop:'10px'}}>
                <Button 
                    disabled={resumeState === 'complete' ? false : true}
                    style={{color:'#574b90'}}
                    variant='outlined'
                    onClick={()=> history.push(`/resume/final/${resume._id}`)}
                >
                    See your CV !
                </Button>
            </div>
            
        </div>
    )
}


export default SummaryResume