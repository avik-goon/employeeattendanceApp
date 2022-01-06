import { createSlice } from '@reduxjs/toolkit'
import produce from "immer"
const initialState = {
    locations: []
}

export const CreateLocationData = createSlice({
    name: 'locations',
    initialState,
    reducers: {
        locationsHandler: (state, action) => {

            const nextState = produce(state.locations, draftState => {
                draftState = [...action.payload]
                return draftState;
            })
            state.locations = nextState
        },
    },
})

// Action creators are generated for each case reducer function
export const { locationsHandler } = CreateLocationData.actions

export default CreateLocationData.reducer