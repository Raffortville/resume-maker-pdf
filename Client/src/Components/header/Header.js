import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import {logOut} from '../../Store/userStore'
import { userSelector } from '../../Store/userStore'

import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import { Tooltip } from '@material-ui/core'
import DialogModal from '../Ux/Dialog'
import NavMenu from './NavMenu'

import './Header.css'

const Header = props => {   
    const user = useSelector(userSelector)

    const dispatch = useDispatch()
    const history = useHistory()

    const [openDialog, setOpenDialog] = useState(false)


    return (
        <>
            <header className='header-container'>
                <div style={{marginLeft:'20px'}}>
                    <h2 className='header-title'>Resume Maker</h2>
                </div>
                <div style={{marginRight:'20px', display:'flex', alignItems:'center'}}>
                   
                    {user?.userName  &&
                        <>
                            <NavMenu/>
                            <h3 style={{marginLeft:'10px'}}>{user.userName}</h3>
                        </>
                    }
                    <div style={{marginLeft:'10px'}}>
                        { user?.userName 
                           ? <Tooltip title='Sign out'>
                                <ExitToAppIcon className='header-icon' onClick={()=> setOpenDialog(true)}/>
                            </Tooltip>
                            : <Tooltip title='Sign in'>
                                <PersonOutlineIcon style={{fontSize: "25px", cursor:'pointer', paddingTop:'10px'}} onClick={()=> history.push('/connexion')}/>
                            </Tooltip>
                        }
                    </div>
                </div>
            </header>
            {openDialog && 
                <DialogModal 
                    text='Sign out from Resume maker ?'
                    onClose = {() => setOpenDialog(false)}
                    onAgree= {() =>{dispatch(logOut(), history.push('/connexion'), setOpenDialog(false))}}
                />
                    
            }
        </>
    )
}


export default Header