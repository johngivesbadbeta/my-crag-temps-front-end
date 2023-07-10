import { createSlice } from "@reduxjs/toolkit";

const rootSlice = createSlice({
    name: 'root',
    initialState: {
        crag_name: 'Crag Name',
        latitude: 'Latitude',
        longitude: 'Longitude',
        city: 'City',
        state: 'State',
        rock_type: 'Rock Type',
    },
    reducers: {
        chooseCrag: (state, action) => { state.crag_name = action.payload },
        chooseLatitude: (state, action) => { state.latitude = action.payload},
        chooseLongitude: (state, action) => { state.longitude = action.payload},
        chooseCity: (state, action) => { state.city = action.payload},
        chooseState: (state, action) => { state.state = action.payload},
        chooseRock: (state, action) => { state.rock_type = action.payload}
    }
})

export const reducer = rootSlice.reducer;
export const { chooseCrag, chooseLatitude, chooseLongitude, chooseCity, chooseState, chooseRock } = rootSlice.actions