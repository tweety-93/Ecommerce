import { createSlice } from "@reduxjs/toolkit";

const saveSlice=createSlice({
    name: 'save',
    initialState:{
      totalCount:0,
      items:[],
      
    },
    
    reducers:{
      addToWishlist: (state, action) => {
      const {id}=action.payload
      const alredySaved=state.items.some((item)=>item.id === id)
      if(!alredySaved){
        state.items.push(action.payload)
        state.totalCount++;
      }
        
      },
    remove: (state, action) => {
      const id=action.payload;
      const product=state.items.find(item => item.id === id)
      if(product){
        state.items=state.items.filter(item => item.id !== id)
        }
      state.totalCount--
    },
    clearWishlist:(state)=>{
      state.items=[]
      state.totalCount=0
    }
  },
    
})
export const {addToWishlist,remove,clearWishlist}=saveSlice.actions;
export const savedProducts=(state) => state.save.items;
export default saveSlice.reducer




