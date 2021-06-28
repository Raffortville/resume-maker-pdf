import {createSlice} from '@reduxjs/toolkit'

const initialState = { alert : { message: '', type: '' }, loading: false}

const alertSlice = createSlice({

    name: 'alert',
    initialState: initialState,
    reducers: {
        setAlert : (state, {payload}) => {state.alert = payload},
        setLoading : (state, {payload}) => {state.loading = payload},
        cleanAlert : (state) => {state.alert = initialState.alert}
    }
})

export const {setAlert, setLoading, cleanAlert} = alertSlice.actions

export const alertSelector = state => state.alertReducer.alert
export const loadingSelector = state => state.alertReducer.loading


export default alertSlice.reducer
