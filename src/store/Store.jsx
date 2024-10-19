import {configureStore} from "@reduxjs/toolkit"
import cartReducer from "./CartSlice"
import saveReducer from "./SaveSlice"
import authReducer from "./AuthSlice"

const store=configureStore({
    reducer:{
     cart:cartReducer,
     save:saveReducer,
     auth:authReducer,
     
    }
})
export default store;