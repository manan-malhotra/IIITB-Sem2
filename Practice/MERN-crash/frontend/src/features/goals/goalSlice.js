import { createSlice , createAsyncThunk} from '@reduxjs/toolkit'

const initialState = {
    goals:[],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

export const goalSlice = createSlice({
    name:'goal',
    initialState,
    reducers: {reset:(state)=>initialState},
    extraReducers:{}

})

export const {reset} = goalSlice.actions

export default goalSlice.reducer