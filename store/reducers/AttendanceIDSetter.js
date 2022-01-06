import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    attendanceRecID: null
}

export const setAttendanceRecID = createSlice({
    name: 'attendanceRecID',
    initialState,
    reducers: {
        createAttendanceRecordID: (state, action) => {
            state.attendanceRecID = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { createAttendanceRecordID } = setAttendanceRecID.actions

export default setAttendanceRecID.reducer