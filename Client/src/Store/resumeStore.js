import { createSlice } from "@reduxjs/toolkit"
import {setAlert, cleanAlert, setLoading} from './alertStore'


const initialState = { resumes: [], resume: {}, selectedResume:{}}

const resumeSlice = createSlice({
    name:'resume',
    initialState: initialState,
    reducers: {
        setResumes : ((state, {payload}) => {state.resumes = payload}),
        setResume : ((state, {payload}) => {state.resume = payload}),
        updateResume : ((state, {payload}) => {state.resume = {...state.resume, ...payload}}),
        deleteResume: ((state, {payload}) => {state.resumes = state.resumes.filter(resume => resume._id !== payload)}),
        selectedResume : ((state, payload) => {state.selectedResume = payload })
    }
})

export const {setResume, setResumes, selectedResume, updateResume, deleteResume} = resumeSlice.actions

export const createResume = payload => async dispatch => {
    dispatch(setLoading(true))

    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/resume/`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        body: JSON.stringify(payload)
    })

    if (response.status === 200) {
        const data = await response.json()
        dispatch(setResume(data))
        dispatch(setLoading(false))

    } else {
        dispatch(setLoading(false))
        dispatch(setAlert({message: 'Failed to save your infos, try later', type: 'error'}))
        setTimeout(() =>  dispatch(cleanAlert()), 3000)
    }
            
    } catch (error) {
        dispatch(setLoading(false))
        dispatch(setAlert({message: 'Internal problem, try later', type: 'error'}))
        setTimeout(() =>  dispatch(cleanAlert()), 3000)
    }
}

export const updateResumeToDb = (payload, id)=> async dispatch => {

   let url = `${process.env.REACT_APP_API_URL}/resume/${id}`
    
    try {
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        body: JSON.stringify(payload)
    })

    if(response.status === 200) {
        dispatch(updateResume(payload))
        dispatch(setAlert({message: 'Your infos has been saved successfully', type: 'success'}))
        setTimeout(() =>  dispatch(cleanAlert()), 2000)

    } else {
        dispatch(setAlert({message: 'Failed to save your infos, try later', type: 'error'}))
        setTimeout(() =>  dispatch(cleanAlert()), 3000)
    }

    } catch (error) {
        dispatch(setLoading(false))
        dispatch(setAlert({message: 'Internal problem, try later', type: 'error'}))
        setTimeout(() =>  dispatch(cleanAlert()), 3000)
    }
}

export const getResumesFromDb = payload => async dispatch => { 

    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/resume/${payload}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })

        if (response.status === 200) {
            const data = await response.json()
            dispatch(setResumes(data))
          
        } else {
            dispatch(setAlert({message: 'Unable to load your resumes, try later please', type: 'error'}))
            setTimeout(() =>  dispatch(cleanAlert()), 3000)
        }

    } catch (error) {
        dispatch(setAlert({message: 'Internal problem, try later', type: 'error'}))
        setTimeout(() =>  dispatch(cleanAlert()), 3000)
    }
}

export const deleteResumeFromDb = payload => async dispatch => {
    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/resume/${payload}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })

        if ( response.status === 200) {
            dispatch(deleteResume(payload))
            dispatch(setAlert({message: 'Your resume has been removed successfully', type: 'success'}))
            setTimeout(() =>  dispatch(cleanAlert()), 2000)

        } else {
            dispatch(setAlert({message: 'Unable to delete your resume, try later please', type: 'error'}))
            setTimeout(() =>  dispatch(cleanAlert()), 3000)
        }

        
    } catch (error) {
        dispatch(setAlert({message: 'Internal problem, try later', type: 'error'}))
        setTimeout(() =>  dispatch(cleanAlert()), 3000)
    }
}


export const resumesSelector = (state) => state.resumeReducer.resumes
export const resumeSelector = (state) => state.resumeReducer.resume
export const resumesSelectedSelector = (state) => state.resumeReducer.selectedResume

export default resumeSlice.reducer