import React, {useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import { updateResumeToDb, resumeSelector } from '../../Store/resumeStore'
import { TextField , Button, Tooltip} from '@material-ui/core'
import SaveIcon from '@material-ui/icons/Save'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import Skeleton from './Skeleton'
import {isStringEmpty} from '../../Helpers/checkFormat'


const ResumeInfos = props => {

    const dispatch = useDispatch()
    const history = useHistory()

    const resumeHolded = useSelector(resumeSelector)
   
    const [postionError, setPositionError] = useState(false)
    const [skill, setSkill] = useState('')
    const [softSkill,  setSoftSkill] = useState('')
   

    const initialState = {
        position: resumeHolded.position || '',
        portfolio: resumeHolded.portfolio || '',
        socialMedias : resumeHolded.socialMedia || '' ,
        expertises : resumeHolded.expertises || [],
        softSkills : resumeHolded.softSkills || [],
    }

    const [resumeInfos, setResumeInfos] = useState(initialState)

    const handleChange = e => {
        const {name, value} = e.target
        setResumeInfos({...resumeInfos, [name]: value})
    }

    const handleSubmit = () => {
        if (isStringEmpty(resumeInfos.position)) return setPositionError(true)
        else {
            dispatch(updateResumeToDb(resumeInfos, resumeHolded._id, 'resumeInfos'))
            setTimeout(() =>  history.push('/resume/form/work-experience-infos'), 2000) 
        }
    }

    return (
        <Skeleton 
            mainTitle='About your profile'
            next='/resume/form/work-experience-infos'
            previewChips = {[
                {chips : resumeInfos.expertises, 
                title: 'Expertise', 
                delete: chip => setResumeInfos({...resumeInfos, expertises: resumeInfos.expertises.filter(j => j !== chip)})
                }, 
                {chips: resumeInfos.softSkills, 
                title: 'Soft Skills',
                delete: chip => setResumeInfos({...resumeInfos, softSkills: resumeInfos.softSkills.filter(j => j !== chip)})
            }
            ]}
        >
            <h3>Position *</h3>
            <TextField 
                    error={postionError}
                    type='text'
                    helperText={postionError && 'A position must be defined'}
                    value={resumeInfos.position}
                    size='small' 
                    fullWidth  
                    style={{color:'#574b90'}}
                    name='position'
                    onChange={(e) => {
                        postionError && setPositionError(false)
                        handleChange(e,'text')
                    }}
                />
            <div style={{marginTop:'30px'}}>
                <h3 >Portfolio / Website </h3>
                <TextField  
                    value={resumeInfos.portfolio}
                    size='small' 
                    fullWidth   
                    style={{color:'#574b90'}}
                    name='portfolio'
                    onChange={(e) =>{ 
                        handleChange(e, 'text')
                    }}
                />
            </div>
            <div style={{marginTop:'30px'}}>
                <h3 >Social Medias Links </h3>
                <TextField 
                    helperText='LinkedIn, Twitter, etc...'
                    value={resumeInfos.portfolio}
                    size='small' 
                    fullWidth   
                    style={{color:'#574b90'}}
                    name='socialMedias'
                    onChange={(e) =>{ 
                        handleChange(e, 'text')
                    }}
                />
            </div>
            <div style={{marginTop:'30px', position:'relative'}}>
                <h3 >Expertise / Skills </h3>
                <TextField 
                    helperText='write your core skill and add'
                    value={skill}
                    size='small' 
                    fullWidth   
                    style={{color:'#574b90'}}
                    name='expertises'
                    onChange={e => setSkill(e.target.value)}
                />
                <Tooltip title='click to add skill'>
                    <AddCircleOutlineIcon
                        style={{position:'absolute', right:'10px' ,fontSize:'22px', color:'#786fa6', cursor:'pointer'}}
                        onClick={() => {
                            if (skill !== '') {
                                setResumeInfos({...resumeInfos, expertises: [...resumeInfos.expertises, skill]})
                                setSkill('')
                            }
                        }}
                    />
                </Tooltip>
            </div>
            <div style={{marginTop:'30px' , position:'relative'}}>
                <h3 >Others Skills </h3>
                <TextField 
                    helperText='write your soft skill and add'
                    value={softSkill}
                    size='small' 
                    fullWidth   
                    style={{color:'#574b90'}}
                    name='softSkills'
                    onChange={e => setSoftSkill(e.target.value)}
                />
                <Tooltip title='click to add skill'>
                    <AddCircleOutlineIcon
                        style={{position:'absolute', right:'10px' ,fontSize:'22px', color:'#786fa6', cursor:'pointer'}}
                        onClick={() => {
                            if (softSkill !== '') {
                                setResumeInfos({...resumeInfos, softSkills: [...resumeInfos.softSkills, softSkill]})
                                setSoftSkill('')
                            }
                        }}
                    />
                </Tooltip>
            </div>
            <div style={{marginTop:'30px', display:'flex', justifyContent:'flex-end'}}>
                <Button 
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


export default ResumeInfos