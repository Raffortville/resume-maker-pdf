import React, {useEffect, useState} from 'react'
import { useHistory } from 'react-router'
import { useSelector, useDispatch } from 'react-redux'
import { userSelector } from '../../Store/userStore'
import { createResume, getResumesFromDb, resumesSelector, setResume, deleteResumeFromDb} from '../../Store/resumeStore'
import { Tooltip } from '@material-ui/core'
import LibraryAddOutlinedIcon from '@material-ui/icons/LibraryAddOutlined'
import ListAltOutlinedIcon from '@material-ui/icons/ListAltOutlined'
import HighlightOffIcon from '@material-ui/icons/HighlightOff'
import DialogModal from '../../Components/Ux/Dialog'


const Home = () => {    

    const user = useSelector(userSelector)
    const resumes = useSelector(resumesSelector)

    const [drafts, setDrafts] = useState([])
    const [completed, setCompleted] = useState([])
    const [showDialog, setShowDialog] = useState(false)
    const [selectedId, setSelectedId] = useState()
    
    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        setDrafts(resumes.filter(e => e.state === 'draft'))
        setCompleted(resumes.filter(e => e.state === 'completed'))
    },[resumes])

    useEffect(() => {
        if (user) {
            dispatch(getResumesFromDb(user._id))
        }
    }, [dispatch, user])

    return (
        <div className='root-container resume'>
            <>
                <h2 className='head-title'>Create a new resume</h2>
                <div className='resume-card' 
                    style={{display:'flex', justifyContent:'center'}}
                    onClick={() => {
                        dispatch(createResume({userId: user._id, state: 'draft'}))
                        history.push('/resume/form/main-infos')}
                    }
                >
                    <LibraryAddOutlinedIcon className='resume-card-icon'/>
                </div>
            </>
           {completed.length > 0 &&
            <div>
                <h2 className='head-title'>Your completed resumes</h2>
                <div  style={{display:'flex', paddingRight:'50px', flexWrap:'wrap'}}>
                {drafts.map((e, i) => 
                    <div className='resume-card'
                        key={i}
                        style={{display:'flex', justifyContent:'space-between', flexDirection:'column', alignItems:'center'}}
                        onClick={() => {
                            dispatch(setResume(e))
                            history.push('/resume/form/main-infos')}
                        }
                    >
                        <ListAltOutlinedIcon className='resume-card-icon'/>
                        <div style={{backgroundColor:'#786fa6' , width:'100%', borderBottomLeftRadius:'10px', borderBottomRightRadius:'10px'}}>
                            <p style={{color:'white', textAlign:'center', flexWrap:'wrap', fontSize:'15px'}}>
                                { e.position 
                                    ? e.position
                                    : 'Your resume'
                                }
                            </p>
                        </div>
                    </div>
                )}
                </div>
            </div>
           }
           {drafts.length > 0 &&
            <div style={{marginTop:'50px'}}>
                <h2 className='head-title'>Resume to be complete</h2>
                <div  style={{display:'flex', paddingRight:'50px', flexWrap:'wrap'}}>
                    {drafts.map((e, i) => 
                        <div className='resume-card'
                            style={{display:'flex', justifyContent:'space-between', flexDirection:'column', alignItems:'center', position:'relative'}}
                            key={i}
                        >
                            <div 
                                style={{alignSelf:'flex-end'}}
                                onClick={()=> {
                                    setShowDialog(true)
                                    setSelectedId(e._id)
                                }}
                            >
                                <Tooltip title='Delete resume'>
                                    <HighlightOffIcon className='resume-card-delete-icon'/>
                                </Tooltip>
                            </div>
                                <Tooltip  
                                    onClick={() => {
                                        dispatch(setResume(e))
                                        history.push('/resume/form/main-infos')}
                                    } 
                                    title='Complete your resume' 
                                    placement='top'
                                    style={{cursor:'pointer'}}
                                >
                                    <ListAltOutlinedIcon className='resume-card-icon'/>
                                </Tooltip>
                                <div style={{backgroundColor:'#786fa6' , width:'100%', borderBottomLeftRadius:'10px', borderBottomRightRadius:'10px'}}>
                                    <p style={{color:'white', textAlign:'center', flexWrap:'wrap', fontSize:'15px'}}>
                                    { e.position 
                                        ? e.position
                                        : 'Your resume'
                                    }
                                    </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
           }
           {showDialog && 
                <DialogModal 
                    text='Confirm delete ?' 
                    title='Delete your resume'
                    onClose={()=> setShowDialog(false)}
                    onAgree={()=>{ 
                        setShowDialog(false)
                        dispatch(deleteResumeFromDb(selectedId))
                    }}
                />
            }
        </div>
    )
}

export default Home