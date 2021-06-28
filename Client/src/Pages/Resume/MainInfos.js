import React, {useState} from 'react'
import { useHistory } from 'react-router'
import {useSelector, useDispatch} from 'react-redux'
import {userSelector, updateUserToDB} from '../../Store/userStore'
import Skeleton from './Skeleton'
import TextField from '@material-ui/core/TextField'
import SaveIcon from '@material-ui/icons/Save'
import { Button, Tooltip } from '@material-ui/core'
import {checkInputFormat, isStringEmpty} from '../../Helpers/checkFormat'
import ClearIcon from '@material-ui/icons/Clear';

import './Resume.css'

const MainInfos = props => {

    const dispatch = useDispatch()
    const history = useHistory()

    const user = useSelector(userSelector)

    const initialState = { 
        firstName : user?.firstName ||  '', 
        lastName : user?.lastName || '', 
        city: user?.city || '', 
        phone: user?.phone || '',
        country:  user?.country || '',
        emailPro: user?.emailPro || ''
    }

    const [personalInfo, setPersonnalInfo] = useState(initialState)

    const [lastNameError, setLastNameError] = useState(false)
    const [firstNamerror, setFirstNameError] = useState(false)
    const [emailError, setEmailError] = useState(false)

    const handleChange = (e, type) => {
        const {name, value} = e.target

        if(type === 'text' & (checkInputFormat(value, 'text') || value === '')) {
            setPersonnalInfo({...personalInfo, [name]:value})

        } else  if (type === 'phone' & (checkInputFormat(value, 'number') || value === '')) {
            setPersonnalInfo({...personalInfo, [name]: value})
            let phone =+ value  
            let match = phone.toString().match(/^(\d{2})(\d{2})(\d{2})(\d{2})$/);

            if (match) {
              match =  '0' + match[1] + ' ' + match[2] + ' ' + match[3] + ' ' + match[4]
              setPersonnalInfo({...personalInfo, phone: match})
            }

        } else {
            setPersonnalInfo({...personalInfo, [name]: value})
        }
    }
   

    const submitPersonnalInfo = () => {

        if(isStringEmpty(personalInfo.firstName)) {
            setFirstNameError(true)

        } else if(isStringEmpty(personalInfo.lastName)) { 
            setLastNameError(true) 

        } else if (!checkInputFormat(personalInfo.emailPro, 'email')) {
            setEmailError(true)

        } else {
            dispatch(updateUserToDB(personalInfo, user._id))
            setTimeout(() =>  history.push('/resume/form/resume-infos'), 2000) 
        }
    }
    
    return (
        <Skeleton 
            mainTitle='About you'
            next='/resume/form/resume-infos'
        >
            <div>
                <h3 >First name *</h3>
                <TextField 
                    error={firstNamerror}
                    type='text'
                    helperText={firstNamerror && 'First name must be filled'}
                    value={personalInfo.firstName}
                    required 
                    size='small' 
                    fullWidth  
                    style={{color:'#574b90'}}
                    name='firstName'
                    onChange={(e) => {
                        handleChange(e, 'text')
                        firstNamerror && setFirstNameError(false)
                    }}
                />
            </div>
            <div style={{marginTop:'30px'}}>
                <h3 >Last name *</h3>
                <TextField  
                    error={lastNameError}
                    helperText={lastNameError && 'Last name must be filled'}
                    value={personalInfo.lastName}
                    size='small' 
                    fullWidth   
                    style={{color:'#574b90'}}
                    name='lastName'
                    onChange={(e) =>{ 
                        handleChange(e, 'text')
                        lastNameError && setLastNameError(false)
                    }}
                />
            </div>
            <div style={{marginTop:'30px'}}>
                <h3 >City</h3>
                <TextField 
                    value={personalInfo.city}
                    size='small' 
                    fullWidth   
                    style={{color:'#574b90'}}
                    name='city'
                    onChange={(e) => handleChange(e, 'text')}
                />
            </div>
            <div style={{marginTop:'30px'}}>
                <h3 >Country</h3>
                <TextField
                    value={personalInfo.country}
                    size='small' 
                    fullWidth   
                    style={{color:'#574b90'}}
                    name='country'
                    onChange={(e) => handleChange(e, 'text')}
                />
            </div>
            <div style={{marginTop:'30px'}}>
                <h3 >Email</h3>
                <TextField 
                    error={emailError}
                    helperText={emailError && 'Invalid email format'}
                    value={personalInfo.emailPro}
                    size='small' 
                    fullWidth   
                    style={{color:'#574b90'}}
                    name='emailPro'
                    onChange={(e) => handleChange(e, 'email')}
                />
            </div>
            <div style={{marginTop:'30px', position:"relative"}}>
                <h3 >Phone</h3>
                    <TextField 
                        helperText='Arm format'
                        type='tel'
                        value={personalInfo.phone}  
                        size='small' 
                        fullWidth   
                        style={{color:'#574b90'}}
                        name='phone'
                        onChange={(e) => handleChange(e, 'phone')}
                    />
                    {personalInfo.phone !== '' &&
                        <Tooltip title='Clear field'>
                            <ClearIcon 
                                style={{position:'absolute', right:'10px' ,fontSize:'22px', color:'#786fa6', cursor:'pointer'}}
                                onClick={() => setPersonnalInfo({...personalInfo, phone: ''})}
                            />
                        </Tooltip>
                    }
                    
            </div>
            <div style={{marginTop:'30px', display:'flex', justifyContent:'flex-end'}}>
                <Button 
                    style={{color:'#574b90'}}
                    startIcon={<SaveIcon style={{color:'#574b90', fontSize:'30px'}}/>}
                    variant='outlined'
                    onClick={(e) => {
                        e.preventDefault()
                        submitPersonnalInfo()
                    }}
                >
                    Save and Next
                </Button>
            </div>
        </Skeleton>
    )
}

export default MainInfos