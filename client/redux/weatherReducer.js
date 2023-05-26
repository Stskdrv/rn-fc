import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getWeather } from '../services/weatherService';
import prepareResponse from '../utils/prepareResponse';


export const fetchWeatherData = createAsyncThunk(
    'weatherData',
    async (location) => {
        try {
            const response = await getWeather(location);
            return response.data;
        } catch (e) {
            return e.response.data.message;
        }
    }
);


const weatherSlice = createSlice({
    name: 'weather',
    initialState: {
        data: null,
        isLoading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchWeatherData.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchWeatherData.fulfilled, (state, action) => {
                state.isLoading = false;
                const res = prepareResponse(action.payload);
                state.data = res;
            })
            .addCase(fetchWeatherData.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
    }
});

export const selectWeatherData = (state) => state.weather;

export default weatherSlice.reducer;



















// const initialState = {
//     currentDay: {
//         weatherData: [
//             {
//                 time: 'Morning',
//                 temp: null,
//                 icon: null,
//                 wind: null,
//             },
//             {
//                 time: 'Day',
//                 temp: null,
//                 icon: null,
//                 wind: null,
//             },
//             {
//                 time: 'Evening',
//                 temp: null,
//                 icon: null,
//                 wind: null,
//             },
//             {
//                 time: 'Night',
//                 temp: null,
//                 icon: null,
//                 wind: null,
//             },
//         ],
//         details: {
//             location: '',
//             sunrise: '',
//             sunset: '',
//             pressure: '',
//         },
//         recordData: {
//             mintemp: null,
//             maxtemp: null,
//             wind: null,
//         }
       
//     },
//     forecast: [
//         {
//             date: '',
//             data: [
//                 {
//                     time: 'Morning',
//                     temp: null,
//                     icon: null,
//                     wind: null,
//                 },
//                 {
//                     time: 'Day',
//                     temp: null,
//                     icon: null,
//                     wind: null,
//                 },
//                 {
//                     time: 'Evening',
//                     temp: null,
//                     icon: null,
//                     wind: null,
//                 },
//                 {
//                     time: 'Night',
//                     temp: null,
//                     icon: null,
//                     wind: null,
//                 },
//             ],
//         },
//     ]
// };