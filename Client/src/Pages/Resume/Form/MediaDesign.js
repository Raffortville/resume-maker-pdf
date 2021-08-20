import React, {useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import { resumeSelector, updateResumeToDb } from '../../../Store/resumeStore'
import Skeleton from '../Skeleton'
import BackupIcon from '@material-ui/icons/Backup'
import SaveIcon from '@material-ui/icons/Save'
import { Button } from '@material-ui/core'
import { isStringEmpty } from '../../../Helpers/checkFormat'
import { sendPicToStorage } from '../../../Helpers/services'
import CircularProgress from '@material-ui/core/CircularProgress'
import useCheckResumeState from '../useCheckResumeState'

import '../Resume.css'

const FinalStep = props => {

    const dispatch = useDispatch()
    const history = useHistory()
    const resume = useSelector(resumeSelector)

    const [previewColor, setPreviewColor] = useState(resume.colorMain)
    const [previewPic, setPreviewPic] = useState(resume.profilPic)
    const [disabled, setDisabled] = useState(true)
    const [loading, setLoading] = useState(false)

    const {resumeState} = useCheckResumeState()

    useEffect(() => {
        if (!isStringEmpty(previewPic) || !isStringEmpty(previewColor)) {
           setDisabled(false)
        } else setDisabled(true)

    },[previewColor, previewPic])

    const uploadPicture =  async input => {
        setLoading(true)
        let file = input[0]
        let picUrl = await sendPicToStorage(file, resume._id)
        setPreviewPic(picUrl)
        setLoading(false)
    }

    const submitMediaInfos =  () => {
        dispatch(updateResumeToDb({profilPic:previewPic, colorMain: previewColor, ...resumeState === 'complete' && {state: 'complete'}}, resume._id, 'media'))
        setTimeout(() => history.push('/resume/summary'), 2000); 
    }

    return (
        <Skeleton
            mainTitle='Picture and design'
            className='fade'
            next='/resume/summary'
        >
            <h3>Choose your resume picture *</h3>
            <div style={{margin:'20px auto', display:'flex', alignItems:"center", flexDirection:'column'}}>
                <label 
                    htmlFor ='profil-pic' 
                    className='button-upload'
                >
                    Upload 
                    <BackupIcon className='button-uplaod-icon'/>
                </label>
                <input 
                    hidden
                    type='file'
                    accept='png/jpeg' 
                    id='profil-pic' 
                    onChange={(e) => uploadPicture(e.target.files)} 
                />
                {loading
                    ? <div className='previewPic' style={{marginTop:'20px'}}>
                        <CircularProgress style={{color:'#574b90', height: '20px', width:'20px'}}/>
                    </div>
                    :   previewPic !== undefined && 
                            <div className='previewPic' style={{marginTop:'20px'}}>
                                <p style={{marginRight:'10px'}}>Your choosen resume picture</p>
                                <img 
                                    src={previewPic} 
                                    alt='/' 
                                    className='imgAvatar'
                                />
                            </div>
                   
                }
            </div>
            <h3 style={{marginTop:'60px'}}>Pick up a main color for your resume *</h3>
            <div style={{margin:'20px auto', display:'flex', justifyContent:'space-around'}}> 
                <div className='colorPick grey' onClick={() => setPreviewColor('grey')} />
                <div className='colorPick blue' onClick={() => setPreviewColor('blue')}/>
                <div className='colorPick maroon' onClick={() => setPreviewColor('maroon')}/>
                <div className='colorPick sageGreen' onClick={() => setPreviewColor('sageGreen')}/>
                <div className='colorPick sorbet' onClick={() => setPreviewColor('sorbet')}/>
                <div className='colorPick berry' onClick={() => setPreviewColor('berry')}/>
            </div>
             { previewColor !== undefined &&
                <div className='previewColor'> 
                    <p>Your choosen color</p>
                    <div className={`colorPick ${previewColor}`} style={{cursor:'default', boxShadow:'none', marginLeft:"10px"}}/>
                </div>
            }
             <div style={{display:'flex', justifyContent:'flex-end', marginTop:'180px'}}>
                <Button 
                    disabled={disabled}
                    style={{color:'#574b90'}}
                    startIcon={<SaveIcon style={{color:'#574b90', fontSize:'30px'}}/>}
                    variant='outlined'
                    onClick={(e) => {
                        e.preventDefault()
                        submitMediaInfos()
                    }}
                >
                    Save and Next
                </Button>
            </div>
        </Skeleton>
    )
}

export default FinalStep