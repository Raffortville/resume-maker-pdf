import React from 'react'
import {useSelector} from 'react-redux'
import {resumeSelector} from '../../../Store/resumeStore'
import {userSelector} from '../../../Store/userStore'
import PdfResume from '../../../Components/Resume/PDF/PdfResume'
import { PDFViewer } from '@react-pdf/renderer'


const ResumeCheck = props => {
    const resume = useSelector(resumeSelector)
    const user = useSelector(userSelector)

    return (
        <div style={{display:'flex', justifyContent:'center'}}>
            <PDFViewer width='1200px' height='840px'>
                <PdfResume resume={resume} user={user} />
            </PDFViewer> 
        </div>
    )
}

export default ResumeCheck