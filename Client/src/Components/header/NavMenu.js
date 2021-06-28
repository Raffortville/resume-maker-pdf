import React from 'react'
import {Link} from 'react-router-dom'
import DescriptionIcon from '@material-ui/icons/Description'
import PostAddIcon from '@material-ui/icons/PostAdd'

import './Header.css'


const NavMenu = props => {


    return (
        <nav className='header-navbar-container'>
        
                <div style={{display:'flex', alignItems:'center'}}>
                    <Link className='link'  to='/resume'>My Resumes</Link>
                    <DescriptionIcon  style={{marginLeft: '10px', fontSize:'20px', color:'#574b90', cursor:'pointer'}}/>
                </div>
            
            <div style={{display:'flex', alignItems:'center', marginLeft:'40px'}}>
                <Link className='link' to='/resume'>Create a resume</Link>
                <PostAddIcon style={{marginLeft: '10px', fontSize:'20px', color:'#574b90', cursor:'pointer'}}/>
            </div>
        </nav>
    )
}


export default NavMenu