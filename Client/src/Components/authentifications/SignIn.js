import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Redirect} from 'react-router-dom'

import {logIn} from '../../Store/userStore'
import { isUserLoggedSelector } from '../../Store/userStore'
import {checkInputFormat, isStringEmpty} from '../../Helpers/checkFormat'
import {TextField, Button} from '@material-ui/core'

import '../../Pages/Connexion/Connexion.css'

const SignIn = props => {

    const {focus} = props

    const dispatch = useDispatch()
  
    const [errorPassword, setErrorPassword] = useState(false)
    const [errorEmail, setErrorEmail] = useState(false)

    const [invalidForm, setInvalidForm] = useState(true)
    const [user, setUser] = useState({email: '', password: ''})

    const userLoaded = useSelector(isUserLoggedSelector)

    useEffect(() => {
        if (errorEmail || errorPassword  || isStringEmpty(user.email) || isStringEmpty(user.password)) {
            setInvalidForm(true) 

        } else setInvalidForm(false)

    }, [ user.email, user.password, errorPassword, errorEmail])

    if(userLoaded) return <Redirect to='/'/>

    return (
        <div 
            className={`connexion-container signin ${focus.signin && 'focus'}`}
            onMouseOver={() => props.setFocus({signin: false, signup: true})}
            onMouseOut={()=> props.setFocus({signin: true, signup: false})}
        >
            <div className='connexion-form-wrap '>
            <h2>Sign in</h2>
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
                                dispatch(logIn(user))
                            }
                        }}>Validate
                    </Button>
                </div>
                
            </div>
        </div>
    )
}


export default SignIn