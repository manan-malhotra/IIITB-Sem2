import { createSlice , createAsyncThunk} from '@reduxjs/toolkit'
import goalService from './goalService'
const initialState = {
    goals:[],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

export const createGoal = createAsyncThunk('goals/create',async (goal, thunkAPI)=>{
    try {
        const token = thunkAPI.getState().auth.user.token
        return await goalService.createGoal(goal,token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message)
                            || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const getGoals = createAsyncThunk('goals/All', async (_,thunkAPI)=>{
    try {
        const token = thunkAPI.getState().auth.user.token
        
        return await goalService.getGoals(token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message)
                            || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const deleteGoal = createAsyncThunk('goal/delete', async(id,thunkAPI)=>{
    try {
        const token = thunkAPI.getState().auth.user.token
        return await goalService.deleteGoal(id,token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message)
                            || error.message || error.toString()
        console.log(message)
        return thunkAPI.rejectWithValue(message)
    }
})

export const goalSlice = createSlice({
    name:'goal',
    initialState,
    reducers: {reset:(state)=>initialState},
    extraReducers:(builder)=>{
        builder
        .addCase(createGoal.fulfilled, (state,action)=>{
            state.isSuccess = true
            state.goals.push(action.payload)
            state.isLoading = false
        })
        .addCase(createGoal.rejected, (state,action)=>{
            state.isError = true
            state.message = action.payload
            state.isLoading = false
        })
        .addCase(createGoal.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(getGoals.fulfilled, (state,action)=>{
            state.isSuccess = true
            state.goals=(action.payload)
            state.isLoading = false
            state.message = ''
        })
         .addCase(getGoals.rejected, (state,action)=>{
            state.isError = true
            state.message = action.payload
            state.isLoading = false
        })
        .addCase(getGoals.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(deleteGoal.fulfilled, (state,action)=>{
            state.isLoading = false 
            state.isSuccess = true 
            state.goals = state.goals.filter(
                (goal) => goal._id !== action.payload.id
            )
        })
        .addCase(deleteGoal.rejected, (state,action)=>{
            state.isError = true
            state.message = action.payload
            state.isLoading = false
        })
        .addCase(deleteGoal.pending,(state)=>{
            state.isLoading = true
        })
    }

})

export const {reset} = goalSlice.actions

export default goalSlice.reducer