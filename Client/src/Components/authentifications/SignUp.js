import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Redirect} from 'react-router-dom'

import {signUp} from '../../Store/userStore'
import { isUserLoggedSelector } from '../../Store/userStore'
import {checkInputFormat, isStringEmpty} from '../../Helpers/checkFormat'
import {TextField, Button} from '@material-ui/core'

import '../../Pages/Connexion/Connexion.css'

const SignUp = props => {

    const {focus} = props

    const dispatch = useDispatch()

    const [errorUsername, setErrorUserName] = useState(false)
    const [errorPassword, setErrorPassword] = useState(false)
    const [errorEmail, setErrorEmail] = useState(false)

    const [invalidForm, setInvalidForm] = useState(true)
    const [user, setUser] = useState({email: '', userName: '',  password:''})

    const userLoaded = useSelector(isUserLoggedSelector)

    useEffect(() => {
        if (errorEmail || errorPassword || errorUsername || isStringEmpty(user.userName) || 
            isStringEmpty(user.email) || isStringEmpty(user.password)) {
            setInvalidForm(true) 

        } else setInvalidForm(false)

    }, [user.userName, user.email, user.password, errorUsername, errorPassword, errorEmail])

    if(userLoaded) return <Redirect to='/'/>

    return (
        <div 
            className={`connexion-container signup ${focus.signup && 'focus'}`}
            onMouseOver={() => props.setFocus({signin: true, signup: false})}
            onMouseOut={()=> props.setFocus({signin: false, signup: true})}
        >
            <div className='connexion-form-wrap'>
            <h2>Sign Up</h2>
                <TextField 
                    error={errorUsername}
                    helperText={errorUsername && 'At least 2 characters'}
                    type='text'
                    required
                    label='Username' 
                    value={user.userName}
                    onChange={(e)=> {
                        setUser({...user, userName: e.target.value})
                        if (e.target.value.length <= 1) setErrorUserName(true)
                        else setErrorUserName(false)
                    }}
                />

                <TextField 
                    error={errorEmail}
                    type='email'
                    helperText={errorEmail && 'Not valid email format'}
                    required
                    label='Email'
                    value={user.email}
                    onChange={(e)=> {
                        setUser({...user, email: e.target.value})
                        if (!checkInputFormat(user.email, 'email')) setErrorEmail(true)
                        else setErrorEmail(false)
                    }} 
                />

                <TextField 
                    error={errorPassword}
                    helperText={errorPassword && 'At least 6 characteres'}
                    type='password'
                    required
                    label='Password'
                    value={user.password}
                    onChange={(e)=> {
                        setUser({...user, password: e.target.value})
                        if (!checkInputFormat(e.target.value, 'password')) setErrorPassword(true)
                        else setErrorPassword(false)
                    }}
                />
                <div style={{marginTop:'30px', display:'flex', justifyContent:'flex-end'}}>
                    <Button 
                        variant='outlined'
                        style={{color: '#574b90'}}
                        disabled={invalidForm} 
                        onClick={()=> {
                            if(!invalidForm) {
                                dispatch(signUp(user))
                            }
                        }}>Validate
                    </Button>
                </div>
            </div>
        </div>
    )
}


export default SignUp