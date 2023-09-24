import { createSlice } from '@reduxjs/toolkit';

export const selectionType = createSlice({
    name: 'selection_type',
    initialState: 'list',
    reducers: {
        setSelectionType: (_,action)=>(action.payload)
    }
})

export const pokeSearchslice = createSlice({
    name: 'selected_pokemon',
    initialState: 1,
    reducers: {
        setPokemonSelected: (_,action)=>(action.payload)
    }
})

export const pokeTypeSelected = createSlice({
    name: 'selected_pokemon_type',
    initialState: 'normal',
    reducers: {
        setSelectedPokemonType: (_,action)=>(action.payload)
    }
})


