import { createSlice } from '@reduxjs/toolkit'

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    value: [],
  },
  reducers: {
  
    addToCart: (state,action) =>{
        const product = action.payload;
        const foundItem = state.value.find((item) => item.product._id === product._id);
        if(foundItem){
            foundItem.quantity +=1;
            return;
        }
        state.value.push({product: action.payload, quantity: 1} );

    },
   
  }
})

// Action creators are generated for each case reducer function
export const { addToCart} = cartSlice.actions

export default cartSlice.reducer