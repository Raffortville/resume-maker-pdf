import React from 'react'
import { useHistory } from 'react-router'
import LibraryAddOutlinedIcon from '@material-ui/icons/LibraryAddOutlined'


const Home = () => {

    const history = useHistory()

    return (
        <div className='root-container resume'>
            <div style={{width:'300px'}}>
                <h1 className='head-title'>Create a new resume</h1>
                <div style={{display:'flex', justifyContent:'center'}}>
                    <div className='resume-card' onClick={() => history.push('/resume/form/main-infos')}>
                        <LibraryAddOutlinedIcon className='resume-card-icon'/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home