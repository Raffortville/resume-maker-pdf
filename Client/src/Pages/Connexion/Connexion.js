import React, {useState} from 'react'
import { useSelector } from 'react-redux'
import SignIn from '../../Components/authentifications/SignIn'
import SignUp from '../../Components/authentifications/SignUp'
import { loadingSelector } from '../../Store/alertStore'
import Spinner from '../../Components/Ux/Spinner'

import './Connexion.css'

const Connexion = props => {

    const isLoading = useSelector(loadingSelector)
    const [focus, setFocus] = useState({signin:true, signup: false})

    return (
        <div className='root-container'>
        {isLoading 
            ? <Spinner/>
            : <div className='connexion-container-main'>
                <SignIn 
                    setFocus={setFocus}
                    focus={focus}
                />
                <SignUp 
                    setFocus={setFocus}
                    focus={focus}
                />
            </div>    
        }
        </div>
    )
}

export default Connexion