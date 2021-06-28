import React, {useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { userSelector } from '../../Store/userStore'
import { createResume, resumeSelector } from '../../Store/resumeStore'
import { TextField , Button, Tooltip} from '@material-ui/core'
import SaveIcon from '@material-ui/icons/Save'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import Skeleton from './Skeleton'


const ResumeInfos = props => {

    const dispatch = useDispatch()

    const resumeHolded = useSelector(resumeSelector)
    const user = useSelector(userSelector)

    const [titleError, setTitleError] = useState(false)
    const [skill, setSkill] = useState('')
   

    const initialState = {
        userId : user._id,
        resumeTitle: resumeHolded.resumeTitle || '',
        portfolio: resumeHolded.portfolio || '',
        socialMedias : resumeHolded.socialMedia || '' ,
        expertise : resumeHolded.expertise || [],
        softSkills : resumeHolded.softSkills || []
    }

    const [resumeInfos, setResumeInfos] = useState(initialState)

    const handleChange = e => {
        const {name, value} = e.target
        setResumeInfos({...resumeInfos, [name]: value})
    }

    const handleSubmit = () => {
        dispatch(createResume(resumeInfos))
    }

    return (
        <Skeleton 
            mainTitle='About your profile'
            previewChips = {[{chips : resumeInfos.expertise, title: 'Expertise'}, {chips: resumeInfos.softSkills, title:  'Soft Skills'}]}
        >
            <h3>Position *</h3>
            <TextField 
                    error={titleError}
                    type='text'
                    helperText={titleError && 'A title must be filled'}
                    value={resumeInfos.resumeTitle}
                    size='small' 
                    fullWidth  
                    style={{color:'#574b90'}}
                    name='resumeTitle'
                    onChange={(e) => {
                        titleError && setTitleError(false)
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
                    helperText={resumeInfos.expertise.join(' ')}
                    value={skill}
                    size='small' 
                    fullWidth   
                    style={{color:'#574b90'}}
                    name='expertise'
                    onChange={(e) =>{ 
                        setSkill(e.target.value)
                    }}
                />
                <Tooltip title='click to add skill'>
                    <AddCircleOutlineIcon
                        style={{position:'absolute', right:'10px' ,fontSize:'22px', color:'#786fa6', cursor:'pointer'}}
                        onClick={() => {
                            if (skill !== '') {
                                setResumeInfos({...resumeInfos, expertise: [...resumeInfos.expertise, skill]})
                                setSkill('')
                            }
                        }}
                    />
                </Tooltip>
            </div>
            <div style={{marginTop:'30px'}}>
                <h3 >Others Skills </h3>
                <TextField 
                    helperText='Languages, etc...'
                    value={resumeInfos.softSkills}
                    size='small' 
                    fullWidth   
                    style={{color:'#574b90'}}
                    name='softSkills'
                    onChange={(e) =>{ 
                        handleChange(e, 'text')
                    }}
                />
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