import { createSlice } from "@reduxjs/toolkit";
import { set } from "mongoose";

const warenkorbSlice = createSlice({
    name: "warenkorb",
    initialState:{
        produkte: [],
        gesamtBetrag: 0,
        warenkorbAnzahl: 0
    },
    reducers:{
        addProdukte: (state, action) => {
            state.produkte.push(action.payload)
            state.warenkorbAnzahl += 1
            state.gesamtBetrag += action.payload.preis * action.payload.menge
        },
        leeren: (state) =>{
            state.produkte = []
            state.warenkorbAnzahl = 0
            state.gesamtBetrag = 0
        },
        loescheProdukt: (state, action) => {
            const leftProdukte = state.produkte.filter((produkt) => produkt._id !== action.payload._id)
            state.produkte = leftProdukte
            state.warenkorbAnzahl -= 1
            state.gesamtBetrag -= action.payload.preis * action.payload.menge
        },
    }
})

export const {loescheProdukt, addProdukte, leeren} = warenkorbSlice.actions
export default warenkorbSlice.reducer