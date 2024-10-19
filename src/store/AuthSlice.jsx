import {createSlice} from "@reduxjs/toolkit"
import {clearWishlist} from "./SaveSlice"
import {clearCart} from "./CartSlice"

const initialState = {
    isAuthenticated: false,
    user: null,
    filterCategory: "All",
    search: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
    setFilterCategory: (state, action) => {
      state.filterCategory = action.payload;
    },
    searchProduct: (state, action) => {
      state.search = action.payload;
    },
    resetFilters:(state)=>{
      state.search="";
      state.filterCategory="All"
    },
    
  },
});
export const {login,logout,setFilterCategory,searchProduct,resetFilters} = authSlice.actions;
export const clearData = () => (dispatch) => {
  dispatch(logout());
  dispatch(clearCart());
  dispatch(clearWishlist()); 
};
export default authSlice.reducer
