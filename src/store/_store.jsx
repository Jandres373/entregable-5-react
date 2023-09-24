import { configureStore } from '@reduxjs/toolkit';
import {trainerSlice} from "./slices/trainer.slice.jsx"
import {pokeSearchslice, pokeTypeSelected, selectionType} from "./slices/pokeSearch.slice.jsx"

const trainer = trainerSlice.reducer
const selectedPokemon = pokeSearchslice.reducer
const selectedSearch = selectionType.reducer
const selectedPokeType = pokeTypeSelected.reducer

export const _store = configureStore({
  reducer: {
    trainer,
    selectedPokemon,
    selectedSearch,
    selectedPokeType,
  }
})