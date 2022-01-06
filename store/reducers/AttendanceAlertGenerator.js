//AttendanceAlertGenerator

import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    attendanceAlert: {
        msg: '',
        status: "",
        variant: ""
    }
}

export const AttendanceAlertGenerator = createSlice({
    name: 'attendanceAlert',
    initialState,
    reducers: {
        createattendanceAlert: (state, action) => {

            state.attendanceAlert = { ...action.payload }
        },
    },
})

// Action creators are generated for each case reducer function
export const { createattendanceAlert } = AttendanceAlertGenerator.actions

export default AttendanceAlertGenerator.reducer