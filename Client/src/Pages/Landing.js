import React from 'react'
import { useSelector } from 'react-redux'
import { loadingSelector } from '../Store/alertStore'
import Spinner from '../Components/Ux/Spinner'

const Landing = () => {

    const isLoading = useSelector(loadingSelector)
    
    return (
        <div>
            {isLoading 
                ? <Spinner/>
                : 
                    <div className='root-container'>
                        <div style={{display:'flex',width:'30%', margin:'100px auto', flexDirection:'column'}}> 
                            <h1 className='main-title'>Resume Maker</h1>
                                <ul style={{margin:'0px', paddingLeft:'10px'}}>
                                    <li><h2>Fill your profesionnals infos</h2></li>
                                    <li><h2 >Pick a general color for your resume</h2></li>
                                    <li><h2>Get your resume as PDF</h2></li>
                                </ul>
                            </div>
                        
                    </div>
            }
        </div>
    )
}

export default Landing