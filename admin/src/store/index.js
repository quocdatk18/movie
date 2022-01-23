import { configureStore } from "@reduxjs/toolkit";
import loadingSlice from './reducers/global/loading';
import UserReducer from './reducers/users/UserSlice';
import VideosReducer from './reducers/video/VideoSlice';


const store = configureStore({
    reducer: {
        loading: loadingSlice,
        UserReducer,
        VideosReducer


    }
})
export default store;