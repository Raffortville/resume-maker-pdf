import React, {useEffect} from 'react'
import { useHistory } from 'react-router'
import { useSelector, useDispatch } from 'react-redux'
import { userSelector } from '../../Store/userStore'
import { loadingSelector} from '../../Store/alertStore'
import { createResume, getResumesFromDb, resumesSelector } from '../../Store/resumeStore'
import LibraryAddOutlinedIcon from '@material-ui/icons/LibraryAddOutlined'


const Home = () => {    

    const user = useSelector(userSelector)
    const resumes = useSelector(resumesSelector)
    const isLoading = useSelector(loadingSelector)

    console.log(isLoading)

    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        if (user) {
            dispatch(getResumesFromDb(user._id))
        }
    }, [dispatch, user])


    return (
        <div className='root-container resume'>
            <div style={{width:'300px'}}>
                <h1 className='head-title'>Create a new resume</h1>
                <div style={{display:'flex', justifyContent:'center'}}>
                    <div className='resume-card' 
                        onClick={() => {
                            dispatch(createResume({userId: user._id, state: 'draft'}))
                            history.push('/resume/form/main-infos')}
                        }
                    >
                        <LibraryAddOutlinedIcon className='resume-card-icon'/>
                    </div>
                </div>
            </div>
            {resumes.length > 0 &&  <div>{resumes.length}</div>}
            
        </div>
    )
}

export default Home