import React from 'react'
import PdfResume from '../../../Components/Resume/PDF/PdfResume'
import { PDFViewer } from '@react-pdf/renderer'


const ResumeCheck = props => {

    return (
        <div>
            Final
            <PDFViewer width='400px' height='400px'>
                <PdfResume/>
            </PDFViewer> 
        </div>
    )
}

export default ResumeCheck