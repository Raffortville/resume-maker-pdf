import {createSlice} from '@reduxjs/toolkit'
import { auth } from '../Services/firebase'
import {cleanAlert, setAlert, setLoading} from './alertStore' 

export const initialState = {user : {}, isUserLogged : false}
console.log(process.env.REACT_APP_API_URL)

const userSlice = createSlice({
    name: 'USER',
    initialState: initialState,
    reducers : {
        setUser : (state, {payload}) => {state.user = payload },
        setUserLoadedOff : state => {state.isUserLogged = false},
        setUserLoadedOn : state => {state.isUserLogged = true},
        resetUser: (state, {payload}) => {state.user = payload},
        updateUser : (state, {payload}) => {state.user = {...state.user, ...payload}}
    }
})

export const {setUser, setUserLoadedOff, setUserLoadedOn, resetUser, updateUser} = userSlice.actions

export const signUp = payload => async dispatch => {

    const {email, password} = payload

    try {
        const user = await auth.createUserWithEmailAndPassword(email, password)
        if(user) return dispatch(logIn(payload, 'signUp'))
        
    } catch (error) {
        dispatch(setAlert({message: error.message, type: 'error'}))
        setTimeout(() =>  dispatch(cleanAlert()), 3000)
    }

}

export const logIn = (payload, from) => async dispatch => {

    const {email, password} = payload

    try {
        const user = await auth.signInWithEmailAndPassword(email, password)
        if (user) {
            if (from === 'signUp') return dispatch(saveUserToDb(payload))
            dispatch(setLoading(false))

        } else {
            dispatch(setAlert({message: 'Unable to log in, try later', type: 'error'}))
            setTimeout(() =>  dispatch(cleanAlert()), 3000)
        }

    } catch (error) {
        dispatch(setAlert({message: error.message, type: 'error'}))
        setTimeout(() =>  dispatch(cleanAlert()), 3000)
    }
}


export const saveUserToDb = payload =>  async dispatch  => {

    const {userName, email} = payload

   try {

    const response =  await fetch(`${process.env.REACT_APP_API_URL}/user`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({userName, email})
    })

        if (response.status === 200) {
            const data = await response.json()
            dispatch(setUser(data))
            dispatch(setUserLoadedOn())
            dispatch(setLoading(false))

        } else {
            dispatch(setAlert({message: 'Erreur lors de votre connexion', type: 'error'}))
            setTimeout(() =>  dispatch(cleanAlert()), 3000)
        }
        
    } catch (error) { 
        dispatch(setAlert({message: error.message, type: 'error'}))
        setTimeout(() =>  dispatch(cleanAlert()), 3000)
    }
}

export const getUser = payload => async dispatch => {

    dispatch(setLoading(true))

    try {

        const result = await fetch(`${process.env.REACT_APP_API_URL}/user/loadUser`, {
            method: 'POST',
            headers: { 
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: payload})
        })

        if (result.status === 200){
            const data = await result.json()
            dispatch(setUser(data))
            dispatch(setUserLoadedOn())
            dispatch(setLoading(false))

        } else {
            dispatch(setAlert({message: 'Email seems uncorrect', type: 'error'}))
            setTimeout(() =>  dispatch(cleanAlert()), 3000)
        }
        
    } catch (error) {
        dispatch(setAlert({message: 'Internal problem, try later', type: 'error'}))
        setTimeout(() =>  dispatch(cleanAlert()), 3000)
    }
}

export const logOut = () => async dispatch  => {
    dispatch(setLoading(true))

    try {
        await auth.signOut()
        dispatch(resetUser(initialState.user))
        dispatch(setUserLoadedOff())
        dispatch(setLoading(false))

    } catch (error) {
        console.log(error)
        dispatch(setLoading(false))
    }
}

export const updateUserToDB = (payload, id) => async dispatch => {  

    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/user/${id}`, {
            method: 'PUT',
            headers: { 
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
                body: JSON.stringify(payload)
            }  
        )

        const data = await response.json()

        if (response.status === 200) {
            dispatch(updateUser(data))
            dispatch(setAlert({message: 'Your infos has been saved successfully', type: 'success'}))
            setTimeout(() =>  dispatch(cleanAlert()), 2300)
            
           
        } else {
            dispatch(setAlert({message: 'Failed to save your infos, try later', type: 'error'}))
            setTimeout(() =>  dispatch(cleanAlert()), 3000)
        }
        
    } catch (error) {
        dispatch(setAlert({message: 'Failed to save your infos, try later', type: 'error'}))
        setTimeout(() =>  dispatch(cleanAlert()), 3000)
    }
}

export const userSelector = state => state.userReducer.user
export const isUserLoggedSelector = state => state.userReducer.isUserLogged


export default userSlice.reducer