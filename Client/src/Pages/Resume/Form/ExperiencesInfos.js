import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import Skeleton from '../Skeleton'
import { updateResumeToDb } from '../../../Store/resumeStore'
import {resumeSelector} from '../../../Store/resumeStore'
import { TextField, TextareaAutosize, Button } from '@material-ui/core'
import SaveIcon from '@material-ui/icons/Save'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle'
import { isStringEmpty } from '../../../Helpers/checkFormat'
import useCheckResumeState from '../useCheckResumeState'

import '../Resume.css'

const ExperiencesInfos = props => { 

    const history = useHistory()
    const dispatch = useDispatch()
    const resumeHolded = useSelector(resumeSelector)

    const initialState = {
        company: '',
        period:  '',
        place: '',
        occupiedPosition: '',
        achievements: '',
        stack:  '',
        description:  '',
        project: '',
        companyError : false,
        periodError: false,
        placeError: false,
        occupiedPositionError: false
    }
   
    const [experiences, setExperiences] = useState([])
    const [disabled, setDisabled] = useState(true)

    useEffect(() => {
        resumeHolded.experiences.length > 0 
        ? setExperiences(resumeHolded.experiences.map(exp => 
            exp = {...exp,
            companyError : false,
            periodError: false,
            placeError: false,
            occupiedPositionError: false
        })) 
        : setExperiences([initialState])
    }, [])

    useEffect(() => {
        if(experiences.every(exp => exp.company !== '' & exp.place !== '' & exp.occupiedPosition !== '' & exp.period !== '')){
           setDisabled(false)
        } else setDisabled(true)
    },[experiences])

    const {resumeState} = useCheckResumeState()
  
    const handleChange = (e, index) => {
       const {value, name} = e.target

        setExperiences(experiences.map((experience, i) => {
            if (i === index) {
                experience = {...experience, [name]: value}
            }
            return experience
        }))
    }

    const handleSubmit = () => {

        let experiencesCopy = experiences.map(exp => {
            return  exp = 
                {...exp, 
                    companyError: isStringEmpty(exp.company),
                    placeError : isStringEmpty(exp.place),
                    occupiedPositionError : isStringEmpty(exp.occupiedPosition),
                    periodError : isStringEmpty(exp.period)
                }
            }
        )

        setExperiences(experiencesCopy)
     
      if(!disabled) {
            const filtredExperiences = experiences.map(({companyError, placeError, occupiedPositionError, periodError, ...rest}) => rest)
            dispatch(updateResumeToDb({experiences: filtredExperiences, ...resumeState === "complete" && {state: 'complete'}},resumeHolded._id, 'experiences'))
            window.scrollTo(0,0)
            setTimeout(() =>  history.push('/resume/form/medias'), 2000) 
        }   
    }
  
    return (
        <Skeleton 
            mainTitle='About your work experiences'
            next='/resume/form/medias'
        >
            {experiences.map((experience, i) =>
                <div key={i} style={i !== 0 ? {marginTop:'30px'} : {}}>
                    {i !== 0 && <div className='divider'/>}
                    <h3>Company name *</h3>
                    <TextField 
                        error={experience.companyError}
                        type='text'
                        helperText={experience.companyError && 'Company name must be filled'}
                        value={experience.company}
                        size='small' 
                        fullWidth  
                        style={{color:'#574b90'}}
                        name='company'
                        onChange={e => {
                            handleChange(e, i)
                        }}
                    />
                    <div style={{marginTop:'30px'}}>
                        <h3>Period *</h3>
                        <TextField 
                            error={experience.periodError}
                            type='text'
                            helperText={experience.periodError && 'A Period must be defined'}
                            value={experience.period}
                            size='small' 
                            fullWidth  
                            style={{color:'#574b90'}}
                            name='period'
                            onChange={(e) => {
                                handleChange(e,i)
                            }}
                        />
                    </div>
                    <div style={{marginTop:'30px'}}>
                        <h3>Place / City *</h3>
                        <TextField 
                            error={experience.placeError}
                            type='text'
                            helperText={experience.placeError && 'A Place must be defined'}
                            value={experience.place}
                            size='small' 
                            fullWidth  
                            style={{color:'#574b90'}}
                            name='place'
                            onChange={(e) => {
                                handleChange(e,i)
                            }}
                        />
                    </div>
                    <div style={{marginTop:'30px'}}>
                        <h3>Occupied position *</h3>
                        <TextField 
                            error={experience.occupiedPositionError}
                            type='text'
                            helperText={experience.occupiedPositionError && 'A position must be defined'}
                            value={experience.occupiedPosition}
                            size='small' 
                            fullWidth  
                            style={{color:'#574b90'}}
                            name='occupiedPosition'
                            onChange={(e) => {
                                handleChange(e,i)
                            }}
                        />
                    </div>
                    <div style={{marginTop:'30px'}}>
                        <h3>Achievements</h3>
                        <TextField 
                            type='text'
                            value={experience.achievements}
                            size='small' 
                            fullWidth  
                            style={{color:'#574b90'}}
                            name='achievements'
                            onChange={(e) => {
                                handleChange(e,i)
                            }}
                        />
                    </div>
                    <div style={{marginTop:'30px'}}>
                        <h3>Stack</h3>
                        <TextField 
                            type='text'
                            value={experience.stack}
                            size='small' 
                            fullWidth  
                            style={{color:'#574b90'}}
                            name='stack'
                            onChange={(e) => {
                                handleChange(e,i)
                            }}
                        />
                    </div>
                    <div style={{marginTop:'30px'}}>
                        <h3>Description</h3>
                        <TextareaAutosize
                            style={{width:'100%', marginTop:'5px'}}
                            rowsMax={4}
                            rowsMin={3}
                            placeholder="Describe your experience in few words"
                            defaultValue={experience.description}
                        />
                    </div>
                    <div style={{marginTop:'30px'}}>
                        <h3>Project</h3>
                        <TextField 
                            type='text'
                            helperText='Project name, website, app, etc...'
                            value={experience.project}
                            size='small' 
                            fullWidth  
                            style={{color:'#574b90'}}
                            name='project'
                            onChange={(e) => {
                                handleChange(e,i)
                            }}
                        />
                    </div>
                    <div style={{display: 'flex', alignItems:'center', margin:'10px 0px'}}>
                        {( experiences.length > 1 && i === 0 ) || experiences.length === 3 
                            ? 
                                <>
                                    <RemoveCircleIcon
                                        style={{color:'#574b90', fontSize:'30px', marginRight:'10px', cursor:'pointer'}}
                                        onClick={() => setExperiences(experiences.filter((exp, index) => i !== index))}
                                    /> 
                                    Remove this work experience ? 
                                </>
                               
                            : 
                                <> 
                                    <AddCircleIcon 
                                        style={{color:'#574b90', fontSize:'30px', marginRight:'10px', cursor:'pointer'}}
                                        onClick={() => setExperiences([...experiences, initialState])}
                                    /> 
                                    Add another work experience ? 
                                </>
                        }
                    </div>
                    
                </div>
            )}
            <div style={{marginTop:'30px', display:'flex', justifyContent:'flex-end'}}>
                <Button 
                    disabled={disabled}
                    style={{color:'#574b90'}}
                    startIcon={<SaveIcon style={{color:'#574b90', fontSize:'30px'}}/>}
                    variant='outlined'
                    onClick={() => handleSubmit()}
                >
                    Save and Next
                </Button>
            </div>
        </Skeleton>
    )
}

export default ExperiencesInfos