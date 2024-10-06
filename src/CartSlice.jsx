import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
  },
  reducers: {
    addItem: (state, action) => {
        const item = action.payload
        const cart = state.items
        cart.push({name:item.name,image:item.image,cost:item.cost,quantity:1})
    },
    removeItem: (state, action) => {
        const item = action.payload
        var cart = state.items
        cart=cart.filter((items)=>(items.name!==item.name))
    },
    updateQuantity: (state, action) => {
        const {name,quantity} = action.payload
        var cart = state.cart
        cart = cart.map((items)=>{
            if (items.name===name){
                items.quantity = quantity
            }
        })
    
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;
