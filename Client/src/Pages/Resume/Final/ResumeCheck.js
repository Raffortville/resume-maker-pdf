import React from 'react'
import {useSelector} from 'react-redux'
import { useHistory } from 'react-router'
import {resumeSelector} from '../../../Store/resumeStore'
import {userSelector} from '../../../Store/userStore'
import PdfResume from '../../../Components/Resume/PDF/PdfResume'
import { PDFViewer} from '@react-pdf/renderer'
import EditRoundedIcon from '@material-ui/icons/EditRounded'
import useCheckResumeState from '../../Resume/useCheckResumeState'

import '../Resume.css'

const ResumeCheck = props => {
    const resume = useSelector(resumeSelector)
    const user = useSelector(userSelector)

    const {sections} = useCheckResumeState()

    const history = useHistory()

    return (
        <div style={{display:'flex', justifyContent:'flex-start'}}>
            <div style={{width:'350px', display:'flex', flexDirection:'column', justifyContent:'flex-start', marginTop:'20px'}}>
                <h3 className='head-title' style={{textDecoration:'none', textAlign:'center', marginBottom:'20px'}}>Go to edit</h3>
                {sections.map((section, i) =>
                    <div
                        key={i}
                        style={{display:'flex', justifyContent:'space-between', alignItems:'center', cursor:'pointer', margin:'15px 0px', padding:'0px 10px 0px 5px'}}
                        onClick={()=> history.push(section.link)}
                    >
                        <h3 className='summary-title' style={{textDecoration:'underline'}}>{section.section}</h3>
                        <EditRoundedIcon style={{fontSize:'18px',  color:'#786fa6'}}/>
                    </div>
                )}
            </div>
            <div style={{width:'1000px', display:'flex', justifyContent:'center'}}>
                <PDFViewer width='1000px' height='840px'>
                    <PdfResume resume={resume} user={user}/>
                </PDFViewer> 
            </div>
        </div>
        
    )
}

export default ResumeCheck