import { createSlice } from "@reduxjs/toolkit"
import {setAlert, cleanAlert} from './alertStore'


const initialState = { resumes: [], resume: {}, selectedResume:{}}

const resumeSlice = createSlice({
    name:'resume',
    initialState: initialState,
    reducers: {
        setResumes : ((state, {payload}) => {state.resumes = payload}),
        setResume : ((state, {payload}) => {state.resume = payload}),
        updateResume : ((state, {payload}) => {state.resume = {...state.resume, ...payload}}),
        selectedResume : ((state, payload) => {state.selectedResume = payload })
    }
})

export const {setResume, setResumes, selectedResume} = resumeSlice.actions

export const createResume = payload => async dispatch => {

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
        dispatch(setAlert({message: 'Your infos has been saved successfully', type: 'success'}))
        setTimeout(() =>  dispatch(cleanAlert()), 2300)

    } else {
        dispatch(setAlert({message: 'Failed to save your infos, try later', type: 'error'}))
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