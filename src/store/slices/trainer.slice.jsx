import { createSlice } from '@reduxjs/toolkit';

export const trainerSlice = createSlice({
    name: 'trainer',
    initialState: ()=>{
        const trainer = window.localStorage.getItem('trainer')
        if (trainer) {
            return trainer
        }
        return ''
    },
    reducers: {
        setTrainer: (_,action)=>(action.payload),
    }
})

